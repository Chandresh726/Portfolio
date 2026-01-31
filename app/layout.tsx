import { Suspense } from "react";
import { Inter } from "next/font/google";
import { AppHeader, AppFooter, AppMetadata, JsonLd } from "components";
import Loading from "./loading";
import "styles/globals.css";
import { ThemeContext } from "context";
import { Analytics } from "@vercel/analytics/react";
import type { LayoutProps } from "types";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter"
});

export const metadata = { ...AppMetadata };

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning className={inter.variable}>
			<head>
				<JsonLd />
			</head>
			<body className={inter.className}>
				<a
					href="#intro"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-light focus:text-white focus:rounded"
				>
					Skip to content
				</a>
				<ThemeContext>
					<AppHeader />
					<main>
						<Suspense fallback={<Loading />}>
							{children}
							<Analytics />
						</Suspense>
					</main>
					<AppFooter />
				</ThemeContext>
			</body>
		</html>
	);
}
