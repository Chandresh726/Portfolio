import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
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

	it("server-renders the supplied age instead of an empty placeholder", () => {
		const html = renderToString(<AgeCounter initialYears="24.12345678" />);
		expect(html).toContain("been on earth for");
		expect(html).toContain("24.12345678");
		expect(html).not.toContain("opacity-0");
	});

	it("refreshes while visible and suspends its interval while hidden", () => {
		const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
		const { unmount } = render(<AgeCounter initialYears="24.00000000" />);
		const counter = screen.getByText(/been on earth for \d+\.\d{8} years/);
		const initialText = counter.textContent;

		act(() => vi.advanceTimersByTime(1_000));
		const intervalText = counter.textContent;
		expect(intervalText).not.toBe(initialText);

		visibility.mockReturnValue("hidden");
		act(() => document.dispatchEvent(new Event("visibilitychange")));
		vi.setSystemTime(new Date("2026-07-12T00:02:30Z"));
		act(() => vi.advanceTimersByTime(2_000));
		expect(counter.textContent).toBe(intervalText);

		visibility.mockReturnValue("visible");
		act(() => document.dispatchEvent(new Event("visibilitychange")));
		expect(counter.textContent).not.toBe(intervalText);
		unmount();
	});

	it("clears its own interval and removes its registered visibility callback", () => {
		const setIntervalSpy = vi.spyOn(globalThis, "setInterval");
		const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
		const addListenerSpy = vi.spyOn(document, "addEventListener");
		const removeListenerSpy = vi.spyOn(document, "removeEventListener");

		const { unmount } = render(<AgeCounter initialYears="24.00000000" />);
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
