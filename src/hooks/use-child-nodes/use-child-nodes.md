---
title: use-child-nodes
description: Hook that captures the childNodes external to the webcomponent in lightDOM
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
import { useChildNodes } from "@atomico/kit/use-child-nodes";
```

## Example

This hook allows obtaining the `childNodes` external to the webcomponent instance in lightDOM situations.

```html
<custom-element>
  <!--Element not instantiated from webcomponent-->
  <header slot="Header">My header</header>
</custom-element>
```

<doc-tabs auto-height tabs="Alias, Children">

```jsx
function component() {
  const [childNodes, update] = useChildNodes();
  return (
    <host>
      <h1>Slot: {childNodes.length}</h1>
    </host>
  );
}
```

```jsx
function component() {
  const [childNodes] = useChildNodes();
  /**
   * You will need to use h to transform the vnode into node
   **/
  return <host>{childNodes.map(h)}</host>;
}
```

</doc-tabs>

## Limitations

This hook does not observe the mutations, but it can synchronize the second parameter of the return of `useChildNodes`, to generate a new scan.
