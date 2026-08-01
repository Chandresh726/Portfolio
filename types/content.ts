import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";

export interface ProjectImage {
	src: string;
	darkSrc?: string;
	alt: string;
}

export interface Project {
	slug: string;
	title: string;
	description: string;
	updatedAt: string;
	images: ProjectImage[];
	liveUrl: string | null;
	repoUrl: string | null;
	stack: string[];
}

export interface Experience {
	company: string;
	logo: string;
	title: string;
	location: string;
	jobType: string;
	start: string;
	end: string;
	description: string[];
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
