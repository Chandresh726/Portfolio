import { ReactNode } from "react";

export interface Project {
	title: string;
	description: string;
	images: string[];
	liveUrl: string | null;
	repoUrl: string | null;
	stack: string[];
}

export interface MenuItem {
	id: string;
	name: string;
	url: string;
}

export interface SocialMediaItem {
	id: string;
	icon: ReactNode;
	title: string;
	url: string;
}

export interface TechnologyItem {
	name: string;
	icon: ReactNode;
}

export interface TechnologyCategory {
	category: string;
	items: TechnologyItem[];
}

export interface SiteStrings {
	textLogo: string;
	backToMainPageTitle: string;
	goToMainPageTitle: string;
	backToMainText: string;
}

export interface SiteRoutes {
	home: string;
	projects: string;
	resume: string;
}
