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

```html
<a-router-switch/>
    <a-router-case path="/users/:every" src="./src/chunk.js"></a-router-case>
</a-router-switch>
```

# Demo

<a-showcase src="a-router.showcase.js"></a-showcase>

<script type="module" src="../a-showcase/a-showcase.js"></script>
