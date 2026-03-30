import { buildAppUrl } from "./base-path.js";

const ASSET_ATTRS = ["src", "href", "poster"];
const IMAGE_PREFIX_PATTERNS = [
  /^images\//i,
  /^\.\/images\//i,
  /^blog\/images\//i,
  /^\.\/blog\/images\//i
];

function toCanonicalAssetPath(rawValue) {
  if (!rawValue) {
    return null;
  }

  const trimmed = rawValue.trim();
  if (!trimmed || /^([a-z]+:)?\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return null;
  }

  const normalized = trimmed.replace(/^\.\//, "");
  const hasImagePrefix = IMAGE_PREFIX_PATTERNS.some((pattern) => pattern.test(normalized));
  if (!hasImagePrefix) {
    return null;
  }

  return normalized
    .replace(/^blog\//i, "")
    .replace(/^images\//i, "images/");
}

function normalizeElementAssetAttributes(root) {
  const selector = ASSET_ATTRS.map((attr) => `[${attr}]`).join(",");
  const elements = root.querySelectorAll(selector);

  elements.forEach((element) => {
    ASSET_ATTRS.forEach((attr) => {
      const currentValue = element.getAttribute(attr);
      const canonicalPath = toCanonicalAssetPath(currentValue);
      if (!canonicalPath) {
        return;
      }

      element.setAttribute(attr, buildAppUrl(canonicalPath));
    });
  });
}

function normalizeZeroMdHost(zeroMdElement) {
  normalizeElementAssetAttributes(zeroMdElement);

  if (zeroMdElement.shadowRoot) {
    normalizeElementAssetAttributes(zeroMdElement.shadowRoot);
  }
}

function installZeroMdObserver(zeroMdElement) {
  const normalize = () => normalizeZeroMdHost(zeroMdElement);

  normalize();

  zeroMdElement.addEventListener("zero-md-rendered", normalize);

  const observer = new MutationObserver(() => {
    normalize();
  });

  observer.observe(zeroMdElement, {
    childList: true,
    subtree: true,
    attributes: true
  });

  if (zeroMdElement.shadowRoot) {
    observer.observe(zeroMdElement.shadowRoot, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }
}

export function normalizeBlogMarkdownAssets() {
  const zeroMdElements = document.querySelectorAll("zero-md");
  zeroMdElements.forEach(installZeroMdObserver);
}
