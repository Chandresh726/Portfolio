import type { LayoutProps } from "types";
import type { Metadata } from "next";
import seoData from "content/seo.json";

export const metadata: Metadata = {
	title: "Projects",
	description: seoData.description,
	alternates: { canonical: "/projects" },
	openGraph: {
		title: "Projects",
		description: seoData.description,
		url: "/projects",
		siteName: seoData.siteTitle,
		images: [seoData.socialImage],
		type: "website"
	}
};

export default function Layout({ children }: LayoutProps) {
	return <div className="container-md min-h-screen">{children}</div>;
}
