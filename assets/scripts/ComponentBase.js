var i;
exports.ComponentBase = void 0;
var $util = require("./Util");
var s = cc._decorator;
var c = s.ccclass;
var l =
    (s.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._assets = [];
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "assets", {
            get: function () {
                return this._assets;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {};
        e.prototype.start = function () {};
        e.prototype.onEnable = function () {};
        e.prototype.onDisable = function () {};
        e.prototype.onDestroy = function () {
            this.unscheduleAllCallbacks();
        };
        e.prototype.addRef = function (t) {
            var e;
            if (null != t && !this._assets.includes(t)) {
                if (null === (e = this.node) || void 0 === e ? void 0 : e.isValid) {
                    return t.addRef(), void this._assets.push(t);
                } else {
                    return void (0 === t.refCount && cc.assetManager.releaseAsset(t));
                }
            }
        };
        e.prototype.decRef = function (t) {
            var e = this._assets.indexOf(t);
            if (e >= 0) {
                if (t.refCount > 0) {
                    t.decRef();
                }
                this._assets.splice(e, 1);
            }
        };
        e.prototype.clearAssets = function () {
            this._assets.forEach(function (t) {
                t.decRef();
            });
            this._assets = [];
        };
        e.prototype.getAsset = function (t, e) {
            for (var n = 0; n < this._assets.length; ++n) {
                if (
                    this._assets[n].name == t &&
                    $util.default.getClassName(e) === $util.default.getClassName(this._assets[n])
                ) {
                    return this._assets[n];
                }
            }
            return null;
        };
        return __decorate([c], e);
    })(cc.Component));
exports.ComponentBase = l;
