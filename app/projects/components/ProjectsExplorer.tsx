"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "components/ErrorFallback";
import { Filter } from "./Filter";
import { Projects } from "./Projects";
import type { Project } from "types";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
	const [category, setCategory] = useState<string | undefined>();

	return (
		<>
			<Filter projects={projects} onClick={setCategory} />
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Projects projects={projects} category={category} immediate />
			</ErrorBoundary>
		</>
	);
}
