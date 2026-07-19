import type { LayoutProps } from "types";
import { createPageMetadata } from "components/AppMetadata";
import seoData from "content/seo.json";

export const metadata = createPageMetadata({
	title: "Projects",
	socialTitle: "Software Projects | Chandresh Kumar",
	description: seoData.projectsDescription,
	pathname: "/projects"
});

export default function Layout({ children }: LayoutProps) {
	return <div className="container-md min-h-screen">{children}</div>;
}
