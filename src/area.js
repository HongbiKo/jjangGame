"use strict";

import * as sound from "./sound.js";

const JJANG_SIZE = 80;

export default class Area {
  constructor(normalCount1, normalCount2, angryCount) {
    this.normalCount1 = normalCount1;
    this.normalCount2 = normalCount2;
    this.angryCount = angryCount;

    this.gameArea = document.querySelector(".game__area");
    this.gameAreaRect = this.gameArea.getBoundingClientRect();
    this.gameArea.addEventListener("click", (e) => {
      this.onClick(e);
      // binding 3가지 방법
      /* 1. this.onClick = this.onClick.bind(this);
            this.gameArea.addEventListener("click", this.onClick);
      */
      /* 2. this.gameArea.addEventListener("click", (e) => {
        this.onClick(e);
      })
      */
      /* 3. this.gameArea.addEventListener("click", this.onClick);
      onClick => {...};
      */
    });
  }

  setOnClick(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.gameArea.innerHTML = "";
    this._addItem("normal1", this.normalCount1, "./imgs/normal1.png");
    this._addItem("normal2", this.normalCount2, "./imgs/normal2.png");
    this._addItem("angry", this.angryCount, "./imgs/angry.png");
  }

  _addItem(className, count, path) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.gameAreaRect.width - JJANG_SIZE;
    const y2 = this.gameAreaRect.height - JJANG_SIZE;
    for (let i = 0; i < count; i++) {
      const imgs = document.createElement("img");
      imgs.setAttribute("class", className);
      imgs.setAttribute("src", path);
      imgs.style.position = "absolute";
      const x = numberRandom(x1, x2);
      const y = numberRandom(y1, y2);
      imgs.style.left = `${x}px`;
      imgs.style.top = `${y}px`;
      this.gameArea.appendChild(imgs);
    }
  }

  onClick(e) {
    const target = e.target;
    if (target.matches(".normal1")) {
      target.remove();
      sound.playNormal();
      this.onItemClick && this.onItemClick("normal1");
    } else if (target.matches(".normal2")) {
      target.remove();
      sound.playNormal();
      this.onItemClick && this.onItemClick("normal2");
    } else if (target.matches(".angry")) {
      this.onItemClick && this.onItemClick("angry");
    }
  }
}

function numberRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
