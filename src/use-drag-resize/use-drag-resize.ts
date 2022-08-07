import { Ref, useState, useHost, useEffect } from "atomico";
import { useListener } from "../use-listener/use-listener";
import { useDebounceState } from "../use-debounce-state/use-debounce-state";

export function useDragResize(
  ref: Ref,
  rootState: number[] = [1, 1]
): [boolean, number, number] {
  const host = useHost();
  const [active, setActive] = useState(false);
  const [[x, y], setValue] = useDebounceState(1, rootState, "fps");

  useEffect(() => setValue(rootState), rootState);

  const start = () => setActive(true);
  const end = () => setActive(false);

  useListener(ref, "mousedown", start);

  useListener(host, "mouseup", end);

  useListener(host, "mouseleave", end);

  useListener(ref, "touchstart", start);

  useListener(host, "touchend", end);

  useListener(host, "touchmove", (event: TouchEvent) => {
    const {
      targetTouches: [touche],
    } = event;
    const rect = host.current.getBoundingClientRect();
    const offsetX = touche.pageX - rect.x;
    const offsetY = touche.pageY - rect.y;
    const { current } = host;
    setValue([offsetX / current.clientWidth, offsetY / current.clientHeight]);
  });

  useListener(host, "mousemove", (event: MouseEvent) => {
    if (active) {
      const { current } = host;
      setValue([
        event.offsetX / current.clientWidth,
        event.offsetY / current.clientHeight,
      ]);
    }
  });

  return [active, x, y];
}
