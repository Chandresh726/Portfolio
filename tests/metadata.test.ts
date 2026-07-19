import { describe, expect, it } from "vitest";
import { metadata as homeMetadata } from "app/page";
import { metadata as projectsMetadata } from "app/projects/layout";
import { AppMetadata } from "components/AppMetadata";
import personalData from "content/personal.json";
import seoData from "content/seo.json";
import { absoluteUrl } from "utils/site-url";

function firstOpenGraphImage(metadata: typeof homeMetadata) {
	const images = metadata.openGraph?.images;
	return Array.isArray(images) && typeof images[0] === "object" ? images[0] : undefined;
}

describe("metadata", () => {
	it("publishes complete route-specific home metadata", () => {
		expect(homeMetadata.description).toBe(seoData.description);
		expect(homeMetadata.alternates?.canonical).toBe(absoluteUrl("/"));
		expect(homeMetadata.openGraph?.url).toBe(absoluteUrl("/"));
		expect(homeMetadata.openGraph?.locale).toBe("en_US");
		expect(homeMetadata.twitter && "creator" in homeMetadata.twitter).toBe(true);

		const image = firstOpenGraphImage(homeMetadata);
		expect(image).toMatchObject({
			url: absoluteUrl(seoData.socialImage),
			width: 1200,
			height: 630,
			type: "image/webp",
			alt: seoData.socialImageAlt
		});
	});

	it("uses complete projects-specific social metadata", () => {
		expect(projectsMetadata.description).toBe(seoData.projectsDescription);
		expect(projectsMetadata.alternates?.canonical).toBe(absoluteUrl("/projects"));
		expect(projectsMetadata.openGraph?.url).toBe(absoluteUrl("/projects"));
		expect(projectsMetadata.twitter && "title" in projectsMetadata.twitter).toBe(true);
		expect(
			projectsMetadata.twitter && "title" in projectsMetadata.twitter
				? projectsMetadata.twitter.title
				: undefined
		).toBe("Software Projects | Chandresh Kumar");
		expect(firstOpenGraphImage(projectsMetadata)).toMatchObject({ width: 1200, height: 630 });
	});

	it("declares canonical icons and RSS discovery", () => {
		expect(AppMetadata.alternates?.types?.["application/rss+xml"]).toBe("/rss.xml");
		expect(AppMetadata.icons).toMatchObject({
			icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
			apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
		});
		expect(personalData.xHandle).toBe("@Chandresh_726");
	});
});
