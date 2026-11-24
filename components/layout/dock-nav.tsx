"use client";

import { Dock, DockIcon } from "components/magicui/dock";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { NAV_ICON_BUTTON_CLASS } from "components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { cn } from "utils/cn";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { NAVIGATION_ITEMS, SOCIAL_MEDIA } from "@/constants";
import type { CSSProperties } from "react";
import { DOCK_NAV_SURFACE_CLASS } from "./dock-nav-style";

export function DockNav() {
	const [isMac, setIsMac] = useState(false);
	const pathname = usePathname();
	const isHome = pathname === "/";

	const visibleNavItems = isHome ? NAVIGATION_ITEMS : [NAVIGATION_ITEMS[0]];

	useEffect(() => {
		setIsMac(navigator.platform.toUpperCase().includes("MAC"));
	}, []);

	return (
		<nav
			aria-label="Primary"
			className="fixed inset-x-0 top-4 z-40 mx-auto hidden md:flex origin-top h-full max-h-14"
		>
			<TooltipProvider delayDuration={0}>
				<Dock className={DOCK_NAV_SURFACE_CLASS}>
					{visibleNavItems.map((item) => (
						<DockIcon key={item.href}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href={item.href}
										className={cn(
											NAV_ICON_BUTTON_CLASS,
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

					<span aria-hidden="true" className="h-full w-px shrink-0 bg-divider opacity-30 mx-1" />

					{SOCIAL_MEDIA.map((item) => (
						<DockIcon key={item.href}>
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href={item.href}
										target={item.external ? "_blank" : undefined}
										rel={item.external ? "noopener noreferrer" : undefined}
										className={cn(
											NAV_ICON_BUTTON_CLASS,
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

					<span aria-hidden="true" className="h-full w-px shrink-0 bg-divider opacity-30 mx-1" />

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
			</TooltipProvider>
		</nav>
	);
}
