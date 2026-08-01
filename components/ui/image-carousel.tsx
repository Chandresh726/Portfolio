"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MdFullscreen } from "react-icons/md";
import { ProjectScreenshot } from "components/ui/project-screenshot";
import { useProjectVisibility } from "context/project_visibility_context";
import type { ProjectImage } from "types";

const FullscreenGallery = dynamic(() => import("./fullscreen-gallery"), { ssr: false });

interface ImageCarouselProps {
	images: ProjectImage[];
	projectTitle: string;
	preload?: boolean;
}

const controlsClass =
	"opacity-0 pointer-events-none group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto group-focus-within/carousel:opacity-100 group-focus-within/carousel:pointer-events-auto [@media(hover:none)]:opacity-100 [@media(hover:none)]:pointer-events-auto transition-opacity duration-200";

export function ImageCarousel({ images, projectTitle, preload = false }: ImageCarouselProps) {
	const rootRef = useRef<HTMLDivElement>(null);
	const fullscreenTriggerRef = useRef<HTMLButtonElement>(null);
	const isProjectVisible = useProjectVisibility();
	const reduceMotion = useReducedMotion();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isIntersecting, setIsIntersecting] = useState(true);
	const [documentVisible, setDocumentVisible] = useState(true);

	const nextImage = useCallback(() => {
		if (images.length <= 1) return;
		setCurrentIndex((previous) => (previous + 1) % images.length);
	}, [images.length]);

	const openFullscreen = (event: MouseEvent<HTMLButtonElement>) => {
		fullscreenTriggerRef.current = event.currentTarget;
		setIsFullscreen(true);
	};

	useEffect(() => {
		if (!isProjectVisible) {
			setIsHovered(false);
			setIsFullscreen(false);
		}
	}, [isProjectVisible]);

	useEffect(() => {
		const element = rootRef.current;
		if (!element) return;
		const observer = new IntersectionObserver(
			([entry]) => setIsIntersecting(entry.isIntersecting),
			{
				rootMargin: "100px"
			}
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
		updateVisibility();
		document.addEventListener("visibilitychange", updateVisibility);
		return () => document.removeEventListener("visibilitychange", updateVisibility);
	}, []);

	useEffect(() => {
		if (
			!isHovered ||
			images.length <= 1 ||
			isFullscreen ||
			reduceMotion ||
			!isProjectVisible ||
			!isIntersecting ||
			!documentVisible
		)
			return;

		const interval = window.setInterval(nextImage, 2500);
		return () => window.clearInterval(interval);
	}, [
		documentVisible,
		images.length,
		isFullscreen,
		isHovered,
		isIntersecting,
		isProjectVisible,
		nextImage,
		reduceMotion
	]);

	if (images.length === 0) {
		return (
			<div className="relative w-full h-full bg-surface-muted flex-center rounded-t-xl">
				<span className="text-text-muted text-sm">No image available</span>
			</div>
		);
	}

	return (
		<>
			<div
				ref={rootRef}
				className="group/carousel relative w-full h-full"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{images.length > 1 && (
					<>
						{[2, 1, 0].map((offset) => (
							<div
								key={offset}
								className="absolute inset-0 rounded-t-xl overflow-hidden"
								style={{
									transform: `translateY(${(offset + 1) * 2}px) scale(${1 - (offset + 1) * 0.02})`,
									opacity: [0.1, 0.4, 0.7][offset],
									zIndex: -offset - 1
								}}
							>
								<div className="w-full h-full bg-surface-muted" />
							</div>
						))}
					</>
				)}

				<button
					type="button"
					onClick={openFullscreen}
					className="relative w-full h-full overflow-hidden rounded-t-xl text-left"
					aria-label={`View ${projectTitle} screenshots fullscreen`}
				>
					<AnimatePresence mode="sync" initial={false}>
						<motion.span
							key={images[currentIndex].src}
							initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
							transition={{
								duration: reduceMotion ? 0 : 0.32,
								ease: [0.22, 1, 0.36, 1]
							}}
							className="absolute inset-0"
						>
							<ProjectScreenshot
								image={images[currentIndex]}
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 496px"
								preload={preload && currentIndex === 0}
							/>
						</motion.span>
					</AnimatePresence>
				</button>

				<button
					type="button"
					onClick={openFullscreen}
					className={`absolute top-3 right-3 z-10 size-11 flex-center rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:bg-surface transition-colors ${controlsClass}`}
					aria-label={`Open ${projectTitle} gallery`}
				>
					<MdFullscreen className="size-5" />
				</button>

				{images.length > 1 && (
					<>
						<div
							className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur-sm text-xs font-medium text-on-surface ${controlsClass}`}
							aria-hidden="true"
						>
							{currentIndex + 1} / {images.length}
						</div>
						<div
							className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center rounded-full bg-surface/80 backdrop-blur-sm px-1 [@media(hover:none)]:py-0.5 ${controlsClass}`}
						>
							{images.map((image, index) => (
								<button
									type="button"
									key={image.src}
									onClick={(event) => {
										event.stopPropagation();
										setCurrentIndex(index);
									}}
									aria-label={`Go to image ${index + 1}`}
									aria-current={index === currentIndex ? "true" : undefined}
									className="size-8 flex-center [@media(hover:none)]:size-11"
								>
									<span
										className={`rounded-full transition-[width,background-color,transform] duration-200 ${
											index === currentIndex ? "h-2 w-5 bg-blue-light" : "size-2 bg-on-surface/40"
										}`}
									/>
								</button>
							))}
						</div>
					</>
				)}
			</div>

			{isFullscreen && (
				<FullscreenGallery
					images={images}
					projectTitle={projectTitle}
					currentIndex={currentIndex}
					onIndexChange={setCurrentIndex}
					open={isFullscreen}
					onOpenChange={setIsFullscreen}
					triggerRef={fullscreenTriggerRef}
				/>
			)}
		</>
	);
}
