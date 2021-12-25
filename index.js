const $ = document.querySelector.bind(document);
const input = $("#i");
const button = $("#s");
const { q } = [...new URLSearchParams(Location.search.substring(1)).values());

if (q) input.value = q;

button.addEventListener("click", async () => {
  const r = await navigator.clipboard.writeText(generate(input.value)).then(() => alert("クリップボードにコピーしたわぼけ")).catch(() => alert("エラーだわぼけ"));
  history.replaceState({ q: input.value }, null, "index.html");
});

