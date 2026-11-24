import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Reveal, RevealGroup } from "components/motion/reveal";
import type { ReactNode } from "react";

const motionState = vi.hoisted(() => ({ reduced: false }));

vi.mock("framer-motion/m", () => ({
	div: ({
		children,
		initial,
		whileInView,
		viewport,
		variants,
		custom,
		...props
	}: Record<string, unknown> & { children?: ReactNode }) => {
		const visible = variants && (variants as { visible?: unknown }).visible;
		const resolvedVisible =
			typeof visible === "function" ? visible(custom) : (visible as Record<string, unknown>);
		const transition =
			typeof resolvedVisible === "object" && resolvedVisible
				? (resolvedVisible as { transition?: { delay?: number } }).transition
				: undefined;

		return (
			<div
				data-initial={String(initial)}
				data-while-in-view={String(whileInView)}
				data-once={String((viewport as { once?: boolean } | undefined)?.once)}
				data-margin={(viewport as { margin?: string } | undefined)?.margin}
				data-amount={(viewport as { amount?: number } | undefined)?.amount}
				data-transition-delay={transition?.delay}
				data-delay={String(custom ?? "")}
				{...props}
			>
				{children}
			</div>
		);
	}
}));

beforeEach(() => {
	motionState.reduced = false;
});

describe("viewport reveal motion", () => {
	it("reveals once inside the viewport with the configured margin and delay", () => {
		render(
			<Reveal delay={0.18}>
				<span>Content</span>
			</Reveal>
		);
		const reveal = screen.getByText("Content").parentElement;

		expect(reveal).toHaveAttribute("data-initial", "hidden");
		expect(reveal).toHaveAttribute("data-while-in-view", "visible");
		expect(reveal).toHaveAttribute("data-once", "true");
		expect(reveal).toHaveAttribute("data-margin", "0px 0px -80px 0px");
		expect(reveal).toHaveAttribute("data-amount", "0.12");
		expect(reveal).toHaveAttribute("data-delay", "0.18");
	});

	it("animates cards in the same visual row together", () => {
		render(
			<RevealGroup columns={{ base: 2 }}>
				<span>One</span>
				<span>Two</span>
				<span>Three</span>
				<span>Four</span>
			</RevealGroup>
		);
		const delays = ["One", "Two", "Three", "Four"].map((label) =>
			screen.getByText(label).parentElement?.getAttribute("data-transition-delay")
		);

		expect(delays).toEqual(["0.12", "0.12", "0.25", "0.25"]);
	});

	it("uses the reduced-motion CSS contract without changing hydrated markup", () => {
		motionState.reduced = true;
		render(<Reveal>Reduced content</Reveal>);

		const reveal = screen.getByText("Reduced content");
		expect(reveal).toHaveAttribute("data-initial", "hidden");
		expect(reveal).toHaveClass("motion-reveal");
	});
});
