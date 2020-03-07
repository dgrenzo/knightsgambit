import { FACTION, PIECE } from "../../types";
import { RPiece } from "../../render/pieces/RPiece";
import { GameElement } from "../GameElement";

export type PieceInfo = {
  faction : FACTION,
  type : PIECE,
}


export class ChessPiece extends GameElement {
  constructor(private x : number, private y : number, info : PieceInfo) {
    super();
    this._render = new RPiece(x, y, info);
  }

  public get render () : RPiece {
    return this._render;
  }
}