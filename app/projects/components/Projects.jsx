import { ProjectItem } from "../../sections";

export function Projects({ projects, limit, category }) {
	// Filter projects based on category if provided
	const filteredProjects = category 
		? projects.filter((project) => project.stack.includes(category))
		: projects; // If category is undefined, show all projects

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
			{filteredProjects.slice(0, limit ? limit : filteredProjects.length).map((project, index) => (
				<ProjectItem key={index} project={project} index={index} />
			))}
		</div>
	);
}
