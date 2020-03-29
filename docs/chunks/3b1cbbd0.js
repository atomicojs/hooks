import { u as useState, e as useEffect } from './944c22d8.js';

const USE_LAZY_UNIMPORT = "unimport";
const USE_LAZY_LOADING = "loading";
const USE_LAZY_ERROR = "error";
const USE_LAZY_DONE = "done";
/**
 *
 *
 * @param {()=>Promise} callbackImport -
 * @param {boolean} initImport -
 *
 * @example
 * useLazy(()=>import("./any.js"),initRequest);
 */

function useLazy(callbackImport, initImport) {
  const [state, setState] = useState([USE_LAZY_UNIMPORT]);
  useEffect(() => {
    if (!initImport) return;
    let cancel;
    setState(state => state[0] == USE_LAZY_LOADING ? state : [USE_LAZY_LOADING]);
    callbackImport().then(md => setState(state => cancel ? state : [USE_LAZY_DONE, md && "default" in md ? md.default : md])).catch(error => setState(state => cancel ? state : [USE_LAZY_ERROR, error]));
    return () => cancel = true;
  }, [initImport]);
  return state;
}

export { useLazy as u };
//# sourceMappingURL=3b1cbbd0.js.map
