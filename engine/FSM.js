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
var FSMState = (function () {
    function FSMState() {
    }
    FSMState.prototype.setFSM = function (fsm) {
        this.m_fsm = fsm;
    };
    return FSMState;
}());
exports.FSMState = FSMState;
var FSMStateSimple = (function (_super) {
    __extends(FSMStateSimple, _super);
    function FSMStateSimple(callbacks) {
        var _this = _super.call(this) || this;
        _this.enter = callbacks.enter ? callbacks.enter : function () { };
        _this.exit = callbacks.exit ? callbacks.exit : function () { };
        _this.update = callbacks.update ? callbacks.update : function (deltaTime) { };
        return _this;
    }
    return FSMStateSimple;
}(FSMState));
exports.FSMStateSimple = FSMStateSimple;
var FSM = (function () {
    function FSM() {
        var _this = this;
        this.stateObjects = new Map();
        this.registerState = function (key, stateObject) {
            stateObject.setFSM(_this);
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
