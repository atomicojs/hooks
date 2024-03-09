import { Ref, useHost, useInsertionEffect, useRef } from "atomico";

export function useMutationObserver(
	callback: MutationCallback,
	config: MutationObserverInit = {
		childList: true,
		characterData: true,
	},
) {
	useRefMutationObserver(useHost(), callback, config);
}

export function useRefMutationObserver(
	host: Ref<HTMLElement>,
	callback: MutationCallback,
	config: MutationObserverInit = {
		childList: true,
		characterData: true,
	},
) {
	const ref = useRef<MutationCallback>();

	ref.current = callback;

	useInsertionEffect(() => {
		const mutation = new MutationObserver((entries) => {
			entries.forEach(({ addedNodes }) => addedNodes.forEach(map));
			ref.current(entries, mutation);
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
