"use client";

import {
	WelcomeSection,
	AboutSection,
	TechnologiesSection,
	ProjectsSection
} from "app/sections";
import { ExperienceSection } from "app/sections/experience";

export default function Page() {
	return (
		<div className="container-md">
			<WelcomeSection />
			<ExperienceSection />
			<ProjectsSection />
			<AboutSection />
			<TechnologiesSection />
		</div>
	);
}
