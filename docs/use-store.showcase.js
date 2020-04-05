import { u as useState, a as useEffect, c as createElement, b as customElement, A as Any } from './chunks/c49365a6.js';
export { r as render } from './chunks/c49365a6.js';

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

let store = createStore({
  count: 0
});

const UseStore1 = ({
  store
}) => {
  let state = useStore(store);
  return createElement("host", null, "Component A ", createElement("button", {
    onclick: () => state.count += 1
  }, "Increment"), createElement("strong", null, " State : ", JSON.stringify(state)));
};

const UseStore2 = ({
  store
}) => {
  let state = useStore(store);
  return createElement("host", null, "Component B ", createElement("button", {
    onclick: () => state.count -= 1
  }, "Decrement"), createElement("strong", null, " State : ", JSON.stringify(state)));
};

UseStore1.props = UseStore2.props = {
  store: Any
};
customElement("use-store-1", UseStore1);
customElement("use-store-2", UseStore2);
var useStore_showcase = [{
  label: "useStore",

  render() {
    let removeListener = store.onUpdate(store => {
      console.log(store);
    });
    return createElement("div", null, createElement("p", null, "The components are synchronized to the store given by the parent"), createElement("use-store-1", {
      store: store
    }), createElement("br", null), createElement("use-store-2", {
      store: store
    }));
  }

}];

export default useStore_showcase;
//# sourceMappingURL=use-store.showcase.js.map
