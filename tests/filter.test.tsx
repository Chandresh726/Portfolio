import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Filter } from "app/projects/components/Filter";
import { PROJECTS } from "@/constants";
import { ProjectsExplorer } from "app/projects/components/ProjectsExplorer";

vi.mock("app/sections/project/ProjectItem", () => ({
	ProjectItem: ({ project }: { project: { title: string } }) => <article>{project.title}</article>
}));

describe("Filter", () => {
	it("selects a data-backed filter and restores all projects", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<Filter projects={PROJECTS} onClick={onClick} />);

		const react = screen.getByRole("button", { name: "Filter projects by react" });
		await user.click(react);
		expect(react).toHaveAttribute("aria-pressed", "true");
		expect(onClick).toHaveBeenLastCalledWith("React");

		await user.click(screen.getByRole("button", { name: "Filter projects by all" }));
		expect(onClick).toHaveBeenLastCalledWith(undefined);
		expect(screen.queryByRole("button", { name: /nestjs/i })).not.toBeInTheDocument();
	});

	it("filters the rendered project catalog", async () => {
		const user = userEvent.setup();
		render(<ProjectsExplorer projects={PROJECTS} />);
		await user.click(screen.getByRole("button", { name: "Filter projects by rust" }));
		expect(screen.getByText("Passm")).toBeInTheDocument();
		expect(screen.queryByText("Portfolio")).not.toBeInTheDocument();
	});
});
