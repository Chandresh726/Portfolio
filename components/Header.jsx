"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Logo, Menu, ConnectMedia, MobileMenu, ThemeSwitcher } from "components";
import { useMediaQuery } from "utils";

export function AppHeader() {
	const isMobile = useMediaQuery();

	return (
		<LazyMotion features={domAnimation}>
			<m.header
				className="pt-5 pb-5 sticky top-0 z-10 bg-inherit shadow-sm"
				initial={{ y: "-200%", opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1.2, ease: [0.17, 0.55, 0.55, 1] }}
			>
				<div className="container-md">
					<div className="flex justify-between items-center gap-3">
						<Logo />
						{isMobile ? <MobileMenu /> : <Menu />}
						<div className="flex items-center gap-5">
							{!isMobile && <ConnectMedia />}
							<ThemeSwitcher />
						</div>
					</div>
				</div>
			</m.header>
		</LazyMotion>
	);
}
