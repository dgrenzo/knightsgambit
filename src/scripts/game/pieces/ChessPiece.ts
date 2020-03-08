import { FACTION, PIECE } from "../../types";
import { RPiece } from "../../render/pieces/RPiece";
import { GameElement } from "../GameElement";

export type PieceInfo = {
  pos : [number, number],
  faction : FACTION,
  type : PIECE,
}


export class ChessPiece extends GameElement {
  constructor(info : PieceInfo) {
    super();
    this._render = new RPiece(info);
  }

  public get render () : RPiece {
    return this._render;
  }
}