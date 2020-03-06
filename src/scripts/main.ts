import * as PIXI from "pixi.js"
import {Howl} from 'howler';

let pixi_app : PIXI.Application = new PIXI.Application({
  backgroundColor : 0x000011,
  view : <HTMLCanvasElement>document.getElementById('game_canvas')
});

let WindowResize = () => {
  pixi_app.renderer.resize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', WindowResize);
Promise.resolve().then(WindowResize);


let king = PIXI.Sprite.from('images/white_king.png');
pixi_app.stage.addChild(king);