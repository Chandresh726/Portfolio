import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectItem } from "app/sections/project/ProjectItem";

vi.mock("components/ui/image-carousel", () => ({
	ImageCarousel: () => <div>Project image</div>
}));

describe("ProjectItem", () => {
	it("uses a restrained, smooth hover expansion", () => {
		render(
			<ProjectItem
				project={{
					slug: "sample",
					title: "Sample project",
					description: "A sample project",
					updatedAt: "2026-07-19",
					images: [],
					liveUrl: null,
					repoUrl: null,
					stack: []
				}}
			/>
		);

		const card = screen.getByRole("article");
		expect(card).toHaveClass(
			"duration-900",
			"hover:-translate-y-1.5",
			"hover:scale-[1.015]",
			"motion-reduce:transition-none"
		);
		expect(card).not.toHaveClass("hover:shadow-2xl");
		expect(screen.getByRole("heading", { name: "Sample project" })).not.toHaveClass(
			"group-hover:text-blue-light"
		);
	});
});
