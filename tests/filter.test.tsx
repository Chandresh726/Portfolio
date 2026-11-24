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

function StatefulCard({ title }: { title: string }) {
	const [count, setCount] = useState(0);
	return (
		<button onClick={() => setCount(count + 1)}>
			{title}: {count}
		</button>
	);
}

describe("Filter", () => {
	it("keeps card state attached to its slug when items are reordered", async () => {
		const user = userEvent.setup();
		const items = PROJECTS.slice(0, 2).map(({ slug, stack, title }) => ({
			slug,
			stack,
			card: <StatefulCard title={title} />
		}));
		const { rerender } = render(<ProjectsExplorer items={items} />);
		await user.click(screen.getByRole("button", { name: `${PROJECTS[0].title}: 0` }));
		rerender(<ProjectsExplorer items={[...items].reverse()} />);
		expect(screen.getByRole("button", { name: `${PROJECTS[0].title}: 1` })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: `${PROJECTS[1].title}: 0` })).toBeInTheDocument();
	});

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
			<ProjectsExplorer
				items={PROJECTS.map((project) => ({
					slug: project.slug,
					stack: project.stack,
					card: <article>{project.title}</article>
				}))}
			/>
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
