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
			className="container-md py-10 mt-5 relative before:absolute before:top-0 before:left-4 before:w-[calc(100%-16px)] before:h-[1px] before:bg-gray-100"
			initial={{ y: 50, opacity: 0 }}
			animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
			transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
		>
			<div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-10 md:gap-0">
				<div className="w-full md:w-1/3 flex justify-center md:justify-start">
					<ConnectMedia />
				</div>
				<div className="w-full md:w-1/3 flex justify-center md:justify-center">
					<ScrollTop />
				</div>
				<div className="w-full md:w-1/3 flex justify-center md:justify-end">
					<p className="font-light">Copyright &copy; {year}</p>
				</div>
			</div>
		</motion.footer>
	);
}
