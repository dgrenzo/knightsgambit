import * as PIXI from 'pixi.js';
import { ChessBoard } from "./board/ChessBoard";
import { RenderMode } from '../render/render';

export type GameConfig = {
  pixi_app : PIXI.Application,
  mode : RenderMode.ISOMETRIC,
}

export class GameController {
  private m_board : ChessBoard;

  constructor(private m_pixi : PIXI.Application) {
    this.m_board = new ChessBoard({
      pixi_app : m_pixi,
      mode : RenderMode.ISOMETRIC
    });
  }
}