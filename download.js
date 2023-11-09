import { list } from "./list.js";

for (const l of list) {
  const [name, id] = l;
  const url = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
  const data = await (await fetch(url)).text();
  await Deno.writeTextFile(name + ".csv", data);
}
