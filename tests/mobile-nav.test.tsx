import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MobileNav } from "components/layout/mobile-nav";

vi.mock("next/image", () => ({
	default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt || "avatar"} />
}));
vi.mock("components/ThemeSwitcher", () => ({ ThemeSwitcher: () => <button>Theme</button> }));

describe("MobileNav", () => {
	it("uses modal focus management and restores focus after Escape", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);
		const trigger = screen.getByRole("button", { name: "Open menu" });

		await user.click(trigger);
		const dialog = screen.getByRole("dialog", { name: "Primary navigation" });
		const home = screen.getByRole("link", { name: "Home" });
		expect(dialog).toHaveClass("mobile-menu-panel");
		expect(home).toHaveFocus();
		expect(home).toHaveClass("mobile-menu-item");
		expect(home).toHaveStyle({ "--menu-item-index": "0" });
		expect(screen.getAllByRole("navigation")).toHaveLength(1);

		await user.keyboard("{Escape}");
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
		expect(trigger).toHaveFocus();

		await user.click(trigger);
		await user.click(screen.getByRole("link", { name: "Chandresh Kumar home" }));
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});
});
