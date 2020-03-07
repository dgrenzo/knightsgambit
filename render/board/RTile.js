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
var RElement_1 = require("../RElement");
var RTile = (function (_super) {
    __extends(RTile, _super);
    function RTile(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    return RTile;
}(RElement_1.RElement));
exports.RTile = RTile;
