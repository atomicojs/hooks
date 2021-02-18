---
title: use-render
description: allows to generate a render in parallel that escapes the current one, useful for rendering lightDOM and ShadowDOM together
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
import { useRender } from "@atomico/kit/use-render";
```

## Example

**The following example shows how to maintain behavior in the LightDOM and ShadowDOM in a webcomponent, this is useful when working with forms visible from the document**

```jsx
function component() {
  useRender(() => <button>button in lightDOM</button>);
  return (
    <host>
      <style>{`
        ::slotted(button){
            padding:.5rem 1rem;
            border-radius: 5px;
        }
      `}</style>
      <slot></slot>
    </host>
  );
}
```

From the example we can deduce that the webcomponent when instantiated does not require you to create the button tag to associate the expected effect.

**This use presents a limitation that is the management of Slots**
