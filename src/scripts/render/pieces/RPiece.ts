import * as PIXI from 'pixi.js';
import { PieceInfo } from "../../game/pieces/ChessPiece";
import { toAssetString } from '../../assets'
import { RElement } from "../RElement";

export class RPiece extends RElement {
  constructor (info : PieceInfo) {
    super(info.pos[0], info.pos[1]);

    this.m_sprite = new PIXI.Sprite();
    let piece = PIXI.Sprite.from(toAssetString(info.faction, info.type));
    piece.position.set(-16, -90)
    this.m_sprite.addChild(piece);
  }
}