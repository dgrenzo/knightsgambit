import * as _ from 'lodash';
import { FACTION } from "../../../../types";
import { PieceInfo } from "../ChessPiece";
import { BoardDirection, ActionDirection, GetMoveData, OccupantFlag, DirectionCollection } from "./data";

export interface IMovementPattern {
  offset : IOffset,
  tile_flags : OccupantFlag,
  repeating ?: boolean
}

export interface IOffset {
  x : number,
  y : number,
}

export function GetPieceMovement(info : PieceInfo) : IMovementPattern[] {
  let move_datas = GetMoveData(info.type);
  let patterns : IMovementPattern[] = [];
  _.forEach(move_datas, (move_data => {
    let offsets = MoveDataToOffsets(move_data.direction, info);
    _.forEach(offsets, offset => {
      patterns.push({
        offset : offset,
        tile_flags : move_data.tile_flags,
        repeating : move_data.repeating,
      })
    })
  }))
  return patterns;
}

function MoveDataToOffsets(direction : ActionDirection, info : PieceInfo) : IOffset[] {
  switch (direction) {
    case BoardDirection.FORWARD       : return [getForward(info)];
    case BoardDirection.BACKWARD      : return [getBackward(info)];
    case BoardDirection.LEFT          : return [getLeft(info)];
    case BoardDirection.RIGHT         : return [getRight(info)];
    case BoardDirection.FORWARD_LEFT  : return [getForwardLeft(info)];
    case BoardDirection.FORWARD_RIGHT : return [getForwardRight(info)];
    case BoardDirection.BACK_LEFT     : return [getBackwardLeft(info)];
    case BoardDirection.BACK_RIGHT    : return [getBackwardRight(info)]
    case DirectionCollection.omni     : return getOmni(info);
    case DirectionCollection.straight : return getStraight(info);
    case DirectionCollection.diagonal : return getDiagonal(info);
    case DirectionCollection.knight            : return KnightOffsets;
    default : return [];
  }
}

function getForward(info : PieceInfo) : IOffset {
  return {
    x : 0,
    y : info.faction === FACTION.BLACK ? 1 : -1,
  };
}
function getBackward(info : PieceInfo) : IOffset {
  return {
    x : 0,
    y : info.faction === FACTION.BLACK ? -1 : 1
  } 
}
function getLeft(info : PieceInfo) : IOffset {
  return {
    x : info.faction === FACTION.BLACK ? 1 : -1,
    y : 0,
  }
}
function getRight(info : PieceInfo) : IOffset {
  return {
    x : info.faction === FACTION.BLACK ? -1 : 1,
    y : 0,
  }
}
function getForwardLeft(info : PieceInfo) : IOffset {
  return {
    x : getLeft(info).x,
    y : getForward(info).y,
  }
}
function getForwardRight(info : PieceInfo) : IOffset {
  return {
    x : getRight(info).x,
    y : getForward(info).y,
  }
}

function getBackwardLeft(info : PieceInfo) : IOffset{
  return {
    x : getLeft(info).x,
    y : getBackward(info).y,
  }
}
function getBackwardRight(info : PieceInfo) : IOffset {
  return {
    x : getRight(info).x,
    y : getBackward(info).y,
  }
}

function getDiagonal(info : PieceInfo) : IOffset[] {
  return _.concat([], getForwardLeft(info), getForwardRight(info), getBackwardLeft(info), getBackwardRight(info));
}
function getStraight(info : PieceInfo) : IOffset[] {
  return _.concat([], getForward(info), getBackward(info), getLeft(info), getRight(info));
}

function getOmni(info : PieceInfo) : IOffset[] {
  return _.concat(getDiagonal(info), getStraight(info));
}

const KnightOffsets : IOffset[] = [
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
