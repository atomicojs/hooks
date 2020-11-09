import { Ref, useState, useRef, useEffect } from "atomico";
/**
 * @todo test
 **/
export function useSlot(ref: Ref<HTMLSlotElement>) {
  const [childNodes, setChildNodes] = useState<ChildNode[]>([]);

  useEffect(() => {
    const { current } = ref;
    const type = "slotchange";
    // Take the existing children
    setChildNodes(current.assignedElements());
    // handler subscriber to the event
    const handler = () => setChildNodes(current.assignedElements());
    // listener and unlistener
    current.addEventListener(type, handler);
    return () => current.removeEventListener(type, handler);
  }, []);

  return childNodes;
}
