"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var RBoard = (function () {
    function RBoard(m_app) {
        this.m_app = m_app;
        this.m_container = new PIXI.Container;
        m_app.stage.addChild(this.m_container);
    }
    return RBoard;
}());
exports.RBoard = RBoard;
