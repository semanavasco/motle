const pauseScreen = document.getElementById("pause-screen");

const pauseContainer = document.getElementById("pause-container");

var hasWon = false;

pauseScreen.style.visibility = "hidden";
pauseScreen.style.opacity = 0;

const notification = document.getElementById("notification");

const resultRows = document.getElementsByClassName("result-row");

let attempts = 0;

let currentLetter = 0;

let currentRow = resultRows[attempts].getElementsByClassName("result-letter");

currentRow[currentLetter].classList.add("selected");

function clickedLetter(letter) {
  if (pauseScreen.style.opacity == 1) return;

  currentRow[currentLetter].innerHTML = letter;

  if (currentLetter === 4) return;

  currentRow[currentLetter].classList.remove("selected");
  currentRow[currentLetter].classList.add("has-content");
  currentLetter++;
  currentRow[currentLetter].classList.add("selected");
}

async function clickedEnter() {
  if (pauseScreen.style.opacity == 1) return;

  if (currentLetter !== 4 || currentRow[currentLetter].innerHTML === "") {
    if (notification.style.opacity == 1) return;

    notification.innerHTML = "Veuillez insérer un mot à 5 lettres.";
    notification.style.opacity = 1;

    setTimeout(() => {
      notification.style.opacity = 0;
    }, 1000);
    return;
  }

  const currentWord =
    currentRow[0].innerHTML +
    currentRow[1].innerHTML +
    currentRow[2].innerHTML +
    currentRow[3].innerHTML +
    currentRow[4].innerHTML;

  if (!words.includes(currentWord)) {
    if (notification.style.opacity == 1) return;

    notification.innerHTML = "Ce mot n'est pas dans la liste.";
    notification.style.opacity = 1;

    setTimeout(() => {
      notification.style.opacity = 0;
    }, 1000);
    return;
  }

  currentRow[currentLetter].classList.remove("selected");
  currentRow[currentLetter].classList.add("has-content");
  setResultStyles();
  setTimeout(() => {
    if (currentWord !== word && attempts === 5) return lose();
    if (currentWord === word) return win();
    currentLetter = 0;
    attempts++;
    currentRow = resultRows[attempts].getElementsByClassName("result-letter");
    currentRow[currentLetter].classList.add("selected");
  }, 1000);
}

function setResultStyles() {
  if (pauseScreen.style.opacity == 1) return;

  for (let i = 0; i < 5; i++) {
    const letter = currentRow[i].innerHTML;

    if (!word.includes(letter)) {
      // RESULT GRID COLOR EDIT
      currentRow[i].classList.add("letter-not-exists");
      currentRow[i].classList.remove("has-content");
      currentRow[i].classList.remove("selected");

      // KEYBOARD COLOR EDIT
      document.getElementById(letter).classList.remove("ok");
      document.getElementById(letter).classList.remove("exists");
      document.getElementById(letter).classList.add("not-exists");
      continue;
    }

    if (word[i] === letter) {
      // RESULT GRID COLOR EDIT
      currentRow[i].classList.add("letter-ok");
      currentRow[i].classList.remove("has-content");
      currentRow[i].classList.remove("selected");

      // KEYBOARD COLOR EDIT
      document.getElementById(letter).classList.add("ok");
      document.getElementById(letter).classList.remove("exists");
      document.getElementById(letter).classList.remove("not-exists");
      continue;
    }

    // RESULT GRID COLOR EDIT
    currentRow[i].classList.add("letter-exists");
    currentRow[i].classList.remove("has-content");
    currentRow[i].classList.remove("selected");

    // KEYBOARD COLOR EDIT
    document.getElementById(letter).classList.remove("ok");
    document.getElementById(letter).classList.add("exists");
    document.getElementById(letter).classList.remove("not-exists");
    continue;
  }
}

