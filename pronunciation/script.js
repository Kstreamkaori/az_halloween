// --- 単語データ ---
const data = [
  { word: "clips", sound: "clips.mp3" },
  { word: "fog", sound: "fog.mp3" },
  { word: "frog", sound: "frog.mp3" },
  { word: "gets", sound: "gets_tanabata.mp3" },
  { word: "in", sound: "in.mp3" },
  { word: "is", sound: "is.mp3" },
  { word: "kid", sound: "kid.mp3" },
  { word: "off", sound: "off.mp3", chunks: ["o", "ff"] },
  { word: "pen", sound: "pen.mp3" },
  { word: "picks", sound: "picks.mp3", chunks: ["p", "i", "ck", "s"] },
  { word: "pin", sound: "pin.mp3" },
  { word: "pocket", sound: "pocket.mp3", chunks: ["p", "o", "ck", "e", "t"] },
  { word: "tag", sound: "tag.mp3" },
  { word: "taps", sound: "taps.mp3" },
  { word: "tin", sound: "tin.mp3" },
  { word: "up", sound: "up_tanabata.mp3" },
  { word: "fop", sound: "fop.mp3", isFake: true },
  { word: "bin", sound: "bin.mp3", isFake: true },
  { word: "pet", sound: "pet.mp3", isFake: true },
  { word: "bocket", sound: "bocket.mp3", chunks: ["b", "o", "ck", "e", "t"], isFake: true }
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
