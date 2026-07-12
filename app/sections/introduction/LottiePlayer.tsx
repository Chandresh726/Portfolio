"use client";

import Lottie from "lottie-react";

export default function LottiePlayer({ animationData }: { animationData: object }) {
	return (
		<div className="intro-lottie-reveal">
			<Lottie loop autoplay animationData={animationData} />
		</div>
	);
}
