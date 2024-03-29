let word = "FLICS";

const incorrectWordLength = document.getElementById("word-length");

const resultRows = document.getElementsByClassName("result-row");

let attempts = 0;

let currentLetter = 0;

let currentRow = resultRows[attempts].getElementsByClassName("result-letter");

currentRow[currentLetter].classList.add("selected");

function clickedLetter(letter) {
  currentRow[currentLetter].innerHTML = letter;

  if (currentLetter === 4) return;

  currentRow[currentLetter].classList.remove("selected");
  currentRow[currentLetter].classList.add("has-content");
  currentLetter++;
  currentRow[currentLetter].classList.add("selected");
}

async function clickedEnter() {
  if (currentLetter !== 4 || currentRow[currentLetter].innerHTML === "") {
    if (incorrectWordLength.style.opacity === 1) return;

    incorrectWordLength.style.opacity = 1;

    setTimeout(() => {
      incorrectWordLength.style.opacity = 0;
    }, 1000);
    return;
  }

  currentRow[currentLetter].classList.remove("selected");
  currentRow[currentLetter].classList.add("has-content");
  setResultStyles();
  currentLetter = 0;
  attempts++;
  currentRow = resultRows[attempts].getElementsByClassName("result-letter");
  currentRow[currentLetter].classList.add("selected");
}

function setResultStyles() {
  for (let i = 0; i < 5; i++) {
    const letter = currentRow[i].innerHTML;

    if (word.includes(letter) && word.indexOf(letter) === i) {
      // RESULT GRID COLOR EDIT
      currentRow[i].classList.add("letter-ok");
      currentRow[i].classList.remove("has-content");
      currentRow[i].classList.remove("selected");

      // KEYBOARD COLOR EDIT
      document.getElementById(letter).classList.add("ok");
      document.getElementById(letter).classList.remove("exists");
      document.getElementById(letter).classList.remove("not-exists");
    } else if (word.includes(letter)) {
      // RESULT GRID COLOR EDIT
      currentRow[i].classList.add("letter-exists");
      currentRow[i].classList.remove("has-content");
      currentRow[i].classList.remove("selected");

      // KEYBOARD COLOR EDIT
      document.getElementById(letter).classList.remove("ok");
      document.getElementById(letter).classList.add("exists");
      document.getElementById(letter).classList.remove("not-exists");
    } else {
      // RESULT GRID COLOR EDIT
      currentRow[i].classList.add("letter-not-exists");
      currentRow[i].classList.remove("has-content");
      currentRow[i].classList.remove("selected");

      // KEYBOARD COLOR EDIT
      document.getElementById(letter).classList.remove("ok");
      document.getElementById(letter).classList.remove("exists");
      document.getElementById(letter).classList.add("not-exists");
    }
  }
}

function removeLetter() {
  if (currentLetter === 0) return;

  if (currentLetter === 4) {
    if (currentRow[currentLetter].innerHTML !== "")
      return (currentRow[currentLetter].innerHTML = "");

    currentRow[currentLetter].classList.remove("selected");
    currentLetter--;
    currentRow[currentLetter].classList.remove("has-content");
    currentRow[currentLetter].classList.add("selected");
    currentRow[currentLetter].innerHTML = "";
    return;
  }

  currentRow[currentLetter].classList.remove("selected");
  currentLetter--;
  currentRow[currentLetter].classList.remove("has-content");
  currentRow[currentLetter].classList.add("selected");
  currentRow[currentLetter].innerHTML = "";
  return;
}

document.addEventListener("keyup", (input) => {
  const regex = /^[a-zA-Z]+$/;

  const key = input.key.toUpperCase();

  if (!regex.test(key)) return;

  if (key === "ENTER") return clickedEnter();

  if (key === "BACKSPACE") return removeLetter();

  if (key.length > 1) return;

  return clickedLetter(key);
});
