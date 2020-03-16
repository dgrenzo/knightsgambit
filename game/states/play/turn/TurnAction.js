"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
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
            _this.m_validMoves = _this.m_gameController.getValidActions(_this.m_activePiece);
            Promise.resolve().then(function () {
                _this.m_fsm.setState(TurnState.SELECTED);
            });
        };
        this.update = function (deltaTime) {
            _this.m_fsm.update(deltaTime);
        };
        this.onTileClicked = function (data) {
            _.forEach(_this.m_validMoves, function (move) {
                if (move.pos.x === data.x && move.pos.y === data.y) {
                    _this.m_activeMove = move;
                }
            });
            _this.m_fsm.setState(_this.m_activeMove ? TurnState.ACTING : TurnState.WAITING);
        };
        this.m_fsm.registerState(TurnState.WAITING, {
            enter: function () {
                _this.m_gameController.on("TILE_CLICKED", _this.activatePiece);
            },
            exit: function () {
                _this.m_gameController.off("TILE_CLICKED", _this.activatePiece);
            }
        });
        this.m_fsm.registerState(TurnState.SELECTED, {
            enter: function () {
                _.forEach(_this.m_validMoves, (function (move) {
                    _this.m_gameController.highlightTile(move.pos, true);
                }));
                _this.m_gameController.on("TILE_CLICKED", _this.onTileClicked);
            },
            exit: function () {
                _.forEach(_this.m_validMoves, (function (move) {
                    _this.m_gameController.highlightTile(move.pos, false);
                }));
                _this.m_gameController.off("TILE_CLICKED", _this.onTileClicked);
            }
        });
        var current_tween = 0;
        var target_piece;
        var lastPos;
        var tween_length = 5;
        var tween = function (start, end, k) {
            return start + (end - start) * k;
        };
        this.m_fsm.registerState(TurnState.ACTING, {
            enter: function () {
                current_tween = 0;
                target_piece = _this.m_gameController.getPieceAt(_this.m_activeMove.pos);
                lastPos = {
                    x: _this.m_activePiece.x,
                    y: _this.m_activePiece.y,
                };
            },
            update: function (deltaTime) {
                current_tween = Math.min(tween_length, current_tween + deltaTime);
                var k = current_tween / tween_length;
                _this.m_activePiece.x = tween(lastPos.x, _this.m_activeMove.pos.x, k);
                _this.m_activePiece.y = tween(lastPos.y, _this.m_activeMove.pos.y, k);
                if (current_tween >= tween_length) {
                    current_tween = 0;
                    _this.m_gameController.removePiece(target_piece);
                    _this.m_fsm.setState(TurnState.WAITING);
                }
            },
            exit: function () {
                _this.m_activeMove = null;
            }
        });
        this.m_fsm.registerState(TurnState.COMPLETE, {});
        this.m_fsm.setState(TurnState.WAITING);
    }
    return TurnAction;
}());
exports.TurnAction = TurnAction;
