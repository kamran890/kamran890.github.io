function trimToDirectory(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  if (pathname.endsWith("/")) {
    return pathname;
  }

  const index = pathname.lastIndexOf("/");
  if (index <= 0) {
    return "/";
  }

  return pathname.slice(0, index + 1);
}

export function getAppBasePath(pathname = window.location.pathname) {
  return trimToDirectory(pathname);
}

export function buildAppUrl(relativePath, basePath = getAppBasePath()) {
  const cleanedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const cleanedRelative = relativePath.replace(/^\/+/, "");
  return `${cleanedBase}${cleanedRelative}`;
}
