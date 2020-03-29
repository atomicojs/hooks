import { h, customElement } from "atomico";
import style from "./{{name}}.css";

const {{nameCamelCase}} = ({message}) => (
  <host shadowDom>
    <style>{style}</style>
    <h1>👋 {message}</h1>
  </host>
);

{{nameCamelCase}}.props = {
  message : {
    type : String,
    value : "{{name}}",
    reflect: true,
    event : {
      type : "changeMessage"
    }
  }
};

export default customElement("{{name}}", {{nameCamelCase}});
