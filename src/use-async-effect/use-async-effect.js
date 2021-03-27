import { useEffect } from "atomico";
/**
 *
 * @param {()=>Promise<()=>any|void>} effect
 * @param {Array<any>} [args]
 */
export function useAsyncEffect(effect, args) {
  useEffect(() => {
    const task = Promise.resolve(args).then(effect);
    return () => task.then((collector) => collector());
  }, args);
}
