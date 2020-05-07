import { h } from "atomico";
export { render } from "atomico";

export default [
  {
    label: "Ejemplo 1",
    render() {
      return (
        <host>
          <h1>1</h1>
        </host>
      );
    },
  },
  {
    label: "Ejemplo 2",
    render() {
      return (
        <host style="background:black">
          <h1>2</h1>
        </host>
      );
    },
  },
];
