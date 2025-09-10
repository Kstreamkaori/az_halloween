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

function getDisplayChunks(wordData) {
  const chunks = wordData.chunks || [wordData.word];

  // ルビ指定が無ければ、そのまま（チャンク単位で返す）
  if (!Array.isArray(wordData.rubyChars) || wordData.rubyChars.length === 0) {
    return htmlchunks;
  }

  // 文字ごとの注釈リストを作る（例: e→"i", 最後の s→"z"）
  const word = wordData.word.split("");
  const marks = new Array(word.length).fill(null);
  wordData.rubyChars.forEach(spec => {
    let idx = -1;
    if (typeof spec.index === "number") {
      idx = spec.index;
    } else if (spec.which === "last") {
      idx = word.lastIndexOf(spec.char);
    } else {
      idx = word.indexOf(spec.char);
    }
    if (idx >= 0) marks[idx] = spec.text;
  });

  // チャンクごとにHTMLを作る（チャンクは壊さない）
  let pos = 0; // 単語内の走査位置
  const htmlChunks = chunks.map(chunk => {
    let out = "";
    for (let i = 0; i < chunk.length; i++, pos++) {
      const ch = chunk[i];
      const mark = marks[pos];
      if (mark) {
        // 擬似ルビで包む
        out += `<span class="anno"><span class="rt">${mark}</span><span class="rb">${ch}</span></span>`;
      } else {
        out += ch;
      }
    }
    return out; // 1チャンク=1文字列のまま返す（typewriterが壊れない）
  });

  return htmlChunks;
}


window.onload = () => {
  shuffleWords();
  showWord();
};
