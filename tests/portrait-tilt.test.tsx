import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PortraitTilt } from "app/sections/about/PortraitTilt";

const lazyMotion = vi.hoisted(() => ({ moduleEvaluations: vi.fn() }));

vi.mock("app/sections/about/PortraitTiltMotion", () => {
	lazyMotion.moduleEvaluations();
	return {
		PortraitTiltMotion: () => <div data-testid="portrait-tilt-motion" />
	};
});

vi.mock("next/image", () => ({
	default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />
}));

function createMediaQuery(initialMatches: boolean) {
	let changeListener: (() => void) | undefined;
	const mediaQuery = {
		matches: initialMatches,
		media: "(min-width: 768px) and (hover: hover) and (pointer: fine)",
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn((type: string, listener: () => void) => {
			if (type === "change") changeListener = listener;
		}),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	};

	return {
		mediaQuery,
		setMatches(matches: boolean) {
			mediaQuery.matches = matches;
			act(() => changeListener?.());
		},
		getChangeListener: () => changeListener
	};
}

afterEach(() => vi.restoreAllMocks());

describe("PortraitTilt", () => {
	it("loads motion only for a fine-pointer desktop and cleans the media listener", async () => {
		const controller = createMediaQuery(false);
		vi.spyOn(window, "matchMedia").mockReturnValue(
			controller.mediaQuery as unknown as MediaQueryList
		);
		const { unmount } = render(<PortraitTilt />);

		expect(window.matchMedia).toHaveBeenCalledWith(
			"(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
		);
		expect(screen.getByRole("img", { name: "About me image" })).toBeInTheDocument();
		expect(lazyMotion.moduleEvaluations).not.toHaveBeenCalled();

		controller.setMatches(true);
		await waitFor(() => expect(screen.getByTestId("portrait-tilt-motion")).toBeInTheDocument());
		expect(lazyMotion.moduleEvaluations).toHaveBeenCalledTimes(1);

		const registeredListener = controller.getChangeListener();
		unmount();
		expect(controller.mediaQuery.removeEventListener).toHaveBeenCalledWith(
			"change",
			registeredListener
		);
	});
});
