import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';

/**
 * Preloads the landing route's chunk in the same wave as the entry.
 *
 * Per-route splitting costs a round-trip on a cold load: the browser cannot
 * discover a route chunk until the entry has parsed and asked for it, so the
 * first paint of every page waits an extra RTT. Measured on a simulated mobile
 * connection that was worth ~230 ms of FCP — more than the bytes the split
 * saved.
 *
 * Every path is served the same index.html (see the catch-all rewrite in
 * vercel.json), so the preload cannot be baked into the markup. Instead the
 * build writes a tiny pathname→chunk table into the head and injects the links
 * for whichever route actually matched. It runs before any module is fetched,
 * so the route chunk lands in the first wave alongside the entry, and a visitor
 * only ever preloads the one page they asked for.
 */
function preloadMatchedRoute(): Plugin {
  // Chunks named by the router plugin's split modules: `src/routes/<id>.tsx?tsr-split=component`.
  const routeModulePattern = /src[/\\]routes[/\\](.+?)\.tsx\?tsr-split/;

  // File-route id → URL path regex source. `$param` segments match one segment.
  const toPathPattern = (routeId: string) => {
    const segments = (routeId === 'index' ? '' : routeId.replace(/\.index$/, ''))
      .split('.')
      .filter((segment) => segment !== '');
    const body = segments
      .map((segment) => (segment.startsWith('$') ? '/[^/]+' : `/${segment}`))
      .join('');
    return `^${body === '' ? '/' : body}/?$`;
  };

  return {
    name: 'preload-matched-route',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;

        // Chunks the entry already pulls in statically are preloaded by Vite.
        const alreadyPreloaded = new Set<string>();
        for (const [fileName, output] of Object.entries(bundle)) {
          if (output.type !== 'chunk' || !output.isEntry) continue;
          alreadyPreloaded.add(fileName);
          for (const imported of output.imports) alreadyPreloaded.add(imported);
        }

        const table: Record<string, { js: string[]; css: string[] }> = {};

        for (const [fileName, output] of Object.entries(bundle)) {
          if (output.type !== 'chunk') continue;
          const routeModule = output.moduleIds.find((id) => routeModulePattern.test(id));
          if (!routeModule) continue;
          const routeId = routeModule.match(routeModulePattern)![1];

          // Walk the chunk's own imports so its dependencies arrive in the same
          // wave rather than one RTT behind it.
          const js = new Set<string>();
          const css = new Set<string>();
          const visit = (name: string) => {
            const chunk = bundle[name];
            if (!chunk || chunk.type !== 'chunk' || js.has(name) || alreadyPreloaded.has(name)) return;
            js.add(name);
            for (const sheet of chunk.viteMetadata?.importedCss ?? []) css.add(sheet);
            for (const imported of chunk.imports) visit(imported);
          };
          visit(fileName);
          if (js.size === 0 && css.size === 0) continue;

          table[toPathPattern(routeId)] = { js: [...js], css: [...css] };
        }

        if (Object.keys(table).length === 0) return html;

        // The runtime takes the first pattern that matches, so order the table
        // static-before-dynamic rather than relying on bundle iteration order.
        const ordered = Object.fromEntries(
          Object.entries(table).sort(([a], [b]) => {
            const dynamic = Number(a.includes('[^/]')) - Number(b.includes('[^/]'));
            return dynamic !== 0 ? dynamic : b.length - a.length;
          })
        );

        const base = ctx.server?.config.base ?? '/';
        const script =
          `(function(){var t=${JSON.stringify(ordered)},p=location.pathname,b=${JSON.stringify(base)},f=document.createDocumentFragment(),m;` +
          `for(var k in t){if(new RegExp(k).test(p)){m=t[k];break}}if(!m)return;` +
          `m.js.forEach(function(h){var l=document.createElement('link');l.rel='modulepreload';l.href=b+h;l.crossOrigin='';f.appendChild(l)});` +
          `m.css.forEach(function(h){var l=document.createElement('link');l.rel='stylesheet';l.href=b+h;f.appendChild(l)});` +
          `document.head.appendChild(f)})();`;

        return {
          html,
          tags: [{ tag: 'script', children: script, injectTo: 'head' as const }],
        };
      },
    },
  };
}

export default defineConfig({
  plugins: [
    // autoCodeSplitting pulls each route's `component` into its own chunk, so a
    // visitor only downloads the page they landed on. Route files must export
    // nothing but `Route` for this to work — shared UI lives in `src/components`.
    // Must run before the JSX transform, hence its position ahead of react().
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    preloadMatchedRoute(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          // Left to itself, rolldown emits a chunk per shared module — a single
          // page ended up pulling ~20 files, a dozen of them under 1 kB. On a
          // simulated mobile connection those round-trips cost more than the
          // bytes they save, so shared code is grouped into a handful of chunks
          // that every route reuses from cache.
          minSize: 30_000,
          minShareCount: 3,
          groups: [
            // Named explicitly rather than by a blanket /node_modules/ rule:
            // grouping everything would drag route-only libraries (zod,
            // react-hook-form, react-query) back onto the critical path.
            // react/react-dom are deliberately absent — they are reachable
            // statically from the entry, so they already live in it and a
            // separate chunk would only add a request.
            {
              name: 'vendor-router',
              test: /node_modules[/\\](\.pnpm[/\\][^/\\]+[/\\]node_modules[/\\])?@tanstack[/\\](react-)?(router-core|router|store|history)[/\\]/,
            },
            {
              name: 'vendor-motion',
              test: /node_modules[/\\](\.pnpm[/\\][^/\\]+[/\\]node_modules[/\\])?(framer-motion|motion-dom|motion-utils)[/\\]/,
            },
            // Everything three or more route chunks reach for: the design-system
            // primitives, the class-merging helpers they funnel through, the
            // lucide icon factory (individual icons stay with their route), and
            // the case-study data used by /, /work and /work/$slug.
            {
              name: 'app-shared',
              test: new RegExp(
                [
                  'src[/\\\\](components[/\\\\]ui|lib|hooks)[/\\\\]',
                  'src[/\\\\]data[/\\\\]caseStudies',
                  'node_modules[/\\\\](\\.pnpm[/\\\\][^/\\\\]+[/\\\\]node_modules[/\\\\])?(tailwind-merge|clsx)[/\\\\]',
                  'lucide-react[/\\\\]dist[/\\\\]esm[/\\\\][^/\\\\]+\\.js$',
                ].join('|')
              ),
            },
          ],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
