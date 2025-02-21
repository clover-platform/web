import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useLayoutEffect} from "react";

export type UseNavigationEventsProps = {
  start?: () => void;
  done?: () => void;
}

export const useNavigationEvents = (props: UseNavigationEventsProps) => {
  const {start, done} = props;
  const pathname = usePathname();
  const query = useSearchParams();

  // Convert the url to Absolute URL based on the current window location.
  const toAbsoluteURL = (url: string): string => {
    return new URL(url, window.location.href).href;
  };

  // Check if it is hash anchor or same page anchor
  const isHashAnchor = (currentUrl: string, newUrl: string): boolean => {
    const current = new URL(toAbsoluteURL(currentUrl));
    const next = new URL(toAbsoluteURL(newUrl));
    return current.href.split('#')[0] === next.href.split('#')[0];
  };

  function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string) {
    const currentUrlObj = new URL(currentUrl);
    const newUrlObj = new URL(newUrl);
    // Compare hostname, pathname, and search parameters
    if (
      currentUrlObj.hostname === newUrlObj.hostname &&
      currentUrlObj.pathname === newUrlObj.pathname &&
      currentUrlObj.search === newUrlObj.search
    ) {
      // Check if the new URL is just an anchor of the current URL page
      const currentHash = currentUrlObj.hash;
      const newHash = newUrlObj.hash;
      return (
        currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, '')
      );
    }
    return false;
  }

  function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
    while (element && element.tagName.toLowerCase() !== 'a') {
      element = element.parentElement;
    }
    return element as HTMLAnchorElement;
  }

  function handleClick(event: MouseEvent) {
    try {
      const target = event.target as HTMLElement;
      const anchor = findClosestAnchor(target);
      const newUrl = anchor?.href;
      if (newUrl) {
        const currentUrl = window.location.href;
        // const newUrl = (anchor as HTMLAnchorElement).href;
        const isExternalLink = (anchor as HTMLAnchorElement).target === '_blank';

        // Check for Special Schemes
        const isSpecialScheme = ['tel:', 'mailto:', 'sms:', 'blob:', 'download:'].some((scheme) =>
          newUrl.startsWith(scheme)
        );
        const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);
        if (
          newUrl === currentUrl ||
          isAnchor ||
          isExternalLink ||
          isSpecialScheme ||
          event.ctrlKey ||
          event.metaKey ||
          isHashAnchor(window.location.href, anchor.href)
        ) {
          start?.();
          done?.();
        } else {
          start?.();
          (function (history) {
            const pushState = history.pushState;
            history.pushState = function () {
              done?.();
              // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-explicit-any
              return pushState.apply(history, arguments as any);
            };
          })(window.history);
        }
      }
    } catch (err) {
      // Log the error in development only!
      // console.log('NextTopLoader error: ', err);
      start?.();
      done?.();
    }
  }

  useEffect(() => {
    // Add the global click event listener
    document.addEventListener('click', handleClick);

    // Clean up the global click event listener when the component is unmounted
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}
