import { browser } from "wxt/browser";
import { DEFAULT_MALICIOUS_DOMAINS } from "@/lib/ad-shield-utils";

const FILTER_LIST_URL = "https://raw.githubusercontent.com/davidsegun/adshield-filters/main/filters.json";

export default defineBackground(() => {
  console.log("Background running!");

  let blockerEnabled: boolean;
  let adDomains = [
    "doubleclick.net", "googlesyndication.com", "googleadservices.com",
    "propellerads.com", "exoclick.com", "juicyads.com", "trafficjunky.net",
    "popads.net", "ad-maven.com", "yllix.com", "revenuehits.com",
    "bitmedia.io", "coinzilla.com", "outbrain.com", "taboola.com"
  ];
  let adSelectors: string[] = [];
  let maliciousDomains = DEFAULT_MALICIOUS_DOMAINS;

  // Load initial state and cached filters
  browser.storage.local.get(["blockerEnabled", "adDomains", "adSelectors", "maliciousDomains"]).then((res) => {
    blockerEnabled = res.blockerEnabled ?? false;
    if (res.adDomains) adDomains = res.adDomains;
    if (res.adSelectors) adSelectors = res.adSelectors;
    if (res.maliciousDomains) maliciousDomains = res.maliciousDomains;
    
    setupBlockingRules();
    updateFilterLists(); // Fetch updates on startup
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

  // Fetch updated filter lists
  const updateFilterLists = async () => {
    try {
      const response = await fetch(FILTER_LIST_URL);
      if (!response.ok) throw new Error("Failed to fetch filters");
      
      const data = await response.json();
      
      if (data.adDomains) adDomains = data.adDomains;
      if (data.adSelectors) adSelectors = data.adSelectors;
      if (data.maliciousDomains) maliciousDomains = data.maliciousDomains;

      await browser.storage.local.set({
        adDomains,
        adSelectors,
        maliciousDomains,
        lastUpdate: Date.now()
      });

      console.log("Filter lists updated successfully");
      setupBlockingRules(); // Refresh DNR rules with new domains
    } catch (error) {
      console.log("Skipping filter update (using cached or default):", error);
    }
  };

  // Set up periodic updates (every 24 hours)
  setInterval(updateFilterLists, 24 * 60 * 60 * 1000);

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
