import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MobileNav } from "components/layout/mobile-nav";

vi.mock("next/image", () => ({
	default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />
}));
vi.mock("components/ThemeSwitcher", () => ({ ThemeSwitcher: () => <button>Theme</button> }));

describe("MobileNav", () => {
	it("closes on Escape and restores body scrolling on close and unmount", async () => {
		const user = userEvent.setup();
		const removeSpy = vi.spyOn(document, "removeEventListener");
		const { unmount } = render(<MobileNav />);
		await user.click(screen.getByRole("button", { name: "Open menu" }));
		expect(document.body.style.overflow).toBe("hidden");
		await user.keyboard("{Escape}");
		expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
		expect(document.body.style.overflow).toBe("");

		unmount();
		expect(document.body.style.overflow).toBe("");
		expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
	});
});
