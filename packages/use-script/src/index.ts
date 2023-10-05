import { options, usePromise } from "atomico";

const cache: { [id: string]: Promise<void> } = {};

export const importScript = (src: string) =>
	(cache[src] =
		cache[src] ||
		new Promise<void>((resolve) => {
			if (!options.ssr) return;
			const script = document.createElement("script");

			script.src = src;

			script.onload = () => resolve();

			document.head.append(script);
		}));

export const useScript = (src: string) => usePromise(importScript, [src]);
