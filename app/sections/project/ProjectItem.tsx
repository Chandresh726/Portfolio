import Link from "next/link";
import { ImageCarousel } from "components/ui/image-carousel";
import { VscSourceControl } from "react-icons/vsc";
import { FiExternalLink } from "react-icons/fi";
import type { ProjectItemProps } from "types";

export function ProjectItem({ project }: ProjectItemProps) {
	const { description, images, liveUrl, repoUrl, slug, stack, title } = project;

	return (
		<article
			id={`project-${slug}`}
			className="group min-w-0 flex flex-col rounded-xl bg-surface-variant/60 backdrop-blur-md shadow-md transition-[transform,border-color] duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] border border-outline/20 hover:border-blue-light/30 overflow-hidden transform-gpu hover:-translate-y-1.5 hover:scale-[1.015] active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none"
		>
			<figure className="relative overflow-hidden">
				<div className="aspect-[16/9] w-full h-full">
					<ImageCarousel images={images} projectTitle={title} />
				</div>
			</figure>

			<div className="flex-[2] px-4 py-3 lg:px-5 lg:py-3.5 text-center flex flex-col gap-2.5">
				<header className="flex-1 flex items-center justify-start flex-col gap-0.5">
					<h3 className="text-lg lg:text-xl font-bold">{title}</h3>
					<p className="text-sm lg:text-base leading-5 lg:leading-6 font-light line-clamp-2 text-text-muted">
						{description}
					</p>
				</header>

				<footer className="flex flex-col gap-2.5">
					{!!stack.length && (
						<div className="flex-center flex-wrap gap-1.5" aria-label={`${title} technologies`}>
							{stack.map((tag) => (
								<span
									key={tag}
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
								title={`View ${title} source code on GitHub`}
							>
								<VscSourceControl className="transition-transform group-hover/link:scale-110" />
								<span>Source</span>
								<span className="sr-only"> for {title}</span>
							</Link>
						)}
						{liveUrl && (
							<Link
								href={liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="icon-link-btn group/link"
								title={`Open the ${title} live demo`}
							>
								<FiExternalLink className="transition-transform group-hover/link:scale-110" />
								<span>Demo</span>
								<span className="sr-only"> of {title}</span>
							</Link>
						)}
					</div>
				</footer>
			</div>
		</article>
	);
}
