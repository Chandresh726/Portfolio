import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname),
			app: path.resolve(import.meta.dirname, "app"),
			components: path.resolve(import.meta.dirname, "components"),
			constants: path.resolve(import.meta.dirname, "constants"),
			content: path.resolve(import.meta.dirname, "content"),
			context: path.resolve(import.meta.dirname, "context"),
			hooks: path.resolve(import.meta.dirname, "hooks"),
			types: path.resolve(import.meta.dirname, "types"),
			utils: path.resolve(import.meta.dirname, "utils")
		}
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./tests/setup.ts"],
		css: false,
		clearMocks: true
	}
});
