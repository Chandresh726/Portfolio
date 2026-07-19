"use client";

import { Children, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "utils/cn";
import { useMediaQuery } from "hooks/use-media-query";

const VIEWPORT = { once: true, margin: "0px 0px -80px 0px", amount: 0.12 } as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
	hidden: { opacity: 0, y: 36 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.68, ease: EASE_OUT, delay }
	})
};

const stackItemVariants: Variants = {
	hidden: { opacity: 0, y: 56, scale: 0.985 },
	visible: ({ index, columns }: { index: number; columns: number }) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.72,
			delay: 0.12 + Math.floor(index / columns) * 0.13,
			ease: EASE_OUT
		}
	})
};

const groupVariants: Variants = {
	hidden: {},
	visible: {}
};

interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
	return (
		<motion.div
			className={cn("motion-reveal", className)}
			custom={delay}
			variants={revealVariants}
			initial="hidden"
			whileInView="visible"
			viewport={VIEWPORT}
		>
			{children}
		</motion.div>
	);
}

interface RevealGroupProps {
	children: ReactNode;
	className?: string;
	itemClassName?: string;
	columns?: {
		base?: number;
		sm?: number;
		md?: number;
		lg?: number;
	};
}

type RevealGroupContentProps = Omit<RevealGroupProps, "columns"> & { columnCount: number };

function RevealGroupContent({
	children,
	className,
	itemClassName,
	columnCount
}: RevealGroupContentProps) {
	return (
		<motion.div
			className={cn("motion-reveal-group", className)}
			variants={groupVariants}
			initial="hidden"
			whileInView="visible"
			viewport={VIEWPORT}
		>
			{Children.toArray(children).map((child, index) => (
				<motion.div
					key={index}
					className={cn("motion-reveal-item min-w-0", itemClassName)}
					custom={{ index, columns: columnCount }}
					variants={stackItemVariants}
				>
					{child}
				</motion.div>
			))}
		</motion.div>
	);
}

function ResponsiveRevealGroup({ columns, ...props }: RevealGroupProps) {
	const isSm = useMediaQuery("(min-width: 640px)") ?? false;
	const isMd = useMediaQuery("(min-width: 768px)") ?? false;
	const isLg = useMediaQuery("(min-width: 1024px)") ?? false;
	const columnCount =
		(isLg ? columns?.lg : undefined) ??
		(isMd ? columns?.md : undefined) ??
		(isSm ? columns?.sm : undefined) ??
		columns?.base ??
		1;

	return <RevealGroupContent {...props} columnCount={columnCount} />;
}

export function RevealGroup({ columns, ...props }: RevealGroupProps) {
	return columns ? (
		<ResponsiveRevealGroup {...props} columns={columns} />
	) : (
		<RevealGroupContent {...props} columnCount={1} />
	);
}
