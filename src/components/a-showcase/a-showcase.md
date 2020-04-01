---
title: <a-showcase/>
description: Component that allows rendering different views based on a selector and resizing the container
group: Components
---

# {{page.title}}

---

> {{page.description}}

## Installation

```bash
npm install "{{pkg.name}}"
```

## Usage

```jsx
import "{{pkg.name}}/a-showcase";
```

this component import the module defined by the `src` property, the module must require the following exports:

```js
import { h } from "atomico";
export { render } from "atomico";

export default [
  {
    label: "Ejemplo 1",
    render() {
      return <h1>1</h1>;
    }
  },
  {
    label: "Ejemplo 2",
    render() {
      return <h1>2</h1>;
    }
  }
];
```

Where :

1.  `export {render} ...` : allows exporting the render engine to be used at the time of selection.
2.  `export default [...`: options for view selector.

## Demo

<a-showcase src="a-showcase.showcase.js" centered resize height="50vh"></a-showcase>

## Properties

| Prop/Attr | Description              | Type   |
| --------- | ------------------------ | ------ |
| src       | module to import         | String |
| width     | Component width          | String |
| height    | Component height         | String |
| centered  | Center component content | String |

<script type="module" src="a-showcase.js"><script>
