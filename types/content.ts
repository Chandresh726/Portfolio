import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";

export interface Project {
	title: string;
	description: string;
	images: string[];
	liveUrl: string | null;
	repoUrl: string | null;
	stack: string[];
}

export interface SocialMediaItem {
	id: string;
	icon: ComponentType<{ className?: string; style?: CSSProperties }>;
	title: string;
	href: string;
	label: string;
	color: string;
	external: boolean;
}

export interface NavigationItem {
	href: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	label: string;
}

interface TechnologyItem {
	name: string;
	icon: ReactNode;
	color?: string;
}

export interface TechnologyCategory {
	category: string;
	items: TechnologyItem[];
}

export interface SiteRoutes {
	home: string;
	projects: string;
	resume: string;
}
