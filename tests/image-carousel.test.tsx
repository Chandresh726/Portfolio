import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ImageCarousel } from "components/ui/image-carousel";
import { PortraitTilt } from "app/sections/about/PortraitTilt";

vi.mock("next/image", () => ({
	default: ({ alt, preload }: { alt: string; preload?: boolean }) => (
		<span role="img" aria-label={alt} data-preload={String(Boolean(preload))} />
	)
}));

describe("image loading and carousel lifecycle", () => {
	it("does not preload carousel or About images by default", () => {
		const { unmount } = render(<ImageCarousel images={["/one.png"]} alt="Project" />);
		expect(screen.getByRole("img", { name: "Project 1" })).toHaveAttribute("data-preload", "false");
		unmount();
		render(<PortraitTilt />);
		expect(screen.getByRole("img", { name: "About me image" })).toHaveAttribute(
			"data-preload",
			"false"
		);
	});

	it("only preloads the first carousel image when explicitly enabled", async () => {
		const user = userEvent.setup();
		render(<ImageCarousel images={["/one.png", "/two.png"]} alt="Project" preload />);
		expect(screen.getByRole("img", { name: "Project 1" })).toHaveAttribute("data-preload", "true");

		await user.click(screen.getByRole("button", { name: "Go to image 2" }));
		await waitFor(() =>
			expect(screen.getByRole("img", { name: "Project 2" })).toHaveAttribute(
				"data-preload",
				"false"
			)
		);
	});

	it("wraps carousel boundaries and cleans global fullscreen state", async () => {
		const user = userEvent.setup();
		const removeSpy = vi.spyOn(window, "removeEventListener");
		const { unmount } = render(<ImageCarousel images={["/one.png", "/two.png"]} alt="Project" />);
		await user.click(screen.getByRole("button", { name: "View fullscreen" }));
		expect(document.body.style.overflow).toBe("hidden");
		await user.click(screen.getByRole("button", { name: "Previous image" }));
		expect(screen.getAllByText("2 / 2").length).toBeGreaterThan(0);
		unmount();
		expect(document.body.style.overflow).toBe("");
		expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
	});
});
