import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Dock, DockIcon } from "components/magicui/dock";

let finePointer = true;
let reducedMotion = false;

beforeEach(() => {
	finePointer = true;
	reducedMotion = false;
	vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
		matches:
			(query === "(hover: hover) and (pointer: fine)" && finePointer) ||
			(query === "(prefers-reduced-motion: reduce)" && reducedMotion),
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}));
});

describe("Dock", () => {
	it("keeps the circular control fixed while magnifying the surrounding slot", async () => {
		const { container } = render(
			<Dock>
				<DockIcon>Home</DockIcon>
			</Dock>
		);
		const dock = container.firstElementChild as HTMLElement;
		const slot = dock.firstElementChild as HTMLElement;
		const control = slot.firstElementChild as HTMLElement;
		expect(slot).toHaveClass("h-12", "w-12");
		expect(control).toHaveClass("size-12");
		expect(control.style.transform).toBe("");
		await waitFor(() => {
			expect(slot).toHaveAttribute("data-dock-enabled", "true");
			expect(slot).toHaveStyle({ width: "48px" });
		});

		const getBounds = vi.spyOn(slot, "getBoundingClientRect");

		fireEvent.pointerMove(dock, { pointerType: "mouse", clientX: 100 });
		fireEvent.pointerMove(dock, { pointerType: "mouse", clientX: 120 });
		fireEvent.pointerLeave(dock, { pointerType: "mouse" });
		expect(getBounds).not.toHaveBeenCalled();
	});

	it("disables magnification for coarse pointers", async () => {
		finePointer = false;
		const { container } = render(
			<Dock>
				<DockIcon>Home</DockIcon>
			</Dock>
		);
		const slot = container.firstElementChild?.firstElementChild as HTMLElement;

		await waitFor(() => expect(slot).toHaveAttribute("data-dock-enabled", "false"));
		expect(slot).toHaveStyle({ width: "48px" });
	});

	it("disables magnification when reduced motion is requested", async () => {
		reducedMotion = true;
		const { container } = render(
			<Dock>
				<DockIcon>Home</DockIcon>
			</Dock>
		);
		const slot = container.firstElementChild?.firstElementChild as HTMLElement;

		await waitFor(() => expect(slot).toHaveAttribute("data-dock-enabled", "false"));
		expect(slot).toHaveStyle({ width: "48px" });
	});
});
