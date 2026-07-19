import { HeadingDivider } from "components/HeadingDivider";
import { ExperienceAccordion } from "./ExperienceAccordion";

export function ExperienceSection() {
	return (
		<section id="experience" aria-labelledby="experience-heading" className="section">
			<HeadingDivider id="experience-heading" title="Work Experience" />
			<ExperienceAccordion />
		</section>
	);
}
