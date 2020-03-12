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
var Tile_1 = require("./Tile");
var ChessPiece_1 = require("./pieces/ChessPiece");
var Scene_1 = require("../../engine/scene/Scene");
var ChessBoard = (function (_super) {
    __extends(ChessBoard, _super);
    function ChessBoard() {
        return _super.call(this) || this;
    }
    ChessBoard.prototype.init = function (board_config) {
        var _this = this;
        this.m_elements = [];
        board_config.entities.forEach(function (p_cfg) {
            _this.addElement(new ChessPiece_1.ChessPiece(p_cfg));
        });
        board_config.tiles.forEach(function (pos) {
            _this.addElement(new Tile_1.Tile(pos[0], pos[1]));
        });
    };
    ChessBoard.prototype.getElementsAt = function (pos) {
        if (!pos) {
            return [];
        }
        var elements = [];
        this.m_elements.forEach(function (ent) {
            if (ent.x === pos.x && ent.y === pos.y) {
                elements.push(ent);
            }
        });
        return elements;
    };
    return ChessBoard;
}(Scene_1.Scene));
exports.ChessBoard = ChessBoard;
function GetTileColor(x, y) {
    return (x + y) % 2;
}
exports.GetTileColor = GetTileColor;
