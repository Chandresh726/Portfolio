import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeSwitcher } from "components/ThemeSwitcher";

const setTheme = vi.fn();
const themeState = vi.hoisted(() => ({ theme: "light" }));
vi.mock("next-themes", () => ({
	useTheme: () => ({ theme: themeState.theme, systemTheme: themeState.theme, setTheme })
}));

describe("ThemeSwitcher", () => {
	beforeEach(() => {
		themeState.theme = "light";
		setTheme.mockClear();
	});

	it("reserves stable button geometry before hydration", () => {
		const html = renderToString(<ThemeSwitcher className="custom-switcher" />);
		expect(html).toContain('aria-label="Toggle theme"');
		expect(html).toContain("size-12");
		expect(html).toContain("shrink-0");
		expect(html).toContain("custom-switcher");
		expect(html).toContain("dark:block");
		expect(html).toContain("dark:hidden");
	});

	it("renders both CSS-selected icons without transform animation", () => {
		themeState.theme = "dark";
		render(<ThemeSwitcher />);
		const button = screen.getByRole("button", { name: "Toggle theme" });
		expect(button.querySelectorAll("svg")).toHaveLength(2);
		expect(button.firstElementChild).not.toHaveAttribute("style");
	});

	it("binds dark utilities to the portfolio theme class", () => {
		const styles = readFileSync("styles/globals.css", "utf8");
		expect(styles).toContain("@custom-variant dark (&:where(.dark, .dark *));");
	});

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
