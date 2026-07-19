import seoData from "content/seo.json";

export const SITE_URL = seoData.siteUrl.replace(/\/$/, "");

export function absoluteUrl(pathname = "/") {
	return new URL(pathname, `${SITE_URL}/`).toString();
}
