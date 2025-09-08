const data = [
  {
    word: "tag",
    image: "assets/tag.png"
  },
  {
    word: "in",
    image: "assets/in.png"
  },
  {
    word: "fog",
    image: "assets/fog.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "pin",
    image: "assets/pin.png"
  },
  {
    word: "in",
    image: "assets/in.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "tin",
    image: "assets/tin.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "kid",
    image: "assets/kid.png"
  },
  {
    word: "gets",
    image: "assets/get.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "tag",
    image: "assets/tag.png"
  },
  {
    word: "frog",
    image: "assets/frog.png"
  },
  {
    word: "picks",
    chunks: ["pi", "ck", "s"],
    image: "assets/pick.png"
  },
  {
    word: "up",
    image: "assets/up.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "pen",
    image: "assets/pen.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "kid",
    image: "assets/kid.png"
  },
  {
    word: "clips",
    image: "assets/clip.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "tag",
    image: "assets/tag.png"
  },
  {
    word: "frog",
    image: "assets/frog.png"
  },
  {
    word: "taps",
    image: "assets/tap.png"
  },
  {
    word: "a",
    image: "assets/a.png"
  },
  {
    word: "pocket",
    chunks: ["po", "ck", "e", "t"],
    image: "assets/pocket.png"
  },
  {
    word: "fog",
    image: "assets/fog.png"
  },
  {
    word: "is",
    image: "assets/is.png"
  },
  {
    word: "off",
    chunks: ["o", "ff"],
    image: "assets/off.png"
  }
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

