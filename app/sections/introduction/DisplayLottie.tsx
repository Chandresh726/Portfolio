"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import type { GreetingLottieProps } from "types";

const DESKTOP_QUERY = "(min-width: 768px)";
const LottiePlayer = lazy(() => import("./LottiePlayer"));

export default function GreetingLottie(props: GreetingLottieProps) {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(DESKTOP_QUERY);
		const updateMatch = () => setIsDesktop(mediaQuery.matches);
		updateMatch();
		mediaQuery.addEventListener("change", updateMatch);
		return () => mediaQuery.removeEventListener("change", updateMatch);
	}, []);

	if (!isDesktop) return null;

	return (
		<Suspense fallback={null}>
			<LottiePlayer {...props} />
		</Suspense>
	);
}
