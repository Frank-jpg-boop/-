var i;
var $cfg = require("./Cfg");
var $spAnimCtrl = require("./SpAnimCtrl");
var $stageDataProxy = require("./StageDataProxy");
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nBottom = null;
        e.spAnimCtrl = null;
        e.nDayView = null;
        e.nBg = null;
        e.lDesc = null;
        e.isShow = !1;
        e.isLock = !1;
        e._progress = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this.spAnimCtrl.registerFrameEvent(this.onOpenAnimEvent, this);
    };
    e.prototype.onDestroy = function () {
        this.spAnimCtrl.unregisterFrameEvent(this);
    };
    e.prototype.show = function (t, e, n, i, o, r) {
        var s = this;
        if (void 0 === t) {
            t = "";
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
        if (void 0 === o) {
            o = !1;
        }
        if (void 0 === r) {
            r = !1;
        }
        if (!this.isShow && !this.isLock) {
            var l = $cfg.default.instance.dataCons.getById(161).val.split("|");
            this.lDesc.string = l[$randomUtil.RandomUtil.randomInt(0, l.length)];
            this.isLock = i;
            this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
            this.nBg.opacity = e;
            this.nBottom.active = !1;
            this.nDayView.active = !0;
            this.nDayView.getChildByName("Day").getComponent(cc.Label).string =
                $stageDataProxy.stageDataProxy.day.toString();
            this.node.active = !0;
            this.spAnimCtrl.clearAnim();
            this.spAnimCtrl.playAnim("loop", 1, !1, function () {
                if (r) {
                    s.scheduleOnce(function () {
                        s.spAnimCtrl.playAnim("turn the page", 1, !1, function () {
                            s.nBottom.active = o;
                            if (n) {
                                n();
                            }
                        });
                    });
                } else {
                    s.nBottom.active = o;
                    n && n();
                }
            });
            this.isShow = !0;
            this._progress = 0;
            this.updateProgress();
        }
    };
    e.prototype.onOpenAnimEvent = function (t, e) {
        if ("disappear" != e) {
            if ("appear" == e) {
                return (
                    (this.nDayView.getChildByName("Day").getComponent(cc.Label).string = (
                        $stageDataProxy.stageDataProxy.day - 1
                    ).toString()),
                    void (this.nDayView.active = !0)
                );
            } else {
                return void 0;
            }
        }
        this.nDayView.active = !1;
    };
    e.prototype.update = function (t) {
        if (this.isShow && this.nBottom.active && this._progress < 1) {
            this._progress += t;
            if (this._progress > 1) {
                this._progress = 1;
            }
            this.updateProgress();
        }
    };
    e.prototype.updateProgress = function () {
        this.nBottom.getChildByName("Progress").getComponent(cc.Label).string =
            "加载中:" + $mathUtil.MathUtil.toFixed(100 * this._progress, 0) + "%";
        this.nBottom.getChildByName("Bar").getChildByName("SpBar").getComponent(cc.Sprite).fillRange = this._progress;
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
                cc.tween(this.node)
                    .to(0.1, {
                        opacity: 0
                    })
                    .call(function () {
                        if (t) {
                            t();
                        }
                        n._progress = 0;
                        n.node.active = !1;
                        n.node.opacity = 255;
                        n.spAnimCtrl.clearAnim();
                    })
                    .start();
            }
        }
    };
    __decorate([f(cc.Node)], e.prototype, "nBottom", void 0);
    __decorate([f($spAnimCtrl.default)], e.prototype, "spAnimCtrl", void 0);
    __decorate([f(cc.Node)], e.prototype, "nDayView", void 0);
    __decorate([f(cc.Node)], e.prototype, "nBg", void 0);
    __decorate([f(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([h], e);
})(cc.Component);
exports.default = d;
