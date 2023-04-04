"use strict";

const gameBtn = document.querySelector(".game__btn");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gameArea = document.querySelector(".game__area");
const gameAreaRect = gameArea.getBoundingClientRect();
const popUp = document.querySelector(".popUp");
const popUpBtn = document.querySelector(".popUp__refresh");
const popUpMessage = document.querySelector(".popUp__message");
const introductionPopup = document.querySelector(".introductionPopup");

let started = false;
let score = 0;
let timer = undefined;

const ITEM_SIZE = 80;
const ITEM_NUMBER = 5;
const NORMAL1 = 5;
const NORMAL2 = 5;
const DURATION = 10;

const bgSound = new Audio("sounds/bg.mp3");
const alertSound = new Audio("sounds/alert.mp3");
const angrySound = new Audio("sounds/angry_pull.mp3");
const gameWinSound = new Audio("sounds/game_win.mp3");
const normalSound = new Audio("sounds/normal_pull.mp3");

gameBtn.addEventListener("click", function () {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpBtn.addEventListener("click", function () {
  startGame();
  hidePopUp();
});

gameArea.addEventListener("click", onAreaClick);

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
  if (sound == bgSound) {
    sound.loop = true;
  }
}
function stopSound(sound) {
  sound.pause();
}

function stopGame() {
  started = false;
  stopTimer();
  showPopUp("REPLY?");
  stopSound(bgSound);
  playSound(alertSound);
}

function startGame() {
  started = true;
  gameInit();
  hideIntroPopup();
  showTimerAndScore();
  changeGameBtn();
  startTimer();
  playSound(bgSound);
}

function finishGame(win) {
  started = false;
  showPopUp(win ? "YOU WIN" : "YOU LOST");
  stopTimer();
  stopSound(bgSound);
  if (win) {
    playSound(gameWinSound);
  } else {
    playSound(angrySound);
  }
}

function onAreaClick(e) {
  if (!started) {
    return;
  }
  const target = e.target;
  if (target.matches(".normal1")) {
    target.remove();
    score++;
    updateScore();
    playSound(normalSound);
    if (score === NORMAL1 + NORMAL2) {
      finishGame(true);
    }
  } else if (target.matches(".normal2")) {
    target.remove();
    score++;
    updateScore();
    playSound(normalSound);
    if (score === NORMAL1 + NORMAL2) {
      finishGame(true);
    }
  } else if (target.matches(".angry")) {
    finishGame(false);
  }
}

function updateScore() {
  gameScore.textContent = NORMAL1 + NORMAL2 - score;
}

function hidePopUp() {
  popUp.classList.add("popUp__hide");
}

function showPopUp(txt) {
  popUp.classList.remove("popUp__hide");
  popUpMessage.textContent = `${txt}`;
}

function changeGameBtn() {
  const icon = document.querySelector(".fa-solid");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-stop");
}

function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  let remainTime = DURATION;
  updateTimer(remainTime);
  timer = setInterval(function () {
    if (remainTime <= 0) {
      clearInterval(timer);
      finishGame(NORMAL1 + NORMAL2 === score);
      return;
    } else {
      updateTimer(--remainTime);
    }
  }, 1000);
}

function updateTimer(time) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  gameTimer.textContent = `${minute} :  ${second}`;
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
  gameScore.textContent = NORMAL1 + NORMAL2;
}

function hideIntroPopup() {
  introductionPopup.classList.add("introductionPopup__hide");
}

function gameInit() {
  gameArea.innerHTML = "";
  gameScore.textContent = NORMAL1 + NORMAL2;
  score = 0;
  addItem("normal1", ITEM_NUMBER, "imgs/normal1.png");
  addItem("normal2", ITEM_NUMBER, "imgs/normal2.png");
  addItem("angry", ITEM_NUMBER, "imgs/angry.png");
}

function addItem(className, count, path) {
  const x1 = 0;
  const x2 = gameAreaRect.width - ITEM_SIZE;
  const y1 = 0;
  const y2 = gameAreaRect.height - ITEM_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", path);
    item.style.position = "absolute";
    const x = numberRandom(x1, x2);
    const y = numberRandom(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameArea.appendChild(item);
  }
}

function numberRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
