"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import type { GreetingLottieProps } from "types";

export default function LottiePlayer({ animationPath }: GreetingLottieProps) {
	const [animationData, setAnimationData] = useState<object | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		fetch(animationPath, { signal: controller.signal })
			.then((response) => {
				if (!response.ok) throw new Error(`Animation request failed: ${response.status}`);
				return response.json() as Promise<object>;
			})
			.then(setAnimationData)
			.catch((error: unknown) => {
				if (error instanceof DOMException && error.name === "AbortError") return;
				console.error("Failed to load Lottie animation");
			});

		return () => controller.abort();
	}, [animationPath]);

	return animationData ? (
		<div className="animate-section-in">
			<Lottie loop autoplay animationData={animationData} />
		</div>
	) : null;
}
