import { useRef, useState } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { TbBrandJavascript, TbBrandNextjs, TbBrandRust, TbBrandTypescript } from "react-icons/tb";
import { FaReact, FaAws } from "react-icons/fa";
import { SiSolana, SiNestjs, SiOpenai, SiGooglegemini } from "react-icons/si";
import { FilterButton } from "./FilterButton";

export function Filter({ onClick = (f) => f }) {
	const animRef = useRef(null);
	const isInView = useInView(animRef, { once: true });
	const [activeFilter, setActiveFilter] = useState(undefined);

	const handleFilterClick = (filter) => {
		onClick(filter);
		setActiveFilter(filter);
	};

	return (
		<LazyMotion features={domAnimation}>
			<div
				ref={animRef}
				className="flex items-start flex-col sm:flex-row sm:items-center gap-4 my-10"
				style={{
					opacity: isInView ? 1 : 0,
					transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
				}}
			>
				<h3 aria-label="Filter projects" tabIndex="0" className="font-bold text-xl">
					Filter by:
				</h3>
				<div className="flex items-center gap-4">
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
						<SiGooglegemini  size="20" />
					</FilterButton>
				</div>
			</div>
		</LazyMotion>
	);
}
