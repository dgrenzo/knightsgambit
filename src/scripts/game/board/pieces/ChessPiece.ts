import { FACTION, PIECE } from "../../../types";
import { Entity } from "../../../engine/scene/Entity";
import {factionToString, AssetInfo} from '../../../assets';

export type PieceInfo = {
  pos : [number, number],
  faction : FACTION,
  type : PIECE,
}

export interface IMovementPattern {
  x : number,
  y : number,
  repeating? : boolean,
}

export class ChessPiece extends Entity {
  constructor(protected info : PieceInfo) {
    super(info.pos[0], info.pos[1]);
  }

  public getFaction = () : FACTION => {
    return this.info.faction;
  }

  public getAssetInfo = () : AssetInfo => {
    return {
      name : factionToString(this.info.faction) + '_' + pieceToString(this.info.type) + '.png',
      offset_x : 16,
      offset_y : -72,
    }
  }

  public getMoves = () : IMovementPattern[] => {
    switch (this.info.type) {
      case PIECE.PAWN :
        return [
          {
            x : 0,
            y : this.getFaction() === FACTION.BLACK ? 1 : -1,
          }
        ]
      case PIECE.KNIGHT :
        return [
          {
            x : 1,
            y : 2,
          },
          {
            x : -1,
            y : 2
          },
          {
            x : 2,
            y : 1,
          },
          {
            x : -2,
            y : 1
          },
          {
            x : 1,
            y : -2,
          },
          {
            x : -1,
            y : -2
          },
          {
            x : 2,
            y : -1,
          },
          {
            x : -2,
            y : -1
          }
        ]
      case PIECE.ROOK : return [
        {
          x : 1,
          y : 0,
          repeating : true,
        },
        {
          x : -1,
          y : 0,
          repeating : true,
        },
        {
          x : 0,
          y : 1,
          repeating : true,
        },
        {
          x : 0,
          y : -1,
          repeating : true,
        },
      ]
      case PIECE.BISHOP : return [
        {
          x : 1,
          y : 1,
          repeating : true,
        },
        {
          x : -1,
          y : -1,
          repeating : true,
        },
        {
          x : -1,
          y : 1,
          repeating : true,
        },
        {
          x : 1,
          y : -1,
          repeating : true,
        },
      ]
      case PIECE.QUEEN : return [
        {
          x : 1,
          y : 1,
          repeating : true,
        },
        {
          x : -1,
          y : -1,
          repeating : true,
        },
        {
          x : -1,
          y : 1,
          repeating : true,
        },
        {
          x : 1,
          y : -1,
          repeating : true,
        },
        
        {
          x : 1,
          y : 0,
          repeating : true,
        },
        {
          x : -1,
          y : 0,
          repeating : true,
        },
        {
          x : 0,
          y : 1,
          repeating : true,
        },
        {
          x : 0,
          y : -1,
          repeating : true,
        },
      ]
      case PIECE.KING : return [
        {
          x : 1,
          y : 1,
        },
        {
          x : -1,
          y : -1,
        },
        {
          x : -1,
          y : 1,
        },
        {
          x : 1,
          y : -1,
        },    
        {
          x : 1,
          y : 0,
        },
        {
          x : -1,
          y : 0,
        },
        {
          x : 0,
          y : 1,
        },
        {
          x : 0,
          y : -1,
        }
      ]
      
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