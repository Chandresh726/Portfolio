"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ThemeContextProps } from "types";

export function ThemeContext({ children }: ThemeContextProps) {
	return (
		<MotionConfig reducedMotion="user">
			<LazyMotion features={domAnimation} strict>
				<ThemeProvider attribute="class">{children}</ThemeProvider>
			</LazyMotion>
		</MotionConfig>
	);
}
