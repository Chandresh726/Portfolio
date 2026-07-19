import { HeadingDivider } from "components/HeadingDivider";
import { PROJECTS } from "@/constants";
import { ProjectItem } from "app/sections/project/ProjectItem";
import { ProjectsExplorer } from "./components/ProjectsExplorer";

export default function Page() {
	return (
		<section id="projects" aria-labelledby="projects-heading" className="section">
			<HeadingDivider as="h1" id="projects-heading" title="Projects" />
			<ProjectsExplorer projects={PROJECTS}>
				{PROJECTS.map((project) => (
					<ProjectItem key={project.slug} project={project} />
				))}
			</ProjectsExplorer>
		</section>
	);
}
