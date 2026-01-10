import { isMaliciousUrl } from "@/lib/ad-shield-utils";

export default defineContentScript({
  matches: ["<all_urls>"],
  world: "MAIN",
  runAt: "document_start",
  main() {
    console.log("[AdShield] Interceptor active");

    // Click tracking
    let lastUserClick = 0;
    document.addEventListener("click", () => {
      lastUserClick = Date.now();
    }, true);

    const userJustClicked = () => Date.now() - lastUserClick < 2000;

    // Robust interception helper
    const intercept = (obj: any, prop: string, wrapper: Function) => {
      try {
        const original = obj[prop];
        if (typeof original !== 'function') return;

        // Using defineProperty because direct assignment is often blocked on Location
        Object.defineProperty(obj, prop, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function(...args: any[]) {
            return wrapper.call(this, original, ...args);
          }
        });
      } catch (e) {
        // Fallback for non-configurable properties
        console.warn(`[AdShield] Could not intercept ${prop}:`, e);
      }
    };

    intercept(window.location, 'assign', (original: Function, url: string) => {
      if (isMaliciousUrl(url)) {
        console.log("[AdShield] Blocked malicious redirect (assign):", url);
        return;
      }
      if (!userJustClicked()) {
        console.log("[AdShield] Blocked suspicious redirect (assign):", url);
        return;
      }
      return original.call(window.location, url);
    });

    intercept(window.location, 'replace', (original: Function, url: string) => {
      if (isMaliciousUrl(url)) {
        console.log("[AdShield] Blocked malicious redirect (replace):", url);
        return;
      }
      if (!userJustClicked()) {
        console.log("[AdShield] Blocked suspicious redirect (replace):", url);
        return;
      }
      return original.call(window.location, url);
    });

    intercept(window, 'open', (original: Function, url?: string | URL, target?: string, features?: string) => {
      const urlString = url?.toString() || "";
      if (urlString && isMaliciousUrl(urlString)) {
        console.log("[AdShield] Blocked malicious window.open:", urlString);
        return null;
      }
      if (urlString && !userJustClicked()) {
        console.log("[AdShield] Blocked suspicious window.open:", urlString);
        return null;
      }
      return original.call(window, url, target, features);
    });
  },
});
