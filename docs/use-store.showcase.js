import { T, O, p, x, w } from './chunks/61e0f1f4.js';
export { d as render } from './chunks/61e0f1f4.js';

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
  let events = {};
  let chunkUpdate;
  let state = new Proxy(typeof initialState == "function" ? initialState(store) : { ...initialState
  }, {
    set(target, prop, value) {
      if (target[prop] != value) {
        // Group updates into a single event
        if (!chunkUpdate) {
          chunkUpdate = ["*"];
          queueMicrotask(() => {
            chunkUpdate.forEach(prop => events[prop] && events[prop].forEach(callback => callback(state, chunkUpdate)));
            chunkUpdate = false;
          });
        }

        if (chunkUpdate) chunkUpdate.push(prop);
        target[prop] = value;
      }

      return true;
    }

  });

  let onUpdate = (prop, callback) => {
    events[prop] = events[prop] || [];
    if (!events[prop].includes(callback)) events[prop].push(callback);
    return () => events[prop].splice(events[prop].indexOf(callback) >>> 0, 1);
  };

  let update = props => Object.assign(state, props);

  return {
    onUpdate,
    update,
    state
  };
}
function useStore(store, prop = "*") {
  let [, setState] = T(0);
  O(() => store.onUpdate(prop, () => setState(state => state + 1)), [store]);
  return store.state;
}
/**
 * @typedef Store
 * @property {Object} state - Concurrent state
 * @property {(prop:string,callback:Function)=>void} onUpdate - listen for changes associated with a state property
 * @property {(props:Object)=>Object} update - update one or more properties using an object
 */

let store$1 = createStore({
  count: 0
});

const UseStore1 = ({
  store
}) => {
  let state = useStore(store);
  return p("host", null, "Component A ", p("button", {
    onclick: () => state.count += 1
  }, "Increment"), p("strong", null, " State : ", JSON.stringify(state)));
};

const UseStore2 = ({
  store
}) => {
  let state = useStore(store);
  return p("host", null, "Component B ", p("button", {
    onclick: () => state.count -= 1
  }, "Decrement"), p("strong", null, " State : ", JSON.stringify(state)));
};

UseStore1.props = UseStore2.props = {
  store: w
};
x("use-store-1", UseStore1);
x("use-store-2", UseStore2);
var useStore_showcase = [{
  label: "useStore",

  render() {
    store$1.onUpdate("*", store => {
      console.log(store);
    });
    return p("div", null, p("p", null, "The components are synchronized to the store given by the parent"), p("use-store-1", {
      store: store$1
    }), p("br", null), p("use-store-2", {
      store: store$1
    }));
  }

}];

export default useStore_showcase;
//# sourceMappingURL=use-store.showcase.js.map
