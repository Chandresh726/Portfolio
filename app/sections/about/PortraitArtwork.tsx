import Image from "next/image";
import { blurDataUrl } from "utils/theme-config";

export function PortraitArtwork() {
	return (
		<>
			<Image
				src="/images/about-pic.jpg"
				width={240}
				height={320}
				alt="About me image"
				sizes="(min-width: 768px) 300px, 240px"
				className="rounded-xl shadow-2xl transition-transform duration-300 md:w-[300px] md:h-[400px]"
				placeholder="blur"
				blurDataURL={blurDataUrl}
			/>
			<div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-light/20 via-transparent to-blue-light/10 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
		</>
	);
}
