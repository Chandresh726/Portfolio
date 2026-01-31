import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			react: reactPlugin,
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
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"@next/next/no-duplicate-head": "off",
			"react-hooks/set-state-in-effect": "off"
		},
		settings: {
			react: {
				version: "detect"
			}
		}
	},
	{
		ignores: [".next/*", "node_modules/*", "out/*"]
	}
);
