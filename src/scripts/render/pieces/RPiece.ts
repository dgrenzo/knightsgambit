import * as PIXI from 'pixi.js';
import { PieceInfo } from "../../game/pieces/ChessPiece";
import { toAssetString } from '../../assets'
import { RElement } from "../RElement";

export class RPiece extends RElement {
  constructor (x : number, y : number, info : PieceInfo) {
    super(x, y);

    this.m_sprite = PIXI.Sprite.from(toAssetString(info.faction, info.type));
    this.m_sprite.anchor.set(0.5, 1);
  }
}