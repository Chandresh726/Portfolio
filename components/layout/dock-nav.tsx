"use client";

import { Dock, DockIcon } from "components/magicui/dock";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { buttonVariants } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { cn } from "utils/cn";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { NAVIGATION_ITEMS, SOCIAL_MEDIA } from "@/constants";
import type { CSSProperties } from "react";

export function DockNav() {
	const [isMac, setIsMac] = useState(false);
	const pathname = usePathname();
	const isHome = pathname === "/";

	const visibleNavItems = isHome ? NAVIGATION_ITEMS : [NAVIGATION_ITEMS[0]];

	useEffect(() => {
		setIsMac(navigator.platform.toUpperCase().includes("MAC"));
	}, []);

	return (
		<motion.div
			className="fixed inset-x-0 top-4 z-40 mx-auto hidden md:flex origin-top h-full max-h-14"
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: 0.1 }}
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
        transition-[background-color,border-color,box-shadow] duration-300 ease-out
        hover:bg-surface/25 hover:border-outline/30
        dark:hover:bg-surface/30 dark:hover:border-outline/15"
			>
				{visibleNavItems.map((item) => (
					<DockIcon key={item.href}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									className={cn(
										buttonVariants({ variant: "ghost", size: "icon" }),
										"relative size-12 transition-[background-color] hover:bg-surface-interactive"
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

				{SOCIAL_MEDIA.map((item) => (
					<DockIcon key={item.href}>
						<Tooltip>
							<TooltipTrigger asChild>
								<a
									href={item.href}
									target={item.external ? "_blank" : undefined}
									rel={item.external ? "noopener noreferrer" : undefined}
									className={cn(
										buttonVariants({ variant: "ghost", size: "icon" }),
										"relative size-12 transition-colors duration-300 hover:bg-surface-interactive hover:text-[var(--hover-color)]"
									)}
									style={{ "--hover-color": item.color } as CSSProperties}
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
							<ThemeSwitcher enableShortcut />
						</TooltipTrigger>
						<TooltipContent sideOffset={4}>
							<p>Toggle theme ({isMac ? "⌘D" : "Ctrl D"})</p>
						</TooltipContent>
					</Tooltip>
				</DockIcon>
			</Dock>
		</motion.div>
	);
}
