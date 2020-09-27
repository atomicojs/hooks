---
title: "use-custom-property"
description: Hook that allows to obtain the value of a css property that affects the reference.
category: hooks
linkTitle:
  $ref: ~title
---

## Usage

```jsx
import { h, useHost } from "atomico";
import { useCssProperty } from "@atomico/kit/use-css-property";

function Component() {
  const ref = useHost();
  const bgcolor = useCssProperty(ref, "background-color");
  return <host></host>;
}
```
