"use client";

import { TbBrandJavascript, TbBrandNextjs, TbBrandRust, TbBrandTypescript } from "react-icons/tb";
import { FaReact, FaAws } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { FilterButton } from "./FilterButton";
import { Reveal } from "components/motion/reveal";
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

export function Filter({ projects, activeFilter, onClick }: FilterProps) {
	const availableFilters = getAvailableProjectFilters(projects);

	return (
		<Reveal>
			<fieldset className="flex w-full min-w-0 items-start flex-col sm:flex-row sm:items-center gap-4 my-10">
				<legend className="font-bold text-xl sm:float-left sm:mr-4">Filter by:</legend>
				<div className="flex w-full min-w-0 items-center gap-4 flex-wrap sm:w-auto">
					<FilterButton
						onClick={() => onClick(undefined)}
						label="All"
						active={activeFilter === undefined}
					>
						All
					</FilterButton>
					{availableFilters.map(({ label, icon: Icon }) => (
						<FilterButton
							key={label}
							onClick={() => onClick(label)}
							label={label}
							active={activeFilter === label}
						>
							<Icon size="20" />
						</FilterButton>
					))}
				</div>
			</fieldset>
		</Reveal>
	);
}
