import { P, B } from './123ecdfe.js';

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

function useLazy(callbackImport, initImport, reload = []) {
  const [state, setState] = P([USE_LAZY_UNIMPORT]);
  B(() => {
    if (!initImport || !callbackImport) return;
    let cancel;
    let done;
    setTimeout(() => !done && !cancel && setState(state => state[0] == USE_LAZY_LOADING ? state : [USE_LAZY_LOADING]), 100);
    callbackImport().then(md => setState(state => {
      done = true;
      return cancel ? state : [USE_LAZY_DONE, md && "default" in md ? md.default : md];
    })).catch(error => setState(state => cancel ? state : [USE_LAZY_ERROR, error]));
    return () => cancel = true;
  }, [initImport, ...reload]);
  return state;
}

export { useLazy as u };
//# sourceMappingURL=65339dec.js.map
