import {
	WelcomeSection,
	AboutSection,
	TechnologiesSection,
	ProjectsSection,
	EducationSection,
	ContactSection
} from "app/sections";
import { ExperienceSection } from "app/sections/experience";
import { createPageMetadata } from "components/AppMetadata";
import seoData from "content/seo.json";

export const metadata = createPageMetadata({
	title: "Portfolio",
	socialTitle: "Chandresh Kumar | Software Engineer",
	description: seoData.description,
	pathname: "/"
});

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
