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
var FSM_1 = require("../../../engine/FSM");
var event_1 = require("../../../engine/listener/event");
var SetupState = (function (_super) {
    __extends(SetupState, _super);
    function SetupState(opts) {
        var _this = _super.call(this) || this;
        _this.opts = opts;
        _this.m_eventManager = new event_1.EventManager();
        _this.enter = function () {
            _this.loader.load(_this.onLoadComplete);
        };
        _this.onLoadComplete = function (loader, resources) {
            var board = _this.opts.board;
            var renderer = _this.opts.renderer;
            var path = _this.opts.board_data_path;
            var board_config = resources[path].data;
            board.init(board_config);
            renderer.initializeScene(board);
            _this.m_eventManager.emit("COMPLETE", null);
        };
        _this.update = function (deltaTime) {
        };
        _this.exit = function () {
            _this.loader.destroy();
        };
        var loader = _this.loader = new PIXI.Loader();
        loader.add(opts.board_data_path);
        return _this;
    }
    SetupState.prototype.onComplete = function (cb) {
        this.m_eventManager.add("COMPLETE", cb);
    };
    return SetupState;
}(FSM_1.FSMState));
exports.SetupState = SetupState;
