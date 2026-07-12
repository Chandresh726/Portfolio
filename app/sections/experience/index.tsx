import { HeadingDivider } from "components/HeadingDivider";
import { ExperienceAccordion } from "./ExperienceAccordion";

export function ExperienceSection() {
	return (
		<section id="experience" className="section">
			<HeadingDivider title="Work Experience" />
			<ExperienceAccordion />
		</section>
	);
}
