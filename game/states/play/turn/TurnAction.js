"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FSM_1 = require("../../../../engine/FSM");
var TurnState;
(function (TurnState) {
    TurnState[TurnState["WAITING"] = 0] = "WAITING";
    TurnState[TurnState["SELECTED"] = 1] = "SELECTED";
    TurnState[TurnState["ACTING"] = 2] = "ACTING";
    TurnState[TurnState["COMPLETE"] = 3] = "COMPLETE";
})(TurnState || (TurnState = {}));
var TurnAction = (function () {
    function TurnAction(m_gameController) {
        var _this = this;
        this.m_gameController = m_gameController;
        this.m_fsm = new FSM_1.FSM();
        this.activatePiece = function (data) {
            var piece = _this.m_gameController.getPieceAt(data);
            if (!piece) {
                return;
            }
            _this.m_activePiece = piece;
            var moves = _this.m_activePiece.getMoves();
            _this.m_validMoves = [];
            moves.forEach(function (move) {
                var target = {
                    x: _this.m_activePiece.x + move.x,
                    y: _this.m_activePiece.y + move.y,
                };
                var repeat = move.repeating;
                do {
                    var tile = _this.m_gameController.getTileAt(target);
                    if (tile) {
                        var target_piece = _this.m_gameController.getPieceAt(target);
                        if (target_piece) {
                            repeat = false;
                            if (target_piece.getFaction() != piece.getFaction()) {
                                _this.m_validMoves.push({
                                    x: target.x,
                                    y: target.y,
                                    id: tile.id,
                                });
                            }
                        }
                        else {
                            _this.m_validMoves.push({
                                x: target.x,
                                y: target.y,
                                id: tile.id,
                            });
                        }
                        target.x += move.x;
                        target.y += move.y;
                    }
                    else {
                        repeat = false;
                    }
                } while (repeat);
            });
            Promise.resolve().then(function () {
                _this.m_fsm.enterState(TurnState.SELECTED);
            });
        };
        this.onTileClicked = function (data) {
            if (_this.m_gameController.getPieceAt(data) === _this.m_activePiece) {
                _this.m_fsm.enterState(TurnState.WAITING);
                return;
            }
            _this.m_validMoves.forEach(function (move) {
                if (move.x === data.x && move.y === data.y) {
                    _this.m_gameController.removePiece(_this.m_gameController.getPieceAt(move));
                    _this.m_activePiece.x = data.x;
                    _this.m_activePiece.y = data.y;
                    _this.m_fsm.enterState(TurnState.WAITING);
                }
            });
        };
        this.m_fsm.registerState(TurnState.WAITING, new FSM_1.FSMStateSimple({
            enter: function () {
                _this.m_gameController.on("TILE_CLICKED", _this.activatePiece);
            },
            exit: function () {
                _this.m_gameController.off("TILE_CLICKED", _this.activatePiece);
            }
        }));
        this.m_fsm.registerState(TurnState.SELECTED, new FSM_1.FSMStateSimple({
            enter: function () {
                _this.m_gameController.highlightTiles(_this.m_validMoves, true);
                _this.m_gameController.on("TILE_CLICKED", _this.onTileClicked);
            },
            exit: function () {
                _this.m_gameController.highlightTiles(_this.m_validMoves, false);
                _this.m_gameController.off("TILE_CLICKED", _this.onTileClicked);
            }
        }));
        this.m_fsm.registerState(TurnState.COMPLETE, new FSM_1.FSMStateSimple({
            enter: function () {
            },
            exit: function () {
            }
        }));
        this.m_fsm.enterState(TurnState.WAITING);
    }
    return TurnAction;
}());
exports.TurnAction = TurnAction;
