import { usePromise } from "../use-promise/use-promise.js";

/**
 * @type {{[src:string]:Promise<any>}}
 */
const scripts = {};

export const loadScript = (src) => {
  if (!scripts[src]) {
    scripts[src] = new Promise((resolve) => {
      const script = document.createElement("script");
      script.onload = () => {
        resolve();
      };
      script.src = src;
      document.head.append(script);
    });
  }
  return scripts[src];
};

/**
 * load a resource as a script globally
 * @param {*} src
 * @param {()=>any} [load]
 */
export function useScript(src, load) {
  const [, status] = usePromise(() => loadScript(src).then(load), true, [src]);

  return status;
}
