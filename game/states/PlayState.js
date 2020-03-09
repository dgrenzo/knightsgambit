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
var FSM_1 = require("../../engine/FSM");
var ChessPiece_1 = require("../pieces/ChessPiece");
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState(m_board, m_renderer) {
        var _this = _super.call(this) || this;
        _this.m_board = m_board;
        _this.m_renderer = m_renderer;
        _this.enter = function () {
            _this.m_renderer.registerClickListener(function (id) {
                var target = _this.m_board.getElement(id);
                if (target) {
                    if (target instanceof ChessPiece_1.ChessPiece) {
                        target.y--;
                    }
                }
            });
        };
        _this.update = function (deltaTime) {
            _this.m_renderer.renderScene(_this.m_board);
        };
        _this.exit = function () {
        };
        return _this;
    }
    return PlayState;
}(FSM_1.FSMState));
exports.PlayState = PlayState;
