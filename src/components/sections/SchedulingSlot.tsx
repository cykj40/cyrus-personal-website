import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics/react';
import { Card, CardContent } from '@/components/ui/Card';

/**
 * The Cal.com inline booking embed.
 *
 * Kept in its own module rather than inside `Contact.tsx`: /services renders the
 * scheduling card but not the contact form, and importing it from `Contact.tsx`
 * dragged react-hook-form + zod (~78 kB minified) into the /services chunk along
 * with it.
 */
type CalFunction = {
  (...args: unknown[]): CalFunction | void;
  loaded?: boolean;
  ns?: Record<string, CalFunction>;
  q?: unknown[][];
  config?: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalFunction;
    portfolioCal?: CalFunction;
    portfolioCalScript?: Promise<void>;
  }
}

const CAL_EMBED_ID = 'my-cal-inline-project-call';
const CAL_NAMESPACE = 'project-call';
const CAL_SCRIPT_URL = 'https://app.cal.com/embed/embed.js';

const enqueueCalCall = (api: CalFunction, args: unknown[]) => {
  api.q = api.q || [];
  api.q.push(args);
};

const getCalApi = () => {
  if (window.portfolioCal) return window.portfolioCal;

  const cal: CalFunction = (...args: unknown[]) => {
    if (args[0] === 'init') {
      const namespace = args[1];
      const namespaceApi: CalFunction = (...namespaceArgs: unknown[]) => {
        enqueueCalCall(namespaceApi, namespaceArgs);
      };
      namespaceApi.q = namespaceApi.q || [];

      if (typeof namespace === 'string') {
        cal.ns = cal.ns || {};
        cal.ns[namespace] = cal.ns[namespace] || namespaceApi;
        enqueueCalCall(cal.ns[namespace], args);
        enqueueCalCall(cal, ['initNamespace', namespace]);
      } else {
        enqueueCalCall(cal, args);
      }

      return namespaceApi;
    }

    enqueueCalCall(cal, args);
  };

  cal.ns = {};
  cal.q = [];
  window.Cal = cal;
  window.portfolioCal = cal;
  return cal;
};

const loadCalScript = (cal: CalFunction) => {
  if (window.portfolioCalScript) return window.portfolioCalScript;

  window.portfolioCalScript = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = CAL_SCRIPT_URL;
    script.async = true;
    script.dataset.portfolioCal = 'true';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener(
      'error',
      () => {
        script.remove();
        cal.loaded = false;
        delete window.portfolioCalScript;
        reject(new Error('Unable to load the Cal.com scheduling embed.'));
      },
      { once: true }
    );

    cal.loaded = true;
    document.head.appendChild(script);
  });

  return window.portfolioCalScript;
};

export const SchedulingSlot = () => {
  const embedRef = useRef<HTMLDivElement>(null);
  const hasTrackedBookingStart = useRef(false);

  useEffect(() => {
    const embedElement = embedRef.current;
    if (!embedElement) return;

    const cal = getCalApi();
    if (!cal.ns?.[CAL_NAMESPACE]) {
      cal('init', CAL_NAMESPACE, { origin: 'https://app.cal.com' });
    }

    cal.config = cal.config || {};
    cal.config.forwardQueryParams = true;

    let isActive = true;
    let focusCheckFrame: number | undefined;
    const handleWindowBlur = () => {
      focusCheckFrame = window.requestAnimationFrame(() => {
        const activeElement = document.activeElement;
        if (
          !hasTrackedBookingStart.current
          && activeElement instanceof HTMLIFrameElement
          && embedElement.contains(activeElement)
        ) {
          hasTrackedBookingStart.current = true;
          track('cal_booking_started', { source: window.location.pathname });
        }
      });
    };

    window.addEventListener('blur', handleWindowBlur);
    void loadCalScript(cal).then(() => {
      if (!isActive) return;

      cal.ns?.[CAL_NAMESPACE]?.('inline', {
        elementOrSelector: `#${CAL_EMBED_ID}`,
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: 'cyrus-khiabani-cy-hepdhf/project-call',
      });
      cal.ns?.[CAL_NAMESPACE]?.('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    });

    return () => {
      isActive = false;
      window.removeEventListener('blur', handleWindowBlur);
      if (focusCheckFrame !== undefined) window.cancelAnimationFrame(focusCheckFrame);
      embedElement.replaceChildren();
    };
  }, []);

  return (
    <Card className="bg-white/70 shadow-none">
      <CardContent className="py-5">
        <p className="font-medium text-pine-900">Prefer to talk it through?</p>
        <p className="mt-1 text-sm text-granite-700">
          You can also book a 30-minute call.
        </p>
        <div
          ref={embedRef}
          id={CAL_EMBED_ID}
          className="mt-4 min-h-[600px] w-full"
        />
      </CardContent>
    </Card>
  );
};
