"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeadingDivider, Loader, ErrorFallback } from "components";
import { ErrorBoundary } from "react-error-boundary";
import { Projects } from "../../projects/components/Projects";
import { SITE_ROUTES, PROJECTS } from "../../../constants";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1
		}
	}
};

const itemVariants = {
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

export function ProjectsSection() {
	return (
		<section id="projects" className="section">
			<HeadingDivider title="Featured Projects" />
			<motion.div
				className="flex flex-col items-center gap-8 md:gap-14 pt-10"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
			>
				<Suspense
					fallback={
						<div className="flex-center">
							<Loader />
						</div>
					}
				>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<Projects projects={PROJECTS} limit={3} />
					</ErrorBoundary>
				</Suspense>

				<motion.div variants={itemVariants}>
					<Link href={SITE_ROUTES.projects} className="btn" aria-label="See more projects">
						More projects
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
}
