"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ConnectMedia, ScrollTop } from "components";

export function AppFooter() {
	const footerRef = useRef(null);
	const isInView = useInView(footerRef, {
		once: true,
		amount: 0.1
	});
	const year = new Date().getFullYear();

	return (
		<motion.footer
			ref={footerRef}
			className="w-full py-4 mt-2"
			initial={{ y: 50, opacity: 0 }}
			animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
			transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] as const }}
		>
			<div className="container-md">
				<div className="border-t border-divider pt-4" />
				<div className="flex flex-row justify-between items-center">
					<div className="flex-1 flex justify-start">
						<ConnectMedia />
					</div>
					<div className="hidden md:flex flex-1 justify-center">
						<ScrollTop />
					</div>
					<div className="flex-1 flex flex-col items-end gap-2">
						<p className="font-light">Copyright &copy; {year}</p>
						<div className="hidden md:flex gap-4 text-sm text-text-muted">
							<a href="/sitemap.xml" className="hover:text-on-surface transition-colors">
								Sitemap
							</a>
							<span>•</span>
							<a href="/rss.xml" className="hover:text-on-surface transition-colors">
								RSS
							</a>
						</div>
					</div>
				</div>
			</div>
		</motion.footer>
	);
}
