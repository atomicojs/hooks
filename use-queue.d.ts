export function useQueue<E = any, R = E>(
  colector: (entries: E[]) => any,
  reduce?: (param: R) => E
): (param: R) => R | E;
