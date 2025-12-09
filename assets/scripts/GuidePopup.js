var i;
var $audioUtil = require("./AudioUtil");
var $hollowOut = require("./HollowOut");
var $touchBlocker = require("./TouchBlocker");
var $componentBase = require("./ComponentBase");
var $animUtils = require("./AnimUtils");
var $nodeUtil = require("./NodeUtil");
var d = cc._decorator;
var m = d.ccclass;
var y = d.property;
var _ = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.hollowOut = null;
        e.blocker = null;
        e.nFinger = null;
        e.nDialog = null;
        e.lDialog = null;
        e.nTouchLock = null;
        e._isTypewriter = !1;
        e._typewriterDesc = "";
        e._descs = [];
        e._data = null;
        return e;
    }
    __extends(e, t);
    e.prototype.open = function (t) {
        var e = this;
        this._data = t;
        this.blocker.node.active = !0;
        this.nTouchLock.active = !0;
        this.nFinger.active = !1;
        this._isTypewriter = !1;
        this.unscheduleAllCallbacks();
        var n = null;
        if (t.delay) {
            n = t.delay;
        } else {
            n = 0;
        }
        this.scheduleOnce(function () {
            var t;
            e.node.active = !0;
            if (null === (t = e.node.getComponent(cc.Widget)) || void 0 === t) {
                //
            } else {
                t.updateAlignment();
            }
            e.initView();
        }, n);
    };
    e.prototype.close = function () {
        this.node.active = !1;
    };
    e.prototype.initView = function () {
        var t = this;
        this.nDialog.active = !1;
        this.lookAt(
            this._data.target,
            1 == this._data.cfg.force,
            1 == this._data.cfg.forcedClick,
            this._data.onClickTarget,
            this._data.eventCaller
        ).then(function () {
            if ("" != t._data.cfg.text) {
                t._descs = t._data.cfg.text.split("|next|");
                t.showDialog(t._descs.shift());
            } else {
                t.nTouchLock.active = !1;
            }
            if (t._data.target) {
                t.nFinger.active = t._data.showFinger;
                t.nFinger.active &&
                    (t._data.isSlide
                        ? t.slideAt(t._data.slideStartWorldPos, t._data.slideEndWorldPos)
                        : t.fingerAt(t._data.target, t._data.fingerOffsetPos));
            } else {
                t.nFinger.active = !1;
            }
        });
    };
    e.prototype.lookAt = function (t, e, n, i, o) {
        return __awaiter(this, void 0, Promise, function () {
            var r = this;
            return __generator(this, function () {
                return [
                    2,
                    new Promise(function (a, s) {
                        var c;
                        r.hollowOut.setNodeSize();
                        if (null == t) {
                            r.hollowOut.reset();
                            r.blocker.setTarget(null);
                            r.blocker.blockAll();
                            r.blocker.setClickTargetEvent(i, o);
                            r.blocker.setClickScreenEvent(r._data.onClickScreen, r._data.eventCaller);
                            a();
                        } else {
                            if (t && (!t.activeInHierarchy || !t.isValid)) {
                                r.close();
                                return void s();
                            }
                            if (null === (c = t.getComponent(cc.Widget)) || void 0 === c) {
                                //
                            } else {
                                c.updateAlignment();
                            }
                            var l = $nodeUtil.default.nodeParentChangeLocalPos(t, r.node);
                            r.blocker.setTarget(t);
                            r.blocker.setClickTargetEvent(i, o);
                            r.blocker.setClickScreenEvent(r._data.onClickScreen, r._data.eventCaller);
                            if (e) {
                                r.hollowOut.rectTo(0.3, l, t.width, t.height).then(function () {
                                    if (n) {
                                        //
                                    } else {
                                        r.blocker.passAll();
                                    }
                                    a();
                                });
                            } else {
                                r.blocker.passAll();
                                a();
                            }
                        }
                    })
                ];
            });
        });
    };
    e.prototype.fingerAt = function (t, e) {
        cc.Tween.stopAllByTarget(this.nFinger);
        var n = $nodeUtil.default.nodeParentChangeLocalPos(t, this.node);
        if (e) {
            n.addSelf(e);
        }
        this.nFinger.setPosition(n);
    };
    e.prototype.slideAt = function (t, e) {
        var n = $nodeUtil.default.nodeLocalPos(this.node, t);
        var i = $nodeUtil.default.nodeLocalPos(this.node, e);
        var o = cc.Vec2.distance(n, i) / 500;
        this.nFinger.setPosition(n);
        var r = cc
            .tween()
            .to(0, {
                x: n.x,
                y: n.y
            })
            .to(o, {
                x: i.x,
                y: i.y
            })
            .delay(1);
        cc.tween(this.nFinger).repeatForever(r).start();
    };
    e.prototype.showDialog = function (t, e) {
        var n = this;
        if (void 0 === e) {
            e = !0;
        }
        this.lDialog.string = "";
        this.nDialog.active = !0;
        var i = this.nDialog.getChildByName("Down");
        var o = function () {
            var e = 0;
            var o = t.length;
            var r = "";
            if (o > 0) {
                n._isTypewriter = !0;
            }
            n.schedule(
                function () {
                    r += t[e];
                    e++;
                    n.lDialog.string = r;
                    if (e >= o) {
                        n._isTypewriter = !1;
                        i.active = !0;
                        $animUtils.AnimUtil.floatAnim(i, 0.3, -5);
                        if (n._descs.length <= 0) {
                            n.nTouchLock.active = !1;
                        }
                    }
                },
                0.1,
                o - 1
            );
        };
        this._typewriterDesc = t;
        if (e) {
            var r = null;
            if (this._data.dialogOffsetPos) {
                r = this._data.dialogOffsetPos;
            } else {
                r = cc.v2();
            }
            this.nDialog.y = r.y;
            this.nDialog.x = r.x - 1e3;
            i.y = -63;
            cc.tween(this.nDialog)
                .to(0.2, {
                    x: r.x
                })
                .call(function () {
                    o();
                })
                .start();
        } else {
            o();
        }
        i.active = !1;
    };
    e.prototype.onClickBtnClickTouch = function () {
        if (this._isTypewriter) {
            this._isTypewriter = !1;
            this.unscheduleAllCallbacks();
            this.lDialog.string = this._typewriterDesc;
            var t = this.nDialog.getChildByName("Down");
            t.active = !0;
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Click");
            $animUtils.AnimUtil.floatAnim(t, 0.3, -5);
            if (this._descs.length <= 0) {
                this.nTouchLock.active = !1;
            }
        } else {
            if (this._descs.length > 0) {
                $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Click");
                this.showDialog(this._descs.shift(), !1);
            }
        }
    };
    __decorate([y($hollowOut.default)], e.prototype, "hollowOut", void 0);
    __decorate([y($touchBlocker.default)], e.prototype, "blocker", void 0);
    __decorate([y(cc.Node)], e.prototype, "nFinger", void 0);
    __decorate([y(cc.Node)], e.prototype, "nDialog", void 0);
    __decorate([y(cc.Label)], e.prototype, "lDialog", void 0);
    __decorate([y(cc.Node)], e.prototype, "nTouchLock", void 0);
    return __decorate([m], e);
})($componentBase.ComponentBase);
exports.default = _;
