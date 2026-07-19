import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NavigationFallback } from "components/layout/navigation-fallback";

vi.mock("components/ThemeSwitcher", () => ({
	ThemeSwitcher: () => <button aria-label="Toggle theme">Theme</button>
}));

describe("Navigation fallback", () => {
	it("uses the hydrated dock geometry without an oversized loading state", () => {
		render(<NavigationFallback isHome />);
		const dock = screen.getByRole("navigation", { name: "Primary" }).firstElementChild;

		expect(dock).toHaveClass("p-1", "px-1", "max-h-14");
		expect(dock).not.toHaveClass("gap-1", "px-2");
		expect(screen.getByRole("link", { name: "Home" })).toHaveClass("size-12");
	});

	it("matches the compact projects-page navigation before hydration", () => {
		render(<NavigationFallback isHome={false} />);

		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.queryByRole("link", { name: "Experience" })).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Toggle theme" })).toBeInTheDocument();
	});
});
