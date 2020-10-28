import { h, render, useHost, useMemo } from "atomico";

type Callback = () => any;

const host = h("host");

const fillHost = (vdom: any): any => {
  if (vdom && typeof vdom == "object") {
    vdom = vdom.type == "host" ? vdom : h("host", null, vdom);
    return vdom;
  }
  return host;
};

export function useRender(callback: Callback, args?: any[]) {
  const host = useHost();
  useMemo(() => render(fillHost(callback()), host.current), args);
}
