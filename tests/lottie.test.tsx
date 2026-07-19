import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import GreetingLottie from "app/sections/introduction/DisplayLottie";

const lazyPlayer = vi.hoisted(() => ({ moduleEvaluations: vi.fn(), renders: vi.fn() }));

vi.mock("app/sections/introduction/LottiePlayer", () => {
	lazyPlayer.moduleEvaluations();
	return {
		default: ({ animationData }: { animationData: object }) => {
			lazyPlayer.renders();
			return (
				<div data-testid="deferred-lottie-player" data-animation={JSON.stringify(animationData)} />
			);
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

function mockIntersectionObserver() {
	let callback: IntersectionObserverCallback | undefined;
	const disconnect = vi.fn();
	const OriginalIntersectionObserver = globalThis.IntersectionObserver;

	class TestIntersectionObserver implements IntersectionObserver {
		root = null;
		rootMargin = "200px";
		scrollMargin = "0px";
		thresholds = [0];

		constructor(observerCallback: IntersectionObserverCallback) {
			callback = observerCallback;
		}

		disconnect = disconnect;
		observe() {}
		takeRecords() {
			return [];
		}
		unobserve() {}
	}

	Object.defineProperty(globalThis, "IntersectionObserver", {
		configurable: true,
		writable: true,
		value: TestIntersectionObserver
	});

	return {
		setIntersecting(isIntersecting: boolean) {
			act(() =>
				callback?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver)
			);
		},
		disconnect,
		restore() {
			Object.defineProperty(globalThis, "IntersectionObserver", {
				configurable: true,
				writable: true,
				value: OriginalIntersectionObserver
			});
		}
	};
}

afterEach(() => vi.restoreAllMocks());

describe("GreetingLottie", () => {
	it("loads the player and animation together only on desktop, then cleans up", async () => {
		const controller = createMediaQuery(false);
		vi.spyOn(window, "matchMedia").mockReturnValue(
			controller.mediaQuery as unknown as MediaQueryList
		);
		const animationData = { layers: [{ name: "coding" }] };
		let requestSignal: AbortSignal | undefined;
		const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation((_input, init) => {
			requestSignal = init?.signal ?? undefined;
			return Promise.resolve({
				ok: true,
				json: async () => animationData
			} as Response);
		});
		const intersection = mockIntersectionObserver();
		const { unmount } = render(<GreetingLottie animationPath="/lottie/coding.json" />);

		expect(lazyPlayer.moduleEvaluations).not.toHaveBeenCalled();
		expect(fetchMock).not.toHaveBeenCalled();
		expect(screen.queryByTestId("deferred-lottie-player")).not.toBeInTheDocument();

		controller.setMatches(true);
		expect(fetchMock).not.toHaveBeenCalled();
		intersection.setIntersecting(true);
		await waitFor(() => expect(screen.getByTestId("deferred-lottie-player")).toBeInTheDocument());
		expect(lazyPlayer.moduleEvaluations).toHaveBeenCalledTimes(1);
		expect(lazyPlayer.renders).toHaveBeenCalled();
		expect(fetchMock).toHaveBeenCalledWith("/lottie/coding.json", {
			signal: expect.any(AbortSignal)
		});
		expect(screen.getByTestId("deferred-lottie-player")).toHaveAttribute(
			"data-animation",
			JSON.stringify(animationData)
		);

		controller.setMatches(false);
		await waitFor(() =>
			expect(screen.queryByTestId("deferred-lottie-player")).not.toBeInTheDocument()
		);
		expect(requestSignal?.aborted).toBe(true);

		const registeredListener = controller.getChangeListener();
		unmount();
		expect(intersection.disconnect).toHaveBeenCalled();
		expect(controller.mediaQuery.removeEventListener).toHaveBeenCalledWith(
			"change",
			registeredListener
		);
		intersection.restore();
	});
});
