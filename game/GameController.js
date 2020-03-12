"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChessBoard_1 = require("./board/ChessBoard");
var render_1 = require("../engine/render/render");
var FSM_1 = require("../engine/FSM");
var SetupState_1 = require("./states/setup/SetupState");
var PlayState_1 = require("./states/play/PlayState");
var event_1 = require("../engine/listener/event");
var ChessPiece_1 = require("./board/pieces/ChessPiece");
var TileHighlighter_1 = require("./extras/TileHighlighter");
var Tile_1 = require("./board/Tile");
var GameState;
(function (GameState) {
    GameState[GameState["SETUP"] = 0] = "SETUP";
    GameState[GameState["PLAY"] = 1] = "PLAY";
})(GameState = exports.GameState || (exports.GameState = {}));
var GameController = (function () {
    function GameController(m_config) {
        var _this = this;
        this.m_config = m_config;
        this.m_eventManager = new event_1.EventManager();
        this.highlightTiles = function (tiles, highlight) {
            tiles.forEach(function (tile) {
                _this.m_renderer.getRenderable(tile.id).setFilter({ highlight: highlight });
            });
        };
        this.getPieceAt = function (pos) {
            var elements = _this.m_board.getElementsAt(pos);
            var piece = null;
            elements.forEach(function (entity) {
                if (!piece && entity instanceof ChessPiece_1.ChessPiece) {
                    piece = entity;
                }
            });
            return piece;
        };
        this.removePiece = function (piece) {
            if (!piece) {
                return;
            }
            _this.m_board.removeElement(piece.id);
            _this.m_renderer.removeEntity(piece);
        };
        this.getTileAt = function (pos) {
            var elements = _this.m_board.getElementsAt(pos);
            var tile = null;
            elements.forEach(function (entity) {
                if (!tile && entity instanceof Tile_1.Tile) {
                    tile = entity;
                }
            });
            return tile;
        };
        this.on = function (event_name, cb) {
            _this.m_eventManager.add(event_name, cb);
        };
        this.off = function (event_name, cb) {
            _this.m_eventManager.remove(event_name, cb);
        };
        this.m_fsm = new FSM_1.FSM();
        m_config.pixi_app.ticker.add(this.m_fsm.update);
        this.m_board = new ChessBoard_1.ChessBoard();
        this.m_renderer = render_1.CreateRenderer(m_config);
        this.m_renderer.on("TILE_CLICKED", function (data) {
            _this.m_eventManager.emit("TILE_CLICKED", data);
        });
        this.m_renderer.on("ENTITY_CLICKED", function (data) {
            var target = _this.m_board.getElement(data.id);
            if (target) {
                if (target instanceof ChessPiece_1.ChessPiece) {
                    _this.m_eventManager.emit("PIECE_CLICKED", { piece: target });
                }
            }
        });
        var setupState = new SetupState_1.SetupState({
            board: this.m_board,
            renderer: this.m_renderer,
            board_data_path: './assets/data/levels/001.json',
        });
        this.m_fsm.registerState(GameState.SETUP, setupState);
        this.m_fsm.registerState(GameState.PLAY, new PlayState_1.PlayState(this));
        setupState.onComplete(function () {
            m_config.pixi_app.stage.addChild(_this.m_renderer.stage);
            var highligher = new TileHighlighter_1.default(_this.m_renderer, _this.m_board);
            m_config.pixi_app.ticker.add(highligher.update);
            m_config.pixi_app.ticker.add(function () {
                _this.m_renderer.renderScene(_this.m_board);
            });
            _this.m_fsm.enterState(GameState.PLAY);
        });
        this.m_fsm.enterState(GameState.SETUP);
    }
    return GameController;
}());
exports.GameController = GameController;
