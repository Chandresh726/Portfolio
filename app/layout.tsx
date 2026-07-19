import { Inter } from "next/font/google";
import { AppFooter, AppMetadata, JsonLd } from "components";
import { ScrollProgress } from "components/layout/scroll-progress";
import { Navigation } from "components/layout/navigation";
import { RouteScrollReset } from "components/layout/route-scroll-reset";
import "styles/globals.css";
import { ThemeContext } from "context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { LayoutProps } from "types";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter"
});

export const metadata = AppMetadata;

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning className={inter.variable}>
			<head>
				<JsonLd />
				<script
					dangerouslySetInnerHTML={{
						__html:
							'if("scrollRestoration" in history){history.scrollRestoration="manual"}scrollTo(0,0)'
					}}
				/>
			</head>
			<body className={`${inter.className} pt-16 md:pt-14 flex flex-col min-h-screen`}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-light focus:text-white focus:rounded"
				>
					Skip to content
				</a>
				<ThemeContext>
					<RouteScrollReset />
					<ScrollProgress />
					<main id="main-content" tabIndex={-1} className="flex-1">
						{children}
					</main>
					<AppFooter />
					<Navigation />
					<Analytics />
					<SpeedInsights />
				</ThemeContext>
			</body>
		</html>
	);
}
