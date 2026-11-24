import Link from "next/link";
import { NAVIGATION_ITEMS, SOCIAL_MEDIA } from "@/constants";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { NAV_ICON_BUTTON_CLASS } from "components/ui/button";
import { cn } from "utils/cn";
import { DOCK_NAV_SURFACE_CLASS } from "./dock-nav-style";

export function NavigationFallback({ isHome }: { isHome: boolean }) {
	const visibleNavItems = isHome ? NAVIGATION_ITEMS : [NAVIGATION_ITEMS[0]];

	return (
		<>
			<nav
				aria-label="Primary"
				className="fixed inset-x-0 top-4 z-40 mx-auto hidden md:flex origin-top h-full max-h-14"
			>
				<div
					className={cn(
						"mx-auto w-max h-full p-1 flex items-center rounded-full border max-h-14 sm:max-h-none",
						DOCK_NAV_SURFACE_CLASS
					)}
				>
					{visibleNavItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								NAV_ICON_BUTTON_CLASS,
								"relative size-12 transition-[background-color] hover:bg-surface-interactive"
							)}
						>
							<item.icon className="size-4" />
							<span className="sr-only">{item.label}</span>
						</Link>
					))}
					<span className="h-full w-px shrink-0 bg-divider opacity-30 mx-1" />
					{SOCIAL_MEDIA.map((item) => (
						<a
							key={item.href}
							href={item.href}
							target={item.external ? "_blank" : undefined}
							rel={item.external ? "noopener noreferrer" : undefined}
							className={cn(
								NAV_ICON_BUTTON_CLASS,
								"relative size-12 transition-colors duration-300 hover:bg-surface-interactive"
							)}
						>
							<item.icon className="size-4" />
							<span className="sr-only">{item.label}</span>
						</a>
					))}
					<span className="h-full w-px shrink-0 bg-divider opacity-30 mx-1" />
					<ThemeSwitcher />
				</div>
			</nav>
		</>
	);
}
