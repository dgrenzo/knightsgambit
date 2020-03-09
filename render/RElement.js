"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RElement = (function () {
    function RElement(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(RElement.prototype, "sprite", {
        get: function () {
            return this.m_sprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RElement.prototype, "offset", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    RElement.prototype.setPosition = function (x, y) {
        this.m_sprite.position.set(x, y);
    };
    return RElement;
}());
exports.RElement = RElement;
