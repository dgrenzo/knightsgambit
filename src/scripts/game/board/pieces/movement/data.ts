import { PIECE } from "../../../../types";

export function GetMoveData(type : PIECE) : IMoveData[] { 
  switch (type) {
    case PIECE.PAWN   : return PAWN_MOVES;
    case PIECE.ROOK   : return ROOK_MOVES;
    case PIECE.BISHOP : return BISHOP_MOVES;
    case PIECE.KNIGHT : return KNIGHT_MOVES;
    case PIECE.QUEEN  : return QUEEN_MOVES;
    case PIECE.KING   : return KING_MOVES;
  }
}

export enum BoardDirection {
  FORWARD       = 0 << 1,
  BACKWARD      = 1 << 2,
  LEFT          = 1 << 3,
  RIGHT         = 1 << 4,
  FORWARD_LEFT  = 1 << 5,
  FORWARD_RIGHT = 1 << 6,
  BACK_LEFT     = 1 << 7,
  BACK_RIGHT    = 1 << 8,
}
const BoardDirStraight = BoardDirection.FORWARD | BoardDirection.BACKWARD | BoardDirection.LEFT | BoardDirection.RIGHT;
const BoardDirDiagonal = BoardDirection.FORWARD_LEFT | BoardDirection.FORWARD_RIGHT | BoardDirection.BACK_LEFT | BoardDirection.BACK_RIGHT;
const BoardDirOmni = BoardDirStraight | BoardDirDiagonal;

type KnightDirection = "KnightDirection";
const KnightDirection : KnightDirection = "KnightDirection";

export const DirectionCollection = {
  straight : BoardDirStraight,
  diagonal : BoardDirDiagonal,
  omni : BoardDirOmni,
  knight : KnightDirection,
}

export type ActionDirection = BoardDirection | KnightDirection;

export enum OccupantFlag {
  Empty   = 1 << 1,
  Ally    = 1 << 2,
  Enemy   = 1 << 3,
}

export interface IMoveData {
  direction : ActionDirection,
  tile_flags : OccupantFlag,
  repeating? : boolean,
}


const QUEEN_MOVES : IMoveData[] = [
  {
    direction : BoardDirOmni,
    tile_flags : OccupantFlag.Empty | OccupantFlag.Enemy,
    repeating : true,
  }
]
const KING_MOVES : IMoveData[] = [
  {
    direction : BoardDirOmni,
    tile_flags : OccupantFlag.Empty | OccupantFlag.Enemy,
    repeating : true,
  }
]
const ROOK_MOVES : IMoveData[] = [
  {
    direction : BoardDirStraight,
    tile_flags : OccupantFlag.Empty | OccupantFlag.Enemy,
    repeating : true,
  }
]
const BISHOP_MOVES : IMoveData[] = [
  {
    direction : BoardDirDiagonal,
    tile_flags : OccupantFlag.Empty | OccupantFlag.Enemy,
    repeating : true,
  }
]
const PAWN_MOVES : IMoveData[] = [
  {
    direction : BoardDirection.FORWARD,
    tile_flags : OccupantFlag.Empty,
    repeating : false,
  },
  {
    direction : BoardDirection.FORWARD_LEFT,
    tile_flags : OccupantFlag.Enemy,
    repeating : false,
  },
  {
    direction : BoardDirection.FORWARD_RIGHT,
    tile_flags : OccupantFlag.Enemy,
    repeating : false,
  }
]
const KNIGHT_MOVES : IMoveData[] = [
  {
    direction : KnightDirection,
    tile_flags : OccupantFlag.Empty | OccupantFlag.Enemy,
    repeating : false,
  }
]