"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var assets_1 = require("../../../assets");
var REntity = (function () {
    function REntity(info) {
        var _this = this;
        this.offsetY = 0;
        this.setFilter = function (filter) {
            if (filter.highlight) {
                _this.sprite.alpha = 0.5;
            }
            else {
                _this.sprite.alpha = 1;
            }
        };
        this.m_sprite = new PIXI.Sprite();
        this.m_sprite.interactive = this.m_sprite.buttonMode = true;
        this.id = info.id;
        var asset = info.asset;
        var image = PIXI.Sprite.from(assets_1.getAssetURL(asset.name));
        image.position.x = asset.offset_x ? asset.offset_x : 0;
        image.position.y = asset.offset_y ? asset.offset_y : 0;
        this.m_sprite.addChild(image);
    }
    Object.defineProperty(REntity.prototype, "sprite", {
        get: function () {
            return this.m_sprite;
        },
        enumerable: true,
        configurable: true
    });
    REntity.prototype.setPosition = function (x, y) {
        this.m_sprite.position.set(x, y + this.offsetY);
    };
    return REntity;
}());
exports.REntity = REntity;
