import type { Project } from "types";
import { RevealGroup } from "components/motion/reveal";
import { ProjectItem } from "./ProjectItem";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
	return (
		<RevealGroup
			className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
			columns={{ base: 1, md: 2 }}
		>
			{projects.map((project) => (
				<ProjectItem key={project.slug} project={project} />
			))}
		</RevealGroup>
	);
}
