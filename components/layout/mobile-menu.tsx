"use client";

import { useRef, type CSSProperties, type RefObject } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "components/ui/dialog";
import { cn } from "utils/cn";
import { NAVIGATION_ITEMS, SOCIAL_MEDIA } from "@/constants";
import { MobileHeader } from "./mobile-header";

export default function MobileMenu({
	open,
	onOpenChange: setOpen,
	triggerRef,
	panelId
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	triggerRef: RefObject<HTMLButtonElement | null>;
	panelId: string;
}) {
	const firstLinkRef = useRef<HTMLAnchorElement>(null);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				id={panelId}
				onCloseAutoFocus={(event) => {
					event.preventDefault();
					triggerRef.current?.focus();
				}}
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
				<MobileHeader open onMenuClick={() => setOpen(false)} onHomeClick={() => setOpen(false)} />
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
	);
}
