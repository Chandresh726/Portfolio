import Image from "next/image";
import Link from "next/link";
import { NAVIGATION_ITEMS, SOCIAL_MEDIA } from "@/constants";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { buttonVariants } from "components/ui/button";
import { cn } from "utils/cn";
import { DOCK_NAV_SURFACE_CLASS } from "./dock-nav-style";

export function NavigationFallback({ isHome }: { isHome: boolean }) {
	const visibleNavItems = isHome ? NAVIGATION_ITEMS : [NAVIGATION_ITEMS[0]];

	return (
		<>
			<header className="fixed top-0 left-0 right-0 h-16 z-50 md:hidden bg-surface/90 backdrop-blur-xl border-b border-outline/20">
				<div className="flex items-center justify-between h-full px-4">
					<Link href="/" className="flex items-center" aria-label="Chandresh Kumar home">
						<span className="relative size-9 rounded-full overflow-hidden">
							<Image src="/avatar.webp" alt="" fill sizes="36px" className="object-cover" />
						</span>
					</Link>
					<button
						disabled
						aria-label="Navigation is loading"
						className="relative w-10 h-10 flex items-center justify-center rounded-lg"
					>
						<span className="relative block w-6 h-5" aria-hidden="true">
							<span className="absolute left-0 top-0 h-0.5 w-6 rounded-full bg-on-surface" />
							<span className="absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-on-surface" />
							<span className="absolute left-0 bottom-0 h-0.5 w-6 rounded-full bg-on-surface" />
						</span>
					</button>
				</div>
			</header>

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
								buttonVariants({ variant: "ghost", size: "icon" }),
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
								buttonVariants({ variant: "ghost", size: "icon" }),
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
