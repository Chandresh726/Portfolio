"use client";

import { useEffect, useState } from "react";

const calculateYears = () => {
	const birthDate = new Date("2002-05-08T00:00:00");
	const now = new Date();
	const ageInYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
	return ageInYears.toFixed(9);
};

export function AgeCounter() {
	const [years, setYears] = useState<string | null>(null);

	useEffect(() => {
		setYears(calculateYears());

		const interval = setInterval(() => {
			setYears(calculateYears());
		}, 100);

		return () => clearInterval(interval);
	}, []);

	if (years === null) {
		return (
			<div className="text-lg md:text-xl font-medium min-h-[28px]">
				<span className="tabular-nums opacity-0">been on earth for 00.000000000 years</span>
			</div>
		);
	}

	return (
		<div className="text-lg md:text-xl font-medium min-h-[28px]">
			<span className="tabular-nums">been on earth for {years} years</span>
		</div>
	);
}
