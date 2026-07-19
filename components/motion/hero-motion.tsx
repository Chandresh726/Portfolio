"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "hooks/use-media-query";
import { cn } from "utils/cn";

const NOOP = () => {};
const HeroVisualReadyContext = createContext<() => void>(NOOP);

export function useHeroVisualReady() {
	return useContext(HeroVisualReadyContext);
}

export function HeroMotion({ copy, visual }: { copy: ReactNode; visual: ReactNode }) {
	const [visualReady, setVisualReady] = useState(false);
	const [started, setStarted] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const reduceMotion = useReducedMotion();
	const markVisualReady = useCallback(() => setVisualReady(true), []);

	useEffect(() => {
		if (started || isDesktop === undefined) return;
		if (reduceMotion || !isDesktop || visualReady) {
			setStarted(true);
			return;
		}

		const timeoutId = window.setTimeout(() => setStarted(true), 1000);
		return () => window.clearTimeout(timeoutId);
	}, [isDesktop, reduceMotion, started, visualReady]);

	return (
		<HeroVisualReadyContext.Provider value={markVisualReady}>
			<div
				className={cn(
					"hero-motion grid grid-cols-1 md:grid-cols-[1fr_0.4fr] lg:grid-cols-[1fr_0.6fr] gap-4 items-center",
					started && "hero-motion--ready"
				)}
			>
				<div className="hero-copy-motion">{copy}</div>
				<div className="hero-visual-motion intro-lottie-stage hidden md:grid" aria-hidden="true">
					{visual}
				</div>
			</div>
		</HeroVisualReadyContext.Provider>
	);
}
