"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TurnAction_1 = require("./turn/TurnAction");
var PlayState = (function () {
    function PlayState(gameController) {
        var _this = this;
        this.gameController = gameController;
        this.enter = function () {
        };
        this.update = function (deltaTime) {
            _this.m_currentTurn.update(deltaTime);
        };
        this.exit = function () {
        };
        this.m_currentTurn = new TurnAction_1.TurnAction(gameController);
    }
    return PlayState;
}());
exports.PlayState = PlayState;
