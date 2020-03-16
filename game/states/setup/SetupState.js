"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var event_1 = require("../../../engine/listener/event");
var SetupState = (function () {
    function SetupState(opts) {
        var _this = this;
        this.opts = opts;
        this.m_eventManager = new event_1.EventManager();
        this.enter = function () {
            _this.loader.load(_this.onLoadComplete);
        };
        this.onLoadComplete = function (loader, resources) {
            var board = _this.opts.board;
            var renderer = _this.opts.renderer;
            var path = _this.opts.board_data_path;
            var board_config = resources[path].data;
            board.init(board_config);
            renderer.initializeScene(board);
            _this.m_eventManager.emit("COMPLETE", null);
        };
        this.update = function (deltaTime) {
        };
        this.exit = function () {
            _this.loader.destroy();
        };
        var loader = this.loader = new PIXI.Loader();
        loader.add(opts.board_data_path);
    }
    SetupState.prototype.onComplete = function (cb) {
        this.m_eventManager.add("COMPLETE", cb);
    };
    return SetupState;
}());
exports.SetupState = SetupState;
