import { HeadingDivider } from "components/HeadingDivider";
import { TECHNOLOGIES } from "@/constants";
import type { CSSProperties } from "react";

export function TechnologiesSection() {
	return (
		<section id="tech" className="section">
			<HeadingDivider title="Technologies" />
			<p tabIndex={0} className="my-2 text-lg sm:text-xl lg:text-2xl animate-section-in">
				I have worked with the following technologies:
			</p>

			{!!TECHNOLOGIES.length && (
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{TECHNOLOGIES.map((tech) => (
						<div
							key={tech.category}
							className="flex flex-col gap-4 flex-1 md:flex-auto animate-section-in"
						>
							<div className="relative sm:text-left text-center">
								<h3 tabIndex={0} className="text-xl lg:text-2xl font-bold">
									{tech.category}
								</h3>
								<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 h-0.5 w-1/2 bg-blue-light rounded-full" />
							</div>
							<div className="flex items-center justify-center sm:justify-start flex-wrap gap-x-5 gap-y-6">
								{tech.items.map((item) => (
									<div
										key={item.name}
										className="group relative flex transition-transform duration-300 hover:scale-125 focus-within:scale-125"
										style={{ "--tech-color": item.color ?? "currentColor" } as CSSProperties}
									>
										<span
											tabIndex={0}
											role="img"
											aria-label={item.name}
											className="transition-colors duration-300 group-hover:text-[var(--tech-color)] focus:text-[var(--tech-color)]"
										>
											{item.icon}
										</span>
										<span className="pointer-events-none absolute left-1/2 -translate-x-1/2 translate-y-full mt-2 px-2 py-1 text-sm bg-surface-overlay text-on-surface-overlay rounded-md whitespace-nowrap z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
											{item.name}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
