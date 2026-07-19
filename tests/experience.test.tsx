import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExperienceAccordion } from "app/sections/experience/ExperienceAccordion";

vi.mock("next/image", () => ({
	default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />
}));

describe("ExperienceSection", () => {
	it("server-renders every description while preserving disclosure behavior", async () => {
		const user = userEvent.setup();
		render(<ExperienceAccordion />);
		const buttons = screen.getAllByRole("button", { name: /at/i });

		expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
		expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
		expect(buttons[1]).toHaveAttribute("aria-controls", expect.stringMatching(/-details$/));
		expect(screen.getByText("Eligibility MCP server")).toBeInTheDocument();
		expect(screen.getByText("FastMCP")).toBeInTheDocument();
		expect(screen.getByText("Instant Unlock")).toBeInTheDocument();
		expect(screen.getByText(/20\+ RESTful APIs/i)).toBeInTheDocument();
		expect(screen.getByText("Instant Unlock").closest("li")).toHaveClass("experience-detail-item");
		expect(screen.getByText("Instant Unlock").closest("li")).toHaveStyle({
			"--experience-item-index": "0"
		});

		await user.click(buttons[1]);
		expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByRole("region", { name: /Associate Software Engineer/i })).toHaveClass(
			"grid-rows-[1fr]",
			"opacity-100"
		);
		buttons[1].focus();
		await user.keyboard("{Enter}");
		expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
		await user.keyboard(" ");
		expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
	});
});
