---
title: use-force-render
description: forces a web component update, useful for manipulating references
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
import { useForceRender } from "@atomico/kit/use-force-render";
```

## Example

Sometimes the state is associated with an external component, this component can transmit that state through its instance as a reference, by usingForceRender you can directly use the state of the component, without the need to create a state that references the change.

```js
function component() {
  const ref = useRef();
  const forceRender = useForceRender();

  return (
    <host>
      {ref.current.anyProp}
      <my-component ref={ref} onclick={forceRender}></my-component>
    </host>
  );
}
```
