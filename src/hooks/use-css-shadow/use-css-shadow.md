---
title: use-css-shadow
description: allows to associate css to webcomponent with shadowDOM as hook
linkTitle: use-css-shadow
category: hooks
---

Designed to safely use CSS, thanks to the use of template-string or a string declare the associated CSS, this hook will insert it for you, if the browser supports ʻadoptedStyleSheets` it will associate the css that way, otherwise it will create a tag style in the shadowDom to group the CSS.

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import { css } from "@atomico/kit/use-css-shadow";
```

## Usage

<doc-tabs tabs="Template String, Function, CSSStyleSheet">

```tsx
function component() {
  css`
    :host {
      font-size: 50px;
    }
  `;
  return (
    <host shadowDom>
      <h1>content...</h1>
    </host>
  );
}
```

```tsx
function component() {
  css(`
    :host {
      font-size: 50px;
    }
  `);
  return (
    <host shadowDom>
      <h1>content...</h1>
    </host>
  );
}
```

```tsx
const sheet = new CSSStyleSheet();

sheet.replaceSync("a { color: red; }");

function component() {
  css(sheet);

  return (
    <host shadowDom>
      <h1>content...</h1>
    </host>
  );
}
```

</doc-tabs>

**Remember css is a hook so you must apply the hook rules**.
