var i;
var a = cc._decorator;
var s = a.ccclass;
var c = a.property;
var l = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nBg = null;
        e.nCenterView = null;
        e.lPoint = null;
        e.lDesc = null;
        e.pointStr = "";
        e.isShow = !1;
        e.isLock = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.show = function (t, e, n, i) {
        var o = this;
        if (void 0 === t) {
            t = "玩命加载中";
        }
        if (void 0 === e) {
            e = 120;
        }
        if (void 0 === n) {
            n = null;
        }
        if (void 0 === i) {
            i = !1;
        }
        if (this.isShow || this.isLock) {
            //
        } else {
            this.isLock = i;
            this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
            this.nCenterView.active = !1;
            this.nBg.opacity = 0;
            this.lDesc.string = t;
            this.pointStr = "";
            this.lPoint.string = this.pointStr;
            this.unschedule(this.pointLoad);
            cc.Tween.stopAllByTarget(this.nBg);
            this.node.active = !0;
            this.isShow = !0;
            cc.tween(this.nBg)
                .to(0.3, {
                    opacity: e
                })
                .call(function () {
                    o.nCenterView.active = !0;
                    if (n) {
                        n();
                    }
                })
                .start();
            this.schedule(this.pointLoad, 0.2);
        }
    };
    e.prototype.hide = function (t, e) {
        var n = this;
        if (void 0 === t) {
            t = null;
        }
        if (void 0 === e) {
            e = !1;
        }
        if (this.isShow) {
            if (this.isLock && !e) {
                //
            } else {
                if (e) {
                    this.isLock = !1;
                }
                this.isShow = !1;
                cc.Tween.stopAllByTarget(this.nBg);
                cc.tween(this.nBg)
                    .delay(0.1)
                    .call(function () {
                        n.unschedule(n.pointLoad);
                        n.nCenterView.active = !1;
                    })
                    .to(0.1, {
                        opacity: 0
                    })
                    .call(function () {
                        if (t) {
                            t();
                        }
                        n.node.active = !1;
                    })
                    .start();
            }
        }
    };
    e.prototype.pointLoad = function () {
        if (this.pointStr.length >= 3) {
            this.pointStr = "";
        } else {
            this.pointStr += ".";
        }
        this.lPoint.string = this.pointStr;
    };
    __decorate([c(cc.Node)], e.prototype, "nBg", void 0);
    __decorate([c(cc.Node)], e.prototype, "nCenterView", void 0);
    __decorate([c(cc.Label)], e.prototype, "lPoint", void 0);
    __decorate([c(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([s], e);
})(cc.Component);
exports.default = l;
