"use client";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "components/ErrorFallback";
import { Projects } from "../../projects/components/Projects";
import type { Project } from "types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Projects projects={projects} />
		</ErrorBoundary>
	);
}
