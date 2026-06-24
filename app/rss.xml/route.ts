import { NextResponse } from "next/server";
import projectsData from "@/content/projects.json";

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

export async function GET() {
	const baseUrl = "https://portfolio.slope726.in";

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Chandresh Kumar - Portfolio</title>
    <link>${baseUrl}</link>
    <description>Portfolio projects and updates from Chandresh Kumar</description>
    ${projectsData
			.map(
				(project) => `
    <item>
      <title>${escapeXml(project.title)}</title>
      <description>${escapeXml(project.description)}</description>
      <link>${escapeXml(project.liveUrl || baseUrl)}</link>
    </item>`
			)
			.join("")}
  </channel>
</rss>`;

	return new NextResponse(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
		}
	});
}
