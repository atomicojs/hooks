---
title: "use-stylesheet"
description: add support to adoptedStyleSheets
group: Hooks
---

# {{page.title}}

> {{page.description}}

[Constructable Stylesheets](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) make it possible to define and prepare shared CSS styles, and then apply those styles to multiple Shadow Roots without duplication. Updates to a shared CSSStyleSheet are applied to all roots into which it has been adopted, and adopting a stylesheet is fast

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
  return <host shadowDom></host>;
}
```

## Support coverage

`CSSStyleSheet` is not supported in all browsers, although it does have a [polyfill](https://www.npmjs.com/package/construct-style-sheets-polyfill), better performance is achieved without the need for polyfill building the virtual-dom for this case, eg:

```jsx
function Component() {
  // stylesText will be empty if the browser supports constructable-stylesheets
  let stylesText = useStylesheet(styleText);

  return (
    <host shadowDom>
      <style>{stylesText}</style>
    </host>
  );
}
```

## What is the benefit of this hook?

Componetize as Hooks stylesheets, eg:

```js
function useButton() {
  useCustomProperty("color", "red");
  useStylesheet(styleButton);
  return {
    onclick() {
      /**any**/
    },
  };
}
```

## Demo

<a-showcase src="./use-stylesheet.showcase.js"></a-showcase>

<script type="module" src="../../components/a-showcase/a-showcase.js"></script>
