"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

export default function LottiePlayer({ animationData }: { animationData: object }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const lottieRef = useRef<LottieRefCurrentProps>(null);
	const reduceMotion = useReducedMotion();
	const [isIntersecting, setIsIntersecting] = useState(true);
	const [documentVisible, setDocumentVisible] = useState(true);

	const syncPlayback = useCallback(() => {
		if (reduceMotion) {
			lottieRef.current?.goToAndStop(0, true);
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

	useEffect(() => {
		const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
		updateVisibility();
		document.addEventListener("visibilitychange", updateVisibility);
		return () => document.removeEventListener("visibilitychange", updateVisibility);
	}, []);

	useEffect(syncPlayback, [syncPlayback]);

	return (
		<div ref={containerRef} className="w-full">
			<Lottie
				lottieRef={lottieRef}
				loop
				autoplay={false}
				animationData={animationData}
				onDOMLoaded={syncPlayback}
			/>
		</div>
	);
}
