export type Colector<E> = (entries: E[]) => any;

export type Reduce<E, R> = (param: E) => R;

export function useQueue<E = any, R = E>(
  colector: Colector<E>,
  reduce?: Reduce<E, R>
): (param: R) => R | E;
