---
title: "use-custom-property"
description: this hook allows you to use custom Property as hooks, these will be defined as part of the webcomponent
category: hooks
linkTitle:
  $ref: ~title
---

## Usage

```jsx
import { h } from "atomico";
import { useCustomProperty } from "@atomico/kit/use-custom-property";

function Component() {
  useCustomProperty("color", "red"); // === ref.current.style.setProperty("--color","red");
  return <host></host>;
}
```
