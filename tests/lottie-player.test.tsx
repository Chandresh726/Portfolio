import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LottiePlayer from "app/sections/introduction/LottiePlayer";

vi.mock("lottie-react", () => ({
	default: ({ animationData }: { animationData: object }) => (
		<div data-testid="lottie-renderer" data-animation={JSON.stringify(animationData)} />
	)
}));

afterEach(() => vi.restoreAllMocks());

describe("LottiePlayer", () => {
	it("aborts its in-flight animation request when unmounted", async () => {
		let requestSignal: AbortSignal | undefined;
		vi.spyOn(globalThis, "fetch").mockImplementation((_input, init) => {
			requestSignal = init?.signal ?? undefined;
			return new Promise<Response>(() => {});
		});

		const { unmount } = render(<LottiePlayer animationPath="/lottie/coding.json" />);
		await waitFor(() => expect(requestSignal).toBeInstanceOf(AbortSignal));
		expect(requestSignal?.aborted).toBe(false);
		unmount();
		expect(requestSignal?.aborted).toBe(true);
	});

	it("renders the player after a successful desktop animation response", async () => {
		const animationData = { layers: [{ name: "coding" }] };
		vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			json: async () => animationData
		} as Response);

		render(<LottiePlayer animationPath="/lottie/coding.json" />);
		const renderer = await screen.findByTestId("lottie-renderer");
		expect(renderer).toHaveAttribute("data-animation", JSON.stringify(animationData));
	});
});
