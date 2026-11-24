import { getImageProps } from "next/image";
import type { ProjectImage } from "types";

export function warmProjectImage(image: ProjectImage, sizes: string) {
	const src =
		document.documentElement.classList.contains("dark") && image.darkSrc
			? image.darkSrc
			: image.src;
	const { props } = getImageProps({ src, alt: "", fill: true, sizes });
	const preload = new window.Image();
	preload.decoding = "async";
	preload.sizes = props.sizes ?? sizes;
	preload.srcset = props.srcSet ?? "";
	preload.src = props.src;
	// Decoding is opportunistic; failed warming must never interrupt navigation.
	void preload.decode?.().catch(() => {});
}
