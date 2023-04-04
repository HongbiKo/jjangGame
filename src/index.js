"use strict";

import Popup from "./popup.js";
import Area from "./area.js";
import * as sound from "./sound.js";

const gameBtn = document.querySelector(".game__btn");

const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const introPopup = document.querySelector(".introductionPopup");

let started = false;
let timer = undefined;
let score = 0;

// const JJANG_SIZE = 80;
const GAME_DURATION = 10;
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

const gameArea = new Area(5, 5, 5);
gameArea.setOnClick(onAreaClick);

function onAreaClick(item) {
  if (!started) {
    return;
  }
  if (item === "normal1") {
    score++;
    updateScore();
    if (score === NORMAL1 + NORMAL2) {
      finishGame(true);
    }
  } else if (item === "normal2") {
    score++;
    updateScore();
    if (score === NORMAL1 + NORMAL2) {
      finishGame(true);
    }
  } else if (item === "angry") {
    finishGame(false);
  }
}

const finishBanner = new Popup();
finishBanner.setItemClick(function () {
  startGame();
  showGameBtn();
});
function stopGame() {
  started = false;
  stopTimer();
  hideStopBtn();
  finishBanner.showTxt("Reply?");
  sound.playBg();
  sound.playAlert();
}

function startGame() {
  started = true;
  gameArea.init();
  startTimer();
  switchStopBtn();
  showTimerAndScore();
  sound.playBg();
  hideIntroPopup();
}

function finishGame(win) {
  started = false;
  hideStopBtn();
  stopTimer();
  finishBanner.showTxt(win ? "YOU WIN" : "YOU LOST");
  sound.stopBg();
  if (win) {
    sound.playWin();
  } else {
    sound.playAngry();
  }
}

function hideIntroPopup() {
  introPopup.classList.add("introductionPopup__hide");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function hideStopBtn() {
  gameBtn.style.visibility = "hidden";
}

function showGameBtn() {
  gameBtn.style.visibility = "visible";
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
      finishGame(ITEM_NUMBER === score);
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
