---
title: <{{name}}/>
description: my description...
group: Components
---

{{=<% %>=}}# {{page.title}}

> {{page.description}}<%={{ }}=%>

## Installation

```bash
npm install "{{=<% %>=}}{{pkg.name}}<%={{ }}=%>"
```

## Usage

```
import {{=<% %>=}}"{{pkg.name}}<%={{ }}=%>/{{name}}"
```

## Demo

<{{name}}></{{name}}>

## Properties

| Property | Attribute | Description       | Type   | Reflect | Event         | Default Value |
| -------- | --------- | ----------------- | ------ | ------- | ------------- | ------------- |
| message  | message   | little message... | String | true    | changeMessage | {{name}}      |

<script type="module" src="{{name}}.js"><script>
