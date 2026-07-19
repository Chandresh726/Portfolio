import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const sourceDir = path.join(root, "assets", "source");
const avatarSource = path.join(sourceDir, "avatar.png");
const socialSource = path.join(sourceDir, "portfolio-screenshot.webp");
const projectSourcesDir = path.join(sourceDir, "project-images");
const projectOutputDir = path.join(publicDir, "images");

async function writeContainedIcon(size, output, options = {}) {
	const { background = { r: 0, g: 0, b: 0, alpha: 0 }, inset = 0 } = options;
	const innerSize = size - inset * 2;
	const icon = await sharp(avatarSource)
		.resize(innerSize, innerSize, { fit: "contain" })
		.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true, quality: 90 })
		.toBuffer();

	await sharp({
		create: {
			width: size,
			height: size,
			channels: 4,
			background
		}
	})
		.composite([{ input: icon, left: inset, top: inset }])
		.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true, quality: 90 })
		.toFile(output);
}

async function generateIcons() {
	await Promise.all([
		writeContainedIcon(32, path.join(publicDir, "favicon-32.png")),
		writeContainedIcon(180, path.join(publicDir, "apple-touch-icon.png")),
		writeContainedIcon(192, path.join(publicDir, "icon-192.png")),
		writeContainedIcon(512, path.join(publicDir, "icon-512.png")),
		writeContainedIcon(512, path.join(publicDir, "icon-maskable-512.png"), {
			background: "#111827",
			inset: 96
		}),
		sharp(avatarSource)
			.resize(96, 96, { fit: "cover" })
			.webp({ quality: 86, effort: 6 })
			.toFile(path.join(publicDir, "avatar.webp"))
	]);
}

async function generateSocialImage() {
	await sharp(socialSource)
		.resize(1200, 630, { fit: "cover", position: "top" })
		.webp({ quality: 84, effort: 6 })
		.toFile(path.join(publicDir, "social-card.webp"));
}

async function findProjectPngs(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const absolute = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await findProjectPngs(absolute)));
		else if (entry.isFile() && entry.name.endsWith(".png")) files.push(absolute);
	}

	return files;
}

async function generateProjectImages() {
	const files = await findProjectPngs(projectSourcesDir);

	await Promise.all(
		files.map(async (file) => {
			const relative = path.relative(projectSourcesDir, file).replace(/\.png$/i, ".webp");
			const output = path.join(projectOutputDir, relative);
			await mkdir(path.dirname(output), { recursive: true });
			const metadata = await sharp(file).metadata();
			const pipeline = sharp(file).rotate();
			if ((metadata.width ?? 0) > 1920) pipeline.resize({ width: 1920, withoutEnlargement: true });
			await pipeline.webp({ quality: 82, effort: 6 }).toFile(output);
		})
	);

	return files.length;
}

await generateIcons();
await generateSocialImage();
const screenshotCount = await generateProjectImages();

const outputs = [
	"favicon-32.png",
	"apple-touch-icon.png",
	"icon-192.png",
	"icon-512.png",
	"icon-maskable-512.png",
	"avatar.webp",
	"social-card.webp"
];

for (const output of outputs) {
	const info = await stat(path.join(publicDir, output));
	console.log(`${output}: ${(info.size / 1024).toFixed(1)} KiB`);
}
console.log(`Optimized ${screenshotCount} project screenshots.`);
