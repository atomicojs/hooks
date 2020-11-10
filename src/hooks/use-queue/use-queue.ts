import { useRef } from "atomico";

type Defer = (callback: () => any) => any;

const defer: Defer =
  queueMicrotask || ((callback) => Promise.resolve().then(callback));

export function useQueue<E = any, R = E>(
  colector: (entries: E[]) => any,
  reduce?: (param: R) => E
): (param: R) => R | E {
  const ref = useRef();
  return (param) => {
    if (!ref.pipe) {
      ref.pipe = [];
      defer(() => {
        const { pipe } = ref;
        delete ref.pipe;
        colector(pipe);
      });
    }
    const value = reduce ? reduce(param) : param;
    if (value != null) ref.pipe.push(value);
    return value;
  };
}
