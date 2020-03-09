"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var REntity_1 = require("./REntity");
var SceneRenderer = (function () {
    function SceneRenderer() {
        var _this = this;
        this.s_onEntityClicked = [];
        this.registerClickListener = function (listener) {
            _this.s_onEntityClicked.push(listener);
        };
        this.initializeScene = function (scene) {
            _this.m_renderables = new Map();
            _this.m_container.removeChildren();
            scene.getElements().forEach(function (element) {
                var renderable = _this.addEntity(element);
                renderable.sprite.on('pointerdown', function () {
                    _this.onClicked(renderable.id);
                });
            });
        };
        this.removeEntity = function (entity) {
            var renderable = _this.m_renderables.get(entity.id);
            if (renderable) {
                _this.m_renderables.delete(entity.id);
            }
            return renderable;
        };
        this.addEntity = function (entity) {
            _this.m_renderables.set(entity.id, new REntity_1.REntity(entity.GetInfo()));
            return _this.m_renderables.get(entity.id);
        };
        this.onClicked = function (id) {
            _this.s_onEntityClicked.forEach(function (fn) {
                fn(id);
            });
        };
        this.m_container = new PIXI.Container();
        this.m_container.on('pointerdown', function () {
        });
    }
    Object.defineProperty(SceneRenderer.prototype, "stage", {
        get: function () {
            return this.m_container;
        },
        enumerable: true,
        configurable: true
    });
    SceneRenderer.prototype.renderScene = function (scene) {
        var _this = this;
        scene.getElements().forEach(function (element) {
            _this.positionElement(_this.m_renderables.get(element.id), element.x, element.y);
        });
        this.sortElements(scene.getElements());
    };
    return SceneRenderer;
}());
exports.SceneRenderer = SceneRenderer;
