import { siteMetadata } from "../../../site_data/group/_metadata.js";

const SCHEME_RE = /^[a-z][a-z\d+\-.]*:/i;

function configuredBasePath() {
    const trimmed = (process.env.NEXT_PUBLIC_GROUP_BASE_PATH ?? "").trim();
    if (!trimmed || trimmed === "/") return "";
    const prefix = trimmed.replace(/^\/+|\/+$/g, "");
    return prefix ? `/${prefix}` : "";
}

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
    const basePath = configuredBasePath();
    if (!basePath || isUntouchedPath(path)) return path;
    if (path === basePath) return "/";
    if (path.startsWith(`${basePath}/`)) {
        const stripped = path.slice(basePath.length);
        return stripped || "/";
    }
    return path;
}

export function withBasePath(path: string) {
    if (isUntouchedPath(path)) return path;
    return normalizePath(path);
}

export function siteUrl(path = "/") {
    if (isUntouchedPath(path) && SCHEME_RE.test(path)) return path;
    const logicalPath = normalizePath(withoutBasePath(path));
    const suffix = logicalPath === "/" ? "" : logicalPath;
    return `${siteMetadata.publicURL}${suffix}`;
}
