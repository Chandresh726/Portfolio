import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import GreetingLottie from "app/sections/introduction/DisplayLottie";

const lazyPlayer = vi.hoisted(() => ({ moduleEvaluations: vi.fn(), renders: vi.fn() }));

vi.mock("app/sections/introduction/LottiePlayer", () => {
	lazyPlayer.moduleEvaluations();
	return {
		default: () => {
			lazyPlayer.renders();
			return <div data-testid="deferred-lottie-player" />;
		}
	};
});

function createMediaQuery(initialMatches: boolean) {
	let changeListener: ((event: MediaQueryListEvent) => void) | undefined;
	const mediaQuery = {
		matches: initialMatches,
		media: "(min-width: 768px)",
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn((type: string, listener: (event: MediaQueryListEvent) => void) => {
			if (type === "change") changeListener = listener;
		}),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	};

	return {
		mediaQuery,
		setMatches(matches: boolean) {
			mediaQuery.matches = matches;
			act(() => changeListener?.({ matches } as MediaQueryListEvent));
		},
		getChangeListener: () => changeListener
	};
}

afterEach(() => vi.restoreAllMocks());

describe("GreetingLottie", () => {
	it("defers the player module until desktop, removes it on downshift, and cleans the media listener", async () => {
		const controller = createMediaQuery(false);
		vi.spyOn(window, "matchMedia").mockReturnValue(
			controller.mediaQuery as unknown as MediaQueryList
		);
		const { unmount } = render(<GreetingLottie animationPath="/lottie/coding.json" />);

		expect(lazyPlayer.moduleEvaluations).not.toHaveBeenCalled();
		expect(screen.queryByTestId("deferred-lottie-player")).not.toBeInTheDocument();

		controller.setMatches(true);
		await waitFor(() => expect(screen.getByTestId("deferred-lottie-player")).toBeInTheDocument());
		expect(lazyPlayer.moduleEvaluations).toHaveBeenCalledTimes(1);
		expect(lazyPlayer.renders).toHaveBeenCalled();

		controller.setMatches(false);
		await waitFor(() =>
			expect(screen.queryByTestId("deferred-lottie-player")).not.toBeInTheDocument()
		);

		const registeredListener = controller.getChangeListener();
		unmount();
		expect(controller.mediaQuery.removeEventListener).toHaveBeenCalledWith(
			"change",
			registeredListener
		);
	});
});
