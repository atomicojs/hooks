import { Ref } from "atomico";

export function useListener(
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;

export function useListenerRef(
  ref: Ref<Element>,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;
