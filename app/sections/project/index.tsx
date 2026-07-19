import Link from "next/link";
import { HeadingDivider } from "components/HeadingDivider";
import { Reveal } from "components/motion/reveal";
import { PROJECTS, SITE_ROUTES } from "@/constants";
import { FeaturedProjects } from "./FeaturedProjects";

export function ProjectsSection() {
	return (
		<section id="projects" aria-labelledby="featured-projects-heading" className="section">
			<HeadingDivider id="featured-projects-heading" title="Featured Projects" />
			<div className="flex flex-col items-center gap-4 md:gap-6 pt-4">
				<FeaturedProjects projects={PROJECTS.slice(0, 4)} />
				<Reveal delay={0.18}>
					<Link href={SITE_ROUTES.projects} scroll className="btn" aria-label="See more projects">
						More projects
					</Link>
				</Reveal>
			</div>
		</section>
	);
}
