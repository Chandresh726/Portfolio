import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			"react-hooks": reactHooksPlugin,
			"@next/next": nextPlugin
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		rules: {
			...reactHooksPlugin.configs.recommended.rules,
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"@next/next/no-duplicate-head": "off",
			"react-hooks/set-state-in-effect": "off"
		}
	},
	{
		ignores: [".next/*", "node_modules/*", "out/*", "next-env.d.ts"]
	}
);
