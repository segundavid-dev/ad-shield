import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "Ad-Shield",
    description:
      "Lightweight ad blocker that blocks intrusive ads, popups, and malicious redirects for a smoother browsing experience.",
    version: "1.0.0",
    permissions: ["scripting", "declarativeNetRequest", "storage"],
    host_permissions: ["<all_urls>"],
    action: {
      default_title: "Ad-Shield",
      default_popup: "popup.html",
    },
  },
});
