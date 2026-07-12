import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ThemeSwitcher } from "components/ThemeSwitcher";

const setTheme = vi.fn();
vi.mock("next-themes", () => ({
	useTheme: () => ({ theme: "light", systemTheme: "light", setTheme })
}));

describe("ThemeSwitcher", () => {
	it("handles and cleans up the shortcut while ignoring editable targets", async () => {
		const user = userEvent.setup();
		const removeSpy = vi.spyOn(document, "removeEventListener");
		const { unmount } = render(
			<>
				<input aria-label="editor" />
				<ThemeSwitcher enableShortcut />
			</>
		);
		expect(await screen.findByRole("button", { name: "Toggle theme" })).toBeInTheDocument();

		await user.keyboard("{Control>}d{/Control}");
		expect(setTheme).toHaveBeenCalledWith("dark");
		setTheme.mockClear();
		await user.click(screen.getByRole("textbox", { name: "editor" }));
		await user.keyboard("{Control>}d{/Control}");
		expect(setTheme).not.toHaveBeenCalled();

		unmount();
		expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
	});
});
