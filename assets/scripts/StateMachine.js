exports.StateMachine = void 0;
var i = (function () {
    function t(t) {
        this._elapsedTimeInState = 0;
        this._states = new Map();
        if (t) {
            this.addState(t.stateType, t);
            this._currentState = t;
            this._currentState.begin();
        }
    }
    Object.defineProperty(t.prototype, "currentState", {
        get: function () {
            return this._currentState;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "elapsedTimeInState", {
        get: function () {
            return this._elapsedTimeInState;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "previousState", {
        get: function () {
            return this._previousState;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.addState = function (t, e) {
        this._states.set(t, e);
    };
    t.prototype.update = function (t) {
        this._elapsedTimeInState += t;
        this._currentState.reason();
        this._currentState.update(t);
    };
    t.prototype.getState = function (t) {
        if (this._states.has(t)) {
            return this._states.get(t);
        } else {
            return console.error("状态" + t + "不存在。你是不是在调用addState的时候忘记添加了?"), null;
        }
    };
    t.prototype.changeState = function (t) {
        for (var e, n = [], i = 1; i < arguments.length; i++) {
            n[i - 1] = arguments[i];
        }
        var o = this;
        if (this._currentState && o._currentState.stateType == t) {
            return o._currentState;
        }
        if (o.currentState) {
            o._currentState.end();
        }
        if (!o._states.has(t)) {
            console.error("状态" + t + "不存在。你是不是在调用addState的时候忘记添加了?");
            return null;
        }
        o._elapsedTimeInState = 0;
        o._previousState = o._currentState;
        var r = o._states.get(t);
        if (r) {
            o._currentState = r;
        }
        (e = o._currentState).begin.apply(e, n);
        if (null != o.onStateChanged) {
            o.onStateChanged();
        }
        return o._currentState;
    };
    return t;
})();
exports.StateMachine = i;
