"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbBrandJavascript, TbBrandNextjs, TbBrandRust, TbBrandTypescript } from "react-icons/tb";
import { FaReact, FaAws } from "react-icons/fa";
import { SiSolana, SiNestjs, SiOpenai, SiGooglegemini } from "react-icons/si";
import { FilterButton } from "./FilterButton";
import type { FilterProps } from "types";

export function Filter({ onClick = () => {} }: FilterProps) {
	const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);

	const handleFilterClick = (filter: string | undefined) => {
		onClick(filter);
		setActiveFilter(filter);
	};

	return (
		<motion.div
			className="flex items-start flex-col sm:flex-row sm:items-center gap-4 my-10"
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
		>
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
				<FilterButton
					onClick={() => handleFilterClick("Javascript")}
					label="Javascript"
					active={activeFilter === "Javascript"}
				>
					<TbBrandJavascript size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("React")}
					label="React"
					active={activeFilter === "React"}
				>
					<FaReact size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("Next")}
					label="Next"
					active={activeFilter === "Next"}
				>
					<TbBrandNextjs size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("Typescript")}
					label="Typescript"
					active={activeFilter === "Typescript"}
				>
					<TbBrandTypescript size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("AWS")}
					label="AWS"
					active={activeFilter === "AWS"}
				>
					<FaAws size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("Solana")}
					label="Solana"
					active={activeFilter === "Solana"}
				>
					<SiSolana size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("Rust")}
					label="Rust"
					active={activeFilter === "Rust"}
				>
					<TbBrandRust size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("NestJS")}
					label="NestJS"
					active={activeFilter === "NestJS"}
				>
					<SiNestjs size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("OpenAI")}
					label="OpenAI"
					active={activeFilter === "OpenAI"}
				>
					<SiOpenai size="20" />
				</FilterButton>
				<FilterButton
					onClick={() => handleFilterClick("Gemini")}
					label="Gemini"
					active={activeFilter === "Gemini"}
				>
					<SiGooglegemini size="20" />
				</FilterButton>
			</div>
		</motion.div>
	);
}
