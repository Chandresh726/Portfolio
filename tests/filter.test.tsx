import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Filter } from "app/projects/components/Filter";
import { PROJECTS } from "@/constants";
import { ProjectsExplorer } from "app/projects/components/ProjectsExplorer";

function ControlledFilter({ onChange }: { onChange: (value: string | undefined) => void }) {
	const [activeFilter, setActiveFilter] = useState<string | undefined>();
	return (
		<Filter
			projects={PROJECTS}
			activeFilter={activeFilter}
			onClick={(value) => {
				setActiveFilter(value);
				onChange(value);
			}}
		/>
	);
}

describe("Filter", () => {
	it("selects a data-backed filter and restores all projects", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<ControlledFilter onChange={onClick} />);

		const react = screen.getByRole("button", { name: "Filter projects by react" });
		await user.click(react);
		expect(react).toHaveAttribute("aria-pressed", "true");
		expect(onClick).toHaveBeenLastCalledWith("React");

		await user.click(screen.getByRole("button", { name: "Filter projects by all" }));
		expect(onClick).toHaveBeenLastCalledWith(undefined);
		expect(screen.queryByRole("button", { name: /nestjs/i })).not.toBeInTheDocument();
	});

	it("filters stable server-rendered project cards", async () => {
		const user = userEvent.setup();
		render(
			<ProjectsExplorer projects={PROJECTS}>
				{PROJECTS.map((project) => (
					<article key={project.slug}>{project.title}</article>
				))}
			</ProjectsExplorer>
		);

		await user.click(screen.getByRole("button", { name: "Filter projects by rust" }));
		expect(screen.getByText("Passm").closest("[hidden]")).toBeNull();
		expect(screen.getByText("Passm").closest("[aria-busy]"))?.toHaveAttribute("aria-busy", "true");
		await waitFor(() => {
			expect(screen.getByText("Portfolio").closest("[hidden]")).toBeInTheDocument();
			expect(screen.getByText("1 project shown")).toBeInTheDocument();
		});
	});
});
