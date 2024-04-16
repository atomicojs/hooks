import { Ref, useHost, useRefEffect } from "atomico";

export function useRefIntersectionObserver(
	ref: Ref,
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit,
) {
	useRefEffect(() => {
		const { current } = ref;
		if (!current) return;
		const intersection = new IntersectionObserver(callback, options);
		intersection.observe(current);
		return () => intersection.disconnect();
	}, [ref]);
}

export function useIntersectionObserver(
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit,
) {
	const host = useHost();
	useRefIntersectionObserver(host, callback, options);
}
