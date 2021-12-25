const $ = document.querySelector.bind(document);
const input = $("#i");
const button = $("#s");
const q = new URLSearchParams(location.search.substring(1)).get("q");

button.addEventListener("click", async () => {
  input.focus();
  input.select();
  await delay(200);
  const r = await navigator.clipboard.writeText(
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

function delay(ms) {
  return new Promise((r) => {
    setTimeout(r, ms);
  });
}

if (q) {
  input.value = q;
  button.click();
}
