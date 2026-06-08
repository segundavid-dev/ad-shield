import { browser } from "wxt/browser";

export default defineBackground(() => {
  console.log("Background running!");

  let blockerEnabled: boolean;
  const adDomains = [
    "doubleclick.net", "googlesyndication.com", "googleadservices.com",
    "propellerads.com", "exoclick.com", "juicyads.com", "trafficjunky.net",
    "popads.net", "ad-maven.com", "yllix.com", "revenuehits.com",
    "bitmedia.io", "coinzilla.com", "outbrain.com", "taboola.com"
  ];
  // Setup declarative blocking rules
  const setupBlockingRules = async () => {
    try {
      // Fetch existing dynamic rules to clear them
      const existingRules = await browser.declarativeNetRequest.getDynamicRules();
      const removeRuleIds = existingRules.map((rule) => rule.id);

      // Prepare new rules if enabled
      let addRules: any[] = [];
      if (blockerEnabled) {
        addRules = adDomains.map((domain, index) => ({
          id: index + 1,
          priority: 1,
          action: { type: "block" as const },
          condition: {
            urlFilter: `*://*.${domain}/*`,
            resourceTypes: [
              "main_frame",
              "sub_frame",
              "script",
              "image",
              "xmlhttprequest",
            ] as any,
          },
        }));
      }

      // Perform atomic update: remove old, add new
      await browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds,
        addRules,
      });

      if (blockerEnabled) {
        console.log(`Successfully updated ${addRules.length} blocking rules`);
      } else {
        console.log("Blocker disabled - cleared all rules");
      }
    } catch (error) {
      console.error("Error setting up blocking rules:", error);
    }
  };

  // Load initial state
  browser.storage.local.get("blockerEnabled").then((res) => {
    blockerEnabled = res.blockerEnabled ?? false;
    setupBlockingRules();
  });

  // Listen for storage changes
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.blockerEnabled) {
      blockerEnabled = changes.blockerEnabled.newValue;
      setupBlockingRules();
    }
  });

  // Handle messages from popup
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_BLOCKER_STATE") {
      sendResponse({ enabled: blockerEnabled });
    }

    if (message.type === "SET_BLOCKER_STATE") {
      browser.storage.local.set({ blockerEnabled: message.enabled });
      sendResponse({ success: true });
    }
  });
});