function removeLetter() {
  if (pauseScreen.style.opacity == 1) return;

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

function lose() {
  hasWon = true;

  pauseScreen.style.visibility = "visible";
  pauseScreen.style.opacity = 1;

  let title = document.createElement("h1");
  title.innerHTML = "PERDU";
  title.id = "pause-container-title";
  pauseContainer.appendChild(title);

  let text = document.createElement("p");
  text.innerHTML = "Le mot était";
  text.style.fontWeight = "bold";
  text.style.color = "#696969";
  text.style.textAlign = "center";
  pauseContainer.appendChild(text);

  title = document.createElement("h1");
  title.innerHTML = word;
  title.style.fontSize = "large";
  title.style.textAlign = "center";
  pauseContainer.appendChild(title);

  let link = document.createElement("a");
  link.setAttribute("href", `https://1mot.net/${word.toLowerCase()}`);
  link.setAttribute("target", "_blank");
  let button = document.createElement("button");
  button.innerHTML = `<svg height="1.5rem" width="1.5rem" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <path class="st0" d="M511.414,217.728c-1.902-9.034-8.242-16.503-16.852-19.856l-30.197-11.736v31.046l5.718,2.223 c2.58,1.008,4.483,3.25,5.048,5.953c0.565,2.712-0.263,5.538-2.223,7.497L279.14,426.609c-3.834,3.824-9.561,5.03-14.62,3.071 l-43.064-16.748v31.046l30.226,11.755c17.18,6.678,36.678,2.581,49.715-10.454l202.594-202.59 C510.519,236.161,513.317,226.77,511.414,217.728z"></path> <path class="st0" d="M30.914,299.684c1.356-18.895,7.423-43.649,28.466-42.481l192.2,74.751 c17.228,6.698,36.782,2.553,49.818-10.558l185.771-186.991c6.5-6.538,9.269-15.919,7.357-24.933 c-1.912-9.023-8.242-16.474-16.832-19.809L286.666,15.374c-17.228-6.698-36.791-2.553-49.818,10.559L21.646,242.538 C4.625,256.545,0,282.664,0,305.863c0,23.2,1.545,51.043,27.844,61.866l-6.198-1.451l57.942,22.532v-20.742 c0-3.372,0.42-6.668,1.107-9.88l-38.94-15.147C29.37,338.35,29.36,321.499,30.914,299.684z"></path> <path class="st0" d="M111.048,352.658c-4.088,4.107-6.381,9.645-6.381,15.41v96.076l40.823-8.741l50.888,44.383v-96.048 c0-5.793,2.298-11.331,6.386-15.419l16.272-16.276l-91.706-35.662L111.048,352.658z"></path> </g> </g></svg> Définition`;
  button.setAttribute("type", "button");
  button.classList.add("classic-button");
  link.appendChild(button);
  pauseContainer.appendChild(link);

  link = document.createElement("a");
  button = document.createElement("button");
  button.innerHTML = `<svg height="1.25rem" width="1.25rem" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z"></path> </g></svg> Rejouer`;
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "resetGame()");
  button.classList.add("classic-button");
  link.appendChild(button);
  pauseContainer.appendChild(link);
}

