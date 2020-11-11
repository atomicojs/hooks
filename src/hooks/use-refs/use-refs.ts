import { Ref, useState } from "atomico";

export function useRefs<T = Element>() {
  const [ref] = useState<Ref<T>>(() => ({
    currents: [],
    set current(target: Element) {
      this.currents.push(target);
    },
  }));
  return ref;
}
