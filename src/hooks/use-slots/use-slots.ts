import { h, useHost } from "atomico";

interface SlotElements {
  [slot: string]: any[] | Element;
}

interface Slots extends SlotElements {
  children: any[];
}

export function useSlots<T = Slots>(): T {
  const host = useHost();
  if (!host.slots) {
    const children: any[] = [];
    const slots: Slots = { children };
    const { current } = host;
    current.childNodes.forEach((childNode) => {
      if (childNode instanceof HTMLElement) {
        const slot = childNode.getAttribute("slot");
        if (slot) slots[slot] = childNode;
      }
      children.push(h(childNode));
    });
    host.slots = slots;
  }
  return host.slots;
}
