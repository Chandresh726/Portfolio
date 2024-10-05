import { Suspense } from "react";
import { AppHeader, AppFooter, AppMetadata } from "components";
import Loading from "./loading";
import "styles/globals.css";
import { ThemeContext } from "context";
import { Analytics } from "@vercel/analytics/react"

export const metadata = { ...AppMetadata };

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ThemeContext>
					<AppHeader />
					<Suspense fallback={<Loading />}>
						{children}
						<Analytics />
					</Suspense>
					<AppFooter />
				</ThemeContext>
			</body>
		</html>
	);
}
