"use client";

import { useEffect, useState } from "react";
import { calculateAgeYears } from "utils/age";

const UPDATE_INTERVAL_MS = 1_000;

export function AgeCounter({ initialYears }: { initialYears: string }) {
	const [years, setYears] = useState(initialYears);

	useEffect(() => {
		let interval: number | null = null;
		const updateYears = () => setYears(calculateAgeYears());
		const stopInterval = () => {
			if (interval === null) return;
			window.clearInterval(interval);
			interval = null;
		};
		const startInterval = () => {
			if (interval !== null || document.visibilityState !== "visible") return;
			interval = window.setInterval(updateYears, UPDATE_INTERVAL_MS);
		};
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				updateYears();
				startInterval();
			} else {
				stopInterval();
			}
		};

		updateYears();
		startInterval();
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			stopInterval();
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return (
		<div className="text-base sm:text-lg lg:text-xl font-medium min-h-[28px]">
			<span className="tabular-nums">been on earth for {years} years</span>
		</div>
	);
}
