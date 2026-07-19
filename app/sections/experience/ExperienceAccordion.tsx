import type { CSSProperties, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import experienceData from "content/experience.json";
import type { Experience } from "types";
import { RevealGroup } from "components/motion/reveal";
import { ExperienceDisclosure } from "./ExperienceDisclosure";

function parseHighlight(text: string): ReactNode[] {
	return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			return (
				<span key={index} className="font-semibold text-blue-light">
					{part.slice(2, -2)}
				</span>
			);
		}
		return part;
	});
}

function experienceId(experience: Experience) {
	return `experience-${`${experience.company}-${experience.title}`
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "")}`;
}

export function ExperienceAccordion() {
	return (
		<RevealGroup className="pt-4 flex flex-col gap-2.5">
			{(experienceData as Experience[]).map((experience, index) => {
				const id = experienceId(experience);
				const label = `${experience.title} at ${experience.company}`;

				return (
					<ExperienceDisclosure
						key={id}
						id={id}
						label={label}
						defaultExpanded={index === 0}
						summary={
							<>
								<div className="flex-shrink-0">
									<div className="relative size-10 md:size-12 rounded-xl overflow-hidden bg-surface-muted border border-outline/20">
										<Image
											src={experience.logo}
											alt={experience.company}
											fill
											sizes="(min-width: 768px) 48px, 40px"
											className="object-cover"
										/>
									</div>
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-4">
										<h3 className="text-base lg:text-lg font-semibold text-on-surface flex items-center gap-2">
											{experience.title}
											<span className="text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-90 motion-reduce:transition-none">
												<ChevronRight className="size-4" />
											</span>
										</h3>
										<p className="text-sm text-text-muted tabular-nums sm:whitespace-nowrap">
											{experience.start} - {experience.end}
										</p>
									</div>
									<div className="flex items-center justify-between gap-4">
										<p className="text-blue-light font-medium text-sm lg:text-base">
											{experience.company}
										</p>
										<p className="text-text-muted text-sm whitespace-nowrap">
											{experience.location}
											<span className="mx-1.5 text-text-muted/60">|</span>
											{experience.jobType}
										</p>
									</div>
								</div>
							</>
						}
					>
						<div className="mt-3 border-t border-divider pt-3">
							{experience.description.length === 1 ? (
								<p
									className="experience-detail-item text-text-muted text-sm lg:text-base leading-relaxed"
									style={{ "--experience-item-index": 0 } as CSSProperties}
								>
									{parseHighlight(experience.description[0])}
								</p>
							) : (
								<ul className="space-y-2.5">
									{experience.description.map((item, descriptionIndex) => (
										<li
											key={descriptionIndex}
											className="experience-detail-item relative pl-5 text-text-muted text-sm lg:text-base leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-blue-light"
											style={{ "--experience-item-index": descriptionIndex } as CSSProperties}
										>
											{parseHighlight(item)}
										</li>
									))}
								</ul>
							)}
						</div>
					</ExperienceDisclosure>
				);
			})}
		</RevealGroup>
	);
}
