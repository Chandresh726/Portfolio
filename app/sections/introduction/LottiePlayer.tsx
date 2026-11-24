"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDocumentVisible } from "hooks/use-document-visible";
import { useReducedMotion } from "framer-motion";
import { LottieLight, type LottieHandle } from "lottie-react";

export default function LottiePlayer({ animationData }: { animationData: object }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const lottieRef = useRef<LottieHandle>(null);
	const reduceMotion = useReducedMotion();
	const [isIntersecting, setIsIntersecting] = useState(true);
	const documentVisible = useDocumentVisible();

	const syncPlayback = useCallback(() => {
		if (reduceMotion) {
			lottieRef.current?.stop();
			return;
		}
		if (isIntersecting && documentVisible) lottieRef.current?.play();
		else lottieRef.current?.pause();
	}, [documentVisible, isIntersecting, reduceMotion]);

	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;
		const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting));
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	useEffect(syncPlayback, [syncPlayback]);

	return (
		<div ref={containerRef} className="w-full">
			<LottieLight
				lottieRef={lottieRef}
				loop
				autoplay={false}
				src={animationData}
				className="w-full aspect-square"
				subscriptions={{ ready: syncPlayback }}
			/>
		</div>
	);
}
