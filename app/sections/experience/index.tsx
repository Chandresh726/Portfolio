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
	start: string;
	end: string;
	description: string;
	technologies: string[];
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
			ease: [0.25, 0.1, 0.25, 1]
		}
	}
};

function ExperienceCard({ experience }: { experience: Experience }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<motion.div
			variants={cardVariants}
			className="group cursor-pointer rounded-xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-4 md:p-6 transition-all duration-300 hover:border-blue-light/40 hover:shadow-lg"
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className="flex items-start gap-4">
				{/* Logo */}
				<div className="flex-shrink-0">
					<div className="relative size-10 md:size-12 rounded-xl overflow-hidden bg-surface-muted border border-outline/20">
						<Image
							src={experience.logo}
							alt={experience.company}
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4">
						<div className="min-w-0">
							<h3 className="text-base md:text-lg font-semibold text-on-surface flex items-center gap-2">
								{experience.title}
								<motion.span
									animate={{ rotate: isExpanded ? 90 : 0 }}
									transition={{ duration: 0.2 }}
									className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<ChevronRight className="size-4" />
								</motion.span>
							</h3>
							<p className="text-blue-light font-medium text-sm md:text-base flex items-center gap-2">
								{experience.company}
								<span className="text-text-muted">•</span>
								<span className="text-text-muted font-normal">{experience.location}</span>
							</p>
						</div>

						{/* Date Range */}
						<div className="text-right flex-shrink-0">
							<p className="text-sm text-text-muted tabular-nums whitespace-nowrap">
								{experience.start} - {experience.end}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Expandable Description */}
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
						className="overflow-hidden"
					>
						<p className="mt-4 ml-14 md:ml-20 text-text-muted text-sm md:text-base leading-relaxed">
							{experience.description}
						</p>
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
				className="pt-10 flex flex-col gap-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
			>
				{(experienceData as Experience[]).map((experience, index) => (
					<ExperienceCard
						key={`${experience.company}-${experience.title}-${index}`}
						experience={experience}
					/>
				))}
			</motion.div>
		</section>
	);
}
