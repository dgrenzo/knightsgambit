"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../../../types");
function GetMoveData(type) {
    switch (type) {
        case types_1.PIECE.PAWN: return PAWN_MOVES;
        case types_1.PIECE.ROOK: return ROOK_MOVES;
        case types_1.PIECE.BISHOP: return BISHOP_MOVES;
        case types_1.PIECE.KNIGHT: return KNIGHT_MOVES;
        case types_1.PIECE.QUEEN: return QUEEN_MOVES;
        case types_1.PIECE.KING: return KING_MOVES;
    }
}
exports.GetMoveData = GetMoveData;
var BoardDirection;
(function (BoardDirection) {
    BoardDirection[BoardDirection["FORWARD"] = 0] = "FORWARD";
    BoardDirection[BoardDirection["BACKWARD"] = 4] = "BACKWARD";
    BoardDirection[BoardDirection["LEFT"] = 8] = "LEFT";
    BoardDirection[BoardDirection["RIGHT"] = 16] = "RIGHT";
    BoardDirection[BoardDirection["FORWARD_LEFT"] = 32] = "FORWARD_LEFT";
    BoardDirection[BoardDirection["FORWARD_RIGHT"] = 64] = "FORWARD_RIGHT";
    BoardDirection[BoardDirection["BACK_LEFT"] = 128] = "BACK_LEFT";
    BoardDirection[BoardDirection["BACK_RIGHT"] = 256] = "BACK_RIGHT";
})(BoardDirection = exports.BoardDirection || (exports.BoardDirection = {}));
var BoardDirStraight = BoardDirection.FORWARD | BoardDirection.BACKWARD | BoardDirection.LEFT | BoardDirection.RIGHT;
var BoardDirDiagonal = BoardDirection.FORWARD_LEFT | BoardDirection.FORWARD_RIGHT | BoardDirection.BACK_LEFT | BoardDirection.BACK_RIGHT;
var BoardDirOmni = BoardDirStraight | BoardDirDiagonal;
var KnightDirection = "KnightDirection";
exports.DirectionCollection = {
    straight: BoardDirStraight,
    diagonal: BoardDirDiagonal,
    omni: BoardDirOmni,
    knight: KnightDirection,
};
var OccupantFlag;
(function (OccupantFlag) {
    OccupantFlag[OccupantFlag["Empty"] = 2] = "Empty";
    OccupantFlag[OccupantFlag["Ally"] = 4] = "Ally";
    OccupantFlag[OccupantFlag["Enemy"] = 8] = "Enemy";
})(OccupantFlag = exports.OccupantFlag || (exports.OccupantFlag = {}));
var QUEEN_MOVES = [
    {
        direction: BoardDirOmni,
        tile_flags: OccupantFlag.Empty | OccupantFlag.Enemy,
        repeating: true,
    }
];
var KING_MOVES = [
    {
        direction: BoardDirOmni,
        tile_flags: OccupantFlag.Empty | OccupantFlag.Enemy,
        repeating: true,
    }
];
var ROOK_MOVES = [
    {
        direction: BoardDirStraight,
        tile_flags: OccupantFlag.Empty | OccupantFlag.Enemy,
        repeating: true,
    }
];
var BISHOP_MOVES = [
    {
        direction: BoardDirDiagonal,
        tile_flags: OccupantFlag.Empty | OccupantFlag.Enemy,
        repeating: true,
    }
];
var PAWN_MOVES = [
    {
        direction: BoardDirection.FORWARD,
        tile_flags: OccupantFlag.Empty,
        repeating: false,
    },
    {
        direction: BoardDirection.FORWARD_LEFT,
        tile_flags: OccupantFlag.Enemy,
        repeating: false,
    },
    {
        direction: BoardDirection.FORWARD_RIGHT,
        tile_flags: OccupantFlag.Enemy,
        repeating: false,
    }
];
var KNIGHT_MOVES = [
    {
        direction: KnightDirection,
        tile_flags: OccupantFlag.Empty | OccupantFlag.Enemy,
        repeating: false,
    }
];
