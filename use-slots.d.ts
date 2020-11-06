export interface SlotElements {
  [slot: string]: Element;
}

export type SlotsChildren = ChildNode[];

export function useSlots(): [SlotElements, SlotsChildren, () => void];
