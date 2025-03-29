"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { initial, animate, exit, transition } from "utils/motions";
import { SITE_ROUTES, SITE_STRINGS } from "../constants";

export function Logo() {
	const pathname = usePathname();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<LazyMotion features={domAnimation}>
			<m.h3
				className="text-xl md:text-2xl font-bold cursor-pointer"
				initial={initial}
				animate={animate}
				exit={exit}
				transition={transition}
				onClick={scrollToTop}
			>
				{(pathname === SITE_ROUTES.projects || pathname === SITE_ROUTES.resume) ? (
					<Link href={SITE_ROUTES.home} aria-label="Go to home page" role="link">
						{SITE_STRINGS.textLogo}
					</Link>
				) : (
					<>{SITE_STRINGS.textLogo}</>
				)}
			</m.h3>
		</LazyMotion>
	);
}
