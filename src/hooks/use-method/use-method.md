---
title: "use-method"
description: This hook allows associating a method of the scope of the webcomponent, as part of the context of the customElement.
group: Hooks
---

# {{page.title}}

> {{page.description}}

**Warning**: It is recommended that this hook is not part of a customHook since it is rewritten if it is used more than once on the same method.

## Installation

```bash
npm install "{{pkg.name}}/{{page.title}}"
```

## Usage

```jsx
import { h, customElement } from "atomico";
import { useMethod } from "{{pkg.name}}/{{page.title}}";

function Component() {
  useMethod("myMethod", () => {
    console.log("call <component>.myMethod()!");
  });
  return <host></host>;
}

customElement("my-element", Component);

// after mounted

document.querySelector("my-element").myMethod();
```
