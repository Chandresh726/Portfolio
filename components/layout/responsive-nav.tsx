"use client";

import { lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "hooks/use-media-query";
import { NavigationFallback } from "./navigation-fallback";

const MobileNav = lazy(() =>
	import("./mobile-nav").then((module) => ({ default: module.MobileNav }))
);
const DockNav = lazy(() => import("./dock-nav").then((module) => ({ default: module.DockNav })));

export function ResponsiveNav() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const pathname = usePathname();
	const fallback = <NavigationFallback isHome={pathname === "/"} />;
	if (isDesktop === undefined) return fallback;

	return <Suspense fallback={fallback}>{isDesktop ? <DockNav /> : <MobileNav />}</Suspense>;
}
