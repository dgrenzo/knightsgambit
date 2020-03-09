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
var RBoard_1 = require("./RBoard");
var TILE_WIDTH = 64;
var TILE_HEIGHT = 32;
var RBoardIso = (function (_super) {
    __extends(RBoardIso, _super);
    function RBoardIso(m_app) {
        var _this = _super.call(this, m_app) || this;
        _this.m_app = m_app;
        _this.TILE_WIDTH = TILE_WIDTH;
        _this.TILE_HEIGHT = TILE_HEIGHT;
        _this.HALF_TILE_WIDTH = TILE_WIDTH / 2;
        _this.HALF_TILE_HEIGHT = TILE_HEIGHT / 2;
        _this.positionElement = function (element) {
            element.setPosition((element.x - element.y) * _this.HALF_TILE_WIDTH, (element.x + element.y) * _this.HALF_TILE_HEIGHT);
        };
        _this.sortElements = function () {
            _this.m_elements
                .sort(function (a, b) {
                return _this.getElementDepth(a) - _this.getElementDepth(b);
            })
                .forEach(function (e) {
                _this.m_container.addChild(e.sprite);
            });
        };
        _this.getElementDepth = function (element) {
            return (element.x + element.y) + element.offset;
        };
        _this.m_container.position.set(300, 100);
        _this.m_container.scale.set(1);
        return _this;
    }
    RBoardIso.prototype.addElement = function (element) {
        _super.prototype.addElement.call(this, element);
        this.positionElement(element);
    };
    return RBoardIso;
}(RBoard_1.RBoard));
exports.RBoardIso = RBoardIso;
