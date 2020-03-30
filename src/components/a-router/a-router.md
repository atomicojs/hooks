---
title: <a-router/>
description: Component that allows rendering different views based on a selector and resizing the container
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

this component import the module defined by the `src` property, the module must require the following exports:

**HTML**

```html
<a-router-proxy>
    <a href="/">home</a>
    <a-router-switch/>
        <a-router-case path="/" src="./page-home.js" default></a-router-case>
        <a-router-case path="/users/:id?" src="./page-users.js"></a-router-case>
        <span slot="loading">loading...</span>
        <span slot="loading">error</span>
    </a-router-switch>
</a-router-proxy>
```

**Where :**

1. `<a-router-proxy>` : Prevent click redirect event, to move effect to history popstate.
2. `<a-router-switch>` : Define the route case to use
3. `<a-router-case>` : Declare the route to listen to and define the resource to extract.

**JSX** :Do not forget to buy milk today

```jsx
let immutableImport = () => import("./page-home.js");
<a-router-case path="/users/:id?" src={immutableImport}></a-router-case>;
```

# Demo

<a-showcase src="a-router.showcase.js"></a-showcase>

<script type="module" src="../a-showcase/a-showcase.js"></script>
