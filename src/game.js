"use strict";

import * as sound from "./sound.js";
import { Area, ItemType } from "./area.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withNormal1Count(num) {
    this.normal1Count = num;
    return this;
  }

  withNormal2Count(num) {
    this.normal2Count = num;
    return this;
  }

  withAngryCount(num) {
    this.angryCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration,
      this.normal1Count,
      this.normal2Count,
      this.angryCount
    );
  }
}

class Game {
  constructor(gameDuration, normal1Count, normal2Count, angryCount) {
    this.gameDuration = gameDuration;
    this.normal1Count = normal1Count;
    this.normal2Count = normal2Count;
    this.angryCount = angryCount;

    this.gameBtn = document.querySelector(".game__btn");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.introPopup = document.querySelector(".introductionPopup");

    this.started = false;
    this.timer = undefined;
    this.score = 0;

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameArea = new Area(normal1Count, normal2Count, angryCount);
    this.gameArea.setOnClick(this.onAreaClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onAreaClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.normal1) {
      this.score++;
      this.updateScore();
      if (this.score === this.normal1Count + this.normal2Count) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.normal2) {
      this.score++;
      this.updateScore();
      if (this.score === this.normal1Count + this.normal2Count) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.angry) {
      this.stop(Reason.lose);
    }
  };

  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.hideStopBtn();
    this.onGameStop && this.onGameStop(reason);
    sound.stopBg();
  }

  start() {
    this.started = true;
    this.initGame();
    this.startTimer();
    this.switchStopBtn();
    this.showTimerAndScore();
    this.showGameBtn();
    sound.playBg();
    this.hideIntroPopup();
  }

  hideIntroPopup() {
    this.introPopup.classList.add("introductionPopup__hide");
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  hideStopBtn() {
    this.gameBtn.style.visibility = "hidden";
  }

  showGameBtn() {
    this.gameBtn.style.visibility = "visible";
  }

  switchStopBtn() {
    const icon = document.querySelector(".fa-solid");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-stop");
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  startTimer() {
    let remainTime = this.gameDuration;
    this.updateTimer(remainTime);
    this.timer = setInterval(() => {
      if (remainTime <= 0) {
        clearInterval(this.timer);
        this.stop(
          this.normal1Count + this.normal2Count === this.score
            ? Reason.win
            : Reason.lose
        );
        return;
      }
      this.updateTimer(--remainTime);
    }, 1000);
  }
  updateTimer(time) {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    this.gameTimer.textContent = `${minute} : ${second}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.textContent = this.normal1Count + this.normal2Count;
    this.gameArea.init();
  }

  updateScore() {
    this.gameScore.textContent =
      this.normal1Count + this.normal2Count - this.score;
  }
}
