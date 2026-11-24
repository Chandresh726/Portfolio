"use client";

import * as m from "framer-motion/m";

import {
	Children,
	createContext,
	forwardRef,
	useContext,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState,
	type ReactNode
} from "react";
import {
	useMotionValue,
	useSpring,
	useTransform,
	type HTMLMotionProps,
	type MotionValue
} from "framer-motion";
import { cn } from "utils/cn";
import { useMediaQuery } from "hooks/use-media-query";

interface DockProps {
	className?: string;
	magnification?: number;
	distance?: number;
	children: ReactNode;
}

interface DockContextValue {
	mouseX: MotionValue<number>;
	magnification: number;
	distance: number;
	layoutVersion: string;
	enabled: boolean;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const BASE_SIZE = 48;
const DockContext = createContext<DockContextValue | null>(null);
const DOCK_CLASS = "mx-auto w-max h-full p-1 flex items-center rounded-full border";

const Dock = forwardRef<HTMLDivElement, DockProps>(
	(
		{
			className,
			children,
			magnification = DEFAULT_MAGNIFICATION,
			distance = DEFAULT_DISTANCE,
			...props
		},
		forwardedRef
	) => {
		const dockRef = useRef<HTMLDivElement>(null);
		const mouseX = useMotionValue(Infinity);
		const [viewportVersion, setViewportVersion] = useState(0);
		const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)") ?? false;
		const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)") ?? false;
		const childCount = Children.count(children);
		const layoutVersion = `${childCount}:${viewportVersion}`;

		useImperativeHandle(forwardedRef, () => dockRef.current as HTMLDivElement);

		useEffect(() => {
			let frameId: number | null = null;
			const updateLayout = () => {
				if (frameId !== null) window.cancelAnimationFrame(frameId);
				frameId = window.requestAnimationFrame(() => {
					setViewportVersion((version) => version + 1);
					frameId = null;
				});
			};
			window.addEventListener("resize", updateLayout);
			return () => {
				if (frameId !== null) window.cancelAnimationFrame(frameId);
				window.removeEventListener("resize", updateLayout);
			};
		}, []);

		const enabled = finePointer && !reduceMotion;

		return (
			<DockContext.Provider value={{ mouseX, magnification, distance, layoutVersion, enabled }}>
				<div
					ref={dockRef}
					onPointerMove={(event) => {
						if (enabled && event.pointerType === "mouse") mouseX.set(event.clientX);
					}}
					onPointerLeave={() => mouseX.set(Infinity)}
					{...props}
					className={cn(DOCK_CLASS, className, "max-h-14 sm:max-h-none")}
				>
					{children}
				</div>
			</DockContext.Provider>
		);
	}
);
Dock.displayName = "Dock";

type DockIconProps = Omit<HTMLMotionProps<"div">, "children" | "style"> & {
	children?: ReactNode;
};

function DockIcon({ className, children, ...props }: DockIconProps) {
	const context = useContext(DockContext);
	const slotRef = useRef<HTMLDivElement>(null);
	const centerRef = useRef(0);
	const fallbackMouseX = useMotionValue(Infinity);
	const mouseX = context?.mouseX ?? fallbackMouseX;
	const distance = context?.distance ?? DEFAULT_DISTANCE;
	const magnification = context?.magnification ?? DEFAULT_MAGNIFICATION;

	useLayoutEffect(() => {
		const bounds = slotRef.current?.getBoundingClientRect();
		if (bounds) centerRef.current = bounds.left + bounds.width / 2;
	}, [context?.layoutVersion]);

	const pointerDistance = useTransform(mouseX, (value) => value - centerRef.current);
	const widthTarget = useTransform(
		pointerDistance,
		[-distance, 0, distance],
		[BASE_SIZE, magnification, BASE_SIZE]
	);
	const width = useSpring(widthTarget, { mass: 0.1, stiffness: 170, damping: 16 });

	return (
		<m.div
			ref={slotRef}
			data-dock-enabled={context?.enabled ? "true" : "false"}
			style={{ width: context?.enabled ? width : BASE_SIZE }}
			className={cn("relative flex h-12 w-12 flex-none items-center justify-center", className)}
			{...props}
		>
			<div className="relative z-10 flex size-12 flex-none items-center justify-center rounded-full">
				{children}
			</div>
		</m.div>
	);
}
DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
