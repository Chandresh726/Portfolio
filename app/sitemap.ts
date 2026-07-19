import type { MetadataRoute } from "next";
import seoData from "content/seo.json";
import { absoluteUrl } from "utils/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: absoluteUrl("/"),
			lastModified: seoData.homepageUpdatedAt,
			changeFrequency: "monthly",
			priority: 1
		},
		{
			url: absoluteUrl("/projects"),
			lastModified: seoData.projectsUpdatedAt,
			changeFrequency: "monthly",
			priority: 0.8
		}
	];
}
