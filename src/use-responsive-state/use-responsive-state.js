import { useEffect, useState } from "atomico";

const regExp = /,\s*([^,]+)\s+(?:(\d+)(?:x(\d+)){0,1}(px|x|em|rem))/;

/**
 * @type {Object<string,[string,Match[]]>}
 */
const cacheSize = {};
/**
 * @type { Object<string,MediaQueryList> }
 */
const matchMedia = {};
/**
 * Returns a string status according to the serialized matchMedia
 * @example
 * ```js
 * const state = useResponsiveState("default resolution, hd resolution 1080px,  fullhd resolution 1980px")
 * ```
 * @param {string} sizes
 * @returns {string}
 */
export function useResponsiveState(sizes) {
  const [sizeDefault, matches] = (cacheSize[sizes] =
    cacheSize[sizes] || getSizes(sizes));

  const [state, setState] = useState(getState);

  function getState() {
    const match = matches.find(({ match }) => match.matches);
    return match ? match.value : sizeDefault;
  }

  useEffect(() => {
    const listener = () => setState(getState);
    // Regenerates the initial state
    listener();
    // Observe the resolution changes
    matches.forEach(({ match }) => match.addListener(listener));
    return () => matches.forEach(({ match }) => match.removeListener(listener));
  }, [sizes]);

  return state;
}
/**
 *
 * @param {string} sizes
 * @returns {[string,Match[]]}
 */
export function getSizes(sizes) {
  const values = [];
  let test;
  while ((test = sizes.match(regExp))) {
    const [replace, value, width, height, type] = test;

    sizes = sizes.replace(replace, "");

    const query =
      (width ? `(min-width: ${width}${type})` : "") +
      (height ? `and (min-height: ${height}${type})` : "");

    matchMedia[query] = matchMedia[query] || window.matchMedia(query);

    values.push({
      value,
      width,
      height,
      type,
      query,
      match: matchMedia[query],
    });
  }
  return [sizes.replace(/\s*,(.*)/, "").trim(), values];
}

/**
 * @typedef {Object} Match
 * @property {string} value
 * @property {string} width
 * @property {string} height
 * @property {string} type
 * @property {string} query
 * @property {MediaQueryList} match
 */
