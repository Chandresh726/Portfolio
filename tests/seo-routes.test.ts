import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import sitemap from "app/sitemap";
import { dynamic, GET } from "app/rss.xml/route";
import projects from "content/projects.json";
import seoData from "content/seo.json";
import { absoluteUrl } from "utils/site-url";

interface ManifestIcon {
	src: string;
	sizes: string;
	purpose?: string;
}

describe("SEO routes and assets", () => {
	it("emits stable canonical sitemap entries", () => {
		expect(sitemap()).toEqual([
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
		]);
	});

	it("generates a static RSS feed with stable project identities", async () => {
		expect(dynamic).toBe("force-static");
		const response = GET();
		const xml = await response.text();

		expect(response.headers.get("content-type")).toContain("application/rss+xml");
		expect(xml).toContain(`<atom:link href="${absoluteUrl("/rss.xml")}"`);
		expect(xml).toContain("<language>en-US</language>");

		for (const project of projects) {
			expect(xml).toContain(
				`<guid isPermaLink="false">urn:portfolio:project:${project.slug}</guid>`
			);
			expect(xml).toContain(
				absoluteUrl(`/projects#project-${project.slug}`).replaceAll("&", "&amp;")
			);
			expect(xml).toContain(new Date(`${project.updatedAt}T00:00:00Z`).toUTCString());
		}
	});

	it("keeps manifest and social-image dimensions accurate", async () => {
		const manifest = JSON.parse(
			await readFile(path.join(process.cwd(), "public", "manifest.json"), "utf8")
		) as { icons: ManifestIcon[] };

		for (const icon of manifest.icons) {
			const metadata = await sharp(path.join(process.cwd(), "public", icon.src)).metadata();
			expect(`${metadata.width}x${metadata.height}`).toBe(icon.sizes);
		}

		const social = await sharp(path.join(process.cwd(), "public", seoData.socialImage)).metadata();
		expect([social.width, social.height]).toEqual([1200, 630]);
	});
});
