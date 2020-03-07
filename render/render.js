"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RBoardIso_1 = require("./board/RBoardIso");
var RTileIso_1 = require("./board/RTileIso");
var RenderMode;
(function (RenderMode) {
    RenderMode[RenderMode["ISOMETRIC"] = 0] = "ISOMETRIC";
})(RenderMode = exports.RenderMode || (exports.RenderMode = {}));
function CreateBoard(config) {
    switch (config.mode) {
        case RenderMode.ISOMETRIC: return new RBoardIso_1.RBoardIso(config.pixi_app);
        default: return new RBoardIso_1.RBoardIso(config.pixi_app);
    }
}
exports.CreateBoard = CreateBoard;
function CreateTile(x, y, config) {
    switch (config.mode) {
        case RenderMode.ISOMETRIC: return new RTileIso_1.RTileIso(x, y);
        default: return new RTileIso_1.RTileIso(x, y);
    }
}
exports.CreateTile = CreateTile;
