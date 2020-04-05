---
title: "use-store"
description: create a mutable, reactive and agnostic global store for application development
group: Hooks
---

# {{page.title}}

> {{page.description}}

## Installation

```bash
npm install "{{pkg.name}}/{{page.title}}"
```

## Store

### Creation

```js
let store = createStore(() => ({ count: 0 }));
```

### store.update

```js
let updateProps = { count: 1 };
store.update(updateProps);
```

Update the status of the store through an object.

### store.onUpdate

```js
let prop = "count";
let callback = () => console.log("count:update");
store.onUpdate(prop, callback);
```

Listen to store updates, if prop is `*` it will listen to all store updates, `callback` will revive the state of the store.

### store.state

Concurrent state

## Hooks

### useStore

```js
let optionalProp = "count";
let state = useStore(store, optionalProp);
```

## Usage

**Store creation**

```jsx
import { h, customElement } from "atomico";
import { createStore } from "{{pkg.name}}/{{page.title}}";
import "../my-component",

export let store = createStore(() => {
  count: 1;
});

function MyApp() {
  return (
    <host>
      <h1>{store.state.count}</h1>
      <my-component store={store}></my-component>
    </host>
  );
}

customElement("my-app",MyApp)
```

**Use from component** : the hook `useStore`, allows to subscribe and consume the store, this hook will return the state of the store.

```jsx
import { h, Any, customElement } from "atomico";
import { useStore } from "{{pkg.name}}/{{page.title}}";

function MyComponent({ store }) {
  let state = useStore(store);
  return (
    <host>
      <button onclick={() => state.count++}>increment</button>
      <h2>state : {state.count}</h2>
    </host>
  );
}

MyComponent.props = {
  // It is recommended that the store be a prop
  // for a better reuse of the component
  store: Any,
};

export default customElement("my-component", MyComponent);
```

**Use outside the component**

```js
import { store } from "./components/my-app";

// Listen only for updates to the store count
let removeListener = store.onUpdate("count", (state) => {
  console.log(state);
  // Remove the listener from the store
  removeListener();
});

// Listen to all store updates
let removeListener = store.onUpdate("*", (state) => {
  console.log(state);
  // Remove the listener from the store
  removeListener();
});
```

## Demo

<a-showcase src="./use-store.showcase.js" origin="{{pkg.editable}}/{{page.dir}}/use-store.showcase.js"></a-showcase>

<script type="module" src="../../components/a-showcase/a-showcase.js"></script>
