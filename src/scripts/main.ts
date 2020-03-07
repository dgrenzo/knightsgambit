import * as PIXI from "pixi.js";
import {FACTION, PIECE} from './types'
import {toAssetString} from "./assets";
import {Howl} from 'howler';
import { Board } from "./game/board";


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




function getPieceSprite(faction : FACTION, piece : PIECE) : PIXI.Sprite {
  return PIXI.Sprite.from(toAssetString(faction, piece));
}

let board = new Board();
board.m_container.position.set(300, 100);
pixi_app.stage.addChild(board.m_container);

let piece = getPieceSprite(FACTION.WHITE, PIECE.QUEEN);
piece.position.set(27, 18)
// board.m_container.addChild(piece);

pixi_app.ticker.add(board.wiggle);