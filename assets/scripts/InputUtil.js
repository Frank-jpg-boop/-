var i = (function () {
    function t() {
        this.pressMap = null;
        this.justPressMap = null;
        this.justReleaseMap = null;
        this.inputCacheMap = null;
        this.resetor = null;
        this.ignoreInput = !1;
        this.pressMap = new Map();
        this.justPressMap = new Map();
        this.justReleaseMap = new Map();
        this.inputCacheMap = new Map();
        this.init();
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (t._instance) {
                //
            } else {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "IgnoreInput", {
        get: function () {
            return this.ignoreInput;
        },
        set: function (t) {
            this.ignoreInput = t;
            this.clear();
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function () {
        var t = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, t.onKeyDown, t);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, t.onKeyUp, t);
        if (t.resetor) {
            //
        } else {
            t.resetor = setInterval(function () {
                t.resetInputCache();
            }, 500);
        }
    };
    t.prototype.onKeyDown = function (t) {
        var e = this;
        if (!e.ignoreInput) {
            var n = t.keyCode;
            e.pressMap.set(n, !0);
            e.justPressMap.set(n, !0);
            e.inputCacheMap.set(n, !0);
            e.justReleaseMap.set(n, !1);
        }
    };
    t.prototype.onKeyUp = function (t) {
        if (!this.ignoreInput) {
            var e = t.keyCode;
            this.pressMap.set(e, !1);
            this.justPressMap.set(e, !1);
            this.justReleaseMap.set(e, !0);
        }
    };
    t.prototype.isKeyPressed = function (t) {
        return this.pressMap.get(t);
    };
    t.prototype.isKeyJustPressed = function (t) {
        var e = this.justPressMap.get(t);
        if (e) {
            this.justPressMap.set(t, !1);
        }
        return e;
    };
    t.prototype.isKeyJustReleased = function (t) {
        var e = this.justReleaseMap.get(t);
        if (e) {
            this.justReleaseMap.set(t, !1);
        }
        return e;
    };
    t.prototype.isKeyInCache = function (t) {
        return this.inputCacheMap.get(t);
    };
    t.prototype.resetInputCache = function () {
        var t = this;
        t.inputCacheMap.forEach(function (e, n) {
            t.inputCacheMap.set(n, !1);
        });
    };
    t.prototype.clear = function () {
        this.pressMap.clear();
        this.justPressMap.clear();
        this.justReleaseMap.clear();
    };
    return t;
})();
exports.default = i;
