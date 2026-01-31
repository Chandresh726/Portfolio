import { ReactNode } from "react";
import { FallbackProps } from "react-error-boundary";
import { Project } from "./content";

export interface HeadingDividerProps {
	title?: string;
}

export interface LoaderProps {
	textClassNames?: string;
}

export interface MenuProps {
	onClick?: () => void;
}

export interface FilterButtonProps {
	onClick: () => void;
	label: string;
	active: boolean;
	children: ReactNode;
}

export interface FilterProps {
	onClick?: (category: string | undefined) => void;
}

export interface ProjectsProps {
	projects: Project[];
	limit?: number;
	category?: string;
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

export type ErrorFallbackProps = FallbackProps;

export interface ThemeContextProps {
	children: ReactNode;
}

export interface LayoutProps {
	children: ReactNode;
}
