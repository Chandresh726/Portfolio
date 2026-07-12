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
	it("has unique project titles and valid URLs", () => {
		const titles = PROJECTS.map((project) => project.title);
		expect(new Set(titles).size).toBe(titles.length);
		for (const project of PROJECTS) {
			for (const url of [project.liveUrl, project.repoUrl].filter(Boolean)) {
				expect(() => new URL(url as string)).not.toThrow();
			}
		}
	});

	it("references existing local images and canonical stack spelling", () => {
		for (const project of PROJECTS) {
			for (const image of project.images) {
				expect(existsSync(path.join(process.cwd(), "public", image))).toBe(true);
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
