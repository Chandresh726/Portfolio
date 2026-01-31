"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import type { GreetingLottieProps } from "types";

const GreetingLottie = ({ animationPath }: GreetingLottieProps) => {
	const [animationData, setAnimationData] = useState<object | null>(null);

	useEffect(() => {
		fetch(animationPath)
			.then((response) => response.json())
			.then((data) => setAnimationData(data))
			.catch((error) => console.error("Failed to load Lottie animation:", error));
	}, [animationPath]);

	if (!animationData) {
		return null;
	}

	return (
		<motion.div
			initial={{ x: -200, opacity: 0 }}
			whileInView={{ x: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.2 }}
		>
			<Lottie loop autoplay animationData={animationData} />
		</motion.div>
	);
};

export default GreetingLottie;
