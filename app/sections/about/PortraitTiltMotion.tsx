"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { PortraitArtwork } from "./PortraitArtwork";

export function PortraitTiltMotion() {
	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const x = useSpring(rawX, { stiffness: 150, damping: 15 });
	const y = useSpring(rawY, { stiffness: 150, damping: 15 });

	return (
		<motion.div
			className="relative cursor-pointer"
			style={{ x, y }}
			onPointerMove={(event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				rawX.set((event.clientX - rect.left - rect.width / 2) * 0.08);
				rawY.set((event.clientY - rect.top - rect.height / 2) * 0.08);
			}}
			onPointerLeave={() => {
				rawX.set(0);
				rawY.set(0);
			}}
		>
			<PortraitArtwork />
		</motion.div>
	);
}
