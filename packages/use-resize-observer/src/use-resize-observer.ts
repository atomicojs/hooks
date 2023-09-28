import { Ref, useState } from "atomico";
import { useCurrentValue } from "@atomico/use-current-value";
import { useRefValues } from "@atomico/use-ref-values";

interface Rect {
	width: number;
	height: number;
	x: number;
	y: number;
	top: number;
	right: number;
	bottom: number;
	left: number;
}

const listenersId = Symbol();

let resizeObserver: ResizeObserver;

/**
 * Observe the ResizeObserver state of a reference
 * @example
 * ```js
 * useResizeObserver(ref, (rect)=>{
 *  console.log(rect.width)
 * });
 * ```
 */
export function useResizeObserver(ref: Ref, callback: (rect: Rect) => void) {
	const value = useCurrentValue(callback);

	useRefValues(
		([current]) => {
			if (!resizeObserver) {
				resizeObserver = new ResizeObserver((entries) =>
					entries.forEach(({ contentRect, target }) => {
						const rect = contentRect.toJSON();
						const listeners = target[listenersId];
						for (const listener of listeners) listener(rect);
					}),
				);
			}
			/**
			 * @param {Rect} rect
			 */
			const listener = (rect) => value.current(rect);

			if (!current[listenersId]) {
				resizeObserver.observe(current);
				current[listenersId] = new Set();
			}

			current[listenersId].add(listener);

			return () => {
				current[listenersId].delete(listener);
				if (!current[listenersId].size) {
					delete current[listenersId];
					resizeObserver.unobserve(current);
				}
			};
		},
		[ref],
		true,
	);
}

/**
 * Observes the ResizeObserver state of a reference and reflects
 * it to a local state of the component
 * @example
 * ```js
 * const ref = useResizeObserverState(ref);
 * if(ref){
 *  console.log(ref.width)
 * }
 * ```
 */
export function useResizeObserverState(ref: Ref): Rect {
	const [rect, setRect] = useState<Rect>();
	useResizeObserver(ref, setRect);
	return rect;
}
