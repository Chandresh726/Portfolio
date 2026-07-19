"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PortraitArtwork } from "./PortraitArtwork";

export function PortraitTiltMotion() {
	const boundsRef = useRef<DOMRect | null>(null);
	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const x = useSpring(rawX, { stiffness: 150, damping: 15 });
	const y = useSpring(rawY, { stiffness: 150, damping: 15 });
	const reset = () => {
		boundsRef.current = null;
		rawX.set(0);
		rawY.set(0);
	};

	return (
		<motion.div
			className="relative"
			style={{ x, y }}
			onPointerEnter={(event) => {
				if (event.pointerType === "mouse")
					boundsRef.current = event.currentTarget.getBoundingClientRect();
			}}
			onPointerMove={(event) => {
				if (event.pointerType !== "mouse") return;
				const bounds = boundsRef.current;
				if (!bounds) return;
				rawX.set((event.clientX - bounds.left - bounds.width / 2) * 0.08);
				rawY.set((event.clientY - bounds.top - bounds.height / 2) * 0.08);
			}}
			onPointerLeave={reset}
			onPointerCancel={reset}
		>
			<PortraitArtwork />
		</motion.div>
	);
}
