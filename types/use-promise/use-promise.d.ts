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
export function usePromise(promise: () => Promise<any>, run: boolean, args?: any[] | undefined): State;
export type State = [any, "" | "pending" | "fulfilled" | "rejected"];
