"use strict";

const bgSound = new Audio("./sounds/bg.mp3");
const alertSound = new Audio("./sounds/alert.mp3");
const normalSound = new Audio("./sounds/normal_pull.mp3");
const angrySound = new Audio("./sounds/angry_pull.mp3");
const gameWinSound = new Audio("./sounds/game_win.mp3");

export function playBg() {
  playSound(bgSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playNormal() {
  playSound(normalSound);
}
export function playAngry() {
  playSound(angrySound);
}
export function playWin() {
  playSound(gameWinSound);
}
export function stopBg() {
  stopSound(bgSound);
}

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
