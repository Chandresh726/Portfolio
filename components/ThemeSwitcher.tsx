"use client";

import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";
import { type MouseEventHandler, useCallback, useEffect, useState } from "react";
import { type HTMLMotionProps, motion } from "framer-motion";
import { cn } from "utils/cn";

const spring = {
	type: "spring" as const,
	stiffness: 700,
	damping: 30
};

type ThemeSwitcherProps = Omit<HTMLMotionProps<"button">, "children" | "onClick"> & {
	enableShortcut?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const isEditableTarget = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	return (
		target.isContentEditable ||
		target.tagName === "INPUT" ||
		target.tagName === "TEXTAREA" ||
		target.tagName === "SELECT"
	);
};

export const ThemeSwitcher = ({
	className,
	enableShortcut = false,
	onClick,
	disabled,
	...props
}: ThemeSwitcherProps) => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();

	const currentTheme = theme === "system" ? systemTheme : theme;

	const toggleTheme = useCallback(() => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	}, [currentTheme, setTheme]);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!enableShortcut) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			const isThemeShortcut = event.key.toLowerCase() === "d" && (event.metaKey || event.ctrlKey);

			if (!isThemeShortcut || isEditableTarget(event.target)) {
				return;
			}

			event.preventDefault();
			toggleTheme();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [enableShortcut, toggleTheme]);

	if (!mounted) {
		return null;
	}

	return (
		<motion.button
			className={cn(
				"relative flex size-12 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-interactive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-light disabled:pointer-events-none disabled:opacity-50",
				className
			)}
			onClick={(event) => {
				onClick?.(event);

				if (!event.defaultPrevented) {
					toggleTheme();
				}
			}}
			disabled={disabled}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={spring}
			aria-label="Toggle theme"
			aria-keyshortcuts={enableShortcut ? "Meta+D Control+D" : undefined}
			{...props}
		>
			<motion.div
				className="flex size-5 shrink-0 items-center justify-center"
				initial={{ rotate: 0 }}
				animate={{ rotate: currentTheme === "dark" ? 360 : 0 }}
				transition={spring}
			>
				{currentTheme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
			</motion.div>
		</motion.button>
	);
};
