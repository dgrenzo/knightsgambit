"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../types");
var Tile_1 = require("./Tile");
var render_1 = require("../../render/render");
var ChessPiece_1 = require("../pieces/ChessPiece");
var COLOR = {
    BLACK: 0x393939,
    WHITE: 0xF0F0F0,
};
var ChessBoard = (function () {
    function ChessBoard(config) {
        this.r_Board = render_1.CreateBoard(config);
        this.m_tiles = new Array();
        for (var i = 0; i < 8; i++) {
            this.m_tiles.push(new Array());
            for (var n = 0; n < 8; n++) {
                var tile = new Tile_1.Tile(i, n, config);
                this.m_tiles[i].push(tile);
                this.addElement(tile);
            }
        }
        var piece = new ChessPiece_1.ChessPiece(3, 4, { faction: types_1.FACTION.WHITE, type: types_1.PIECE.PAWN });
        this.addElement(piece);
    }
    ChessBoard.prototype.addElement = function (gameElement) {
        this.r_Board.addElement(gameElement.render);
    };
    return ChessBoard;
}());
exports.ChessBoard = ChessBoard;
function getTileColor(x, y) {
    return (x + y) % 2;
}
exports.getTileColor = getTileColor;
