---
title: use-media-resize
description: These hooks allow to observe the size of the reference and define a state based on this.
group: Hooks
---

# {{page.title}}

> {{page.description}}

## Installation

```bash
npm install "{{pkg.name}}"
```

## Usage

```jsx
import { useMediaresize } from "{{pkg.name}}/use-media-resize";
```

## Sintax

```jsx
let [state, ref] = useMediaResize(stateQuery);
```

**Where :**

1.  `stateQuery` : String, pattern of states by resolution, eg : `"original, medium 980px, small 520px"`.
2.  `ref` : Object, reference to be observed by `ResizeObserver`.
3.  `state`: String, state based on `stateQuery`, eg : `original`, `medium` or `small`.

### Example

```js
import { useMediaResize } from "{{pkg.name}}/use-media-resize";

function Component() {
  let [state, ref] = useMediaResize(`original, medium 980px, small 520px`);

  return <host ref={ref}>{state}</host>;
}
```

<a-showcase src="./use-media-resize.showcase.js"></a-showcase>

<script type="module" src="../../components/a-showcase/a-showcase.js"></script>
