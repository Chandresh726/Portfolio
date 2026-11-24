import { act, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useDocumentVisible } from "hooks/use-document-visible";

function Consumer({ name }: { name: string }) {
	return <span data-testid={name}>{String(useDocumentVisible())}</span>;
}

afterEach(() => vi.restoreAllMocks());

it("shares one listener, updates every consumer, and unsubscribes after the last unmount", () => {
	const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
	const add = vi.spyOn(document, "addEventListener");
	const remove = vi.spyOn(document, "removeEventListener");
	const first = render(<Consumer name="first" />);
	const second = render(<Consumer name="second" />);
	const registered = add.mock.calls.filter(([name]) => name === "visibilitychange");
	expect(registered).toHaveLength(1);
	visibility.mockReturnValue("hidden");
	act(() => document.dispatchEvent(new Event("visibilitychange")));
	expect(screen.getByTestId("first")).toHaveTextContent("false");
	expect(screen.getByTestId("second")).toHaveTextContent("false");
	first.unmount();
	expect(remove).not.toHaveBeenCalledWith("visibilitychange", registered[0][1]);
	visibility.mockReturnValue("visible");
	act(() => document.dispatchEvent(new Event("visibilitychange")));
	expect(screen.getByTestId("second")).toHaveTextContent("true");
	second.unmount();
	expect(remove).toHaveBeenCalledWith("visibilitychange", registered[0][1]);
});
