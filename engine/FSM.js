"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FSMState = (function () {
    function FSMState() {
    }
    return FSMState;
}());
exports.FSMState = FSMState;
var FSM = (function () {
    function FSM() {
        var _this = this;
        this.stateObjects = new Map();
        this.registerState = function (key, stateObject) {
            _this.stateObjects.set(key, stateObject);
        };
        this.update = function (deltaTime) {
            if (_this.stateObjects.get(_this._state) && _this.stateObjects.get(_this._state).update) {
                _this.stateObjects.get(_this._state).update(deltaTime);
            }
        };
        this.enterState = function (val) {
            if (_this.stateObjects.get(_this._state) && _this.stateObjects.get(_this._state).exit) {
                _this.stateObjects.get(_this._state).exit();
            }
            _this._state = val;
            if (_this.stateObjects.get(_this._state).enter) {
                _this.stateObjects.get(_this._state).enter();
            }
        };
    }
    Object.defineProperty(FSM.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    return FSM;
}());
exports.FSM = FSM;
