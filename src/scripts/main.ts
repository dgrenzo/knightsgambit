import * as PIXI from "pixi.js";
import { GameController } from "./game/GameController";

export const DEBUG = true;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
let pixi_app : PIXI.Application = new PIXI.Application({
  backgroundColor : 0x000011,
  view : <HTMLCanvasElement>document.getElementById('game_canvas')
});

let WindowResize = () => {
  pixi_app.renderer.resize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', WindowResize);
Promise.resolve().then(WindowResize);

let game = new GameController(pixi_app);
