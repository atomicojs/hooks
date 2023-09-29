import { useCurrentValue } from "@atomico/use-current-value";
import { useRefValues } from "@atomico/use-ref-values";
import { useState } from "atomico";
export function useListener(ref, name, handler, options) {
    const value = useCurrentValue(handler);
    useRefValues(([current]) => {
        return addListener(current, name, (event) => value.current(event), options);
    }, [ref]);
}
/**
 * Associate an event and return a callback to remove said event
 */
export function addListener(current, name, handler, options) {
    current.addEventListener(name, handler, options);
    return () => current.removeEventListener(name, handler);
}
export function useListenerState(ref, name, handler, options) {
    const [state, setState] = useState();
    useListener(ref, name, (event) => setState(handler(event)), options);
    return state;
}
