import { Briefcase, Code, FolderOpen, Home, User } from "lucide-react";
import type { NavigationItem } from "types";

export const NAVIGATION_ITEMS: NavigationItem[] = [
	{ href: "/#intro", icon: Home, label: "Home" },
	{ href: "/#experience", icon: Briefcase, label: "Experience" },
	{ href: "/#projects", icon: FolderOpen, label: "Projects" },
	{ href: "/#about", icon: User, label: "About" },
	{ href: "/#tech", icon: Code, label: "Tech" }
];
