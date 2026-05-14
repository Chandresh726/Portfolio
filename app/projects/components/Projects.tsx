"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ProjectItem } from "../../sections/project/ProjectItem";
import type { ProjectsProps } from "types";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.05
		}
	}
};

export function Projects({ projects, limit, category, immediate }: ProjectsProps & { immediate?: boolean }) {
	const filteredProjects = category
		? projects?.filter((project) => project.stack.includes(category))
		: projects;

	if (!filteredProjects || filteredProjects.length === 0) {
		return (
			<div className="flex-center py-20">
				<h3 className="text-2xl text-text-muted">No projects found</h3>
			</div>
		);
	}

	const animationProps = immediate
		? { initial: "hidden" as const, animate: "visible" as const }
		: { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, margin: "-50px" } };

	return (
		<AnimatePresence mode="wait">
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
				variants={containerVariants}
				{...animationProps}
				key={category ?? "all"}
			>
				{filteredProjects.slice(0, limit || filteredProjects.length).map((project, index) => (
					<ProjectItem key={`${project.title}-${category}-${index}`} project={project} />
				))}
			</motion.div>
		</AnimatePresence>
	);
}
