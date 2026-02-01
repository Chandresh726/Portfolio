"use client";

import { motion } from "framer-motion";
import { HeadingDivider } from "components";
import Image from "next/image";
import educationData from "content/education.json";

interface Education {
	institution: string;
	logo: string;
	degree: string;
	field: string;
	location: string;
	start: string;
	end: string;
	grade: string;
	gradeType: string;
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

function EducationCard({ education }: { education: Education }) {
	return (
		<motion.div
			variants={cardVariants}
			className="group rounded-xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-4 md:p-6 transition-all duration-300 hover:border-blue-light/40 hover:shadow-lg"
		>
			<div className="flex items-start gap-4">
				{/* Logo */}
				<div className="flex-shrink-0">
					<div className="relative size-10 md:size-12 rounded-xl overflow-hidden bg-surface-muted border border-outline/20">
						<Image
							src={education.logo}
							alt={education.institution}
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					{/* Row 1: Institution + Timeline */}
					<div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4">
						<h3 className="text-base md:text-lg font-semibold text-on-surface">
							{education.institution}
						</h3>
						<p className="text-sm text-text-muted tabular-nums whitespace-nowrap">
							{education.start} - {education.end}
						</p>
					</div>
					{/* Row 2: Degree/Field/Grade + Location */}
					<div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
						<p className="text-blue-light font-medium text-sm md:text-base flex items-center gap-2 flex-wrap">
							{education.degree}: {education.field}
							<span className="text-text-muted">•</span>
							<span className="text-text-muted font-normal">
								{education.gradeType}: {education.grade}
							</span>
						</p>
						<p className="text-text-muted text-sm whitespace-nowrap">
							{education.location}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export function EducationSection() {
	return (
		<section id="education" className="section">
			<HeadingDivider title="Education" />
			<motion.div
				className="pt-10 flex flex-col gap-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
			>
				{(educationData as Education[]).map((education, index) => (
					<EducationCard
						key={`${education.institution}-${index}`}
						education={education}
					/>
				))}
			</motion.div>
		</section>
	);
}
