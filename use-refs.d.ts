import { Ref } from "atomico";

export function useRefs<T>(): Ref<T> & { currents: T[] };
