import Link from "next/link";
import Image from "next/image";
import type { RefObject } from "react";

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

export function MobileHeader({
	open,
	onMenuClick,
	onHomeClick,
	triggerRef,
	panelId
}: {
	open: boolean;
	onMenuClick: () => void;
	onHomeClick?: () => void;
	triggerRef?: RefObject<HTMLButtonElement | null>;
	panelId?: string;
}) {
	const button = (
		<button
			ref={triggerRef}
			onClick={onMenuClick}
			aria-expanded={open}
			aria-controls={panelId}
			aria-haspopup="dialog"
			className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-interactive transition-colors"
			aria-label={open ? "Close menu" : "Open menu"}
		>
			<HamburgerIcon open={open} />
		</button>
	);

	const homeLink = (
		<Link
			onClick={onHomeClick}
			href="/"
			className="flex items-center"
			aria-label="Chandresh Kumar home"
		>
			<span className="relative size-9 rounded-full overflow-hidden">
				<Image src="/avatar.webp" alt="" fill sizes="36px" className="object-cover" />
			</span>
		</Link>
	);

	return (
		<header className="h-16 bg-surface/90 backdrop-blur-xl border-b border-outline/20">
			<div className="flex items-center justify-between h-full px-4">
				{homeLink}
				{button}
			</div>
		</header>
	);
}
