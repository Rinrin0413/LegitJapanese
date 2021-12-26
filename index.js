const $ = document.querySelector.bind(document);
const input = $("#i");
const button = $("#s");
const q = new URLSearchParams(location.search.substring(1)).get("q");

button.addEventListener("click", async () => {
  const r = copy(await generate(input.value));
  history.replaceState(null, null, "index.html?q=" + input.value);
});

async function generate(string) {
  const src = await fetch(
    "assets/ayasii.txt",
  ).then(async r => await r.text());
  const ime = new MSIMEDict(src);
  const d = ime.json();
  for (let k in d) {
    const v = d[k];
    string = string.replaceAll(k, v);
  }
  return string;
}

async function copy(text) {
  let el = $("#o"), te = text.split("\n");
  if (el) el.remove();
  el = document.createElement("textarea");
  el.rows = te.length + 1;
  el.cols = Math.max(...te.map(x => x.length));
  el.value = text;
  el.focus();
  el.select();
  document.body.appendChild(el);
}

if (q) {
  input.value = q;
  button.click();
}
