"use client";

import { HeadingDivider } from "components";
import { TECHNOLOGIES } from "../../../constants";
import type { TechnologyItem } from "types";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ProcessedTechnology {
	id: string;
	category: string;
	items: (TechnologyItem & { id: string })[];
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.1
		}
	}
};

const categoryVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1]
		}
	}
};

const iconContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.2
		}
	}
};

const iconVariants = {
	hidden: { opacity: 0, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 15
		}
	}
};

function TechIcon({ item }: { item: TechnologyItem & { id: string } }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			key={item.id}
			className="group relative flex cursor-pointer"
			variants={iconVariants}
			whileHover={{
				scale: 1.25,
				rotate: [0, -5, 5, 0],
				transition: { duration: 0.3 }
			}}
			whileTap={{ scale: 0.9 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ color: isHovered && item.color ? item.color : undefined }}
		>
			<span tabIndex={0} role="img" aria-label={item.name} className="transition-colors duration-300">
				{item.icon}
			</span>
			<motion.span
				className="pointer-events-none absolute left-1/2 -translate-x-1/2 translate-y-full mt-2 px-2 py-1 text-sm bg-surface-overlay text-on-surface-overlay rounded-md whitespace-nowrap z-10"
				initial={{ opacity: 0, y: -5 }}
				animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
				transition={{ duration: 0.2 }}
			>
				{item.name}
			</motion.span>
		</motion.div>
	);
}

export function TechnologiesSection() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	const technologies: ProcessedTechnology[] = TECHNOLOGIES.map((tech, index) => ({
		id: `${tech.category}-${index}`,
		category: tech.category,
		items: tech.items.map((item, itemIndex) => ({
			id: `${tech.category}-${item.name}-${itemIndex}`,
			name: item.name,
			icon: item.icon,
			color: item.color
		}))
	}));

	return (
		<section id="tech" className="section">
			<HeadingDivider title="Technologies" />
			<motion.p
				tabIndex={0}
				className="my-5 text-xl md:text-2xl"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				I have worked with the following technologies:
			</motion.p>

			{!!technologies.length && (
				<motion.div
					ref={ref}
					className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					{technologies.map((tech) => (
						<motion.div
							key={tech.id}
							className="flex flex-col gap-4 flex-1 md:flex-auto"
							variants={categoryVariants}
						>
							<div className="relative">
								<h3 tabIndex={0} className="text-xl md:text-2xl font-bold">
									{tech.category}
								</h3>
								{/* Animated underline */}
								<motion.div
									className="absolute -bottom-1 left-0 h-0.5 bg-blue-light rounded-full"
									initial={{ width: 0 }}
									whileInView={{ width: "50%" }}
									viewport={{ once: true }}
									transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
								/>
							</div>
							<motion.div
								className="flex items-center flex-wrap gap-x-5 gap-y-6"
								variants={iconContainerVariants}
							>
								{tech.items.map((item) => (
									<TechIcon key={item.id} item={item} />
								))}
							</motion.div>
						</motion.div>
					))}
				</motion.div>
			)}
		</section>
	);
}
