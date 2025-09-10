// --- 単語データ ---
const data = [
  { word: "at", sound: "at.mp3" },
  { word: "bag", sound: "bag.mp3" },
  { word: "bats", sound: "bats.mp3" },
  { word: "black", sound: "black.mp3", chunks: ["b", "l", "a", "ck"]},
  { word: "in", sound: "in.mp3" },
  { word: "blick", sound: "blick.wav", chunks: ["b", "l", "i", "ck"], isFake: true },
  { word: "cat", sound: "cat.mp3" },
  { word: "coffin", sound: "coffin.mp3", chunks: ["c", "o", "ff", "i", "n"] },
  { word: "dot", sound: "dot.wav" },
  { word: "from", sound: "from.mp3" }, 
  { word: "gets", sound: "gets.mp3" },
  { word: "got", sound: "got.mp3" }, 
  { word: "has", sound: "has.mp3", 
   rubyChars: [
    { char: "s", text: "z", which: "last"} // 最後の s の上に z
  ]  },
  { word: "muffin", sound: "muffin.mp3", chunks: ["m", "u", "ff", "i", "n"] },
  { word: "passes", sound: "passes.mp3", chunks: ["p", "a", "ss", "e", "s"], 
   rubyChars: [
    { char: "e", text: "i" },              // e の上に i
    { char: "s", text: "z", which: "last"} // 最後の s の上に z
  ] },
  { word: "pot", sound: "pot.mp3" },
  { word: "runs", sound: "runs.mp3", 
   rubyChars: [
    { char: "s", text: "z", which: "last"} // 最後の s の上に z
  ]  },
  { word: "Sam", sound: "sam.mp3" },
  { word: "up", sound: "up.mp3" },
  { word: "zap", sound: "zap.mp3" }
];

let shuffled = [];
let current = 0;

function shuffleWords() {
  shuffled = [...data].sort(() => Math.random() - 0.5);
  current = 0;
}

function showWord() {
  const wordEl = document.getElementById("word");
  const wordData = shuffled[current];

  wordEl.innerHTML = "";
  document.getElementById("sound-btn").style.visibility = "hidden"; // ← visibilityに変更

  typeWriter(wordData);
}

function playSound() {
  const wordData = shuffled[current];
  const audio = new Audio(`sounds/${wordData.sound}`);
  audio.play();
}

function prevWord() {
  current = (current - 1 + shuffled.length) % shuffled.length;
  showWord();
}

function nextWord() {
  current = (current + 1) % shuffled.length;
  showWord();
}

// ルビ付き表示用のチャンクを作る
function getDisplayChunks(wordData) {
  const w = wordData.word;

 // ① 文字ごとルビ（rubyChars）があれば優先
if (Array.isArray(wordData.rubyChars) && wordData.rubyChars.length) {
  const chars = w.split("");
  const marks = new Array(chars.length).fill(null);

  wordData.rubyChars.forEach(spec => {
    let idx = -1;
    if (typeof spec.index === "number") {
      idx = spec.index;            // 0-based
    } else if (spec.which === "last") {
      idx = chars.lastIndexOf(spec.char);
    } else {
      idx = chars.indexOf(spec.char);
    }
    if (idx >= 0) marks[idx] = spec.text;
  });

 return chars.map((ch, i) =>
  marks[i]
    ? `<span class="anno"><span class="rt">${marks[i]}</span><span class="rb">${ch}</span></span>`
    : ch
);


}


  // ② まとめてルビ（ruby: {target, text}）にも対応（既存互換）
  if (wordData.ruby) {
    const { target, text } = wordData.ruby;
    const idx = w.lastIndexOf(target); // 語末優先
    if (idx !== -1) {
      const before = w.slice(0, idx);
      const middle = `<ruby>${target}<rt>${text}</rt></ruby>`;
      const after  = w.slice(idx + target.length);
      return [...before.split(""), middle, ...after.split("")];
    }
  }

  // ③ 通常表示
  return wordData.chunks || w.split("");
}


function typeWriter(wordData, callback) {
  const wordEl = document.getElementById("word");
    const chunks = getDisplayChunks(wordData);
  let i = 0;

  function type() {
    if (i < chunks.length) {
      wordEl.innerHTML += chunks[i];
      i++;
      setTimeout(type, 600);
    } else {
      if (typeof callback === "function") callback();
      setTimeout(() => {
        document.getElementById("sound-btn").style.visibility = "visible";
      }, 2000); // ← ここでディレイ！
    }
  }

  type();
}


window.onload = () => {
  shuffleWords();
  showWord();
};
