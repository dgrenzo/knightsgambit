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
var FSM_1 = require("../../../engine/FSM");
var TurnAction_1 = require("./turn/TurnAction");
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState(gameController) {
        var _this = _super.call(this) || this;
        _this.gameController = gameController;
        _this.enter = function () {
        };
        _this.update = function (deltaTime) {
        };
        _this.exit = function () {
        };
        var current_turn = new TurnAction_1.TurnAction(gameController);
        return _this;
    }
    return PlayState;
}(FSM_1.FSMState));
exports.PlayState = PlayState;
