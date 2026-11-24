"use client";

import { useEffect, useState } from "react";
import { useDocumentVisible } from "hooks/use-document-visible";
import { calculateAgeYears } from "utils/age";

const UPDATE_INTERVAL_MS = 1_000;

export function AgeCounter({ initialYears }: { initialYears: string }) {
	const [years, setYears] = useState(initialYears);

	const documentVisible = useDocumentVisible();

	useEffect(() => {
		if (!documentVisible) return;
		const updateYears = () => setYears(calculateAgeYears());
		updateYears();
		const interval = window.setInterval(updateYears, UPDATE_INTERVAL_MS);
		return () => window.clearInterval(interval);
	}, [documentVisible]);

	return (
		<div className="text-base sm:text-lg lg:text-xl font-medium min-h-[28px]">
			<span className="tabular-nums">been on earth for {years} years</span>
		</div>
	);
}
