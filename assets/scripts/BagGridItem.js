var i;
exports.EBagEquipItemState = void 0;
var a;
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
!(function (t) {
    t[(t.UNLOCK = 1)] = "UNLOCK";
    t[(t.WAIT_UNLOCK = 2)] = "WAIT_UNLOCK";
    t[(t.LOCK = 3)] = "LOCK";
})((a = exports.EBagEquipItemState || (exports.EBagEquipItemState = {})));
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nView = null;
        e.nLock = null;
        e.nQuality = null;
        e._bIsValid = !0;
        e._quality = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "bIsValid", {
        get: function () {
            return this._bIsValid;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isShow", {
        get: function () {
            return this.nView.active;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.setValid = function (t) {
        this._bIsValid = t;
    };
    e.prototype.setState = function (t) {
        this.nView.active = t !== a.LOCK;
        this.nLock.active = t === a.WAIT_UNLOCK;
    };
    e.prototype.setQuality = function (t, e) {
        if (void 0 === e) {
            e = !0;
        }
        this._quality = t;
        if (e) {
            this.resetQuality();
        }
    };
    e.prototype.resetQuality = function () {
        this.setHeightQualityActive(0 != this._quality, this._quality);
    };
    e.prototype.setHeightQualityActive = function (t, e) {
        this.nQuality.active = t;
        if (t) {
            this.nQuality.children.forEach(function (t, n) {
                t.active = n == e - 1;
            });
        }
    };
    __decorate([l(cc.Node)], e.prototype, "nView", void 0);
    __decorate([l(cc.Node)], e.prototype, "nLock", void 0);
    __decorate([l(cc.Node)], e.prototype, "nQuality", void 0);
    return __decorate([c], e);
})(cc.Component);
exports.default = u;
