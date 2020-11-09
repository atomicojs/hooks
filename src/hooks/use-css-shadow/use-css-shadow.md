---
title: use-css-shadow
description: allows to associate css to webcomponent with shadowDOM as hook
linkTitle: use-css-shadow
category: hooks
---

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import { css } from "@atomico/kit/use-css-shadow";
```

## Usage

<doc-tabs tabs="Template String, Function">

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

</doc-tabs>

**Remember css is a hook so you must apply the hook rules**.
