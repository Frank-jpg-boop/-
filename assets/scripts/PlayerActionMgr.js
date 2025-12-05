exports.PlayerActionMgr = void 0;
var o = (function () {
    function t() {
        this._msg = new Map();
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.registerEvent = function (t, e, n) {
        this._msg.set(t, {
            callback: e,
            caller: n
        });
    };
    t.prototype.unRegisterEvent = function (t) {
        if (this._msg.has(t)) {
            this._msg.delete(t);
        }
    };
    t.prototype.triggerAction = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) {
            e[n - 1] = arguments[n];
        }
        this._msg.forEach(function (n) {
            var o;
            (o = n.callback).call.apply(o, __spreadArrays([n.caller, t], e));
        });
    };
    t._instance = null;
    t.token = "";
    return t;
})();
exports.PlayerActionMgr = o;
