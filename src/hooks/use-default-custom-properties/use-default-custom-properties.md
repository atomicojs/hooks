---
title: "use-default-custom-properties"
description: Hook that allows to define default css properties in the webcomponent if these do not exist globally.
category: hooks
linkTitle:
  $ref: ~title
---

The general design systems implement the use of custom-properties at a global level, this forces to sustain a system of global variables separate from the component, this hook improves this, it allows to define a css properties at the component level that are omitted if the global hook is declared.

## Usage

```jsx
import { h } from "atomico";
import { useDefaultCSSProperties } from "@atomico/kit/use-default-custom-properties";

function Component() {
  useDefaultCSSProperties({
    "--primary": "black",
  });
  return <host></host>;
}
```

**If the component does not find the definition of the customProperty --primary it will define the variable --primary in the webcomponent**, this allows to maintain the behavior of the UI if the global variables have not been defined.

## Special prefix `!`

The use of the expression `!<property>`, allows detecting the definition of the property from the webcomponent.
