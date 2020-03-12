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
var Entity_1 = require("../../engine/scene/Entity");
var ChessBoard_1 = require("./ChessBoard");
var assets_1 = require("../../assets");
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.depth_offset = -1;
        _this.getAssetInfo = function () {
            return {
                name: assets_1.factionToString(ChessBoard_1.GetTileColor(_this.x, _this.y)) + '_tile.png',
                offset_x: 0,
                offset_y: 0,
            };
        };
        return _this;
    }
    return Tile;
}(Entity_1.Entity));
exports.Tile = Tile;
