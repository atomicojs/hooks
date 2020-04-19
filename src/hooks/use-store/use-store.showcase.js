import { h, customElement, Any } from "atomico";
import { createStore, useStore } from "./use-store";
export { render } from "atomico";

let store = createStore({ count: 0 });

const UseStore1 = ({ store }) => {
  let state = useStore(store);
  return (
    <host>
      Component A <button onclick={() => (state.count += 1)}>Increment</button>
      <strong> State : {JSON.stringify(state)}</strong>
    </host>
  );
};

const UseStore2 = ({ store }) => {
  let state = useStore(store);
  return (
    <host>
      Component B <button onclick={() => (state.count -= 1)}>Decrement</button>
      <strong> State : {JSON.stringify(state)}</strong>
    </host>
  );
};

UseStore1.props = UseStore2.props = {
  store: Any,
};

customElement("use-store-1", UseStore1);
customElement("use-store-2", UseStore2);

export default [
  {
    label: "useStore",
    render() {
      store.onUpdate("*", (store) => {
        console.log(store);
      });
      return (
        <div>
          <p>
            The components are synchronized to the store given by the parent
          </p>
          <use-store-1 store={store}></use-store-1>
          <br />
          <use-store-2 store={store}></use-store-2>
        </div>
      );
    },
  },
];
