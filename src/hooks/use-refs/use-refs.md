---
title: use-refs
description: create a list of nodes based on a reference
linkTitle:
  $ref: ~title
category: hooks
---

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import { useRefs } from "@atomico/kit/use-refs";
```

## Example

```jsx
function component() {
  const ref = useRefs();

  useEffect(() => {
    console.log(ref.currents); // [p,p,p];
  });

  return (
    <host>
      <p ref={ref}>1</p>
      <p ref={ref}>2</p>
      <p ref={ref}>3</p>
    </host>
  );
}
```

**References are not cleaned between renders, so if you want to keep only the active list use the [isConnected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) property of the node**
