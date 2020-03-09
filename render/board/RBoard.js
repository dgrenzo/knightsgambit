"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var RBoard = (function () {
    function RBoard(m_app) {
        this.m_app = m_app;
        this.m_elements = [];
        this.m_container = new PIXI.Container;
        m_app.stage.addChild(this.m_container);
    }
    RBoard.prototype.addElement = function (element) {
        this.m_elements.push(element);
        this.m_container.addChild(element.sprite);
    };
    ;
    return RBoard;
}());
exports.RBoard = RBoard;
