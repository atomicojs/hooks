import { Ref, useHost } from "atomico";
import { useRefValues } from "@atomico/use-ref-values";

export function useRefIntersectionObserver(
	ref: Ref,
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit,
) {
	useRefValues(
		() => {
			const intersection = new IntersectionObserver(callback, options);
			intersection.observe(ref.current);
			return () => intersection.disconnect();
		},
		[ref],
		true,
	);
}

export function useIntersectionObserver(
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit,
) {
	const host = useHost();
	useRefIntersectionObserver(host, callback, options);
}
