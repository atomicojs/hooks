import { useHost, useInsertionEffect } from "atomico";

export function useMutationObserver(
	callback: MutationCallback,
	config: MutationObserverInit = {
		childList: true,
		characterData: true,
	},
) {
	const host = useHost();

	host.callback = callback;

	useInsertionEffect(() => {
		const mutation = new MutationObserver((entries) => {
			entries.forEach(({ addedNodes }) => addedNodes.forEach(map));
			host.callback(entries, mutation);
		});

		const map = (child: ChildNode) => {
			if (child instanceof Text) {
				mutation.observe(child, { ...config, characterData: true });
			}
		};

		mutation.observe(host.current, config);

		host.current.childNodes.forEach(map);

		return () => mutation.disconnect();
	}, []);
}
