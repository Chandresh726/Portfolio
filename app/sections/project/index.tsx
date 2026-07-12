import Link from "next/link";
import { HeadingDivider } from "components/HeadingDivider";
import { PROJECTS, SITE_ROUTES } from "@/constants";
import { FeaturedProjects } from "./FeaturedProjects";

export function ProjectsSection() {
	return (
		<section id="projects" className="section">
			<HeadingDivider title="Featured Projects" />
			<div className="flex flex-col items-center gap-4 md:gap-6 pt-4 animate-section-in">
				<FeaturedProjects projects={PROJECTS.slice(0, 4)} />
				<Link href={SITE_ROUTES.projects} className="btn" aria-label="See more projects">
					More projects
				</Link>
			</div>
		</section>
	);
}
