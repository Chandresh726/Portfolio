"use client";

import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";
import {
	type ComponentPropsWithoutRef,
	type MouseEventHandler,
	useCallback,
	useEffect
} from "react";
import { cn } from "utils/cn";

const switcherClassName =
	"relative flex size-12 shrink-0 items-center justify-center rounded-full text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-light";

type ThemeSwitcherProps = Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick"> & {
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
	const { theme, setTheme, systemTheme } = useTheme();

	const currentTheme = theme === "system" ? systemTheme : theme;

	const toggleTheme = useCallback(() => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	}, [currentTheme, setTheme]);

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

	return (
		<button
			className={cn(
				switcherClassName,
				"hover:bg-surface-interactive disabled:pointer-events-none disabled:opacity-50",
				className
			)}
			onClick={(event) => {
				onClick?.(event);

				if (!event.defaultPrevented) {
					toggleTheme();
				}
			}}
			disabled={disabled}
			aria-label="Toggle theme"
			aria-keyshortcuts={enableShortcut ? "Meta+D Control+D" : undefined}
			{...props}
		>
			<span className="flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
				<BsSun size={20} className="hidden dark:block" />
				<BsMoon size={20} className="block dark:hidden" />
			</span>
		</button>
	);
};
