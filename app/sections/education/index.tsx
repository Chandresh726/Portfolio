import { HeadingDivider } from "components/HeadingDivider";
import Image from "next/image";
import educationData from "content/education.json";

interface Education {
	institution: string;
	logo: string;
	degree: string;
	field: string;
	location: string;
	start: string;
	end: string;
	grade: string;
	gradeType: string;
}

function EducationCard({ education }: { education: Education }) {
	return (
		<div className="group rounded-xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-3 md:p-4 transition-all duration-300 hover:border-blue-light/40 hover:shadow-lg animate-section-in">
			<div className="flex items-center gap-4">
				{/* Logo */}
				<div className="flex-shrink-0">
					<div className="relative size-10 md:size-12 rounded-xl overflow-hidden bg-surface-muted border border-outline/20">
						<Image
							src={education.logo}
							alt={education.institution}
							fill
							sizes="(min-width: 768px) 48px, 40px"
							className="object-cover"
						/>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					{/* Row 1: Institution (+ Timeline on sm+) */}
					<div className="flex items-start justify-between gap-4">
						<h3 className="text-base lg:text-lg font-semibold text-on-surface">
							{education.institution}
						</h3>
						<p className="hidden sm:block text-sm text-text-muted tabular-nums whitespace-nowrap">
							{education.start} - {education.end}
						</p>
					</div>
					{/* Row 2: Degree/Field/Grade (+ Location on sm+) */}
					<div className="flex items-center justify-between gap-2 md:gap-4">
						<p className="text-blue-light font-medium text-sm lg:text-base flex items-center gap-2 flex-wrap">
							{education.degree}: {education.field}
							<span className="text-text-muted">•</span>
							<span className="text-text-muted font-normal">
								{education.gradeType}: {education.grade}
							</span>
						</p>
						<p className="hidden sm:block text-text-muted text-sm whitespace-nowrap">
							{education.location}
						</p>
					</div>
					{/* Row 3: Timeline + Location — small screens only */}
					<div className="flex sm:hidden items-center justify-between gap-4">
						<p className="text-sm text-text-muted tabular-nums whitespace-nowrap">
							{education.start} - {education.end}
						</p>
						<p className="text-text-muted text-sm whitespace-nowrap">{education.location}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export function EducationSection() {
	return (
		<section id="education" className="section">
			<HeadingDivider title="Education" />
			<div className="pt-4 flex flex-col gap-2.5">
				{(educationData as Education[]).map((education, index) => (
					<EducationCard key={`${education.institution}-${index}`} education={education} />
				))}
			</div>
		</section>
	);
}
