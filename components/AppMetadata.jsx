const author = "Chandresh Kumar";
const description = "";
const url = "https://portfolio-chandresh.vercel.app/";
export const AppMetadata = {
	metadataBase: new URL("https://portfolio-chandresh.vercel.app/"),
	title: {
		default: `Portfolio | ${author}`,
		template: `%s | ${author}`
	},
	description: description,
	icons: {
		icon: "/favicon.png"
	},
	keywords: [
		"Chandresh Kumar",
		"Chandresh Kumar - software developer",
		"Frontend developer",
		"Portfolio website"
	],
	creator: author,
	authors: [{ name: author, url: url }],
	colorScheme: "dark",
	openGraph: {
		title: `${author} | Portfolio`,
		description: description,
		url: url,
		siteName: `${author} | Portfolio`,
		images: [
			{
				url: "https://portfolio-chandresh.vercel.app/screenshot.webp",
				width: 1800,
				height: 1600,
				alt: "My personal portfolio website"
			}
		],
		locale: "en-US",
		type: "website"
	}
};
