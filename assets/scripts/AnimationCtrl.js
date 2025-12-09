var i;
var $resLoader = require("./ResLoader");
var l = cc._decorator;
var u = l.ccclass;
var p = l.property;
var h = l.menu;
var f = l.requireComponent;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.animation = null;
        e._loadCompleteCallback = null;
        e._defaultSpd = 0.2;
        e._curAnimName = "";
        e._onceFrameEvent = null;
        return e;
    }
    __extends(e, t);
    e.prototype.resetInEditor = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    e.prototype.loadAnimation = function (t, e, n) {
        if (void 0 === e) {
            e = null;
        }
        if (void 0 === n) {
            n = 0.6;
        }
        return __awaiter(this, void 0, Promise, function () {
            var i = this;
            return __generator(this, function () {
                this._defaultSpd = n;
                this.init();
                return [
                    2,
                    new Promise(function (n) {
                        i._loadCompleteCallback = e;
                        for (var o = 0, r = 0; r < t.length; r++) {
                            i.loadAnimationClip(t[r], function (e) {
                                if (i.animation) {
                                    o++;
                                    i.animation.addClip(e);
                                    if (o >= t.length) {
                                        i.unscheduleAllCallbacks();
                                        if (i._loadCompleteCallback) {
                                            i._loadCompleteCallback();
                                        }
                                        n();
                                    }
                                }
                            });
                        }
                    })
                ];
            });
        });
    };
    e.prototype.loadAtlasAnimation = function (t, e, n, i, o, r) {
        if (void 0 === i) {
            i = null;
        }
        if (void 0 === o) {
            o = 0.6;
        }
        return __awaiter(this, void 0, Promise, function () {
            var a = this;
            return __generator(this, function () {
                if (this.node && this.node.isValid) {
                    return [
                        2,
                        new Promise(function (s) {
                            $resLoader.ResLoader.loadAsset({
                                bundleName: t,
                                path: e,
                                type: cc.SpriteAtlas
                            })
                                .then(function (t) {
                                    n.forEach(function (e) {
                                        e.atlas = t;
                                    });
                                    a.loadAnimation(n, i, o)
                                        .then(function () {
                                            s();
                                        })
                                        .catch(function () {
                                            s();
                                            if (r) {
                                                r();
                                            }
                                        });
                                })
                                .catch(function () {
                                    s();
                                    if (r) {
                                        r();
                                    }
                                });
                        })
                    ];
                } else {
                    return [2, Promise.resolve()];
                }
            });
        });
    };
    e.prototype.loadAnimationClip = function (t, e) {
        for (
            var n = this,
                i = [],
                o = 0,
                r = function (i) {
                    var o = cc.AnimationClip.createWithSpriteFrames(i, 30);
                    o.name = t.actionName;
                    o.speed = n._defaultSpd;
                    if (t.frameEventIndexs) {
                        t.frameEventIndexs.forEach(function (e) {
                            o.events.push({
                                frame: (e / t.frameNum) * o.duration,
                                func: "onFrameEvent",
                                params: [t.actionName, e.toString()]
                            });
                        });
                    }
                    e(o);
                },
                a = function (e) {
                    var n = null;
                    if (t.repairNum) {
                        n = ("00" + e).slice(-2);
                    } else {
                        n = e;
                    }
                    if (t.atlas) {
                        i[e] = t.atlas.getSpriteFrame("" + t.spriteFrameNameHead + n);
                        if (++o >= t.frameNum) {
                            r(i);
                        }
                        return "continue";
                    }
                    $resLoader.ResLoader.loadAsset({
                        bundleName: t.bundleName,
                        path: t.path + "/" + t.spriteFrameNameHead + n,
                        type: cc.SpriteFrame
                    })
                        .then(function (n) {
                            i[e] = n;
                            if (++o >= t.frameNum) {
                                r(i);
                            }
                        })
                        .catch(function () {
                            if (++o >= t.frameNum) {
                                r(i);
                            }
                        });
                },
                s = 0;
            s < t.frameNum;
            ++s
        ) {
            a(s);
        }
    };
    e.prototype.init = function () {
        this.clearAnimaion();
        this.clearAnimEvent();
    };
    e.prototype.playAnim = function (t, e, n, i, o) {
        var r = this;
        if (void 0 === e) {
            e = !1;
        }
        if (void 0 === n) {
            n = null;
        }
        if (void 0 === i) {
            i = null;
        }
        if (void 0 === o) {
            o = 1;
        }
        if (this._curAnimName != t) {
            if (n) {
                this.animation.off(cc.Animation.EventType.FINISHED);
                this.animation.once(
                    cc.Animation.EventType.FINISHED,
                    function () {
                        r._curAnimName = "";
                        if (n) {
                            n();
                        }
                    },
                    this
                );
            }
            var a = this.animation.getClips().find(function (e) {
                return e.name == t;
            });
            if (a) {
                e && (a.wrapMode = cc.WrapMode.Loop);
                this._onceFrameEvent = i;
                this._curAnimName = t;
                this.animation.stop();
                this.animation.play(t, 0).speed = this._defaultSpd * o;
            } else {
                cc.error("没有这个动画", t);
            }
        }
    };
    e.prototype.clearAnimEvent = function () {
        this._curAnimName = "";
        this.animation.onFrameEvent = null;
        this.animation.off(cc.Animation.EventType.FINISHED);
    };
    e.prototype.clearAnimaion = function () {
        var t = this;
        this.animation.stop();
        this.animation.getClips().forEach(function (e) {
            return t.animation.removeClip(e);
        });
    };
    e.prototype.onFrameEvent = function (t, e) {
        if (this._onceFrameEvent) {
            this._onceFrameEvent(Number(e));
        }
    };
    __decorate([p(cc.Animation)], e.prototype, "animation", void 0);
    return __decorate([u, h("帧动画组件/AnimationCtrl"), f(cc.Animation)], e);
})(cc.Component);
exports.default = d;
