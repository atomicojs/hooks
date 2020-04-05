import prompts from "prompts";

const questions = [
  {
    type: "text",
    name: "name",
    message: "Hook Name?",
    initial: "my-hook",
  },
];

export default async function () {
  let data = await prompts(questions);
  data.name = data.name.trim().replace(/ +/g, "-");
  data.nameCamelCase = data.name.replace(/-(\w)/g, (all, letter) =>
    letter.toUpperCase()
  );
  return data;
}
