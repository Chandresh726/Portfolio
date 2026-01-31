"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SITE_ROUTES, SITE_STRINGS } from "../constants";

export function Logo() {
	const pathname = usePathname();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<motion.h3
			className="text-xl md:text-2xl font-bold cursor-pointer"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ delay: 1 }}
			onClick={scrollToTop}
			aria-label="Home"
		>
			{pathname === SITE_ROUTES.projects || pathname === SITE_ROUTES.resume ? (
				<Link href={SITE_ROUTES.home} aria-label="Go to home page" role="link">
					{SITE_STRINGS.textLogo}
				</Link>
			) : (
				<>{SITE_STRINGS.textLogo}</>
			)}
		</motion.h3>
	);
}
