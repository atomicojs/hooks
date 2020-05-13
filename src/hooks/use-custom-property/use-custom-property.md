---
title: "use-custom-property"
description: this hook allows you to use custom Property as hooks, these will be defined as part of the webcomponent
group: Hooks
---

# {{page.title}}

> {{page.description}}

## Installation

```bash
npm install "{{pkg.name}}/{{page.title}}"
```

## Usage

```jsx
import { h } from "atomico";
import { useCustomProperty } from "{{pkg.name}}/{{page.title}}";

function Component() {
  useCustomProperty("color", "red"); // === ref.current.style.setProperty("--color","red");
  return <host></host>;
}
```

## Demo

<a-showcase src="./use-custom-property.showcase.js"></a-showcase>

<script type="module" src="../../components/a-showcase/a-showcase.js"></script>
