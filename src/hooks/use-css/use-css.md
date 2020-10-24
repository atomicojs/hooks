---
title: use-css
description: encapsulated css for lightDOM
linkTitle: use-css
category: hooks
---

This hook is designed to be used in lightDOM situations, it allows to hold an encapsulated CSS inside and outside the shadowDom, thanks to the style tag it generates a css scope inside the webcomponent.

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import { useCss } from "@atomico/kit/use-css";
```

## Example

```jsx
function lightDOMComponent() {
  const css = useCss();
  return (
    <host
      class={css`
        width: 200px;
        height: 200px;
        &:hover {
          background: teal;
        }
        &:focus {
          background: red;
        }
      `}
    >
      <style ref={css.ref}></style>
    </host>
  );
}
```

`css.ref` it must point to as a reference to a style tag.

## Limitations

1. The nested is not multiple, example `h1, h2, h2` will not be valid.
2. to encapsulate the keyframe you must prepend the prefix `host_` to the name of the keyframe.

<!--
<example-use-css></example-use-css>
<script src="{{'./example-use-css.tsx'|asset}}" type="module"></script>
-->
