"use strict";

import Popup from "./popup.js";
import * as sound from "./sound.js";
import { Reason, GameBuilder } from "./game.js";

const finishBanner = new Popup();

const game = new GameBuilder()
  .withGameDuration(10)
  .withNormal1Count(5)
  .withNormal2Count(5)
  .withAngryCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLY?";
      sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WON!";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST";
      sound.playAngry();
      break;
    default:
      throw new Error("Not valid reason");
  }
  finishBanner.showTxt(message);
});

finishBanner.setItemClick(() => {
  game.start();
});
