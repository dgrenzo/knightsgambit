import {FACTION, PIECE} from './types'

function factionToString(faction : FACTION) : string {
  switch (faction) {
    case FACTION.BLACK : return 'black';
    case FACTION.WHITE : return 'white';
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

export function getTileString(faction : FACTION) {
  return 'images/' + factionToString(faction) + '_tile.png';
}

export function toAssetString(faction : FACTION, piece : PIECE) {
  return 'images/' + factionToString(faction) + '_' + pieceToString(piece) + '.png';
}