"use client";

import { useEffect, useState, MouseEvent } from "react";
import { navigationHeight } from "utils/theme-config";

interface ScrollToReturn {
	scrollToEl: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function useScrollTo(): ScrollToReturn {
	const [height, setHeight] = useState(navigationHeight);

	useEffect(() => {
		const handleResize = () => {
			if (window.matchMedia("(max-width: 480px)").matches) {
				setHeight(56);
			} else {
				setHeight(navigationHeight);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const scrollToEl = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const target = e.currentTarget;
		const hash = target.hash;
		const element = document.querySelector(hash);
		const offsetTop = element ? element.getBoundingClientRect().top + window.scrollY - height : 0;

		window.scroll({
			top: offsetTop,
			behavior: "smooth"
		});
	};

	return { scrollToEl };
}
