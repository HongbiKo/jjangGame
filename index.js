"use strict";

const gameBtn = document.querySelector(".game__btn");
const gameArea = document.querySelector(".game__area");
const gameAreaRect = gameArea.getBoundingClientRect();
const popUp = document.querySelector(".popUp");
const popUpMessage = document.querySelector(".popUp__message");
const popUpBtn = document.querySelector(".popUp__refresh");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let timer = undefined;
let score = 0;

const JJANG_SIZE = 80;
const GAME_DURATION = 15;
const ITEM_NUMBER = 5;
const NORMAL1 = 5;
const NORMAL2 = 5;

gameBtn.addEventListener("click", function () {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

gameArea.addEventListener("click", onAreaClick);

popUpBtn.addEventListener("click", function () {
  hidePopUp();
  startGame();
});

function stopGame() {
  started = false;
  stopTimer();
  showPopUp("Reply?");
}

function startGame() {
  started = true;
  gameInit();
  startTimer();
  switchStopBtn();
  showTimerAndScore();
}

function finishGame(win) {
  started = false;
  hideStopBtn();
  stopTimer();
  showPopUp(win ? "YOU WON!" : "YOU LOST");
}

function hidePopUp() {
  popUp.classList.add("popUp__hide");
}

function showPopUp(text) {
  popUp.classList.remove("popUp__hide");
  popUpMessage.textContent = `${text}`;
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function hideStopBtn() {
  gameBtn.visibility = "hidden";
}

function switchStopBtn() {
  const icon = document.querySelector(".fa-solid");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-stop");
}

function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  let remainTime = GAME_DURATION;
  updateTimer(remainTime);
  timer = setInterval(function () {
    if (remainTime <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimer(--remainTime);
  }, 1000);
}
function updateTimer(time) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  gameTimer.textContent = `${minute} : ${second}`;
}

function updateScore() {
  gameScore.textContent = NORMAL1 + NORMAL2 - score;
}

function gameInit() {
  gameArea.innerHTML = "";
  gameScore.textContent = NORMAL1 + NORMAL2;
  score = 0;
  addItem("normal1", ITEM_NUMBER, "./imgs/normal1.png");
  addItem("normal2", ITEM_NUMBER, "./imgs/normal2.png");
  addItem("angry", ITEM_NUMBER, "./imgs/angry.png");
}

function addItem(className, count, path) {
  const x1 = 0;
  const y1 = 0;
  const x2 = gameAreaRect.width - JJANG_SIZE;
  const y2 = gameAreaRect.height - JJANG_SIZE;
  for (let i = 0; i < count; i++) {
    const imgs = document.createElement("img");
    imgs.setAttribute("class", className);
    imgs.setAttribute("src", path);
    imgs.style.position = "absolute";
    const x = NumberRandom(x1, x2);
    const y = NumberRandom(y1, y2);
    imgs.style.left = `${x}px`;
    imgs.style.top = `${y}px`;
    gameArea.appendChild(imgs);
  }
}

function NumberRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
    if (score === NORMAL1 + NORMAL2) {
      finishGame(true);
    }
  } else if (target.matches(".normal2")) {
    target.remove();
    score++;
    updateScore();
    if (score === NORMAL1 + NORMAL2) {
      finishGame(true);
    }
  } else if (target.matches(".angry")) {
    finishGame(false);
  }
}
