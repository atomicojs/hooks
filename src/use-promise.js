import { useEffect, useState } from "atomico";

/**
 * @return {State}
 */
const initalState = () => [, ""];
/**
 * @example
 * ```js
 * const [executePromise, setExecutePromise] = useState();
 * const [ result, status ] = usePromise(()=>fetch("./any").then(res=>res.json()),executePromise);
 * ```
 * @param {()=>Promise<any>} promise -
 * @param {boolean} run
 * @param {any[]} [args]
 * @returns {State}
 */
export function usePromise(promise, run, args = []) {
  const [state, setState] = useState(initalState);

  useEffect(() => {
    if (run) {
      setState(([result]) => [result, "pending"]);
      promise().then(
        (result) => run && setState(() => [result, "fulfilled"]),
        (result) => run && setState(() => [result, "rejected"])
      );
    }
    return () => {
      setState((state) => {
        const [result, status] = state;
        // clear the state since the promise has been canceled
        return status == "pending" ? [result, ""] : state;
      });
      run = null;
    };
  }, [run, ...args]);

  return state;
}

/**@typedef {[any,""|"pending"|"fulfilled"|"rejected"]} State */
