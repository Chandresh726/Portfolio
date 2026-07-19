"use client";

import { useState, type ReactNode } from "react";

interface ExperienceDisclosureProps {
	id: string;
	label: string;
	defaultExpanded?: boolean;
	summary: ReactNode;
	children: ReactNode;
}

export function ExperienceDisclosure({
	id,
	label,
	defaultExpanded = false,
	summary,
	children
}: ExperienceDisclosureProps) {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);
	const panelId = `${id}-details`;

	return (
		<div
			data-state={isExpanded ? "open" : "closed"}
			className="group rounded-xl border border-outline/30 bg-surface-variant/50 backdrop-blur-sm p-3 md:p-4 transition-[border-color,box-shadow] duration-300 hover:border-blue-light/40 hover:shadow-lg"
		>
			<div className="relative flex items-center gap-4 cursor-pointer">
				<button
					type="button"
					className="absolute inset-0 z-10 rounded-lg"
					onClick={() => setIsExpanded((expanded) => !expanded)}
					aria-expanded={isExpanded}
					aria-controls={panelId}
					aria-label={`${isExpanded ? "Collapse" : "Expand"} ${label}`}
				/>
				{summary}
			</div>
			<div
				id={panelId}
				role="region"
				aria-label={`${label} details`}
				aria-hidden={!isExpanded}
				className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
					isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
				}`}
			>
				<div
					className={`min-h-0 overflow-hidden transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
						isExpanded ? "translate-y-0" : "translate-y-1.5"
					}`}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
