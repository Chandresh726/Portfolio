import { HeadingDivider } from "components/HeadingDivider";
import { PROJECTS } from "@/constants";
import { ProjectsExplorer } from "./components/ProjectsExplorer";

export default function Page() {
	return (
		<section id="projects" className="section animate-section-in">
			<HeadingDivider title="Projects" />
			<ProjectsExplorer projects={PROJECTS} />
		</section>
	);
}
