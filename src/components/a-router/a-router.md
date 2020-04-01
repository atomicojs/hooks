---
title: <a-router/>
description: Group of components to work with dynamic import based on the browser path
group: Components
---

# {{page.title}}

> {{page.description}}

## Installation

```bash
npm install "{{pkg.name}}"
```

## Usage

```jsx
import "{{pkg.name}}/a-router";
```

This module includes the components [a-router-proxy](#a-router-proxy), [a-router-switch](#a-router-switch) and [a-router-case](#a-router-case).

### Example in html

```html
<a-router-proxy>
    <a href="/">home</a>
    <a-router-switch>
        <a-router-case path="/" src="./page-home.js" default />
        <a-router-case path="/users/:id?" src="./page-users.js" />
        <span slot="loading">loading...</span>
        <span slot="loading">error</span>
    </a-router-switch>
</a-router-proxy>
```

### Example in jsx

```jsx
const importPageHome = () => import("./page-home.js");
const importPageUsers = () => import("./page-users.js");

function Component() {
  return (
    <a-router-proxy>
      <a href="/">home</a>
      <a-router-switch>
        <a-router-case path="/" src={importPageHome} default />
        <a-router-case path="/users/:id?" src={importPageUsers} />
        <span slot="loading">loading...</span>
        <span slot="loading">error</span>
      </a-router-switch>
    </a-router-proxy>
  );
}
```

## a-router-proxy

This component captures the click event of nodes that declare the `href` attribute to prevent browser redirection and force the use of history and the popstate event.

| Prop/Attr | Description                                                  | Type   |
| --------- | ------------------------------------------------------------ | ------ |
| path      | allows to prefix a route to the one already declared in href | String |

## a-router-switch

This component observe the path to define the component to use from `to-router-case`.

## a-router-case

This component declares the path to be used by `a-router-switch` to match the concurrent path.

| Prop/Attr | Description                                                                                | Type    |
| --------- | ------------------------------------------------------------------------------------------ | ------- |
| path      | allows to prefix a route to the one already declared in href                               | String  |
| default   | allows you to associate this component as default if none of your brothers meets the match | Boolean |

## Export rule

```js
// Option 1, you can use the atomico
// pragma to build your component.
export default(props){
  return <my-component/>;
}
// if you don't use atomico you can
// export a valid object for the
// declaration of the component.
export default(props){
  return {nodeType : "my-component",children : "...any"}
}
// If you are only looking for
// component invocation, you
// can export only the component
// name for your build.
export default let nodeType = "my-component";
```

## Demo

<a-showcase src="a-router.showcase.js"></a-showcase>

<script type="module" src="../a-showcase/a-showcase.js"></script>
