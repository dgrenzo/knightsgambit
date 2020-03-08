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
var PIXI = require("pixi.js");
var assets_1 = require("../../assets");
var RElement_1 = require("../RElement");
var RPiece = (function (_super) {
    __extends(RPiece, _super);
    function RPiece(info) {
        var _this = _super.call(this, info.pos[0], info.pos[1]) || this;
        _this.m_sprite = PIXI.Sprite.from(assets_1.toAssetString(info.faction, info.type));
        _this.m_sprite.scale.set(0.75);
        _this.m_sprite.anchor.set(0.5, 1);
        return _this;
    }
    return RPiece;
}(RElement_1.RElement));
exports.RPiece = RPiece;
