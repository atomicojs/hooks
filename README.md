# base

## Code style

This guide defines a standard for the generation of components with Atomico, with the objective of facilitating the collaborative development, scalability and maintenance of its components.

### scripts

```bash
# Create the necessary files for a component
npm run create-component

# For documentation Development.
# Useful to generate design system.
npm run start # start a server that serves the .md files
npm run build # optimize the associated code

# Individual export of components.
# Useful for sharing components using NPM.
npm run build:component  #  Does not include dependencies.
```

### Recommended structure

The directory distribution is an important element when building components, ideally, this is declarative in content, eg:

```bash
src
├───components
│   └───${my-component}
│           ${my-component}.js
│           ${my-component}.css
│           ${my-component}.md
└───custom-hooks
    └───${my-hook}
            ${my-hook}.js
            ${my-hook}.md
```

#### Remember

1. Only include one component per file.
2. Only include one component per directory
3. Define custom-hooks in an isolated way to the components, in a different file and directory, a file if it can contain more than one hook

### Component name

It is ideal that as an author you define a name or prefix that grouped one or more components, always define after the main name the objective to be represented in the UI, eg:

```bash
# Naming
${name}-${objective}-...
# Single
atomico-button
atomico-input
# Group
atomico-header
atomico-header-nav
atomico-header-logo
atomico-header-social
```

> The use of the atomic name is just an example, its use is not recommended for the declaration of the name of its component.

### Component declaration

Webcomponents are ideal for the generation of transparent apis, allowing trabs of attributes/properties to manipulate or know the current state of the component.

#### Remember

1. Always define the main tag `<host/>` as the return node
2. Prefer the use of `useProp` if you are looking to manipulate the state of the prop and reflect this in the webcomponent as an attribute/property, keep using `useState` for private states.
3. Prefer the use of reflect if you want to transparent the state of your component for a css selector, eg `my-component [type="email"]` or `my-component[active]`
4. Prefer the use of default values, if you want to show the state of your component at all times

### Component example

```jsx
import { h, customElement, useProp } from "atomico";
import style from "./my-component.css";
/**
 * @type {import("atomico").Component}
 * @param {Object} props
 * @param {string} props.type
 * @param {value} props.value
 */
const MyComponent = ({ type }) => {
  let [value, setValue] = useProp("value");
  return (
    <host shadowDom>
      <style>{style}</style>
      <input
        type={type}
        value={value}
        oninput={({ target: { value } }) => setValue(value)}
      ></input>
    </host>
  );
};

MyComponent.props = {
  type: {
    type: String,
    reflect: true,
    options: ["number", "date", "email", "phone"],
    value: "text"
  },
  value: {
    type: String,
    value: "default message"
  }
};

export default customElement("my-component", MyComponent);
```

using this `@type {import("atomico").Component}` fragment in the jsdoc, import the autocomplete rules for Typescript, **consider it optional.**
