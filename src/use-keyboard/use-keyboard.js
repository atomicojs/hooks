import { useCurrentValue } from "../use-current-value/use-current-value.js";
import { useRefValues } from "../use-ref-values/use-ref-values.js";
import { addListener } from "../use-listener/use-listener.js";
/**
 * @param {import("atomico").Ref} ref
 * @param {string[]} keys
 * @param {(event:KeyboardEvent )=>void} callback
 */
export function useKeyboard(ref, keys, callback) {
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
    [ref]
  );
}
