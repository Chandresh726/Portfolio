"use client";

import { motion } from "framer-motion";
import { Logo, Menu, ConnectMedia, MobileMenu, ThemeSwitcher } from "components";
import { useMediaQuery } from "utils";

export function AppHeader() {
	const isMobile = useMediaQuery();

	return (
		<motion.header
			className="pt-5 pb-5 sticky top-0 z-10 bg-inherit shadow-sm border-b border-gray-100 dark:border-gray-800"
			initial={{ y: "-200%", opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 1.2, ease: [0.17, 0.55, 0.55, 1] }}
		>
			<div className="container-md">
				<div className="flex justify-between items-center">
					<div className="w-1/3 flex justify-start">
						<Logo />
					</div>
					<div className="w-1/3 flex justify-center">{isMobile ? <MobileMenu /> : <Menu />}</div>
					<div className="w-1/3 flex justify-end items-center gap-5">
						{!isMobile && <ConnectMedia />}
						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</motion.header>
	);
}
