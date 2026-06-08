import { isMaliciousUrl } from "@/lib/ad-shield-utils";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_idle",
  async main() {
    const { blockerEnabled } = await browser.storage.local.get("blockerEnabled");

    // Always dispatch current state to MAIN world (interceptor.content.ts)
    document.dispatchEvent(
      new CustomEvent("adshield:state", { detail: { enabled: blockerEnabled ?? false } })
    );

    // Forward state changes to MAIN world
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.blockerEnabled) {
        document.dispatchEvent(
          new CustomEvent("adshield:state", { detail: { enabled: changes.blockerEnabled.newValue } })
        );
      }
    });

    if (!blockerEnabled) {
      console.log("Ad-shield is off");
      return;
    }
    console.log("Ad-shield is on");

    const LEGITIMATE_POPUPS_INDICATORS: string[] = [
      "login",
      "signin",
      "register",
      "signup",
      "modal",
      "dialog",
      "overlay",
      "lightbox",
      "cookie",
      "consent",
      "privacy",
      "terms",
    ];

    const AD_SELECTORS: string[] = [
      // Google Ads
      "ins.adsbygoogle",
      'iframe[src*="googlesyndication"]',
      'iframe[src*="googleadservices"]',
      'iframe[src*="doubleclick"]',

      // Generic ad patterns
      'iframe[src*="ads"]',
      "[data-ad]",
      "[data-ads]",
      "[data-ad-slot]",

      // Class based selectors
      'div[class*="ad-"]',
      'div[class*="ads-"]',
      'div[class*="advertisement"]',
      'div[class*="banner"]',
      'div[class*="popup"]',
      'div[class*="overlay"]',
      ".ad-banner",
      ".ad-container",
      ".advertisement",
      ".sponsored",

      // ID based selectors
      'div[id*="ad-"]',
      'div[id*="ads-"]',
      'div[id*="popup"]',
      "#advertisement",
      "#banner",

      // Common ad networks
      'iframe[src*="propellerads"]',
      'iframe[src*="exoclick"]',
      'iframe[src*="juicyads"]',
      'iframe[src*="trafficjunky"]',
      'iframe[src*="popads"]',
    ];

    const isLegitimatePopup = (element: HTMLElement): boolean => {
      const content = element.textContent?.toLowerCase() || "";
      const className = element.className?.toLowerCase() || "";
      const id = element.id?.toLowerCase() || "";

      return LEGITIMATE_POPUPS_INDICATORS.some(
        (indicator) =>
          content.includes(indicator) ||
          className.includes(indicator) ||
          id.includes(indicator)
      );
    };


    // remove popups banners
    const removeCustomPopups = (root: ParentNode = document) => {
      const popups = root.querySelectorAll("div, iframe");

      popups.forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        const style = window.getComputedStyle(el);

        if (
          (style.position === "fixed" || style.position === "absolute") &&
          parseInt(style.zIndex) > 1000 &&
          el.clientHeight > window.innerHeight * 0.5
        ) {
          console.log("Removing custom popup:", el);
          el.remove();
        }
      });
    };

    const adBlock = (root: ParentNode = document) => {
      let blockedCount = 0;

      AD_SELECTORS.forEach((selector) => {
        try {
          const ads = root.querySelectorAll(selector);
          if (ads.length > 0) {
            console.log(`Found ${ads.length} ads for selector: ${selector}`);
          }

          ads.forEach((ad) => {
            const element = ad as HTMLElement;

            if (isLegitimatePopup(element)) {
              return;
            }

            element.remove();
            blockedCount++;
          });
        } catch (error) {
          // Silent fail for invalid selectors or removed nodes
        }
      });

      removeCustomPopups(root);
    };

    // remove suspicious iframes
    const removeSuspiciousIframesAndScripts = () => {
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        const src = iframe.src.toLowerCase();
        if (isMaliciousUrl(src)) {
          iframe.remove();
        }
      });

      const scripts = document.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        const src = (script as HTMLScriptElement).src.toLowerCase();
        if (isMaliciousUrl(src)) {
          script.remove();
        }
      });
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Check the node itself
              adBlock(node);
              // Check if the node's parent should be scanned if it's small
              if (node.parentElement) {
                adBlock(node.parentElement);
              }
            }
          });
        }
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });



    // Remove click hijacking
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a") as HTMLAnchorElement;

      if (link && link.href) {
        if (isMaliciousUrl(link.href)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });

    // Minimal background scanning for elements that might have changed state without a mutation
    setInterval(() => adBlock(document), 30000);
    setInterval(removeSuspiciousIframesAndScripts, 15000);

    // cleanup function for observer
    window.addEventListener("beforeunload", () => {
      observer.disconnect();
    });
  },
});
