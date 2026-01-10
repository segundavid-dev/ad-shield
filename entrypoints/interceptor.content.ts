import { isMaliciousUrl } from "@/lib/ad-shield-utils";

export default defineContentScript({
  matches: ["<all_urls>"],
  world: "MAIN",
  runAt: "document_start",
  main() {
    const originAssign = window.location.assign;
    const originReplace = window.location.replace;

    let currentMaliciousDomains: string[] = [];

    window.addEventListener("AdShield:UpdateFilters", (e: any) => {
      if (e.detail && e.detail.maliciousDomains) {
        currentMaliciousDomains = e.detail.maliciousDomains;
        console.log("[AdShield] Interceptor updated malicious domains:", currentMaliciousDomains.length);
      }
    });

    console.log("AdShield Interceptor active");

    // Click tracking in MAIN world to allow legitimate redirects
    let lastUserClick = 0;
    document.addEventListener("click", () => {
      lastUserClick = Date.now();
    }, true);

    const userJustClicked = () => Date.now() - lastUserClick < 2000;

    window.location.assign = function (url: string) {
      if (isMaliciousUrl(url, currentMaliciousDomains)) {
        console.log("[AdShield] Blocked malicious JS redirect (assign) to:", url);
        return;
      }

      if (!userJustClicked()) {
        console.log("[AdShield] Blocked suspicious JS redirect (assign) to:", url);
        return;
      }
      
      return originAssign.call(window.location, url);
    };

    window.location.replace = function (url: string) {
      if (isMaliciousUrl(url, currentMaliciousDomains)) {
        console.log("[AdShield] Blocked malicious JS redirect (replace) to:", url);
        return;
      }

      if (!userJustClicked()) {
        console.log("[AdShield] Blocked suspicious JS redirect (replace) to:", url);
        return;
      }

      return originReplace.call(window.location, url);
    };
    
    // Also intercept window.open
    const originalOpen = window.open;
    window.open = function(url?: string | URL, target?: string, features?: string) {
      const urlString = url?.toString() || "";
      if (urlString && isMaliciousUrl(urlString, currentMaliciousDomains)) {
        console.log("[AdShield] Blocked malicious window.open to:", urlString);
        return null;
      }
      
      if (urlString && !userJustClicked()) {
        console.log("[AdShield] Blocked suspicious window.open to:", urlString);
        return null;
      }
      
      return originalOpen.call(window, url, target, features);
    };
  },
});
