"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var render_1 = require("../../render/render");
var ChessPiece_1 = require("../pieces/ChessPiece");
var COLOR = {
    BLACK: 0x393939,
    WHITE: 0xF0F0F0,
};
var ChessBoard = (function () {
    function ChessBoard(config) {
        this.config = config;
        this.r_Board = render_1.CreateBoard(config);
    }
    ChessBoard.prototype.addElement = function (gameElement) {
        this.r_Board.addElement(gameElement.render);
    };
    ChessBoard.prototype.init = function (board_config) {
        var _this = this;
        this.m_tiles = new Array();
        board_config.tiles.forEach(function (pos) {
            _this.addTile(pos[0], pos[1]);
        });
        board_config.entities.forEach(function (p_cfg) {
            _this.addElement(new ChessPiece_1.ChessPiece(p_cfg));
        });
    };
    ChessBoard.prototype.addTile = function (x, y) {
        var tile = new Tile_1.Tile(x, y, this.config);
        this.m_tiles.push(tile);
        this.addElement(tile);
        return tile;
    };
    return ChessBoard;
}());
exports.ChessBoard = ChessBoard;
function getTileColor(x, y) {
    return (x + y) % 2;
}
exports.getTileColor = getTileColor;
