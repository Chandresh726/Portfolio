"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeContextProps } from "types";

export function ThemeContext({ children }: ThemeContextProps) {
	return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
