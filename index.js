const $ = document.querySelector.bind(document);
const input = $("#i");
const button = $("#s");
const { q } = [...new URLSearchParams(location.search.substring(1)).values()];

if (q) input.value = q;

button.addEventListener("click", async () => {
  const r = await navigator.clipboard.writeText(
    await generate(input.value)).then(() => alert("クリップボードにコピーしたわぼけ")).catch(() => alert("エラーだわぼけ")
  );
  history.replaceState({ q: input.value }, null, "index.html");
});

async function generate(string) {
  const decoder = new TextDecoder("utf-8");
  const src = decoder.decode(await fetch(
    "assets/ayasii.txt",
  ).then(async r => await r.arrayBuffer()));
  const ime = new MSIMEDict(src);
  return ime.json();
}
