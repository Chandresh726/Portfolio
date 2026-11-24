import { ReactNode } from "react";
import { Project } from "./content";

export interface HeadingDividerProps {
	title?: string;
	as?: "h1" | "h2";
	id?: string;
}

export interface LoaderProps {
	textClassNames?: string;
}

export interface FilterButtonProps {
	onClick: () => void;
	label: string;
	active: boolean;
	children: ReactNode;
}

export interface FilterProps {
	projects: Pick<Project, "stack">[];
	activeFilter?: string;
	onClick: (category: string | undefined) => void;
}

export interface ProjectItemProps {
	project: Project;
}

export interface GreetingLottieProps {
	animationPath: string;
}

export interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export interface ThemeContextProps {
	children: ReactNode;
}

export interface LayoutProps {
	children: ReactNode;
}
