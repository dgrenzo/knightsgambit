"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var types_1 = require("../../../../types");
var data_1 = require("./data");
function GetPieceMovement(info) {
    var move_datas = data_1.GetMoveData(info.type);
    var patterns = [];
    _.forEach(move_datas, (function (move_data) {
        var offsets = MoveDataToOffsets(move_data.direction, info);
        _.forEach(offsets, function (offset) {
            patterns.push({
                offset: offset,
                tile_flags: move_data.tile_flags,
                repeating: move_data.repeating,
            });
        });
    }));
    return patterns;
}
exports.GetPieceMovement = GetPieceMovement;
function MoveDataToOffsets(direction, info) {
    switch (direction) {
        case data_1.BoardDirection.FORWARD: return [getForward(info)];
        case data_1.BoardDirection.BACKWARD: return [getBackward(info)];
        case data_1.BoardDirection.LEFT: return [getLeft(info)];
        case data_1.BoardDirection.RIGHT: return [getRight(info)];
        case data_1.BoardDirection.FORWARD_LEFT: return [getForwardLeft(info)];
        case data_1.BoardDirection.FORWARD_RIGHT: return [getForwardRight(info)];
        case data_1.BoardDirection.BACK_LEFT: return [getBackwardLeft(info)];
        case data_1.BoardDirection.BACK_RIGHT: return [getBackwardRight(info)];
        case data_1.DirectionCollection.omni: return getOmni(info);
        case data_1.DirectionCollection.straight: return getStraight(info);
        case data_1.DirectionCollection.diagonal: return getDiagonal(info);
        case data_1.DirectionCollection.knight: return KnightOffsets;
        default: return [];
    }
}
function getForward(info) {
    return {
        x: 0,
        y: info.faction === types_1.FACTION.BLACK ? 1 : -1,
    };
}
function getBackward(info) {
    return {
        x: 0,
        y: info.faction === types_1.FACTION.BLACK ? -1 : 1
    };
}
function getLeft(info) {
    return {
        x: info.faction === types_1.FACTION.BLACK ? 1 : -1,
        y: 0,
    };
}
function getRight(info) {
    return {
        x: info.faction === types_1.FACTION.BLACK ? -1 : 1,
        y: 0,
    };
}
function getForwardLeft(info) {
    return {
        x: getLeft(info).x,
        y: getForward(info).y,
    };
}
function getForwardRight(info) {
    return {
        x: getRight(info).x,
        y: getForward(info).y,
    };
}
function getBackwardLeft(info) {
    return {
        x: getLeft(info).x,
        y: getBackward(info).y,
    };
}
function getBackwardRight(info) {
    return {
        x: getRight(info).x,
        y: getBackward(info).y,
    };
}
function getDiagonal(info) {
    return _.concat([], getForwardLeft(info), getForwardRight(info), getBackwardLeft(info), getBackwardRight(info));
}
function getStraight(info) {
    return _.concat([], getForward(info), getBackward(info), getLeft(info), getRight(info));
}
function getOmni(info) {
    return _.concat(getDiagonal(info), getStraight(info));
}
var KnightOffsets = [
    {
        x: 1,
        y: 2,
    },
    {
        x: -1,
        y: 2
    },
    {
        x: 2,
        y: 1,
    },
    {
        x: -2,
        y: 1
    },
    {
        x: 1,
        y: -2,
    },
    {
        x: -1,
        y: -2
    },
    {
        x: 2,
        y: -1,
    },
    {
        x: -2,
        y: -1
    }
];
