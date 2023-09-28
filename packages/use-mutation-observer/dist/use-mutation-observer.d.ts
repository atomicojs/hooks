import { Ref } from "atomico";
/**
 * create an instance of MutationObserver for the given reference
 * @example
 * ```js
 * const ref = useRef();
 * const config = {childList: true};
 * useMutationObserver(ref, (mutationRecords)=>{}, config);
 * ```
 */
export declare function useMutationObserver(ref: Ref, observe: MutationCallback, config?: MutationObserverInit): void;
/**
 * create an instance of MutationObserver for the given reference
 * and bind MutationRecord[] to a local state
 * @example
 * ```js
 * const ref = useRef();
 * const config = {childList: true};
 * const mutationRecords = useMutationObserverState(ref, config);
 * ```
 */
export declare function useMutationObserverState(ref: Ref, config?: MutationObserverInit): MutationRecord[];
