"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = (function () {
    function Scene() {
    }
    Scene.prototype.addElement = function (element) {
        this.m_elements.push(element);
    };
    Scene.prototype.getElements = function () {
        return this.m_elements;
    };
    Scene.prototype.getElement = function (id) {
        for (var i = 0; i < this.m_elements.length; i++) {
            if (this.m_elements[i].id === id) {
                return this.m_elements[i];
            }
        }
        return null;
    };
    return Scene;
}());
exports.Scene = Scene;
