import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LottiePlayer from "app/sections/introduction/LottiePlayer";

const playback = vi.hoisted(() => ({
	play: vi.fn(),
	pause: vi.fn(),
	goToAndStop: vi.fn(),
	reducedMotion: false
}));

vi.mock("framer-motion", () => ({
	useReducedMotion: () => playback.reducedMotion
}));

vi.mock("lottie-react", () => ({
	default: ({
		animationData,
		lottieRef,
		onDOMLoaded
	}: {
		animationData: object;
		lottieRef: { current: unknown };
		onDOMLoaded?: () => void;
	}) => {
		lottieRef.current = playback;
		onDOMLoaded?.();
		return <div data-testid="lottie-renderer" data-animation={JSON.stringify(animationData)} />;
	}
}));

let intersectionCallback: IntersectionObserverCallback;
const disconnect = vi.fn();

class ControllableIntersectionObserver implements IntersectionObserver {
	root = null;
	rootMargin = "0px";
	scrollMargin = "0px";
	thresholds = [0];

	constructor(callback: IntersectionObserverCallback) {
		intersectionCallback = callback;
	}

	disconnect = disconnect;
	observe() {}
	takeRecords() {
		return [];
	}
	unobserve() {}
}

beforeEach(() => {
	playback.reducedMotion = false;
	vi.clearAllMocks();
	vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
});

describe("LottiePlayer", () => {
	it("renders supplied animation data without a second entrance animation", () => {
		const animationData = { layers: [{ name: "coding" }] };
		const { container } = render(<LottiePlayer animationData={animationData} />);
		const renderer = screen.getByTestId("lottie-renderer");
		expect(renderer).toHaveAttribute("data-animation", JSON.stringify(animationData));
		expect(container.firstChild).toHaveClass("w-full");
		expect(container.firstChild).not.toHaveClass("intro-lottie-player");
	});

	it("plays only while visible and pauses when offscreen or the tab is hidden", () => {
		const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
		const { unmount } = render(<LottiePlayer animationData={{ layers: [] }} />);
		expect(playback.play).toHaveBeenCalled();

		act(() => {
			intersectionCallback(
				[{ isIntersecting: false } as IntersectionObserverEntry],
				{} as IntersectionObserver
			);
		});
		expect(playback.pause).toHaveBeenCalled();

		visibility.mockReturnValue("hidden");
		act(() => document.dispatchEvent(new Event("visibilitychange")));
		expect(playback.pause).toHaveBeenCalled();

		act(() => {
			intersectionCallback(
				[{ isIntersecting: true } as IntersectionObserverEntry],
				{} as IntersectionObserver
			);
		});
		playback.play.mockClear();
		visibility.mockReturnValue("visible");
		act(() => document.dispatchEvent(new Event("visibilitychange")));
		expect(playback.play).toHaveBeenCalled();

		unmount();
		expect(disconnect).toHaveBeenCalled();
	});

	it("stops on the first frame when reduced motion is requested", () => {
		playback.reducedMotion = true;
		render(<LottiePlayer animationData={{ layers: [] }} />);
		expect(playback.goToAndStop).toHaveBeenCalledWith(0, true);
		expect(playback.play).not.toHaveBeenCalled();
	});
});
