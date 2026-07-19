import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResponsiveNav } from "components/layout/responsive-nav";

vi.mock("components/layout/mobile-nav", () => ({
	MobileNav: () => <div>Mobile navigation loaded</div>
}));
vi.mock("components/layout/dock-nav", () => ({
	DockNav: () => <div>Desktop navigation loaded</div>
}));
vi.mock("next/navigation", () => ({
	usePathname: () => "/"
}));
vi.mock("components/layout/navigation-fallback", () => ({
	NavigationFallback: () => <div>Navigation fallback</div>
}));

function mockViewport(desktop: boolean) {
	vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
		matches: query === "(min-width: 768px)" ? desktop : false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}));
}

describe("ResponsiveNav", () => {
	beforeEach(() => vi.mocked(window.matchMedia).mockReset());

	it("loads only the desktop implementation for a desktop viewport", async () => {
		mockViewport(true);
		render(<ResponsiveNav />);
		expect(await screen.findByText("Desktop navigation loaded")).toBeInTheDocument();
		expect(screen.queryByText("Mobile navigation loaded")).not.toBeInTheDocument();
	});

	it("loads only the mobile implementation for a mobile viewport", async () => {
		mockViewport(false);
		render(<ResponsiveNav />);
		expect(await screen.findByText("Mobile navigation loaded")).toBeInTheDocument();
		expect(screen.queryByText("Desktop navigation loaded")).not.toBeInTheDocument();
	});
});
