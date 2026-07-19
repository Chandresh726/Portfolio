import type { Metadata } from "next";
import seoData from "content/seo.json";
import personalData from "content/personal.json";
import { absoluteUrl, SITE_URL } from "utils/site-url";

interface PageMetadataOptions {
	title: string;
	socialTitle: string;
	description: string;
	pathname: string;
}

const author = seoData.author;

export const AppMetadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `Portfolio | ${author}`,
		template: `%s | ${author}`
	},
	description: seoData.description,
	icons: {
		icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
	},
	manifest: "/manifest.json",
	keywords: seoData.keywords,
	creator: author,
	authors: [{ name: personalData.name, url: SITE_URL }],
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
		types: {
			"application/rss+xml": "/rss.xml"
		}
	}
};

export function createPageMetadata({
	title,
	socialTitle,
	description,
	pathname
}: PageMetadataOptions): Metadata {
	const canonical = absoluteUrl(pathname);
	const socialImage = absoluteUrl(seoData.socialImage);
	const image = {
		url: socialImage,
		width: 1200,
		height: 630,
		alt: seoData.socialImageAlt,
		type: "image/webp"
	};

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title: socialTitle,
			description,
			url: canonical,
			siteName: `${author} | Portfolio`,
			images: [image],
			locale: "en_US",
			type: "website"
		},
		twitter: {
			card: "summary_large_image",
			title: socialTitle,
			description,
			images: [{ url: socialImage, alt: seoData.socialImageAlt }],
			creator: personalData.xHandle
		}
	};
}
