"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import type { GreetingLottieProps } from "types";
import { useHeroVisualReady } from "components/motion/hero-motion";

const ELIGIBLE_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

interface PlayerProps {
	animationData: object;
}

interface ReadyPlayer {
	Component: ComponentType<PlayerProps>;
	animationData: object;
}

export default function GreetingLottie({ animationPath }: GreetingLottieProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [player, setPlayer] = useState<ReadyPlayer | null>(null);
	const markVisualReady = useHeroVisualReady();

	useEffect(() => {
		const mediaQuery = window.matchMedia(ELIGIBLE_QUERY);
		let active = true;
		let nearViewport = false;
		let documentVisible = document.visibilityState === "visible";
		let started = false;
		let requestId = 0;
		let controller: AbortController | null = null;

		const load = () => {
			if (!active || started || !mediaQuery.matches || !nearViewport || !documentVisible) return;
			started = true;
			requestId += 1;
			const currentRequest = requestId;
			controller = new AbortController();
			const signal = controller.signal;

			void Promise.all([
				import("./LottiePlayer"),
				fetch(animationPath, { signal }).then((response) => {
					if (!response.ok) throw new Error(`Animation request failed: ${response.status}`);
					return response.json() as Promise<object>;
				})
			])
				.then(([module, animationData]) => {
					if (!active || currentRequest !== requestId) return;
					setPlayer({ Component: module.default, animationData });
					markVisualReady();
				})
				.catch((error: unknown) => {
					if (error instanceof DOMException && error.name === "AbortError") return;
					started = false;
					console.error("Failed to load Lottie animation", error);
				});
		};

		const scheduleLoad = () => {
			if (!mediaQuery.matches || !nearViewport || !documentVisible || started) return;
			load();
		};

		const updateEligibility = () => {
			if (!mediaQuery.matches) {
				requestId += 1;
				controller?.abort();
				controller = null;
				started = false;
				setPlayer(null);
				return;
			}
			scheduleLoad();
		};

		const updateVisibility = () => {
			documentVisible = document.visibilityState === "visible";
			if (documentVisible) scheduleLoad();
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				nearViewport = entry.isIntersecting;
				if (nearViewport) scheduleLoad();
			},
			{ rootMargin: "200px" }
		);
		if (containerRef.current) observer.observe(containerRef.current);

		updateEligibility();
		mediaQuery.addEventListener("change", updateEligibility);
		document.addEventListener("visibilitychange", updateVisibility);

		return () => {
			active = false;
			requestId += 1;
			controller?.abort();
			observer.disconnect();
			mediaQuery.removeEventListener("change", updateEligibility);
			document.removeEventListener("visibilitychange", updateVisibility);
		};
	}, [animationPath, markVisualReady]);

	const Player = player?.Component;

	return (
		<div ref={containerRef} className="w-full">
			{Player && player ? <Player animationData={player.animationData} /> : null}
		</div>
	);
}