function win() {
  hasWon = true;

  pauseScreen.style.visibility = "visible";
  pauseScreen.style.opacity = 1;

  let title = document.createElement("h1");
  title.innerHTML = "GAGNÉ";
  title.id = "pause-container-title";
  pauseContainer.appendChild(title);

  let text = document.createElement("p");
  text.innerHTML = "Le mot était";
  text.style.fontWeight = "bold";
  text.style.color = "#696969";
  text.style.textAlign = "center";
  pauseContainer.appendChild(text);

  title = document.createElement("h1");
  title.innerHTML = word;
  title.style.fontSize = "large";
  title.style.textAlign = "center";
  pauseContainer.appendChild(title);

  let link = document.createElement("a");
  link.setAttribute("href", `https://1mot.net/${word.toLowerCase()}`);
  link.setAttribute("target", "_blank");
  let button = document.createElement("button");
  button.innerHTML = `<svg height="1.5rem" width="1.5rem" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <path class="st0" d="M511.414,217.728c-1.902-9.034-8.242-16.503-16.852-19.856l-30.197-11.736v31.046l5.718,2.223 c2.58,1.008,4.483,3.25,5.048,5.953c0.565,2.712-0.263,5.538-2.223,7.497L279.14,426.609c-3.834,3.824-9.561,5.03-14.62,3.071 l-43.064-16.748v31.046l30.226,11.755c17.18,6.678,36.678,2.581,49.715-10.454l202.594-202.59 C510.519,236.161,513.317,226.77,511.414,217.728z"></path> <path class="st0" d="M30.914,299.684c1.356-18.895,7.423-43.649,28.466-42.481l192.2,74.751 c17.228,6.698,36.782,2.553,49.818-10.558l185.771-186.991c6.5-6.538,9.269-15.919,7.357-24.933 c-1.912-9.023-8.242-16.474-16.832-19.809L286.666,15.374c-17.228-6.698-36.791-2.553-49.818,10.559L21.646,242.538 C4.625,256.545,0,282.664,0,305.863c0,23.2,1.545,51.043,27.844,61.866l-6.198-1.451l57.942,22.532v-20.742 c0-3.372,0.42-6.668,1.107-9.88l-38.94-15.147C29.37,338.35,29.36,321.499,30.914,299.684z"></path> <path class="st0" d="M111.048,352.658c-4.088,4.107-6.381,9.645-6.381,15.41v96.076l40.823-8.741l50.888,44.383v-96.048 c0-5.793,2.298-11.331,6.386-15.419l16.272-16.276l-91.706-35.662L111.048,352.658z"></path> </g> </g></svg> Définition`;
  button.setAttribute("type", "button");
  button.classList.add("classic-button");
  link.appendChild(button);
  pauseContainer.appendChild(link);

  link = document.createElement("a");
  button = document.createElement("button");
  button.innerHTML = `<svg height="1.25rem" width="1.25rem" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z"></path> </g></svg> Rejouer`;
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "resetGame()");
  button.classList.add("classic-button");
  link.appendChild(button);
  pauseContainer.appendChild(link);
}

function resetGame() {
  pauseContainer.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const currentResultRow = document.getElementsByClassName("result-row")[i];

    for (let j = 0; j < 5; j++) {
      const currentResultLetter =
        currentResultRow.getElementsByClassName("result-letter")[j];

      currentResultLetter.classList.remove("selected");
      currentResultLetter.classList.remove("has-content");
      currentResultLetter.classList.remove("letter-ok");
      currentResultLetter.classList.remove("letter-exists");
      currentResultLetter.classList.remove("letter-not-exists");
      currentResultLetter.innerHTML = "";
    }
  }

  const keyboardKeys = document.getElementsByClassName("buttons letters");

  for (let i = 0; i < keyboardKeys.length; i++) {
    const currentKeyboardKey = keyboardKeys[i];

    currentKeyboardKey.classList.remove("ok");
    currentKeyboardKey.classList.remove("exists");
    currentKeyboardKey.classList.remove("not-exists");
  }

  currentLetter = 0;
  attempts = 0;
  currentRow = resultRows[attempts].getElementsByClassName("result-letter");
  currentRow[currentLetter].classList.add("selected");

  const wordsArray = words.split(",");
  word = wordsArray[Math.floor(Math.random() * wordsArray.length)];

  hasWon = false;

  pauseScreen.style.opacity = 0;
  pauseScreen.style.visibility = "hidden";
}

document.addEventListener("keyup", (input) => {
  if (pauseScreen.style.opacity == 1) return;

  const regex = /^[a-zA-Z]+$/;

  const key = input.key.toUpperCase();

  if (!regex.test(key)) return;

  if (key === "ENTER") return clickedEnter();

  if (key === "BACKSPACE") return removeLetter();

  if (key.length > 1) return;

  return clickedLetter(key);
});
