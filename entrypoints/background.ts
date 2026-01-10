import { browser } from "wxt/browser";

export default defineBackground(() => {
  console.log("Background running!");

  let blockerEnabled: boolean;

  // Ad domains for blocking
  const adDomains = [
    "doubleclick.net",
    "googlesyndication.com",
    "googleadservices.com",
    "propellerads.com",
    "exoclick.com",
    "juicyads.com",
    "trafficjunky.net",
    "popads.net",
    "ad-maven.com",
    "yllix.com",
    "revenuehits.com",
    "bitmedia.io",
    "coinzilla.com",
  ];

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

  // Setup declarative blocking rules
  const setupBlockingRules = async () => {
    try {
      // Clear existing rules first
      const existingRules =
        await browser.declarativeNetRequest.getDynamicRules();
      const ruleIds = existingRules.map((rule) => rule.id);

      if (ruleIds.length > 0) {
        await browser.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: ruleIds,
        });
      }

      // Add new rules if blocker is enabled
      if (blockerEnabled) {
        const rules = adDomains.map((domain, index) => ({
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

        await browser.declarativeNetRequest.updateDynamicRules({
          addRules: rules,
        });

        console.log(`Added ${rules.length} blocking rules`);
      } else {
        console.log("Blocker disabled - no rules added");
      }
    } catch (error) {
      console.error("Error setting up blocking rules:", error);
    }
  };

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
