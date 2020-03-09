"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChessBoard_1 = require("./board/ChessBoard");
var render_1 = require("../render/render");
var FSM_1 = require("../engine/FSM");
var SetupState_1 = require("./states/SetupState");
var PlayState_1 = require("./states/PlayState");
var GameState;
(function (GameState) {
    GameState[GameState["SETUP"] = 0] = "SETUP";
    GameState[GameState["PLAY"] = 1] = "PLAY";
})(GameState = exports.GameState || (exports.GameState = {}));
var GameController = (function () {
    function GameController(m_config) {
        this.m_config = m_config;
        this.m_fsm = new FSM_1.FSM();
        m_config.pixi_app.ticker.add(this.m_fsm.update);
        this.m_board = new ChessBoard_1.ChessBoard(m_config);
        this.m_renderer = render_1.CreateRenderer(m_config);
        this.m_fsm.registerState(GameState.SETUP, new SetupState_1.SetupState({
            board: this.m_board,
            renderer: this.m_renderer,
            board_data_path: './assets/data/levels/001.json',
        }));
        this.m_fsm.registerState(GameState.PLAY, new PlayState_1.PlayState(this.m_board, this.m_renderer));
        m_config.pixi_app.stage.addChild(this.m_renderer.stage);
        this.m_fsm.enterState(GameState.SETUP);
    }
    return GameController;
}());
exports.GameController = GameController;
