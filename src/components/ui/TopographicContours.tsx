import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TOPO_BANDS, TOPO_OFFSET, TOPO_VIEWBOX } from './topography-data';
import './TopographicContours.css';

/**
 * The site's signature element: an animated topographic contour field.
 *
 * The geometry is a marching-squares trace of an analytic height field (see
 * scripts/generate-topography.mjs), not decorative wavy lines, so it behaves
 * like a real map — closed rings around summits, tight spacing on steep
 * ground, wide spacing on flats, saddles between peaks.
 *
 * Contour lines cannot morph on the GPU, so nothing tries to. Instead the
 * traced levels are grouped into four elevation bands, each its own
 * compositor layer, and the layers move against one another:
 *
 *  - ambient drift — every band translates on its own slow loop (54–92s) at a
 *    different amplitude and phase, reading as very slow flight over terrain
 *  - scroll parallax — higher bands shift further as the section scrolls past
 *  - entrance — bands fade up in sequence, low ground first
 *
 * Only `transform` and `opacity` animate, the geometry is precomputed, and
 * there are no dependencies beyond React.
 *
 * Absolutely positioned: mount it inside a `position: relative` container.
 */

/** Per-band presentation and motion. Index 0 is low ground, 3 is summits. */
const LAYERS = [
  { stroke: '#2C5F7C', drift: { x: 6, y: 3 }, duration: 92, delay: -11, depth: 8 },
  { stroke: '#3C7899', drift: { x: 11, y: 5 }, duration: 76, delay: -29, depth: 18 },
  { stroke: '#5FA8A0', drift: { x: 18, y: 8 }, duration: 64, delay: -47, depth: 34 },
  { stroke: '#89C6BF', drift: { x: 26, y: 12 }, duration: 54, delay: -7, depth: 56 },
] as const;

export interface TopographicContoursProps {
  className?: string;
  /**
   * Multiplier on every stroke's opacity. 1 is tuned for a `pine-900`
   * surface; lower it on lighter backgrounds.
   */
  intensity?: number;
  /**
   * Shift bands vertically as the container scrolls through the viewport.
   * Ignored when the visitor prefers reduced motion.
   */
  parallax?: boolean;
}

export const TopographicContours = ({
  className,
  intensity = 1,
  parallax = true,
}: TopographicContoursProps) => {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Park the drift loop whenever the field is scrolled out of view, so an
  // animation nobody can see stops holding compositor layers awake.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.idle = entry.isIntersecting ? 'false' : 'true';
      },
      { rootMargin: '128px' }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !parallax || prefersReducedMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      // 0 while the container's top is at or below the viewport top, rising to
      // 1 once it has scrolled a full container height past it.
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      root.style.setProperty('--topo-y', progress.toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [parallax, prefersReducedMotion]);

  return (
    <div ref={rootRef} className={cn('topo-root', className)} aria-hidden="true">
      {TOPO_BANDS.map((levels, band) => {
        const layer = LAYERS[band];
        return (
          <div
            key={band}
            className="topo-scroll"
            style={{ '--topo-depth': `${layer.depth}px` } as React.CSSProperties}
          >
            <div className="topo-fade" style={{ animationDelay: `${band * 130}ms` }}>
              <div
                className="topo-drift"
                style={
                  {
                    '--topo-dx': `${layer.drift.x}px`,
                    '--topo-dy': `${layer.drift.y}px`,
                    animationDuration: `${layer.duration}s`,
                    animationDelay: `${layer.delay}s`,
                  } as React.CSSProperties
                }
              >
                <svg
                  className="topo-svg"
                  viewBox={`0 0 ${TOPO_VIEWBOX.width} ${TOPO_VIEWBOX.height}`}
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <g
                    transform={`translate(${TOPO_OFFSET.x} ${TOPO_OFFSET.y})`}
                    fill="none"
                    stroke={layer.stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  >
                    {levels.map((level) => (
                      <g
                        key={level.t}
                        // Higher ground reads brighter and slightly heavier,
                        // the way index contours are weighted on a printed map.
                        strokeOpacity={(0.1 + 0.58 * Math.pow(level.t, 1.35)) * intensity}
                        strokeWidth={1 + 1.5 * level.t}
                      >
                        {level.paths.map((d, i) => (
                          <path key={i} d={d} />
                        ))}
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
