"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChessBoard_1 = require("./board/ChessBoard");
var render_1 = require("../render/render");
var GameController = (function () {
    function GameController(m_pixi) {
        this.m_pixi = m_pixi;
        this.m_board = new ChessBoard_1.ChessBoard({
            pixi_app: m_pixi,
            mode: render_1.RenderMode.ISOMETRIC
        });
    }
    return GameController;
}());
exports.GameController = GameController;
