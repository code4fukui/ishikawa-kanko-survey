import { CSV } from "https://js.sabae.cc/CSV.js";
import { list } from "./list.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const items = [];
for (const l of list) {
  const [name] = l;
  const json = await CSV.fetchJSON(name + ".csv");
  json.forEach(i => {
    i.file = name;
    i.タイムスタンプ = new DateTime(i.タイムスタンプ).toString();
    items.push(i);
  });
}
items.sort((a, b) => a.タイムスタンプ.localeCompare(b.タイムスタンプ));
await Deno.writeTextFile("all.csv", CSV.stringify(items));
