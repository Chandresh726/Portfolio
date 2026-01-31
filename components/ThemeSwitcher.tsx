"use client";

import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const spring = {
	type: "spring",
	stiffness: 700,
	damping: 30
};

export const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();

	const currentTheme = theme === "system" ? systemTheme : theme;

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	return (
		<motion.button
			className="p-2 rounded-lg hover:scale-110 active:scale-100 transition-transform"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={spring}
			aria-label="Toggle theme"
		>
			<motion.div
				initial={{ rotate: 0 }}
				animate={{ rotate: theme === "dark" ? 360 : 0 }}
				transition={spring}
			>
				{currentTheme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
			</motion.div>
		</motion.button>
	);
};
