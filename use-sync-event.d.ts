import { Colector, Reduce } from "./use-queue";

export function useSyncEventListener(
  type: string,
  colector: Colector<HTMLElement>,
  reduce?: Reduce<Event, HTMLElement>
): void;

export function useSyncEventDispatch(type: string): () => void;
