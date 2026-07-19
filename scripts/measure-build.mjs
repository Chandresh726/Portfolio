import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const routes = [
	{ name: "/", html: ".next/server/app/index.html" },
	{ name: "/projects", html: ".next/server/app/projects.html" }
];

function formatBytes(bytes) {
	return `${(bytes / 1024).toFixed(1)} KiB`;
}

for (const route of routes) {
	const htmlPath = path.join(root, route.html);
	let html;
	try {
		html = await readFile(htmlPath, "utf8");
	} catch {
		throw new Error(`Missing ${route.html}. Run pnpm build first.`);
	}

	const sources = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
	const uniqueSources = [...new Set(sources.filter((source) => source.startsWith("/_next/")))];
	let raw = 0;
	let gzip = 0;

	for (const source of uniqueSources) {
		const file = path.join(root, ".next", source.replace(/^\/_next\//, ""));
		const contents = await readFile(file);
		raw += (await stat(file)).size;
		gzip += gzipSync(contents, { level: 9 }).length;
	}

	console.log(`${route.name}: ${uniqueSources.length} scripts, ${formatBytes(raw)} raw, ${formatBytes(gzip)} gzip`);
}
