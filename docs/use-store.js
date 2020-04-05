import { u as useState, e as useEffect } from './chunks/1d8d81c9.js';

let eventTypeUpdate = "update";
/**
 * If you use a function you can apply a property
 * calculation strategy using getter
 * @property {Function|Object} initialState - defines the initial state.
 * @example
 * let createInitialState = (store)=>({
 *  fullName(){
 *       return this.fistName + " " + this.lastName;
 *  }
 * })
 * @returns {Store}
 */

function createStore(initialState) {
  let store = new EventTarget();
  let state = typeof initialState == "function" ? initialState(store) : { ...initialState
  };
  let chunkUpdate;
  store.state = new Proxy(state, {
    set(target, prop, value) {
      if (target[prop] != value) {
        // Group updates into a single event
        if (!chunkUpdate) {
          chunkUpdate = {};
          queueMicrotask(() => {
            let detail = chunkUpdate;
            chunkUpdate = false;
            store.dispatchEvent(new CustomEvent(eventTypeUpdate, {
              detail
            }));
          });
        }

        if (chunkUpdate) {
          chunkUpdate[prop] = true;
        }

        target[prop] = value;
      }

      return true;
    }

  });

  store.onUpdate = (prop, callback) => {
    let subscribe = ({
      detail
    }) => (prop == "*" || prop in detail) && callback(store.state);

    store.addEventListener(eventTypeUpdate, subscribe);
    return () => store.removeEventListener(eventTypeUpdate, subscribe);
  };

  store.update = props => Object.assign(store.state, props);

  return store;
}
function useStore(store, prop = "*") {
  let [, setState] = useState(0);
  useEffect(() => store.onUpdate(prop, () => setState(state => state + 1)), [store]);
  return store.state;
}
/**
 * @typedef Store
 * @property {Object} state - Concurrent state
 * @property {(prop:string,callback:Function)=>void} onUpdate - listen for changes associated with a state property
 * @property {(props:Object)=>Object} update - update one or more properties using an object
 */

export { createStore, useStore };
//# sourceMappingURL=use-store.js.map
