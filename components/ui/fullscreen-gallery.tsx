"use client";

import { useRef, type PointerEvent, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import { ProjectScreenshot } from "components/ui/project-screenshot";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle
} from "components/ui/dialog";
import type { ProjectImage } from "types";

interface FullscreenGalleryProps {
	images: ProjectImage[];
	projectTitle: string;
	currentIndex: number;
	onIndexChange: (index: number) => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	triggerRef: RefObject<HTMLButtonElement | null>;
}

export default function FullscreenGallery({
	images,
	projectTitle,
	currentIndex,
	onIndexChange,
	open,
	onOpenChange,
	triggerRef
}: FullscreenGalleryProps) {
	const closeRef = useRef<HTMLButtonElement>(null);
	const pointerStart = useRef<{ x: number; y: number } | null>(null);

	const nextImage = () => onIndexChange((currentIndex + 1) % images.length);
	const previousImage = () => onIndexChange((currentIndex - 1 + images.length) % images.length);

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		pointerStart.current = { x: event.clientX, y: event.clientY };
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
		const start = pointerStart.current;
		pointerStart.current = null;
		if (!start || images.length <= 1) return;

		const deltaX = event.clientX - start.x;
		const deltaY = event.clientY - start.y;
		if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
		if (deltaX < 0) nextImage();
		else previousImage();
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				aria-modal="true"
				className="inset-0 left-0 top-0 h-dvh w-screen translate-x-0 translate-y-0 bg-black/95 text-white flex items-center justify-center"
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					closeRef.current?.focus();
				}}
				onCloseAutoFocus={(event) => {
					event.preventDefault();
					triggerRef.current?.focus();
				}}
				onKeyDown={(event) => {
					if (event.key === "ArrowRight") {
						event.preventDefault();
						nextImage();
					}
					if (event.key === "ArrowLeft") {
						event.preventDefault();
						previousImage();
					}
				}}
			>
				<DialogTitle className="sr-only">{projectTitle} screenshots</DialogTitle>
				<DialogDescription className="sr-only">
					Fullscreen gallery. Use the previous and next buttons or the left and right arrow keys.
				</DialogDescription>

				<DialogClose asChild>
					<button
						ref={closeRef}
						className="absolute top-4 right-4 z-20 size-11 flex-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
						aria-label={`Close ${projectTitle} gallery`}
					>
						<IoClose className="size-6" />
					</button>
				</DialogClose>

				<div
					className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/10 text-sm font-medium"
					aria-live="polite"
				>
					{currentIndex + 1} / {images.length}
				</div>

				{images.length > 1 && (
					<button
						onClick={previousImage}
						className="absolute left-3 sm:left-4 z-20 size-11 flex-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
						aria-label="Previous image"
					>
						<IoChevronBack className="size-6" />
					</button>
				)}

				<div
					className="relative w-[90vw] h-[82vh] touch-pan-y"
					onPointerDown={handlePointerDown}
					onPointerUp={handlePointerUp}
					onPointerCancel={() => {
						pointerStart.current = null;
					}}
				>
					<AnimatePresence mode="sync" initial={false}>
						<motion.div
							key={images[currentIndex].src}
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 1.02 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							className="absolute inset-0"
						>
							<ProjectScreenshot
								image={images[currentIndex]}
								className="object-contain"
								sizes="90vw"
							/>
						</motion.div>
					</AnimatePresence>
				</div>

				{images.length > 1 && (
					<button
						onClick={nextImage}
						className="absolute right-3 sm:right-4 z-20 size-11 flex-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
						aria-label="Next image"
					>
						<IoChevronForward className="size-6" />
					</button>
				)}

				{images.length > 1 && (
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center rounded-full bg-white/10 px-2">
						{images.map((image, index) => (
							<button
								key={image.src}
								onClick={() => onIndexChange(index)}
								aria-label={`Go to image ${index + 1}`}
								aria-current={index === currentIndex ? "true" : undefined}
								className="size-11 flex-center"
							>
								<span
									className={`h-2 w-5 rounded-full transition-[background-color,transform] duration-200 ${
										index === currentIndex ? "bg-white scale-x-100" : "bg-white/40 scale-x-50"
									}`}
								/>
							</button>
						))}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
