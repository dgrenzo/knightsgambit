"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var assets_1 = require("../assets");
var COLOR = {
    BLACK: 0x393939,
    WHITE: 0xF0F0F0,
};
var Board = (function () {
    function Board() {
        var _this = this;
        this.wiggle = function () {
            if (!_this.m_tiles) {
                return;
            }
            for (var i = 0; i < 8; i++) {
                for (var n = 0; n < 8; n++) {
                    _this.m_tiles[i][n].position.y = (i + n) * 5.5 + Math.sin(Date.now() / 150 + (i + n) / 4) * 3;
                }
            }
        };
        this.m_container = new PIXI.Container();
        this.m_container.scale.set(4);
        this.m_tiles = new Array();
        for (var i = 0; i < 8; i++) {
            this.m_tiles.push(new Array());
            for (var n = 0; n < 8; n++) {
                var color = (n + i) % 2;
                var tile = PIXI.Sprite.from(assets_1.getTileString(color));
                this.m_tiles[i].push(tile);
                tile.position.set((i - n) * 9, (i + n) * 5.5);
                this.m_container.addChild(tile);
            }
        }
    }
    return Board;
}());
exports.Board = Board;
