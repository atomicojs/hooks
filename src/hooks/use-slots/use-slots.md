---
title: use-slots
description: Hooks that capture the slots at the time of construction of the mount
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
import { useSlots } from "@atomico/kit/use-slots";
```

## Example

This hook only captures the childrens of the webcomponent and groups them in the `children` or` slot` property.

```html
<custom-element><header slot="Header">My header</header></custom-element>
```

<doc-tabs auto-height tabs="Alias, Children">

```jsx
function component() {
  const { Header } = useSlots();
  return (
    <host>
      <Header />
    </host>
  );
}
```

```jsx
function component() {
  const { children } = useSlots();
  return <host>{children}</host>;
}
```

</doc-tabs>

## Limitations

I did not observe the mutation of the list
