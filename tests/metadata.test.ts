import { describe, expect, it } from "vitest";
import { metadata as projectsMetadata } from "app/projects/layout";
import { AppMetadata } from "components/AppMetadata";
import personalData from "content/personal.json";
import seoData from "content/seo.json";

describe("metadata", () => {
	it("uses a projects-specific canonical and Open Graph URL", () => {
		expect(projectsMetadata.description).toBe(seoData.description);
		expect(projectsMetadata.alternates?.canonical).toBe("/projects");
		expect(projectsMetadata.openGraph?.url).toBe("/projects");
	});

	it("uses the canonical X handle", () => {
		expect(
			AppMetadata.twitter && "creator" in AppMetadata.twitter
				? AppMetadata.twitter.creator
				: undefined
		).toBe(personalData.xHandle);
	});
});
