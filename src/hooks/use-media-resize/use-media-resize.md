---
title: use-media-resize
description: Allows you to apply operations to capture the target dimension.
group: Hooks
---

# {{page.title}}

> {{page.description}}

### Example

```js
import { useMediaResize } from "{{pkg.name}}/use-media-resize";

function Component() {
  let [state, props] = useMediaResize(
    `extra-large, large 960px, medium 720px, small 520px`
  );

  return (
    <host {...props}>
      <button class={state} />
    </host>
  );
}
```

<a-showcase src="./use-media-resize.showcase.js"></a-showcase>

<script type="module" src="../../components/a-showcase/a-showcase.js"></script>
