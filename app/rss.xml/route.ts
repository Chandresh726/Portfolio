import { NextResponse } from "next/server";
import projectsData from "content/projects.json";
import seoData from "content/seo.json";
import { absoluteUrl, SITE_URL } from "utils/site-url";

export const dynamic = "force-static";

function escapeXml(value: string) {
	return value.replace(/[<>&'"]/g, (character) => {
		switch (character) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			case '"':
				return "&quot;";
			default:
				return character;
		}
	});
}

function rssDate(date: string) {
	return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function GET() {
	const feedUrl = absoluteUrl("/rss.xml");
	const newestProjectDate = projectsData.reduce(
		(latest, project) => (project.updatedAt > latest ? project.updatedAt : latest),
		seoData.projectsUpdatedAt
	);

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chandresh Kumar - Portfolio Projects</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(seoData.projectsDescription)}</description>
    <language>en-US</language>
    <generator>Next.js</generator>
    <lastBuildDate>${rssDate(newestProjectDate)}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    ${projectsData
			.map((project) => {
				const projectUrl = absoluteUrl(`/projects#project-${project.slug}`);
				return `<item>
      <title>${escapeXml(project.title)}</title>
      <description>${escapeXml(project.description)}</description>
      <link>${escapeXml(projectUrl)}</link>
      <guid isPermaLink="false">urn:portfolio:project:${escapeXml(project.slug)}</guid>
      <pubDate>${rssDate(project.updatedAt)}</pubDate>
    </item>`;
			})
			.join("\n    ")}
  </channel>
</rss>`;

	return new NextResponse(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
		}
	});
}
