import { Ref, useEffect, useHost } from "atomico";

export function useListener(
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  const ref = useHost();
  useListenerRef(ref, type, handler, options);
}

export function useListenerRef(
  ref: Ref<Element>,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    const { current } = ref;
    current.addEventListener(type, handler, options);
    return () => current.removeEventListener(type, handler);
  }, [type]);
}
