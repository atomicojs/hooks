import { h, useHost, useMemo, useEffect, options } from "atomico";

const host = h("host");

const IdUseRender = Symbol.for("Atomico.useRender");

const props = {
  [IdUseRender]: true,
};
/**
 * Ensures that the render function always
 * receives a tree that starts from the host tag
 * @param {any} vdom
 */
function fillHost(vdom) {
  if (vdom && typeof vdom == "object") {
    vdom =
      vdom.type == "host"
        ? {
            ...vdom,
            props: {
              ...props,
              ...vdom.props,
            },
          }
        : h("host", props, vdom);
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
  host.id = host.id || Symbol();
  useMemo(
    () => !options.ssr && fillHost(callback()).render(host.current, host.id),
    args
  );
  // Clean nodes in case of recycling
  useEffect(() => () => fillHost().render(host.current, host.id), []);
}
