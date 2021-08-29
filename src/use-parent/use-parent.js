import { useHost, useMemo } from "atomico";
/**
 * @template {HTMLElement} T - reference current
 * @param {string} matches
 * @returns {import("atomico").Ref<T>}
 */
export function useParent(matches) {
  const host = useHost();
  return useMemo(() => {
    let { current } = host;
    while ((current = current.parentNode || current.host)) {
      if (current.matches && current.matches(matches)) {
        return { current };
      }
    }
    return {};
  }, [matches]);
}
