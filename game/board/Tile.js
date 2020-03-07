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
var render_1 = require("../../render/render");
var GameElement_1 = require("../GameElement");
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(x, y, config) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this._render = render_1.CreateTile(x, y, config);
        return _this;
    }
    Object.defineProperty(Tile.prototype, "render", {
        get: function () {
            return this._render;
        },
        enumerable: true,
        configurable: true
    });
    return Tile;
}(GameElement_1.GameElement));
exports.Tile = Tile;
