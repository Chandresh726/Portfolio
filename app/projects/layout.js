"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HeadingDivider, Loader } from "components";
import { Filter } from "./components/Filter";
import Error from "../error";
import { Projects } from "./components/Projects";
import { PROJECTS } from "../../constants";


export default function Page() {
	const [category, setCategory] = useState(undefined);

	const onClick = (catName) => setCategory(catName);

	return (
		<div className="container-md">
			<section id="projects" className="section">
				<HeadingDivider title="Relevant projects" />

				<Filter onClick={onClick} />

				<Suspense
					fallback={
						<div className="flex-center">
							<Loader />
						</div>
					}
				>
					<ErrorBoundary FallbackComponent={Error}>
						{PROJECTS === undefined ? (
							// Loading state
							<div className="flex-center">
								<Loader />
							</div>
						) : PROJECTS.length === 0 ? (
							// Empty state
							<div className="flex-center">
								<h3 className="text-2xl">No projects found in {category} category</h3>
							</div>
						) : (
							<Projects projects={PROJECTS} category={category}/>
						)}
					</ErrorBoundary>
				</Suspense>
			</section>
		</div>
	);
}
