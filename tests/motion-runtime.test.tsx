import { render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import * as m from "framer-motion/m";
import { ThemeContext } from "context/theme_context";

it("loads the Motion features synchronously so lightweight components animate on mount", async () => {
	render(
		<ThemeContext>
			<m.div
				data-testid="animated"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0 }}
			/>
		</ThemeContext>
	);
	await waitFor(() => expect(screen.getByTestId("animated")).toHaveStyle({ opacity: "1" }));
});
