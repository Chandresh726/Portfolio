"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteScrollReset() {
	const pathname = usePathname();

	useLayoutEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}

		const hash = window.location.hash;
		if (hash && hash !== "#intro") return;

		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, [pathname]);

	return null;
}
