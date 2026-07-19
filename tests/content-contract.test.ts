import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { PROJECTS, SOCIAL_MEDIA } from "@/constants";
import { getAvailableProjectFilters } from "app/projects/components/Filter";
import personalData from "content/personal.json";

const CANONICAL_STACK = new Set([
	"AI SDK",
	"AWS",
	"Express",
	"Flask",
	"Javascript",
	"MongoDB",
	"Next",
	"Node.js",
	"Postgres",
	"Puppeteer",
	"React",
	"Rust",
	"Shadcn",
	"Solana",
	"SQLite",
	"Tailwind CSS",
	"Typescript"
]);

describe("portfolio content contract", () => {
	it("has stable project identities, meaningful content and valid URLs", () => {
		const titles = PROJECTS.map((project) => project.title);
		const slugs = PROJECTS.map((project) => project.slug);
		expect(new Set(titles).size).toBe(titles.length);
		expect(new Set(slugs).size).toBe(slugs.length);

		for (const project of PROJECTS) {
			expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
			expect(project.description.length).toBeGreaterThan(80);
			expect(new Date(`${project.updatedAt}T00:00:00Z`).toISOString().slice(0, 10)).toBe(
				project.updatedAt
			);
			for (const url of [project.liveUrl, project.repoUrl].filter(Boolean)) {
				expect(() => new URL(url as string)).not.toThrow();
			}
		}
	});

	it("references optimized local images with contextual alternatives", () => {
		for (const project of PROJECTS) {
			for (const image of project.images) {
				expect(image.src).toMatch(/\.webp$/);
				expect(image.alt.length).toBeGreaterThan(20);
				expect(image.alt).not.toMatch(/(?:project image|image \d+)$/i);
				expect(existsSync(path.join(process.cwd(), "public", image.src))).toBe(true);
			}
			for (const technology of project.stack) expect(CANONICAL_STACK.has(technology)).toBe(true);
		}
	});

	it("only displays filters that match at least one project", () => {
		for (const filter of getAvailableProjectFilters(PROJECTS)) {
			expect(PROJECTS.some((project) => project.stack.includes(filter.label))).toBe(true);
		}
	});

	it("derives every social destination from personal content", () => {
		expect(SOCIAL_MEDIA.map((item) => item.href)).toEqual([
			personalData.linkedinUrl,
			personalData.githubUrl,
			`mailto:${personalData.email}`,
			personalData.xUrl
		]);
		expect(SOCIAL_MEDIA.find((item) => item.id === "mail")?.external).toBe(false);
	});
});
