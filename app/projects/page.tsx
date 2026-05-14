"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import { HeadingDivider, ErrorFallback } from "components";
import { Filter } from "./components/Filter";
import { Projects } from "./components/Projects";
import { PROJECTS } from "../../constants";

export default function Page() {
	const [category, setCategory] = useState<string | undefined>(undefined);

	return (
		<motion.section
			id="projects"
			className="section"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<HeadingDivider title="Projects" />
			<Filter onClick={(catName) => setCategory(catName)} />
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Projects projects={PROJECTS} category={category} immediate />
			</ErrorBoundary>
		</motion.section>
	);
}
