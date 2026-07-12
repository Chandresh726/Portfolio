"use client";

import { useEffect, useState } from "react";

const calculateYears = () => {
	const birthDate = new Date("2002-05-08T00:00:00");
	const now = new Date();
	const ageInYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
	return ageInYears.toFixed(8);
};

const UPDATE_INTERVAL_MS = 1_000;

export function AgeCounter() {
	const [years, setYears] = useState<string | null>(null);

	useEffect(() => {
		const updateYears = () => setYears(calculateYears());
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") updateYears();
		};

		updateYears();
		const interval = setInterval(updateYears, UPDATE_INTERVAL_MS);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			clearInterval(interval);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	if (years === null) {
		return (
			<div className="text-base sm:text-lg lg:text-xl font-medium min-h-[28px]">
				<span className="tabular-nums opacity-0">been on earth for 00.00000000 years</span>
			</div>
		);
	}

	return (
		<div className="text-base sm:text-lg lg:text-xl font-medium min-h-[28px]">
			<span className="tabular-nums">been on earth for {years} years</span>
		</div>
	);
}
