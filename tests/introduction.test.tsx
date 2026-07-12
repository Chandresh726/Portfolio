import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WelcomeSection } from "app/sections/introduction";

vi.mock("app/sections/introduction/DisplayLottie", () => ({
	default: () => null
}));

afterEach(() => vi.unstubAllEnvs());

describe("WelcomeSection", () => {
	it("renders the configured resume destination", () => {
		vi.stubEnv("NEXT_PUBLIC_RESUME_URL", "https://example.com/resume.pdf");
		render(<WelcomeSection />);
		expect(screen.getByRole("link", { name: "view resume" })).toHaveAttribute(
			"href",
			"https://example.com/resume.pdf"
		);
	});

	it("omits the resume CTA when no destination is configured", () => {
		vi.stubEnv("NEXT_PUBLIC_RESUME_URL", "");
		render(<WelcomeSection />);
		expect(screen.queryByRole("link", { name: "view resume" })).not.toBeInTheDocument();
	});
});
