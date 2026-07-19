"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from "components/ui/dialog";
import { cn } from "utils/cn";
import { NAVIGATION_ITEMS, SOCIAL_MEDIA } from "@/constants";

function HamburgerIcon({ open }: { open: boolean }) {
	return (
		<span className="relative block w-6 h-5" aria-hidden="true">
			<span
				className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-on-surface transition-transform duration-200 ${
					open ? "translate-y-[9px] rotate-45" : ""
				}`}
			/>
			<span
				className={`absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-on-surface transition-[opacity,transform] duration-200 ${
					open ? "opacity-0 scale-x-0" : ""
				}`}
			/>
			<span
				className={`absolute left-0 bottom-0 h-0.5 w-6 rounded-full bg-on-surface transition-transform duration-200 ${
					open ? "-translate-y-[9px] -rotate-45" : ""
				}`}
			/>
		</span>
	);
}

function MobileHeader({ open, closeButton = false }: { open: boolean; closeButton?: boolean }) {
	const button = (
		<button
			className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-interactive transition-colors"
			aria-label={open ? "Close menu" : "Open menu"}
		>
			<HamburgerIcon open={open} />
		</button>
	);

	const homeLink = (
		<Link href="/" className="flex items-center" aria-label="Chandresh Kumar home">
			<span className="relative size-9 rounded-full overflow-hidden">
				<Image src="/avatar.webp" alt="" fill sizes="36px" className="object-cover" />
			</span>
		</Link>
	);

	return (
		<header className="h-16 bg-surface/90 backdrop-blur-xl border-b border-outline/20">
			<div className="flex items-center justify-between h-full px-4">
				{closeButton ? <DialogClose asChild>{homeLink}</DialogClose> : homeLink}
				{closeButton ? (
					<DialogClose asChild>{button}</DialogClose>
				) : (
					<DialogTrigger asChild>{button}</DialogTrigger>
				)}
			</div>
		</header>
	);
}

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const firstLinkRef = useRef<HTMLAnchorElement>(null);
	const pathname = usePathname();

	useEffect(() => setOpen(false), [pathname]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");
		const closeOnDesktop = () => {
			if (mediaQuery.matches) setOpen(false);
		};
		closeOnDesktop();
		mediaQuery.addEventListener("change", closeOnDesktop);
		return () => mediaQuery.removeEventListener("change", closeOnDesktop);
	}, []);

	return (
		<div className="md:hidden">
			<Dialog open={open} onOpenChange={setOpen}>
				<div className="fixed top-0 left-0 right-0 h-16 z-50">
					<MobileHeader open={open} />
				</div>

				<DialogContent
					aria-modal="true"
					className="mobile-menu-panel left-0 top-0 h-dvh w-screen translate-x-0 translate-y-0 bg-surface text-on-surface flex flex-col"
					onOpenAutoFocus={(event) => {
						event.preventDefault();
						firstLinkRef.current?.focus();
					}}
				>
					<DialogTitle className="sr-only">Primary navigation</DialogTitle>
					<DialogDescription className="sr-only">
						Navigate portfolio sections, social profiles and theme settings.
					</DialogDescription>
					<MobileHeader open closeButton />
					<div className="flex-1 overflow-y-auto overscroll-contain pt-6 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
						<nav aria-label="Primary" className="flex min-h-full flex-col">
							<div className="flex-1">
								<div className="space-y-1">
									{NAVIGATION_ITEMS.map((item, index) => (
										<Link
											key={item.href}
											ref={index === 0 ? firstLinkRef : undefined}
											href={item.href}
											onClick={() => setOpen(false)}
											className={cn(
												"flex items-center gap-4 px-4 py-3 rounded-xl",
												"text-on-surface font-medium",
												"hover:bg-surface-interactive active:bg-surface-interactive",
												"mobile-menu-item transition-colors min-h-11"
											)}
											style={{ "--menu-item-index": index } as CSSProperties}
										>
											<item.icon className="size-5 text-blue-light" />
											<span>{item.label}</span>
										</Link>
									))}
								</div>

								<div className="my-6 h-px bg-outline/30" />
								<p className="px-4 py-2 text-sm text-text-muted font-medium uppercase tracking-wide">
									Connect
								</p>
								<div className="grid grid-cols-2 gap-2">
									{SOCIAL_MEDIA.map((item, index) => (
										<a
											key={item.href}
											href={item.href}
											target={item.external ? "_blank" : undefined}
											rel={item.external ? "noopener noreferrer" : undefined}
											onClick={() => setOpen(false)}
											className="mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface hover:bg-surface-interactive active:bg-surface-interactive transition-colors min-h-11"
											style={
												{
													"--menu-item-index": NAVIGATION_ITEMS.length + index
												} as CSSProperties
											}
										>
											<item.icon className="size-5" style={{ color: item.color }} />
											<span className="text-sm">{item.label}</span>
										</a>
									))}
								</div>
							</div>

							<div
								className="mobile-menu-item pt-4 mt-6 border-t border-outline/30"
								style={
									{
										"--menu-item-index": NAVIGATION_ITEMS.length + SOCIAL_MEDIA.length
									} as CSSProperties
								}
							>
								<div className="flex items-center justify-between px-4 py-1">
									<span className="text-sm text-text-muted font-medium">Theme</span>
									<ThemeSwitcher />
								</div>
							</div>
						</nav>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
