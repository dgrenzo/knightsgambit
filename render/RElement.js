"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RElement = (function () {
    function RElement(x, y) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.addToContainer = function (container) {
            container.addChild(_this.m_sprite);
        };
    }
    RElement.prototype.setPosition = function (x, y) {
        this.m_sprite.position.set(x, y);
    };
    return RElement;
}());
exports.RElement = RElement;
