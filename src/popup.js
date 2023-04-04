"use strict";

export default class Popup {
  constructor() {
    this.popUp = document.querySelector(".popUp");
    this.popUpMessage = document.querySelector(".popUp__message");
    this.popUpBtn = document.querySelector(".popUp__refresh");
    this.popUpBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setItemClick(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.add("popUp__hide");
  }
  showTxt(text) {
    this.popUp.classList.remove("popUp__hide");
    this.popUpMessage.textContent = `${text}`;
  }
}
