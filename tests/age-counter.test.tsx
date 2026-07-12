import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AgeCounter } from "components/AgeCounter";

describe("AgeCounter", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-07-12T00:00:00Z"));
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("refreshes every second and when the document becomes visible", () => {
		const { unmount } = render(<AgeCounter />);
		const counter = screen.getByText(/been on earth for \d+\.\d{8} years/);
		const initialText = counter.textContent;

		act(() => vi.advanceTimersByTime(1_000));
		const intervalText = counter.textContent;
		expect(intervalText).not.toBe(initialText);

		vi.setSystemTime(new Date("2026-07-12T00:02:30Z"));
		vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
		act(() => document.dispatchEvent(new Event("visibilitychange")));
		expect(counter.textContent).not.toBe(intervalText);
		unmount();
	});

	it("clears its own interval and removes its registered visibility callback", () => {
		const setIntervalSpy = vi.spyOn(globalThis, "setInterval");
		const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
		const addListenerSpy = vi.spyOn(document, "addEventListener");
		const removeListenerSpy = vi.spyOn(document, "removeEventListener");

		const { unmount } = render(<AgeCounter />);
		const intervalCallIndex = setIntervalSpy.mock.calls.findIndex(([, delay]) => delay === 1_000);
		expect(intervalCallIndex).toBeGreaterThanOrEqual(0);
		const intervalId = setIntervalSpy.mock.results[intervalCallIndex].value;
		const visibilityCall = addListenerSpy.mock.calls.find(([type]) => type === "visibilitychange");
		expect(visibilityCall).toBeDefined();
		const visibilityCallback = visibilityCall?.[1];

		unmount();
		expect(clearIntervalSpy).toHaveBeenCalledWith(intervalId);
		expect(removeListenerSpy).toHaveBeenCalledWith("visibilitychange", visibilityCallback);
	});
});
