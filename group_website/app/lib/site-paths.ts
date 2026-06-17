import { siteMetadata } from "../../../site_data/group/_metadata.js";

const SCHEME_RE = /^[a-z][a-z\d+\-.]*:/i;

function isUntouchedPath(path: string) {
    return (
        !path ||
        path.startsWith("#") ||
        path.startsWith("//") ||
        SCHEME_RE.test(path)
    );
}

function normalizePath(path: string) {
    return path.startsWith("/") ? path : `/${path}`;
}

export function withoutBasePath(path: string) {
    const basePath = siteMetadata.basePath;
    if (!basePath || isUntouchedPath(path)) return path;
    if (path === basePath) return "/";
    if (path.startsWith(`${basePath}/`)) {
        const stripped = path.slice(basePath.length);
        return stripped || "/";
    }
    return path;
}

export function withBasePath(path: string) {
    const basePath = siteMetadata.basePath;
    if (!basePath || isUntouchedPath(path)) return path;
    const normalized = normalizePath(path);
    if (normalized === basePath || normalized.startsWith(`${basePath}/`)) return normalized;
    return `${basePath}${normalized}`;
}

export function siteUrl(path = "/") {
    if (isUntouchedPath(path) && SCHEME_RE.test(path)) return path;
    const logicalPath = normalizePath(withoutBasePath(path));
    const suffix = logicalPath === "/" ? "" : logicalPath;
    return `${siteMetadata.publicURL}${suffix}`;
}
