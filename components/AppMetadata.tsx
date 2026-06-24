import type { Metadata } from "next";
import seoData from "@/content/seo.json";
import personalData from "@/content/personal.json";

const author = seoData.author;
const description = seoData.description;
const url = seoData.siteUrl;

export const AppMetadata: Metadata = {
	metadataBase: new URL(url),
	title: {
		default: `Portfolio | ${author}`,
		template: `%s | ${author}`
	},
	description: description,
	icons: {
		icon: "/favicon.png"
	},
	manifest: "/manifest.json",
	keywords: seoData.keywords,
	creator: author,
	authors: [{ name: personalData.name, url: url }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1
		}
	},
	alternates: {
		canonical: url
	},
	openGraph: {
		title: `${author} | Portfolio`,
		description: description,
		url: url,
		siteName: `${author} | Portfolio`,
		images: [
			{
				url: seoData.socialImage,
				width: 1800,
				height: 1600,
				alt: "My personal portfolio website",
				type: "image/webp"
			}
		],
		locale: "en-US",
		type: "website"
	},
	twitter: {
		card: "summary_large_image",
		title: `${author} | Portfolio`,
		description: description,
		images: [
			{
				url: seoData.socialImage,
				alt: "My personal portfolio website"
			}
		],
		creator: seoData.twitterHandle
	}
};
