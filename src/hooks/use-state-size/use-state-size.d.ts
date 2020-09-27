import { Ref } from "atomico";

interface ResizeObserverEntry {}

type ResizeObserverHandler = (entry: ResizeObserverEntry) => void;

declare module "@atomico/kit/use-state-size" {
  export function useResizeObserver(
    ref: Ref,
    observer?: ResizeObserverHandler
  ): ResizeObserverEntry;

  export function useSize(
    ref: Ref,
    observer?: ResizeObserverHandler
  ): [number, number];

  export function useStateSize(
    ref: Ref,
    value: string
  ): string | [string, string];
}
