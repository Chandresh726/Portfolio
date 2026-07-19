import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroMotion, useHeroVisualReady } from "components/motion/hero-motion";

vi.mock("hooks/use-media-query", () => ({
	useMediaQuery: () => true
}));

vi.mock("framer-motion", () => ({
	useReducedMotion: () => false
}));

function ReadyVisual() {
	const markReady = useHeroVisualReady();
	return <button onClick={markReady}>Visual ready</button>;
}

describe("HeroMotion", () => {
	it("starts the copy and left-origin visual from the same readiness state", () => {
		const { container } = render(<HeroMotion copy={<p>Hero copy</p>} visual={<ReadyVisual />} />);
		const hero = container.querySelector(".hero-motion");

		expect(hero).not.toHaveClass("hero-motion--ready");
		expect(hero?.querySelector(".hero-copy-motion")).toHaveTextContent("Hero copy");
		expect(hero?.querySelector(".hero-visual-motion")).toHaveTextContent("Visual ready");

		fireEvent.click(hero?.querySelector("button") as HTMLButtonElement);
		expect(hero).toHaveClass("hero-motion--ready");
	});
});
