import * as PIXI from "pixi.js";
import {FACTION, PIECE} from './types'
import {toAssetString} from "./assets";
import {Howl} from 'howler';


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


let board = new PIXI.Container();
pixi_app.stage.addChild(board);
board.scale.set(4);


function getPieceSprite(faction : FACTION, piece : PIECE) : PIXI.Sprite {
  return PIXI.Sprite.from(toAssetString(faction, piece));
}

let piece = getPieceSprite(FACTION.WHITE, PIECE.KING);
board.addChild(piece);