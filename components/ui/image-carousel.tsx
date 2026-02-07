"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";

interface ImageCarouselProps {
	images: string[];
	alt?: string;
}

const imageVariants = {
	enter: {
		opacity: 0,
		scale: 0.95,
		filter: "blur(4px)"
	},
	center: {
		opacity: 1,
		scale: 1,
		filter: "blur(0px)"
	},
	exit: {
		opacity: 0,
		scale: 1.05,
		filter: "blur(4px)"
	}
};

export function ImageCarousel({ images, alt = "Project image" }: ImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Ensure we're mounted before using portal
	useEffect(() => {
		setMounted(true);
	}, []);

	const nextImage = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	}, [images.length]);

	const prevImage = useCallback(() => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	}, [images.length]);

	// Auto-rotate on hover (only when not in fullscreen)
	useEffect(() => {
		if (!isHovered || images.length <= 1 || isFullscreen) return;

		const interval = setInterval(nextImage, 2500);
		return () => clearInterval(interval);
	}, [isHovered, images.length, nextImage, isFullscreen]);

	// Handle keyboard navigation in fullscreen
	useEffect(() => {
		if (!isFullscreen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsFullscreen(false);
			if (e.key === "ArrowRight") nextImage();
			if (e.key === "ArrowLeft") prevImage();
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isFullscreen, nextImage, prevImage]);

	const handleDotClick = (index: number) => {
		setCurrentIndex(index);
	};

	const openFullscreen = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFullscreen(true);
	};

	// Return placeholder if no images
	if (!images || images.length === 0) {
		return (
			<div className="relative w-full h-full bg-surface-muted flex-center rounded-t-xl">
				<span className="text-text-muted text-sm">No image available</span>
			</div>
		);
	}

	const fullscreenModal = (
		<AnimatePresence>
			{isFullscreen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
					onClick={() => setIsFullscreen(false)}
				>
					{/* Close button */}
					<button
						onClick={() => setIsFullscreen(false)}
						className="absolute top-4 right-4 z-[10000] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
						aria-label="Close fullscreen"
					>
						<IoClose className="w-6 h-6" />
					</button>

					{/* Counter */}
					<div className="absolute top-4 left-4 z-[10000] px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
						{currentIndex + 1} / {images.length}
					</div>

					{/* Previous button */}
					{images.length > 1 && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								prevImage();
							}}
							className="absolute left-4 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
							aria-label="Previous image"
						>
							<IoChevronBack className="w-6 h-6" />
						</button>
					)}

					{/* Image */}
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="relative w-[90vw] h-[85vh]"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							src={images[currentIndex]}
							alt={`${alt} ${currentIndex + 1}`}
							fill
							className="object-contain"
							sizes="90vw"
							priority
						/>
					</motion.div>

					{/* Next button */}
					{images.length > 1 && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								nextImage();
							}}
							className="absolute right-4 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
							aria-label="Next image"
						>
							<IoChevronForward className="w-6 h-6" />
						</button>
					)}

					{/* Dot indicators */}
					{images.length > 1 && (
						<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10000]">
							<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
								{images.map((_, index) => (
									<button
										key={index}
										onClick={(e) => {
											e.stopPropagation();
											handleDotClick(index);
										}}
										aria-label={`Go to image ${index + 1}`}
										className={`transition-all duration-300 rounded-full ${
											index === currentIndex
												? "w-8 h-2.5 bg-white"
												: "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
										}`}
									/>
								))}
							</div>
						</div>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<>
			<div
				className="relative w-full h-full"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Stacked depth effect - only show if multiple images */}
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

				{/* Main image container */}
				<div
					className="relative w-full h-full overflow-hidden rounded-t-xl cursor-pointer"
					onClick={openFullscreen}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							variants={imageVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								duration: 0.6,
								ease: [0.25, 0.1, 0.25, 1]
							}}
							className="absolute inset-0"
						>
							<Image
								src={images[currentIndex]}
								alt={`${alt} ${currentIndex + 1}`}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
								priority={currentIndex === 0}
							/>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Fullscreen button - top right, visible on hover */}
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					transition={{ duration: 0.2 }}
					onClick={openFullscreen}
					className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:bg-surface transition-colors"
					aria-label="View fullscreen"
				>
					<MdFullscreen className="w-5 h-5" />
				</motion.button>

				{/* Counter badge - top left, visible on hover */}
				{images.length > 1 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: isHovered ? 1 : 0 }}
						transition={{ duration: 0.2 }}
						className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur-sm text-xs font-medium text-on-surface"
					>
						{currentIndex + 1} / {images.length}
					</motion.div>
				)}

				{/* Dot indicators - bottom center */}
				{images.length > 1 && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
						<div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm">
							{images.map((_, index) => (
								<button
									key={index}
									onClick={(e) => {
										e.stopPropagation();
										handleDotClick(index);
									}}
									aria-label={`Go to image ${index + 1}`}
									className={`transition-all duration-300 rounded-full ${
										index === currentIndex
											? "w-6 h-2 bg-blue-light"
											: "w-2 h-2 bg-on-surface/40 hover:bg-on-surface/60"
									}`}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Render fullscreen modal via portal to document body */}
			{mounted && createPortal(fullscreenModal, document.body)}
		</>
	);
}
