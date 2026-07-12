import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExperienceAccordion } from "app/sections/experience/ExperienceAccordion";

vi.mock("next/image", () => ({
	default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />
}));

describe("ExperienceSection", () => {
	it("exposes disclosure state and native mouse, Enter, and Space behavior", async () => {
		const user = userEvent.setup();
		render(<ExperienceAccordion />);
		const buttons = screen.getAllByRole("button", { name: /at/i });
		const button = buttons[1];
		expect(button).toHaveAttribute("aria-expanded", "false");
		expect(button).toHaveAttribute("aria-controls", expect.stringMatching(/-details$/));

		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "true");
		button.focus();
		await user.keyboard("{Enter}");
		expect(button).toHaveAttribute("aria-expanded", "false");
		await user.keyboard(" ");
		expect(button).toHaveAttribute("aria-expanded", "true");
	});
});
