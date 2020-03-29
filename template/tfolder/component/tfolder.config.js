import prompts from "prompts";

const questions = [
  {
    type: "text",
    name: "name",
    message: "Component Name?",
    initial: "custom-element"
  }
];

export default async function() {
  let data = await prompts(questions);
  data.name = data.name.trim().replace(/ +/g, "-");
  data.nameCamelCase = ("-" + data.name).replace(/-(\w)/g, (all, letter) =>
    letter.toUpperCase()
  );
  return data;
}
