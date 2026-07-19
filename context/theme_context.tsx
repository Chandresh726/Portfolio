"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ThemeContextProps } from "types";

export function ThemeContext({ children }: ThemeContextProps) {
	return (
		<MotionConfig reducedMotion="user">
			<ThemeProvider attribute="class">{children}</ThemeProvider>
		</MotionConfig>
	);
}
