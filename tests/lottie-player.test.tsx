import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LottiePlayer from "app/sections/introduction/LottiePlayer";

vi.mock("lottie-react", () => ({
	default: ({ animationData }: { animationData: object }) => (
		<div data-testid="lottie-renderer" data-animation={JSON.stringify(animationData)} />
	)
}));

describe("LottiePlayer", () => {
	it("renders supplied animation data with the dedicated entrance animation", () => {
		const animationData = { layers: [{ name: "coding" }] };
		const { container } = render(<LottiePlayer animationData={animationData} />);
		const renderer = screen.getByTestId("lottie-renderer");
		expect(renderer).toHaveAttribute("data-animation", JSON.stringify(animationData));
		expect(container.firstChild).toHaveClass("intro-lottie-reveal");
	});
});
