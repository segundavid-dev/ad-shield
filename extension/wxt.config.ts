import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "Ad-shield",
    description:
      "Light weight ad blocker that blocks intrusive ads, popups and malicious redirect for a smoother browsering experience",
    version: "1.0.0",
    permissions: ["tabs", "scripting", "declarativeNetRequest", "storage"],
    host_permissions: ["<all_urls>", "http://localhost/*"],
    action: {
      default_title: "Default Popup Title",
      default_popup: "popup.html",
    },
  },
});
