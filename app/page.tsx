"use client";

import { WelcomeSection, AboutSection, TechnologiesSection, ProjectsSection } from "app/sections";

export default function Page() {
	return (
		<div className="container-md">
			<WelcomeSection />
			<ProjectsSection />
			<AboutSection />
			<TechnologiesSection />
		</div>
	);
}
