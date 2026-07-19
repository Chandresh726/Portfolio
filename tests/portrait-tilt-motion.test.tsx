import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PortraitTiltMotion } from "app/sections/about/PortraitTiltMotion";

vi.mock("next/image", () => ({
	default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />
}));

describe("PortraitTiltMotion", () => {
	it("measures once per mouse interaction instead of during pointer movement", () => {
		render(<PortraitTiltMotion />);
		const portrait = screen.getByRole("img", { name: "About me image" }).parentElement;
		expect(portrait).not.toHaveClass("cursor-pointer");
		const getBounds = vi.spyOn(portrait as HTMLElement, "getBoundingClientRect").mockReturnValue({
			x: 10,
			y: 20,
			left: 10,
			top: 20,
			right: 250,
			bottom: 340,
			width: 240,
			height: 320,
			toJSON: () => ({})
		});

		fireEvent.pointerEnter(portrait as HTMLElement, { pointerType: "mouse" });
		fireEvent.pointerMove(portrait as HTMLElement, {
			pointerType: "mouse",
			clientX: 150,
			clientY: 180
		});
		fireEvent.pointerMove(portrait as HTMLElement, {
			pointerType: "mouse",
			clientX: 170,
			clientY: 200
		});
		expect(getBounds).toHaveBeenCalledTimes(1);

		fireEvent.pointerLeave(portrait as HTMLElement, { pointerType: "mouse" });
		fireEvent.pointerEnter(portrait as HTMLElement, { pointerType: "touch" });
		expect(getBounds).toHaveBeenCalledTimes(1);
	});
});
