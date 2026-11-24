import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { MobileNav } from "components/layout/mobile-nav";

const loading = vi.hoisted(() => ({ finish: undefined as (() => void) | undefined }));

vi.mock("components/layout/mobile-menu", async () => {
	await new Promise<void>((resolve) => {
		loading.finish = resolve;
	});
	return {
		default: ({ open }: { open: boolean }) => <div data-testid="loaded-menu">{String(open)}</div>
	};
});

it("responds before the menu module arrives and honors cancellation while loading", async () => {
	render(<MobileNav />);
	expect(loading.finish).toBeUndefined();
	const trigger = screen.getByRole("button", { name: "Open menu" });
	expect(trigger).toBeEnabled();
	fireEvent.click(trigger);
	expect(trigger).toHaveAttribute("aria-expanded", "true");
	expect(screen.queryByTestId("loaded-menu")).not.toBeInTheDocument();
	fireEvent.click(trigger);
	expect(trigger).toHaveAttribute("aria-expanded", "false");
	await waitFor(() => expect(loading.finish).toBeTypeOf("function"));
	await act(async () => {
		loading.finish?.();
	});
	expect(await screen.findByTestId("loaded-menu")).toHaveTextContent("false");
});
