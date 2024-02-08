import { Ref, useState } from "atomico";
import { useCurrentValue } from "@atomico/use-current-value";
import { useRefValues } from "@atomico/use-ref-values";
/**
 * create an instance of MutationObserver for the given reference
 * @example
 * ```js
 * const ref = useRef();
 * const config = {childList: true};
 * useMutationObserver(ref, (mutationRecords)=>{}, config);
 * ```
 */
export function useMutationObserver(
	ref: Ref,
	observe: MutationCallback,
	config?: MutationObserverInit,
) {
	const value = useCurrentValue(observe);
	useRefValues(
		([current]) => {
			const observer = new MutationObserver((...args) =>
				value.current(...args),
			);
			observer.observe(current, config);
			return () => observer.disconnect();
		},
		[ref],
	);
}

/**
 * create an instance of MutationObserver for the given reference
 * and bind MutationRecord[] to a local state
 * @example
 * ```js
 * const ref = useRef();
 * const config = {childList: true};
 * const mutationRecords = useMutationObserverState(ref, config);
 * ```
 */
export function useMutationObserverState(
	ref: Ref,
	config?: MutationObserverInit,
): MutationRecord[] {
	const [state, setState] = useState();
	useMutationObserver(ref, setState, config);
	return state;
}
