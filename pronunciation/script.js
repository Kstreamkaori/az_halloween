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
  { word: "has", sound: "has.mp3" },
  { word: "muffin", sound: "muffin.mp3", chunks: ["m", "u", "ff", "i", "n"] },
  { word: "passes", sound: "passes.mp3", chunks: ["p", "a", "ss", "e", "s"] },
  { word: "pot", sound: "pot.mp3" },
  { word: "runs", sound: "runs.mp3" },
  { word: "sam", sound: "sam.mp3" },
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
