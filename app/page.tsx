"use client";

import {
	WelcomeSection,
	AboutSection,
	TechnologiesSection,
	ProjectsSection,
	EducationSection,
	ContactSection
} from "app/sections";
import { ExperienceSection } from "app/sections/experience";

export default function Page() {
	return (
		<div className="container-md">
			<WelcomeSection />
			<ExperienceSection />
			<ProjectsSection />
			<AboutSection />
			<EducationSection />
			<TechnologiesSection />
			<ContactSection />
		</div>
	);
}
