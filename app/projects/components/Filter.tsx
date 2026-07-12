"use client";

import React, { useState } from "react";
import { TbBrandJavascript, TbBrandNextjs, TbBrandRust, TbBrandTypescript } from "react-icons/tb";
import { FaReact, FaAws } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { FilterButton } from "./FilterButton";
import type { FilterProps } from "types";

const FILTER_OPTIONS = [
	{ label: "Javascript", icon: TbBrandJavascript },
	{ label: "React", icon: FaReact },
	{ label: "Next", icon: TbBrandNextjs },
	{ label: "Typescript", icon: TbBrandTypescript },
	{ label: "AWS", icon: FaAws },
	{ label: "Solana", icon: SiSolana },
	{ label: "Rust", icon: TbBrandRust }
] as const;

export function getAvailableProjectFilters(projects: FilterProps["projects"]) {
	const stacks = new Set(projects.flatMap((project) => project.stack));
	return FILTER_OPTIONS.filter((option) => stacks.has(option.label));
}

export function Filter({ projects, onClick = () => {} }: FilterProps) {
	const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
	const availableFilters = getAvailableProjectFilters(projects);

	const handleFilterClick = (filter: string | undefined) => {
		onClick(filter);
		setActiveFilter(filter);
	};

	return (
		<div className="flex items-start flex-col sm:flex-row sm:items-center gap-4 my-10 animate-section-in">
			<h3 aria-label="Filter projects" tabIndex={0} className="font-bold text-xl">
				Filter by:
			</h3>
			<div className="flex items-center gap-4 flex-wrap">
				<FilterButton
					onClick={() => handleFilterClick(undefined)}
					label="All"
					active={activeFilter === undefined}
				>
					All
				</FilterButton>
				{availableFilters.map(({ label, icon: Icon }) => (
					<FilterButton
						key={label}
						onClick={() => handleFilterClick(label)}
						label={label}
						active={activeFilter === label}
					>
						<Icon size="20" />
					</FilterButton>
				))}
			</div>
		</div>
	);
}
