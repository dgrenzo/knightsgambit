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
var SceneRenderer_1 = require("../SceneRenderer");
var TILE_WIDTH = 64;
var TILE_HEIGHT = 32;
var SceneRendererIsometric = (function (_super) {
    __extends(SceneRendererIsometric, _super);
    function SceneRendererIsometric() {
        var _this = _super.call(this) || this;
        _this.TILE_WIDTH = TILE_WIDTH;
        _this.TILE_HEIGHT = TILE_HEIGHT;
        _this.HALF_TILE_WIDTH = TILE_WIDTH / 2;
        _this.HALF_TILE_HEIGHT = TILE_HEIGHT / 2;
        _this.positionElement = function (element, x, y) {
            element.setPosition((x - y) * _this.HALF_TILE_WIDTH, (x + y) * _this.HALF_TILE_HEIGHT);
        };
        _this.sortElements = function (elements) {
            elements
                .sort(function (a, b) {
                return _this.getElementDepth(a) - _this.getElementDepth(b);
            })
                .forEach(function (e) {
                _this.m_container.addChild(_this.m_renderables.get(e.id).sprite);
            });
        };
        _this.getElementDepth = function (element) {
            return (element.x + element.y) + element.GetInfo().depth;
        };
        _this.m_container.position.set(300, 100);
        return _this;
    }
    return SceneRendererIsometric;
}(SceneRenderer_1.SceneRenderer));
exports.SceneRendererIsometric = SceneRendererIsometric;
