import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { warmProjectImage } from "utils/warm-project-image";
import { ImageCarousel } from "components/ui/image-carousel";
import { PortraitTilt } from "app/sections/about/PortraitTilt";

vi.mock("utils/warm-project-image", () => ({ warmProjectImage: vi.fn() }));

beforeEach(() => vi.clearAllMocks());

vi.mock("next/image", async (importOriginal) => ({
	...(await importOriginal<typeof import("next/image")>()),
	default: ({
		alt,
		className,
		preload,
		src
	}: {
		alt: string;
		className?: string;
		preload?: boolean;
		src: string;
	}) => (
		<span
			role="img"
			aria-label={alt}
			className={className}
			data-preload={String(Boolean(preload))}
			data-src={src}
		/>
	)
}));

const images = [
	{ src: "/one.webp", alt: "Project dashboard overview" },
	{ src: "/two.webp", alt: "Project analytics report" }
];

describe("image loading and carousel lifecycle", () => {
	it("warms only the next screenshot after hover or keyboard focus", () => {
		const { container } = render(<ImageCarousel images={images} projectTitle="Project" />);
		expect(warmProjectImage).not.toHaveBeenCalled();
		const root = container.querySelector(".group\\/carousel") as HTMLElement;
		fireEvent.mouseEnter(root);
		expect(warmProjectImage).toHaveBeenCalledTimes(1);
		expect(warmProjectImage).toHaveBeenCalledWith(images[1], expect.stringContaining("496px"));
		fireEvent.mouseLeave(root);
		fireEvent.focus(screen.getByRole("button", { name: "View Project screenshots fullscreen" }));
		expect(warmProjectImage).toHaveBeenCalledTimes(2);
	});

	it("does not preload carousel or About images by default", () => {
		const { unmount } = render(<ImageCarousel images={[images[0]]} projectTitle="Project" />);
		expect(screen.getByRole("img", { name: images[0].alt })).toHaveAttribute(
			"data-preload",
			"false"
		);
		unmount();
		render(<PortraitTilt />);
		expect(screen.getByRole("img", { name: "About me image" })).toHaveAttribute(
			"data-preload",
			"false"
		);
	});

	it("only preloads the first carousel image when explicitly enabled", async () => {
		const user = userEvent.setup();
		render(<ImageCarousel images={images} projectTitle="Project" preload />);
		expect(screen.getByRole("img", { name: images[0].alt })).toHaveAttribute(
			"data-preload",
			"true"
		);

		await user.click(screen.getByRole("button", { name: "Go to image 2" }));
		await waitFor(() =>
			expect(screen.getByRole("img", { name: images[1].alt })).toHaveAttribute(
				"data-preload",
				"false"
			)
		);
	});

	it("selects paired project screenshots with the portfolio theme", () => {
		const themedImage = {
			src: "/light.webp",
			darkSrc: "/dark.webp",
			alt: "Theme-aware project dashboard"
		};
		render(<ImageCarousel images={[themedImage]} projectTitle="Project" />);

		const renderedImages = screen.getAllByRole("img", { name: themedImage.alt });
		expect(renderedImages).toHaveLength(2);
		expect(renderedImages[0]).toHaveAttribute("data-src", themedImage.src);
		expect(renderedImages[0]).toHaveClass("dark:hidden");
		expect(renderedImages[1]).toHaveAttribute("data-src", themedImage.darkSrc);
		expect(renderedImages[1]).toHaveClass("hidden", "dark:block");
	});

	it("keeps desktop indicators compact while retaining touch-sized targets", () => {
		render(<ImageCarousel images={images} projectTitle="Project" />);
		const indicator = screen.getByRole("button", { name: "Go to image 1" });
		const inactiveIndicator = screen.getByRole("button", { name: "Go to image 2" });

		expect(indicator).toHaveClass("size-8", "[@media(hover:none)]:size-11");
		expect(indicator.firstElementChild).toHaveClass("h-2", "w-5", "rounded-full");
		expect(inactiveIndicator.firstElementChild).toHaveClass("size-2", "rounded-full");
	});

	it("wraps boundaries in an accessible fullscreen dialog and restores focus", async () => {
		const user = userEvent.setup();
		render(<ImageCarousel images={images} projectTitle="Project" />);
		const trigger = screen.getByRole("button", { name: "View Project screenshots fullscreen" });
		await user.click(trigger);

		const dialog = await screen.findByRole("dialog", { name: "Project screenshots" });
		expect(dialog).toHaveAttribute("aria-modal", "true");
		expect(screen.getByRole("button", { name: "Close Project gallery" })).toHaveFocus();
		await user.click(screen.getByRole("button", { name: "Previous image" }));
		expect(within(dialog).getByText("2 / 2")).toBeInTheDocument();

		await user.keyboard("{Escape}");
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
		expect(trigger).toHaveFocus();
	});
});
