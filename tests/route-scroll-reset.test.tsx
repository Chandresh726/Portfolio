import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RouteScrollReset } from "components/layout/route-scroll-reset";

const route = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
	usePathname: () => route.pathname
}));

describe("RouteScrollReset", () => {
	beforeEach(() => {
		route.pathname = "/";
		window.history.replaceState(null, "", "/");
		Object.defineProperty(window.history, "scrollRestoration", {
			configurable: true,
			writable: true,
			value: "auto"
		});
		vi.mocked(window.scrollTo).mockClear();
	});

	it("resets fresh loads and route changes to the top", () => {
		const { rerender } = render(<RouteScrollReset />);
		expect(window.history.scrollRestoration).toBe("manual");
		expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });

		route.pathname = "/projects";
		rerender(<RouteScrollReset />);
		expect(window.scrollTo).toHaveBeenCalledTimes(2);
	});

	it("preserves intentional deep links", () => {
		window.history.replaceState(null, "", "/projects#project-sample");
		route.pathname = "/projects";
		render(<RouteScrollReset />);

		expect(window.scrollTo).not.toHaveBeenCalled();
	});
});
