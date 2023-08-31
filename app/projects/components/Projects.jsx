import { ProjectItem } from "../../sections";

export function Projects({ projects,limit }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
			{projects.slice(0,limit?limit:projects.length).map((project, index) => (
					<ProjectItem key={index} project={project} index={index} />
				))}
		</div>
	);
}
