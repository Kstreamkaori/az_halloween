const data = [
  { word: "muffin", image: "assets/muffin.png" },
  { word: "in",     image: "assets/in.png" },
  { word: "a",      image: "assets/a.png" },
  { word: "coffin", image: "assets/coffin.png" },
  { word: "Sam",    image: "assets/sam.png" },
  { word: "gets",   image: "assets/get.png" },   // 画像名は gets.png に統一
  { word: "a",      image: "assets/a.png" },
  { word: "bucket", image: "assets/bucket.png" },
  { word: "a",      image: "assets/a.png" },
  { word: "black",  image: "assets/black.png" },
  { word: "cat",    image: "assets/cat.png" },
  { word: "passes", image: "assets/passes.png", chunks: ["pa","ss","es"] },
  { word: "bats",   image: "assets/bats.png" },
  { word: "zap",    image: "assets/zap.png" },
  { word: "up",     image: "assets/up.png" },
  { word: "at",     image: "assets/at.png" },
  { word: "a",      image: "assets/a.png" },
  { word: "pot",    image: "assets/pot.png" },
  { word: "Sam",    image: "assets/sam.png" },
  { word: "runs",   image: "assets/runs.png" },
  { word: "Sam",    image: "assets/sam.png" },
  { word: "got",    image: "assets/get.png" },
  { word: "a",      image: "assets/a.png" },
  { word: "bag",    image: "assets/bag.png" },
  { word: "from",   image: "assets/from.png" },
  { word: "a",      image: "assets/a.png" },
  { word: "coffin", image: "assets/coffin.png" },
  { word: "a",      image: "assets/a.png" },
  { word: "muffin", image: "assets/muffin.png" }
];


let current = 0;

function showWord() {
  const wordEl = document.getElementById("word");
  const imageEl = document.getElementById("image");
  const showBtn = document.getElementById("show-image-btn");
  const wordData = data[current];

  wordEl.innerHTML = "";
  imageEl.src = ""; // ← ★ここで前の画像をリセット！
  imageEl.style.visibility = "hidden";

  // ↓ 追加（スペースを残してボタン非表示にしない）
  showBtn.style.visibility = "visible";

  typeWriter(wordData, function () {
    // 絵を見るボタンが出る処理
    document.getElementById("show-image-btn").style.display = "block";
  });
}


function prevWord() {
  current = (current - 1 + data.length) % data.length;
  showWord();
}

function nextWord() {
  current = (current + 1) % data.length;
  showWord();
}
function showImage() {
  const imageEl = document.getElementById("image");
  const showBtn = document.getElementById("show-image-btn");
  const wordData = data[current];
  
  imageEl.src = wordData.image || "";
  imageEl.style.display = "block";
  imageEl.style.visibility = "visible";
  showBtn.style.visibility = "hidden";
}

function typeWriter(wordData, callback) {
  const wordEl = document.getElementById("word");
  const chunks = wordData.chunks || wordData.word.split("");
  let i = 0;

  function type() {
    if (i < chunks.length) {
      wordEl.innerHTML += chunks[i];
      i++;
      setTimeout(type, 600);
    } else {
      if (typeof callback === "function") callback();
      document.getElementById("show-image-btn").style.display = "block"; // タイプ完了後ボタン出す
    }
  }

  type();
}

window.onload = showWord;

