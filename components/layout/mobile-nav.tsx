"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { cn } from "utils/cn";
import Link from "next/link";
import { Home, Briefcase, FolderOpen, User, Code } from "lucide-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const navItems = [
	{ href: "/#intro", icon: Home, label: "Home" },
	{ href: "/#experience", icon: Briefcase, label: "Experience" },
	{ href: "/#projects", icon: FolderOpen, label: "Projects" },
	{ href: "/#about", icon: User, label: "About" },
	{ href: "/#tech", icon: Code, label: "Tech" }
];

const socialLinks = [
	{
		href: "https://github.com/Chandresh726",
		icon: BsGithub,
		label: "GitHub",
		color: "#2DBA4E"
	},
	{
		href: "https://www.linkedin.com/in/kchandresh726/",
		icon: BsLinkedin,
		label: "LinkedIn",
		color: "#0A66C2"
	},
	{
		href: "https://twitter.com/Chandresh_726",
		icon: FaXTwitter,
		label: "Twitter",
		color: "#1DA1F2"
	},
	{
		href: "mailto:kchandresh726@gmail.com",
		icon: HiOutlineMail,
		label: "Email",
		color: "#E4405F"
	}
];

const menuVariants = {
	closed: {
		x: "100%",
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 40
		}
	},
	open: {
		x: 0,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 40
		}
	}
};

const backdropVariants = {
	closed: { opacity: 0 },
	open: { opacity: 1 }
};

const navItemVariants = {
	closed: { x: 20, opacity: 0 },
	open: (i: number) => ({
		x: 0,
		opacity: 1,
		transition: {
			delay: i * 0.05,
			duration: 0.3
		}
	})
};

export function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = useCallback(() => setIsOpen(false), []);

	// Handle ESC key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				closeMenu();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, closeMenu]);

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<div className="md:hidden">
			{/* Fixed Top Navbar */}
			<motion.header
				className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline/20"
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: "spring", stiffness: 100, damping: 20 }}
			>
				<div className="flex items-center justify-between h-full px-4">
					<Link
						href="/"
						className="text-lg font-bold text-on-surface"
						onClick={closeMenu}
					>
						Chandresh
					</Link>

					{/* Hamburger Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-interactive transition-colors"
						aria-label={isOpen ? "Close menu" : "Open menu"}
						aria-expanded={isOpen}
					>
						<div className="w-6 h-5 relative flex flex-col justify-between">
							<motion.span
								className="absolute w-6 h-0.5 bg-on-surface rounded-full"
								animate={{
									top: isOpen ? "50%" : "0%",
									rotate: isOpen ? 45 : 0,
									translateY: isOpen ? "-50%" : "0%"
								}}
								transition={{ duration: 0.3 }}
							/>
							<motion.span
								className="absolute top-1/2 -translate-y-1/2 w-6 h-0.5 bg-on-surface rounded-full"
								animate={{
									opacity: isOpen ? 0 : 1,
									scaleX: isOpen ? 0 : 1
								}}
								transition={{ duration: 0.2 }}
							/>
							<motion.span
								className="absolute w-6 h-0.5 bg-on-surface rounded-full"
								animate={{
									bottom: isOpen ? "50%" : "0%",
									rotate: isOpen ? -45 : 0,
									translateY: isOpen ? "50%" : "0%"
								}}
								transition={{ duration: 0.3 }}
							/>
						</div>
					</button>
				</div>
			</motion.header>

			{/* Backdrop */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
						variants={backdropVariants}
						initial="closed"
						animate="open"
						exit="closed"
						onClick={closeMenu}
					/>
				)}
			</AnimatePresence>

			{/* Slide-in Menu Panel */}
			<AnimatePresence>
				{isOpen && (
					<motion.nav
						className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-surface border-l border-outline/20 shadow-2xl"
						variants={menuVariants}
						initial="closed"
						animate="open"
						exit="closed"
					>
						<div className="flex flex-col h-full pt-20 pb-8 px-6">
							{/* Navigation Links */}
							<div className="flex-1">
								<nav className="space-y-1">
									{navItems.map((item, i) => (
										<motion.div
											key={item.href}
											variants={navItemVariants}
											initial="closed"
											animate="open"
											custom={i}
										>
											<Link
												href={item.href}
												onClick={closeMenu}
												className={cn(
													"flex items-center gap-4 px-4 py-3 rounded-xl",
													"text-on-surface font-medium",
													"hover:bg-surface-interactive active:bg-surface-interactive",
													"transition-colors min-h-[44px]"
												)}
											>
												<item.icon className="size-5 text-blue-light" />
												<span>{item.label}</span>
											</Link>
										</motion.div>
									))}
								</nav>

								{/* Divider */}
								<div className="my-6 h-px bg-outline/30" />

								{/* Social Links */}
								<motion.div
									className="space-y-1"
									variants={navItemVariants}
									initial="closed"
									animate="open"
									custom={navItems.length}
								>
									<p className="px-4 py-2 text-sm text-text-muted font-medium uppercase tracking-wide">
										Connect
									</p>
									<div className="grid grid-cols-2 gap-2">
										{socialLinks.map((item) => (
											<a
												key={item.href}
												href={item.href}
												target="_blank"
												rel="noopener noreferrer"
												onClick={closeMenu}
												className={cn(
													"flex items-center gap-3 px-4 py-3 rounded-xl",
													"text-on-surface",
													"hover:bg-surface-interactive active:bg-surface-interactive",
													"transition-colors min-h-[44px]"
												)}
											>
												<item.icon
													className="size-5"
													style={{ color: item.color }}
												/>
												<span className="text-sm">{item.label}</span>
											</a>
										))}
									</div>
								</motion.div>
							</div>

							{/* Theme Switcher at bottom */}
							<motion.div
								className="pt-6 border-t border-outline/30"
								variants={navItemVariants}
								initial="closed"
								animate="open"
								custom={navItems.length + 1}
							>
								<div className="flex items-center justify-between px-4 py-2">
									<span className="text-sm text-text-muted font-medium">
										Theme
									</span>
									<ThemeSwitcher />
								</div>
							</motion.div>
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</div>
	);
}
