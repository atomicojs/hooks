import { useState } from "atomico";
/**
 * save the first parameter in a list
 * @template T
 * @param {T} value
 * @param {number} [maxLength]
 * @returns {T[]}
 */
export function useHistory(value, maxLength = 100) {
  const [state] = useState(() => ({ history: [] }));
  if (state.history.at(-1) !== value) {
    state.history = [...state.history, value].slice(maxLength * -1);
  }
  return state.history;
}
