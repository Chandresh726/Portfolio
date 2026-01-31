"use client";

import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HeadingDivider, Loader, ErrorFallback } from "components";
import { Filter } from "./components/Filter";
import { Projects } from "./components/Projects";
import { PROJECTS } from "../../constants";

export default function Page() {
	const [category, setCategory] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		setIsLoading(false);
	}, []);

	const onClick = (catName: string | undefined) => setCategory(catName);

	if (isLoading) {
		return (
			<div className="flex-center">
				<Loader />
			</div>
		);
	}

	return (
		<section id="projects" className="section">
			<HeadingDivider title="Projects" />
			<Filter onClick={onClick} />
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Projects projects={PROJECTS} category={category} />
			</ErrorBoundary>
		</section>
	);
}
