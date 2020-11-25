---
title: use-router
description: Hooks for route management
linkTitle:
  $ref: ~title
category: hooks
---

Los hooks de este modulo permiten capturar parametros de rutas y escuchar los cambios de ruta del browser.

## Install

```bash
npm install @atomico/kit
```

## Module

```js
import { useRouter, useRoute, redirect } from "@atomico/kit/use-router";
```

## Example

<doc-tabs auto-height tabs="useRouter, useRoute, redirect">

```js
useRouter({
  "/": () => <h1>home</h1>,
  "/contact": () => <h1>contact</h1>,
  "/[...notFound]": ({ notFound }) => <h1>{notFound}?</h1>,
});
```

```js
useRoute("/contact", () => <h1>contact</h1>);
```

```jsx
<button onclick={() => redirect("/")}></button>
```

</doc-tabs>

## Route expressions

@todo

### hash route

```
/folder/#{name}/[id]
```

### fixed route

```
/folder1/folrder2
```

The match is strict

### parameter path

```
/folder1/{folder}
```

Capture the parameters of the associated folder, but forces the matching of folders

### optional parameter path

```
/folder1/[folder]
```

Capture the parameters of the associated folder, but the consideration is optional.

### spread parameter path

```
/folder1/[...folder]
/folder1/{...folder}
```

Allows you to capture the parameters from the associated folder, grouping the rest in the parameter

<!--
<example-use-router></example-use-router>
<script type="module" src="{{'example-use-router.tsx'|asset}}"></script>
-->
