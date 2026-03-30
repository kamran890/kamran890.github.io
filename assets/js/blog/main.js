import { normalizeBlogMarkdownAssets } from "./markdown-assets.js";

function initBlogModules() {
  normalizeBlogMarkdownAssets();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBlogModules, { once: true });
} else {
  initBlogModules();
}
