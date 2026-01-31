"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import { Loader } from "components";
import { VscSourceControl } from "react-icons/vsc";
import { FiExternalLink } from "react-icons/fi";
import type { ProjectItemProps } from "types";

import "react-image-gallery/styles/css/image-gallery.css";

const itemVariants = {
	initial: {
		opacity: 0,
		y: 20
	},
	whileInView: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5
		}
	}
};

export function ProjectItem({ project }: ProjectItemProps) {
	const { description, images, liveUrl, repoUrl, stack, title } = project;

	let galleryImages =
		images?.map((img) => ({
			original: img,
			loading: "lazy" as const
		})) || [];

	if (galleryImages.length === 0)
		galleryImages = [
			{
				original:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s",
				loading: "lazy" as const
			}
		];

	return (
		<motion.article
			className="flex flex-col rounded-lg bg-surface-variant shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-outline-variant"
			variants={itemVariants}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<figure>
				<div className="aspect-[16/9] w-full h-full">
					<Suspense fallback={<Loader />}>
						<ImageGallery
							items={galleryImages}
							showPlayButton={false}
							showThumbnails={false}
							showIndex
							lazyLoad
							additionalClass="gallery-item"
						/>
					</Suspense>
				</div>
			</figure>

			<div className="flex-[2] p-6 text-center flex flex-col gap-4">
				<header className="flex-1 flex items-center justify-start flex-col">
					<h3 tabIndex={0} className="text-2xl font-bold">
						{title}
					</h3>
					<p tabIndex={0} className="leading-7 font-light line-clamp-2">
						{description}
					</p>
				</header>

				<footer className="flex flex-col gap-4">
					{!!stack.length && (
						<div className="flex-center flex-wrap gap-1">
							{stack.map((tag) => (
								<span
									key={tag}
									tabIndex={0}
									className="px-2 text-sm leading-normal rounded bg-surface-interactive"
								>
									{tag}
								</span>
							))}
						</div>
					)}

					<div className="flex-center gap-10">
						{repoUrl && (
							<Link
								href={repoUrl}
								target="_blank"
								className="icon-link-btn"
								title="Go to Github repository"
							>
								<VscSourceControl />
								<span>Source</span>
							</Link>
						)}
						{liveUrl && (
							<Link
								href={liveUrl}
								target="_blank"
								className="icon-link-btn"
								title="Go to live address"
							>
								<FiExternalLink />
								<span>Demo</span>
							</Link>
						)}
					</div>
				</footer>
			</div>
		</motion.article>
	);
}
