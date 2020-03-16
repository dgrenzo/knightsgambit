"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../../types");
var Entity_1 = require("../../../engine/scene/Entity");
var assets_1 = require("../../../assets");
var action_1 = require("./movement/action");
var ChessPiece = (function (_super) {
    __extends(ChessPiece, _super);
    function ChessPiece(info) {
        var _this = _super.call(this, info.pos[0], info.pos[1]) || this;
        _this.info = info;
        _this.getFaction = function () {
            return _this.info.faction;
        };
        _this.getAssetInfo = function () {
            return {
                name: assets_1.factionToString(_this.info.faction) + '_' + pieceToString(_this.info.type) + '.png',
                offset_x: 16,
                offset_y: -72,
            };
        };
        _this.getMoves = function () {
            return action_1.GetPieceMovement(_this.info);
        };
        return _this;
    }
    return ChessPiece;
}(Entity_1.Entity));
exports.ChessPiece = ChessPiece;
function pieceToString(piece) {
    switch (piece) {
        case types_1.PIECE.PAWN: return 'pawn';
        case types_1.PIECE.KNIGHT: return 'knight';
        case types_1.PIECE.ROOK: return 'rook';
        case types_1.PIECE.BISHOP: return 'bishop';
        case types_1.PIECE.QUEEN: return 'queen';
        case types_1.PIECE.KING: return 'king';
    }
}
