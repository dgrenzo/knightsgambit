import PIXI = require("pixi.js");
import {Howl} from 'howler';

let pixi_app : PIXI.Application = new PIXI.Application({
  autoResize: true,
  backgroundColor : 0x000011,
  view : <HTMLCanvasElement>document.getElementById('game_canvas')
});

let WindowResize = () => {
  pixi_app.renderer.resize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', WindowResize);
Promise.resolve().then(WindowResize);
