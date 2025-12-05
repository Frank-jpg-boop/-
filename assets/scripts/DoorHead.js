var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lValue = null;
        e._headOffsetY = 0;
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
    e.prototype.init = function (t) {
        this._headOffsetY = t;
        this.node.active = !1;
    };
    e.prototype.updateHp = function (t, e) {
        var n = this;
        if (void 0 === e) {
            e = !1;
        }
        this.lValue.string = t.toString();
        if (e) {
            //
        } else {
            this.node.active = !0;
            this.unscheduleAllCallbacks();
            this.scheduleOnce(function () {
                n.node.active = !1;
            }, 2);
        }
    };
    __decorate([c(cc.Label)], e.prototype, "lValue", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
