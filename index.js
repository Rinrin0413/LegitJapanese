const $ = document.querySelector.bind(document);
const input = $("#i");
const button = $("#s");
const q = new URLSearchParams(location.search.substring(1)).get("q");

button.addEventListener("click", async () => {
  const r = await copy(
    await generate(input.value)).then(() => alert("クリップボードにコピーしたわぼけ")).catch((e) => alert("エラーだわぼけ" + e.message)
  );
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
  let el = document.createElement("textarea"), range = document.createRange();
  document.body.appendChild(el);
  el.contentEditable = true;
  el.readOnly = false;
  range.selectNodeContents(el);
  let s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);
  el.setSelectionRange(0, 999999);
  document.execCommand('copy');
  el.remove();
}

if (q) {
  input.value = q;
  button.click();
}
