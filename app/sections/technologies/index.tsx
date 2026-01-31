"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HeadingDivider } from "components";
import { TECHNOLOGIES } from "../../../constants";
import type { TechnologyItem } from "types";

const fadeInLeft = {
	initial: { x: -200, opacity: 0 },
	animate: { x: 0, opacity: 1 },
	transition: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.5 }
};

const techCardVariants = (index: number) => ({
	initial: { y: 250 / (index || 1), opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.17, 0.55, 0.55, 1],
			delay: index === 0 ? 0 : 0.5 * index
		}
	}
});

interface ProcessedTechnology {
	id: string;
	category: string;
	items: (TechnologyItem & { id: string })[];
}

export function TechnologiesSection() {
	const textRef = useRef(null);
	const stackRef = useRef(null);
	const isTextInView = useInView(textRef, { once: true });
	const isStackInView = useInView(stackRef, { once: true });

	const technologies: ProcessedTechnology[] = TECHNOLOGIES.map((tech, index) => ({
		id: `${tech.category}-${index}`,
		category: tech.category,
		items: tech.items.map((item, itemIndex) => ({
			id: `${tech.category}-${item.name}-${itemIndex}`,
			name: item.name,
			icon: item.icon
		}))
	}));

	return (
		<section id="tech" className="section">
			<HeadingDivider title="Technologies" />
			<motion.p
				ref={textRef}
				tabIndex={0}
				className="my-5 text-2xl"
				variants={fadeInLeft}
				initial="initial"
				animate={isTextInView ? "animate" : "initial"}
			>
				I have worked with the following technologies and tools:
			</motion.p>

			{!!technologies.length && (
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-20">
					{technologies.map((tech, index) => (
						<motion.div
							key={tech.id}
							ref={stackRef}
							className="flex flex-col gap-4 flex-1 md:flex-auto"
							variants={techCardVariants(index)}
							initial="initial"
							animate={isStackInView ? "animate" : "initial"}
						>
							<h3 tabIndex={0} className="text-2xl font-bold">
								{tech.category}
							</h3>
							<div className="flex items-center flex-wrap gap-x-5 gap-y-8">
								{tech.items.map((item) => (
									<div key={item.id} className="group relative flex">
										<span tabIndex={0} role="img" aria-label={item.name}>
											{item.icon}
										</span>
										<span
											className="group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-surface-overlay text-sm text-on-surface-overlay rounded-md absolute left-1/2
                      -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max"
										>
											{item.name}
										</span>
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>
			)}
		</section>
	);
}
