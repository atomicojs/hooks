import { useProp, useLayoutEffect } from "atomico";
import { useParent } from "@atomico/use-parent";
import { useMutationObserver } from "@atomico/use-mutation-observer";

const checkDisable = (el: Element) => el.hasAttribute("disabled");
/**
 * Synchronize disabled status with a parent
 * @example
 * ```jsx
 * <fieldset disabled>
 *      <my-input>I am disabled</my-input>
 * </fieldset>
 * ```
 * @example
 * ```css
 * :host([disabled]){
 *      pointer-events: none;
 * }
 * ```
 */
export function useDisabled(matches = "fieldset"): boolean {
	const fieldset = useParent(matches);
	const [disabled, setDisabled] = useProp("disabled");

	useMutationObserver(
		fieldset,
		(items) =>
			items
				.filter((item) => item.attributeName == "disabled")
				.map((el) => {
					setDisabled(checkDisable(el.target as Element));
				}),
		{
			attributes: true,
		},
	);

	useLayoutEffect(() => {
		const { current } = fieldset;
		if (current) {
			setDisabled(checkDisable(current));
		}
	}, []);

	return disabled;
}
