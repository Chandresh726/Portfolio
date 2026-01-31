"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { HeadingDividerProps } from "types";

export function HeadingDivider({ title = "" }: HeadingDividerProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<header className="flex items-center">
			<motion.h2
				ref={ref}
				tabIndex={0}
				initial={{ opacity: 0 }}
				animate={isInView ? { opacity: 1 } : { opacity: 0 }}
				transition={{ delay: 1 }}
				className="heading-divider"
			>
				{title}
			</motion.h2>
		</header>
	);
}
