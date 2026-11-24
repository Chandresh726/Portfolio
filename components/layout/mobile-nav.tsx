"use client";

import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileHeader } from "./mobile-header";

const loadMenu = () => import("./mobile-menu");
const MobileMenu = lazy(loadMenu);

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const [requested, setRequested] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelId = useId();
	const pathname = usePathname();
	useEffect(() => setOpen(false), [pathname]);
	const warmMenu = () => {
		void loadMenu().catch(() => {});
	};
	return (
		<div className="md:hidden">
			<div
				className="fixed top-0 left-0 right-0 h-16 z-50"
				onPointerEnter={warmMenu}
				onFocusCapture={warmMenu}
			>
				<MobileHeader
					open={open}
					triggerRef={triggerRef}
					panelId={panelId}
					onMenuClick={() => {
						setRequested(true);
						setOpen((value) => !value);
					}}
				/>
			</div>
			{requested && (
				<Suspense fallback={null}>
					<MobileMenu
						open={open}
						onOpenChange={setOpen}
						triggerRef={triggerRef}
						panelId={panelId}
					/>
				</Suspense>
			)}
		</div>
	);
}
