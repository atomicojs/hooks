import { h, render, useHost, useMemo } from "atomico";

const host = h("host");
/**
 * Ensures that the render function always
 * receives a tree that starts from the host tag
 * @param {any} vdom
 */
function fillHost(vdom) {
  if (vdom && typeof vdom == "object") {
    vdom = vdom.type == "host" ? vdom : h("host", null, vdom);
    return vdom;
  }
  return host;
}
/**
 * Generate a second render, this render escapes the current
 * one and is useful for collaborative work between LightDOM and shadowDOM
 * @param {()=>any} callback
 * @param {any[]} [args]
 */
export function useRender(callback, args) {
  const host = useHost();
  useMemo(() => render(fillHost(callback()), host.current), args);
}
