"use client";

import * as m from "framer-motion/m";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion, type Variants } from "framer-motion";
import { ProjectVisibilityProvider } from "context/project_visibility_context";
import { useMediaQuery } from "hooks/use-media-query";
import { Filter } from "./Filter";
import type { Project } from "types";

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 56, scale: 0.985 },
	visible: ({ delay, initial }: { delay: number; initial: boolean }) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: initial ? 0.72 : 0.32,
			delay,
			ease: [0.22, 1, 0.36, 1]
		}
	})
};

interface ExplorerItem extends Pick<Project, "slug" | "stack"> {
	card: ReactNode;
}

export function ProjectsExplorer({ items }: { items: ExplorerItem[] }) {
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
	const [displayedCategory, setDisplayedCategory] = useState<string | undefined>();
	const [gridVisible, setGridVisible] = useState(true);
	const [hasEntered, setHasEntered] = useState(false);
	const gridRef = useRef<HTMLDivElement>(null);
	const inView = useInView(gridRef, { once: true, margin: "0px 0px -80px 0px", amount: 0.12 });
	const reduceMotion = useReducedMotion();
	const columnCount = (useMediaQuery("(min-width: 768px)") ?? false) ? 2 : 1;
	const visibleCount = items.filter(
		(project) => displayedCategory === undefined || project.stack.includes(displayedCategory)
	).length;

	useEffect(() => {
		if (!inView || hasEntered) return;
		const timeoutId = window.setTimeout(() => setHasEntered(true), 1600);
		return () => window.clearTimeout(timeoutId);
	}, [hasEntered, inView]);

	useEffect(() => {
		if (selectedCategory === displayedCategory) {
			setGridVisible(true);
			return;
		}

		if (reduceMotion) {
			setDisplayedCategory(selectedCategory);
			setGridVisible(true);
			return;
		}

		setGridVisible(false);
		const timeoutId = window.setTimeout(() => {
			setDisplayedCategory(selectedCategory);
		}, 180);

		return () => window.clearTimeout(timeoutId);
	}, [displayedCategory, reduceMotion, selectedCategory]);

	return (
		<>
			<Filter
				projects={items}
				activeFilter={selectedCategory}
				onClick={(category) => {
					setHasEntered(true);
					setSelectedCategory(category);
				}}
			/>
			<p className="sr-only" aria-live="polite">
				{visibleCount} {visibleCount === 1 ? "project" : "projects"} shown
			</p>
			<m.div
				animate={{ opacity: gridVisible ? 1 : 0, y: gridVisible ? 0 : 8 }}
				transition={{
					duration: reduceMotion ? 0 : gridVisible ? 0.34 : 0.18,
					ease: [0.22, 1, 0.36, 1]
				}}
				aria-busy={!gridVisible}
			>
				<div ref={gridRef} className="grid min-w-0 grid-cols-1 md:grid-cols-2 gap-8 w-full">
					{items.map((project, index) => {
						const visible =
							displayedCategory === undefined || project.stack.includes(displayedCategory);
						const initial = !hasEntered;
						const row = Math.floor(index / columnCount);
						const delay = initial ? Math.min(row, 5) * 0.13 : 0;

						return (
							<ProjectVisibilityProvider key={project.slug} visible={visible}>
								<m.div
									className="project-motion-card min-w-0"
									hidden={!visible}
									custom={{ delay, initial }}
									variants={cardVariants}
									initial="hidden"
									animate={inView ? "visible" : "hidden"}
								>
									{project.card}
								</m.div>
							</ProjectVisibilityProvider>
						);
					})}
				</div>
			</m.div>
		</>
	);
}
