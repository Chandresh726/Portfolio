import Image from "next/image";
import type { ProjectImage } from "types";
import { cn } from "utils/cn";

interface ProjectScreenshotProps {
	image: ProjectImage;
	className: string;
	sizes: string;
	preload?: boolean;
}

export function ProjectScreenshot({
	image,
	className,
	sizes,
	preload = false
}: ProjectScreenshotProps) {
	return (
		<>
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className={cn(className, image.darkSrc && "dark:hidden")}
				sizes={sizes}
				preload={preload}
			/>
			{image.darkSrc && (
				<Image
					src={image.darkSrc}
					alt={image.alt}
					fill
					className={cn(className, "hidden dark:block")}
					sizes={sizes}
				/>
			)}
		</>
	);
}
