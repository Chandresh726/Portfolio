"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { ConnectMedia, ScrollTop } from "components";

export function AppFooter() {
	const footerRef = useRef(null);
	const isInView = useInView(footerRef, { 
		once: true,
		amount: 0.1 // Only need to see 10% of element
	});
	const year = new Date().getFullYear();

	return (
		<LazyMotion features={domAnimation}>
			<m.footer
				ref={footerRef}
				className="container-md py-10 mt-5 relative before:absolute before:top-0 before:left-4 before:w-[calc(100%-16px)] before:h-[1px] before:bg-gray-100"
				initial={{ y: 50, opacity: 0 }}
				animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
				transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
			>
				<div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5">
					<p className="font-light">Copyright &copy; {year} Chandresh Kumar</p>
					<ScrollTop />
					<ConnectMedia />
				</div>
			</m.footer>
		</LazyMotion>
	);
}
