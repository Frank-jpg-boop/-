var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spHp = null;
        e.nBuffView = null;
        e._headOffsetY = 0;
        e._isFixedShow = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "headOffsetY", {
        get: function () {
            return this._headOffsetY;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.init = function (t, e) {
        if (void 0 === t) {
            t = 0;
        }
        if (void 0 === e) {
            e = !1;
        }
        this._headOffsetY = t;
        this.spHp.fillRange = 1;
        this._isFixedShow = e;
        this.node.active = this._isFixedShow;
        this.onInit();
    };
    e.prototype.onInit = function () {};
    e.prototype.updateHP = function (t, e) {
        var n = this;
        var i = t / e;
        if (1 != i) {
            this.node.active = this._isFixedShow || i < 1;
        }
        cc.Tween.stopAllByTarget(this.spHp);
        var o = 0.3 * Math.abs(i - this.spHp.fillRange);
        cc.tween(this.spHp)
            .to(
                o,
                {
                    fillRange: i
                },
                {
                    easing: "cubicIn"
                }
            )
            .call(function () {
                n.node.active = n._isFixedShow || (i > 0 && i < 1);
            })
            .start();
    };
    e.prototype.updateShield = function () {};
    e.prototype.show = function () {
        this.node.active = !0;
    };
    e.prototype.hide = function () {
        this._isFixedShow = !1;
        this.node.active = !1;
    };
    __decorate([c(cc.Sprite)], e.prototype, "spHp", void 0);
    __decorate([c(cc.Node)], e.prototype, "nBuffView", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
