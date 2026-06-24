"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ImageCarousel } from "components/ui/image-carousel";
import { VscSourceControl } from "react-icons/vsc";
import { FiExternalLink } from "react-icons/fi";
import type { ProjectItemProps } from "types";

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5
		}
	}
};

export function ProjectItem({ project }: ProjectItemProps) {
	const { description, images, liveUrl, repoUrl, stack, title } = project;

	const carouselImages = images && images.length > 0 ? images : [];

	return (
		<motion.article
			className="group flex flex-col rounded-xl bg-surface-variant/60 backdrop-blur-md shadow-md hover:shadow-2xl transition-[shadow,border-color] duration-300 border border-outline/20 hover:border-blue-light/30 overflow-hidden"
			variants={itemVariants}
			whileHover={{ scale: 1.02, y: -8 }}
			whileTap={{ scale: 0.98 }}
		>
			<figure className="relative overflow-hidden">
				<div className="aspect-[16/9] w-full h-full">
					<ImageCarousel images={carouselImages} alt={title} />
				</div>
			</figure>

			<div className="flex-[2] px-4 py-3 lg:px-5 lg:py-3.5 text-center flex flex-col gap-2.5">
				<header className="flex-1 flex items-center justify-start flex-col gap-0.5">
					<h3
						tabIndex={0}
						className="text-lg lg:text-xl font-bold transition-colors group-hover:text-blue-light"
					>
						{title}
					</h3>
					<p
						tabIndex={0}
						className="text-sm lg:text-base leading-5 lg:leading-6 font-light line-clamp-2 text-text-muted"
					>
						{description}
					</p>
				</header>

				<footer className="flex flex-col gap-2.5">
					{!!stack.length && (
						<div className="flex-center flex-wrap gap-1.5">
							{stack.map((tag) => (
								<span
									key={tag}
									tabIndex={0}
									className="px-2 py-0.5 text-xs leading-normal rounded-md bg-blue-light/10 text-blue-light border border-blue-light/20 transition-colors hover:bg-blue-light/20"
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
								rel="noopener noreferrer"
								className="icon-link-btn group/link"
								title="Go to Github repository"
							>
								<VscSourceControl className="transition-transform group-hover/link:scale-110" />
								<span>Source</span>
							</Link>
						)}
						{liveUrl && (
							<Link
								href={liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="icon-link-btn group/link"
								title="Go to live address"
							>
								<FiExternalLink className="transition-transform group-hover/link:scale-110" />
								<span>Demo</span>
							</Link>
						)}
					</div>
				</footer>
			</div>
		</motion.article>
	);
}
