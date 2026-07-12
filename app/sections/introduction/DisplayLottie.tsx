"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import type { GreetingLottieProps } from "types";

const DESKTOP_QUERY = "(min-width: 768px)";

interface PlayerProps {
	animationData: object;
}

interface ReadyPlayer {
	Component: ComponentType<PlayerProps>;
	animationData: object;
}

export default function GreetingLottie({ animationPath }: GreetingLottieProps) {
	const [player, setPlayer] = useState<ReadyPlayer | null>(null);

	useEffect(() => {
		const mediaQuery = window.matchMedia(DESKTOP_QUERY);
		let active = true;
		let requestId = 0;
		let controller: AbortController | null = null;

		const updateMatch = () => {
			requestId += 1;
			const currentRequest = requestId;
			controller?.abort();
			controller = null;

			if (!mediaQuery.matches) {
				setPlayer(null);
				return;
			}

			controller = new AbortController();
			const signal = controller.signal;

			void Promise.all([
				import("./LottiePlayer"),
				fetch(animationPath, { signal }).then((response) => {
					if (!response.ok) {
						throw new Error(`Animation request failed: ${response.status}`);
					}
					return response.json() as Promise<object>;
				})
			])
				.then(([module, animationData]) => {
					if (!active || currentRequest !== requestId) return;
					setPlayer({ Component: module.default, animationData });
				})
				.catch((error: unknown) => {
					if (error instanceof DOMException && error.name === "AbortError") return;
					console.error("Failed to load Lottie animation");
				});
		};

		updateMatch();
		mediaQuery.addEventListener("change", updateMatch);

		return () => {
			active = false;
			requestId += 1;
			controller?.abort();
			mediaQuery.removeEventListener("change", updateMatch);
		};
	}, [animationPath]);

	if (!player) return null;

	const { Component, animationData } = player;
	return <Component animationData={animationData} />;
}
