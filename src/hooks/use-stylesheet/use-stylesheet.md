---
title: "use-stylesheet"
description: add support to adoptedStyleSheets
group: Hooks
---

# {{page.title}}

> {{page.description}}

Constructable Stylesheets make it possible to define and prepare shared CSS styles, and then apply those styles to multiple Shadow Roots without duplication. Updates to a shared CSSStyleSheet are applied to all roots into which it has been adopted, and adopting a stylesheet is fast

## Installation

```bash
npm install "{{pkg.name}}/{{page.title}}"
```

## Usage

```jsx
import { h } from "atomico";
import { useStylesheet } from "{{pkg.name}}/{{page.title}}";

// Supports string argument, the css is cached then as value CSSStyleSheet
const styleText = `:host{color:red}`;
// Supports CSS StyleSheet type argument
const styleSheet = new CSSStyleSheet();
sheet.replace(`:host{color:red}`);

function Component() {
  useStylesheet(styleText, styleSheet);
  return <host></host>;
}
```

## Demo

<a-showcase src="./use-stylesheet.showcase.js"></a-showcase>

<script type="module" src="../../components/a-showcase/a-showcase.js"></script>
