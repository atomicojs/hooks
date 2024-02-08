import atomico from "@atomico/vite";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		target: "esnext",
	},
	test: {
		environment: "jsdom",
	},
	plugins: [
		...atomico({
			cssLiterals: { postcss: true },
			vitest: true,
		}),
	],
	optimizeDeps: {
		exclude: "atomico/test-dom",
	},
});
