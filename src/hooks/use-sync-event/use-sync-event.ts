import { useEffect, useEvent } from "atomico";
import { useQueue } from "../use-queue/use-queue";
import { useListener } from "../use-listener/use-listener";

type Consumer = (entries: any[]) => void;

interface SyncEvent extends Event {
  target: HTMLElement;
}

const reducerDefault = (event: SyncEvent): HTMLElement => {
  event.stopPropagation();
  return event.target;
};

export function useSyncEventListener(
  type: string,
  consumer: Consumer,
  reducer = reducerDefault
) {
  const addEntry = useQueue<HTMLElement, SyncEvent>(consumer, reducer);
  useListener(type, addEntry);
}

export function useSyncEventDispatch(type: string) {
  const dispatchSync = useEvent(type, { bubbles: true, composed: true });

  useEffect(() => {
    dispatchSync();
    return dispatchSync;
  }, []);
}
