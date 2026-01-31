"use client";

import { Dock, DockIcon } from "components/magicui/dock";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { buttonVariants } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { cn } from "utils/cn";
import Link from "next/link";
import { Home, Briefcase, FolderOpen, User, Code } from "lucide-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";

function getIconColor(label: string): string {
	switch (label) {
		case "GitHub": return "#2DBA4E";
		case "LinkedIn": return "#0A66C2";
		case "Twitter": return "#1DA1F2";
		case "Email": return "#E4405F";
		default: return "currentColor";
	}
}

const navItems = [
	{ href: "/#intro", icon: Home, label: "Home" },
	{ href: "/#experience", icon: Briefcase, label: "Experience" },
	{ href: "/#projects", icon: FolderOpen, label: "Projects" },
	{ href: "/#about", icon: User, label: "About" },
	{ href: "/#tech", icon: Code, label: "Tech" }
];

const socialLinks = [
	{
		href: "https://github.com/Chandresh726",
		icon: BsGithub,
		label: "GitHub"
	},
	{
		href: "https://www.linkedin.com/in/kchandresh726/",
		icon: BsLinkedin,
		label: "LinkedIn"
	},
	{
		href: "https://twitter.com/Chandresh_726",
		icon: FaXTwitter,
		label: "Twitter"
	},
	{
		href: "mailto:kchandresh726@gmail.com",
		icon: HiOutlineMail,
		label: "Email"
	}
];

export function DockNav() {
	return (
		<motion.div
			className="fixed inset-x-0 top-4 z-40 mx-auto hidden md:flex origin-top h-full max-h-14"
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
		>
			<Dock
				className="z-50 relative mx-auto flex min-h-full h-full items-center px-1
        bg-surface/15 dark:bg-surface/20
        backdrop-blur-xl backdrop-saturate-150
        rounded-2xl
        border border-outline/20 dark:border-outline/10
        [background:linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))]
        dark:[background:linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.15))]
        shadow-lg
        transform-gpu
        transition-all duration-300 ease-out
        hover:bg-surface/25 hover:border-outline/30
        dark:hover:bg-surface/30 dark:hover:border-outline/15"
			>
				{navItems.map((item) => (
					<DockIcon key={item.href}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									className={cn(
										buttonVariants({ variant: "ghost", size: "icon" }),
										"relative size-12 transition-colors hover:bg-surface-interactive"
									)}
								>
									<item.icon className="size-4" />
									<span className="sr-only">{item.label}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent sideOffset={4}>
								<p>{item.label}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				))}

				<Separator orientation="vertical" className="h-full opacity-30 mx-1" />

				{socialLinks.map((item) => (
					<DockIcon key={item.href}>
						<Tooltip>
							<TooltipTrigger asChild>
								<a
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({ variant: "ghost", size: "icon" }),
										"relative size-12 transition-all duration-300 hover:bg-surface-interactive"
									)}
									onMouseEnter={(e) => e.currentTarget.style.color = getIconColor(item.label)}
									onMouseLeave={(e) => e.currentTarget.style.color = ""}
								>
									<item.icon className="size-4" />
									<span className="sr-only">{item.label}</span>
								</a>
							</TooltipTrigger>
							<TooltipContent sideOffset={4}>
								<p>{item.label}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				))}

				<Separator orientation="vertical" className="h-full opacity-30 mx-1" />

				<DockIcon>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<ThemeSwitcher />
							</div>
						</TooltipTrigger>
						<TooltipContent sideOffset={4}>
							<p>Theme</p>
						</TooltipContent>
					</Tooltip>
				</DockIcon>
			</Dock>
		</motion.div>
	);
}
