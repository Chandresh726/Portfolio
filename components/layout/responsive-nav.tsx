"use client";

import { lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "hooks/use-media-query";
import { MobileNav } from "./mobile-nav";
import { NavigationFallback } from "./navigation-fallback";

const DockNav = lazy(() => import("./dock-nav").then((module) => ({ default: module.DockNav })));

export function ResponsiveNav() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const pathname = usePathname();
	const fallback = <NavigationFallback isHome={pathname === "/"} />;
	return (
		<>
			{isDesktop !== true && <MobileNav />}
			{isDesktop !== false &&
				(isDesktop === undefined ? (
					fallback
				) : (
					<Suspense fallback={fallback}>
						<DockNav />
					</Suspense>
				))}
		</>
	);
}
