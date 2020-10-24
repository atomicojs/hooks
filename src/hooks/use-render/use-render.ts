import { render, useHost, useMemo } from "atomico";

type Callback = () => any;

export function useRender(callback: Callback, args?: any[]) {
  const host = useHost();
  useMemo(() => {
    render(callback(), host.current);
  }, args);
}
