const $ = document.querySelector.bind(document);
const input = $("#i");
const button = $("#s");
const q = new URLSearchParams(location.search.substring(1)).get("q");

window.cp = (function(window, document, navigator) {
  let textArea, copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }
  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }
  function selectText() {
    let range, selection;
    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }
  function copyToClipboard() {        
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  copy = async function(text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };
  return {
    copy
  }
})(window, document, navigator);

button.addEventListener("click", async () => {
  const r = await cp.copy(
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

if (q) {
  input.value = q;
  button.click();
}

