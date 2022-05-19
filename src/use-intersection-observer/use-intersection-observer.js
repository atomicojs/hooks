import { useHost } from "atomico";
import { useRefValues } from "../use-ref-values/use-ref-values.js";
/**
 *
 * @param {import("atomico").Ref} ref
 * @param {IntersectionObserverCallback} callback
 * @param {IntersectionObserverInit} [options]
 */
export function useRefIntersectionObserver(ref, callback, options) {
  useRefValues(() => {
    const intersection = new IntersectionObserver(callback, options);
    intersection.observe(ref.current);
    return () => intersection.disconnect();
  }, [ref]);
}

/**
 *
 * @param {IntersectionObserverCallback} callback
 * @param {IntersectionObserverInit} [options]
 */
export function useIntersectionObserver(callback, options) {
  const host = useHost();
  useRefIntersectionObserver(host, callback, options);
}
