import { Ref } from "atomico";
import { useCurrentValue } from "@atomico/use-current-value";
import { useRefValues } from "@atomico/use-ref-values";
import { addListener } from "@atomico/use-listener";

export function useKeyboard(
	ref: Ref<Element>,
	keys: string[],
	callback: (event: KeyboardEvent) => void,
) {
	const value = useCurrentValue(callback);

	useRefValues(
		([current]) => {
			const history = new Set();

			const check = () => {
				if (keys.length == history.size) {
					const map = [...history];
					if (map.every((code, i) => code == keys[i])) {
						return true;
					}
				}
			};

			

			const removeKeydown = addListener(current, "keydown", (event) => {
				history.add(event.code);
				if (check()) value.current(event);
			});

			const removeKeyup = addListener(current, "keyup", (event) => {
				if (check()) value.current(event);
				history.delete(event.code);
			});

			return () => {
				removeKeydown();
				removeKeyup();
			};
		},
		[ref],
	);
}
