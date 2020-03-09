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
var ChessBoard_1 = require("../../game/board/ChessBoard");
var RTile_1 = require("./RTile");
var main_1 = require("../../main");
function getTileString(x, y) {
    return 'assets/images/isometric/' + assets_1.factionToString(ChessBoard_1.getTileColor(x, y)) + '_tile.png';
}
var RTileIso = (function (_super) {
    __extends(RTileIso, _super);
    function RTileIso(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.x = x;
        _this.y = y;
        _this.m_sprite = new PIXI.Sprite();
        var tile = PIXI.Sprite.from(getTileString(x, y));
        tile.position.set(-32, -18);
        _this.m_sprite.addChild(tile);
        if (main_1.DEBUG) {
            var label = new PIXI.Text(x + ',' + y, {
                fill: 0xFF0000,
                fontSize: 12,
            });
            label.anchor.set(0.5, 1);
            label.scale.set(0.35);
            _this.m_sprite.addChild(label);
        }
        return _this;
    }
    return RTileIso;
}(RTile_1.RTile));
exports.RTileIso = RTileIso;
