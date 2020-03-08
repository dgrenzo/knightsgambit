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
var PIXI = require("pixi.js");
var ChessBoard_1 = require("./board/ChessBoard");
var FSM_1 = require("../engine/FSM");
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
        this.m_fsm.registerState(GameState.SETUP, new SetupState(this.m_board, './assets/data/levels/001.json'));
        this.m_fsm.enterState(GameState.SETUP);
    }
    return GameController;
}());
exports.GameController = GameController;
var SetupState = (function (_super) {
    __extends(SetupState, _super);
    function SetupState(board, board_data_path) {
        var _this = _super.call(this) || this;
        _this.board = board;
        _this.board_data_path = board_data_path;
        _this.enter = function () {
            _this.loader.load(function (loader, resources) {
                var board_config = resources[_this.board_data_path].data;
                _this.board.init(board_config);
            });
        };
        _this.update = function (deltaTime) {
        };
        _this.exit = function () {
        };
        var loader = _this.loader = new PIXI.Loader();
        loader.add(board_data_path);
        return _this;
    }
    return SetupState;
}(FSM_1.FSMState));
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enter = function () {
        };
        _this.update = function (deltaTime) {
        };
        _this.exit = function () {
        };
        return _this;
    }
    return PlayState;
}(FSM_1.FSMState));
