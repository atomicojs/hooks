import { useState, useEffect } from "atomico";

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
export function createStore(initialState) {
  let events = {};
  let chunkUpdate;

  let state = new Proxy(
    typeof initialState == "function"
      ? initialState(store)
      : { ...initialState },
    {
      set(target, prop, value) {
        if (target[prop] != value) {
          // Group updates into a single event
          if (!chunkUpdate) {
            chunkUpdate = ["*"];
            queueMicrotask(() => {
              chunkUpdate.forEach(
                (prop) =>
                  events[prop] &&
                  events[prop].forEach((callback) =>
                    callback(state, chunkUpdate)
                  )
              );

              chunkUpdate = false;
            });
          }

          if (chunkUpdate) chunkUpdate.push(prop);

          target[prop] = value;
        }
        return true;
      },
    }
  );

  let onUpdate = (prop, callback) => {
    events[prop] = events[prop] || [];

    if (!events[prop].includes(callback)) events[prop].push(callback);

    return () => events[prop].splice(events[prop].indexOf(callback) >>> 0, 1);
  };

  let update = (props) => Object.assign(state, props);

  return { onUpdate, update, state };
}

export function useStore(store, prop = "*") {
  let [, setState] = useState(0);

  useEffect(() => store.onUpdate(prop, () => setState((state) => state + 1)), [
    store,
  ]);

  return store.state;
}

/**
 * @typedef Store
 * @property {Object} state - Concurrent state
 * @property {(prop:string,callback:Function)=>void} onUpdate - listen for changes associated with a state property
 * @property {(props:Object)=>Object} update - update one or more properties using an object
 */
