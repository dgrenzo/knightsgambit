import { FACTION, PIECE } from "../../types";
import { Entity } from "../../engine/scene/Entity";


import {factionToString, AssetInfo} from '../../assets';

export type PieceInfo = {
  pos : [number, number],
  faction : FACTION,
  type : PIECE,
}


export class ChessPiece extends Entity {
  constructor(protected info : PieceInfo) {
    super(info.pos[0], info.pos[1]);
  }

  public getAssetInfo = () : AssetInfo => {
    return {
      name : factionToString(this.info.faction) + '_' + pieceToString(this.info.type) + '.png',
      offset_x : -16,
      offset_y : -90,
    }
  }
}


function pieceToString(piece : PIECE) : string {
  switch (piece) {
    case PIECE.PAWN : return 'pawn';
    case PIECE.KNIGHT : return 'knight';
    case PIECE.ROOK : return 'rook';
    case PIECE.BISHOP : return 'bishop';
    case PIECE.QUEEN : return 'queen';
    case PIECE.KING : return 'king';
  }
}