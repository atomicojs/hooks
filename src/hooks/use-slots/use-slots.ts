import { HostContext, h, useHost, useState } from "atomico";

interface SlotElements {
  [slot: string]: Element;
}

type SlotsChildren = ChildNode[];

const slotsId = Symbol();

function loadSlots(
  current: HTMLElement & HostContext
): [SlotElements, SlotsChildren] {
  const { symbolId } = current;
  const currentSlots = {};
  const currentChildren: ChildNode[] = [];

  current.childNodes.forEach((node: ChildNode) => {
    if (!node[symbolId]) {
      if (node instanceof HTMLElement) {
        const slot = node.getAttribute("slot");
        currentSlots[slot] = node;
      }
      if (!node[symbolId] || node[slotsId]) {
        node[slotsId] = true;
        currentChildren.push(node);
      }
    }
  });
  return [currentSlots, currentChildren];
}

export function useSlots(): [SlotElements, SlotsChildren, () => void] {
  const { current } = useHost();
  const update = () => loadSlots(current);
  const [slots, setSlots] = useState(update);

  return [...slots, () => setSlots(update)];
}
