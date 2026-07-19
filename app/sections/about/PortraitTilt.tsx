"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { PortraitArtwork } from "./PortraitArtwork";

const POINTER_QUERY =
	"(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const PortraitTiltMotion = dynamic(
	() => import("./PortraitTiltMotion").then((module) => module.PortraitTiltMotion),
	{
		ssr: false,
		loading: () => <PortraitStatic />
	}
);

function PortraitStatic() {
	return (
		<div className="relative">
			<PortraitArtwork />
		</div>
	);
}

export function PortraitTilt() {
	const [canTilt, setCanTilt] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(POINTER_QUERY);
		const updateMatch = () => setCanTilt(mediaQuery.matches);
		updateMatch();
		mediaQuery.addEventListener("change", updateMatch);
		return () => mediaQuery.removeEventListener("change", updateMatch);
	}, []);

	return canTilt ? <PortraitTiltMotion /> : <PortraitStatic />;
}
