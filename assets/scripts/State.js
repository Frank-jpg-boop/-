exports.State = void 0;
var i = (function () {
    function t(t) {
        this._context = null;
        this._stateType = 0;
        this._context = t;
        this.onInitialized();
    }
    Object.defineProperty(t.prototype, "stateType", {
        get: function () {
            return this._stateType;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.onInitialized = function () {};
    t.prototype.begin = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
    };
    t.prototype.reason = function () {};
    t.prototype.end = function () {};
    return t;
})();
exports.State = i;
