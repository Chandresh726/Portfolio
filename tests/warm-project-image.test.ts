import { afterEach, expect, it, vi } from "vitest";
import { getImageProps } from "next/image";
import { warmProjectImage } from "utils/warm-project-image";

afterEach(() => {
	document.documentElement.classList.remove("dark");
	vi.restoreAllMocks();
});

it("warms the same responsive Next.js candidate as the active themed screenshot", () => {
	const preload = {
		src: "",
		srcset: "",
		sizes: "",
		decoding: "",
		decode: vi.fn().mockResolvedValue(undefined)
	};
	vi.spyOn(window, "Image").mockImplementation(function () {
		return preload as unknown as HTMLImageElement;
	});
	document.documentElement.classList.add("dark");
	warmProjectImage({ src: "/light.webp", darkSrc: "/dark.webp", alt: "Dashboard" }, "90vw");
	const { props } = getImageProps({ src: "/dark.webp", alt: "", fill: true, sizes: "90vw" });
	expect(preload.src).toBe(props.src);
	expect(preload.srcset).toBe(props.srcSet);
	expect(preload.sizes).toBe("90vw");
	expect(preload.decode).toHaveBeenCalledOnce();
});

it("treats decode failure as an optional cache miss", async () => {
	vi.spyOn(window, "Image").mockImplementation(function () {
		return { decode: () => Promise.reject(new Error("Image unavailable")) } as HTMLImageElement;
	});
	expect(() =>
		warmProjectImage({ src: "/missing.webp", alt: "Unavailable" }, "90vw")
	).not.toThrow();
	await Promise.resolve();
});
