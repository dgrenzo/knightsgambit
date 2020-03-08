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
var RPiece_1 = require("../../render/pieces/RPiece");
var GameElement_1 = require("../GameElement");
var ChessPiece = (function (_super) {
    __extends(ChessPiece, _super);
    function ChessPiece(info) {
        var _this = _super.call(this) || this;
        _this._render = new RPiece_1.RPiece(info);
        return _this;
    }
    Object.defineProperty(ChessPiece.prototype, "render", {
        get: function () {
            return this._render;
        },
        enumerable: true,
        configurable: true
    });
    return ChessPiece;
}(GameElement_1.GameElement));
exports.ChessPiece = ChessPiece;
