import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LottiePlayer from "app/sections/introduction/LottiePlayer";

const playback = vi.hoisted(() => ({
	play: vi.fn(),
	pause: vi.fn(),
	stop: vi.fn(),
	reducedMotion: false,
	ready: undefined as (() => void) | undefined
}));

vi.mock("framer-motion", () => ({
	useReducedMotion: () => playback.reducedMotion
}));

vi.mock("lottie-react", () => ({
	LottieLight: ({
		src,
		lottieRef,
		subscriptions
	}: {
		src: object;
		lottieRef: { current: unknown };
		subscriptions?: { ready: () => void };
	}) => {
		lottieRef.current = playback;
		playback.ready = subscriptions?.ready;
		return <div data-testid="lottie-renderer" data-animation={JSON.stringify(src)} />;
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

afterEach(() => vi.restoreAllMocks());

describe("LottiePlayer", () => {
	it("resumes playback when the v3 renderer finishes loading", () => {
		render(<LottiePlayer animationData={{ layers: [] }} />);
		playback.play.mockClear();
		act(() => playback.ready?.());
		expect(playback.play).toHaveBeenCalledOnce();
	});

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
		const addListener = vi.spyOn(document, "addEventListener");
		const removeListener = vi.spyOn(document, "removeEventListener");
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
		const visibilityListener = addListener.mock.calls.find(
			([event]) => event === "visibilitychange"
		)?.[1];
		expect(removeListener).toHaveBeenCalledWith("visibilitychange", visibilityListener);
	});

	it("stops on the first frame when reduced motion is requested", () => {
		playback.reducedMotion = true;
		render(<LottiePlayer animationData={{ layers: [] }} />);
		expect(playback.stop).toHaveBeenCalled();
		expect(playback.play).not.toHaveBeenCalled();
	});
});
