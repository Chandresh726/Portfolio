import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConnectMedia } from "components/ConnectMedia";

describe("ConnectMedia", () => {
	it("uses a slow, reduced-motion-safe social expansion", () => {
		render(<ConnectMedia />);
		for (const link of screen.getAllByRole("link")) {
			expect(link).toHaveClass("duration-700", "hover:scale-125", "motion-reduce:transition-none");
		}
	});
});
