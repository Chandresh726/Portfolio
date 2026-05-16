"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HeadingDivider } from "components";
import Image from "next/image";
import experienceData from "content/experience.json";

interface Experience {
	company: string;
	logo: string;
	title: string;
	location: string;
	jobType: string;
	start: string;
	end: string;
	description: string[];
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1
		}
	}
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1] as const
		}
	}
};

const bulletVariants = {
	hidden: { opacity: 0, x: -10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3
		}
	}
};

function parseHighlight(text: string): React.ReactNode[] {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);
	return parts.map((part, index) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			const content = part.slice(2, -2);
			return (
				<span key={index} className="font-semibold text-blue-light">
					{content}
				</span>
			);
		}
		return part;
	});
}

function ExperienceCard({ experience, defaultExpanded = false }: { experience: Experience; defaultExpanded?: boolean }) {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	return (
		<motion.div
			variants={cardVariants}
			className="group rounded-xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-3 md:p-4 transition-all duration-300 hover:border-blue-light/40 hover:shadow-lg"
		>
			<div
				className="flex items-start gap-4 cursor-pointer"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{/* Logo */}
				<div className="flex-shrink-0">
					<div className="relative size-10 md:size-12 rounded-xl overflow-hidden bg-surface-muted border border-outline/20">
						<Image
							src={experience.logo}
							alt={experience.company}
							fill
							sizes="(min-width: 768px) 48px, 40px"
							className="object-cover"
						/>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					{/* Row 1: Title + Date */}
					<div className="flex items-start justify-between gap-4">
						<h3 className="text-base lg:text-lg font-semibold text-on-surface flex items-center gap-2">
							{experience.title}
							<motion.span
								animate={{ rotate: isExpanded ? 90 : 0 }}
								transition={{ duration: 0.2 }}
								className="text-text-muted"
							>
								<ChevronRight className="size-4" />
							</motion.span>
						</h3>
						<p className="text-sm text-text-muted tabular-nums whitespace-nowrap">
							{experience.start} - {experience.end}
						</p>
					</div>
					{/* Row 2: Company + Location */}
					<div className="flex items-center justify-between gap-4">
						<p className="text-blue-light font-medium text-sm lg:text-base">
							{experience.company}
						</p>
						<p className="text-text-muted text-sm whitespace-nowrap">
							{experience.location}
							<span className="mx-1.5 text-text-muted/60">|</span>
							{experience.jobType}
						</p>
					</div>
				</div>
			</div>

			{/* Expandable Description */}
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
						className="overflow-hidden"
					>
						<div className="mt-3 border-t border-divider pt-3">
							{experience.description.length === 1 ? (
								<motion.p
									initial="hidden"
									animate="visible"
									variants={bulletVariants}
									className="text-text-muted text-sm lg:text-base leading-relaxed"
								>
									{parseHighlight(experience.description[0])}
								</motion.p>
							) : (
								<motion.ul
									className="space-y-2.5"
									initial="hidden"
									animate="visible"
									variants={{
										visible: {
											transition: {
												staggerChildren: 0.1,
												delayChildren: 0.1
											}
										}
									}}
								>
									{experience.description.map((item, index) => (
										<motion.li
											key={index}
											variants={bulletVariants}
											className="relative pl-5 text-text-muted text-sm lg:text-base leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-blue-light"
										>
											{parseHighlight(item)}
										</motion.li>
									))}
								</motion.ul>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export function ExperienceSection() {
	return (
		<section id="experience" className="section">
			<HeadingDivider title="Work Experience" />
			<motion.div
				className="pt-4 flex flex-col gap-2.5"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
			>
				{(experienceData as Experience[]).map((experience, index) => (
					<ExperienceCard
						key={`${experience.company}-${experience.title}-${index}`}
						experience={experience}
						defaultExpanded={index === 0}
					/>
				))}
			</motion.div>
		</section>
	);
}
