"use client";

import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (matchMediaQuery = "max-width: 767px"): boolean => {
	const [targetReached, setTargetReached] = useState<boolean | null>(null);

	const updateTarget = useCallback((e: MediaQueryListEvent) => {
		if (e.matches) setTargetReached(true);
		else setTargetReached(false);
	}, []);

	useEffect(() => {
		const media = window.matchMedia(`(${matchMediaQuery})`);
		media.addEventListener("change", updateTarget);

		// Check on mount (callback is not called until a change occurs)
		setTargetReached(media.matches);

		return () => media.removeEventListener("change", updateTarget);
	}, [matchMediaQuery, updateTarget]);

	// Return false during SSR, actual value after hydration
	return targetReached ?? false;
};
