"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
	const subscribe = useCallback(
		(onChange: () => void) => {
			const mediaQuery = window.matchMedia(query);
			mediaQuery.addEventListener("change", onChange);
			return () => mediaQuery.removeEventListener("change", onChange);
		},
		[query]
	);

	const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
	const getServerSnapshot = useCallback(() => undefined, []);

	return useSyncExternalStore<boolean | undefined>(subscribe, getSnapshot, getServerSnapshot);
}
