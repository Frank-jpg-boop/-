var i;
exports.PopupBase = exports.AnimType = void 0;
var c;
var $popupManager = require("./PopupManager");
var $eventManager = require("./EventManager");
var $appProxy = require("./AppProxy");
var $componentBase = require("./ComponentBase");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var m = cc._decorator;
var y = m.ccclass;
var _ = m.property;
!(function (t) {
    t[(t.NONE = 0)] = "NONE";
    t[(t.SCALE = 1)] = "SCALE";
    t[(t.FADE = 2)] = "FADE";
    t[(t.CUSTOM = 3)] = "CUSTOM";
    t[(t.SCALE_EASING = 4)] = "SCALE_EASING";
    t[(t.ANIMATION_CLIP = 5)] = "ANIMATION_CLIP";
})((c = exports.AnimType || (exports.AnimType = {})));
var g = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.transBack = !0;
        e.blockInput = !0;
        e.bgColor = cc.color(0, 0, 0, 200);
        e.anim = !0;
        e.hideAnim = !0;
        e.animType = c.SCALE;
        e.useCloseAnimChip = !1;
        e.closeAnimChip = null;
        e.closeTime = 0.1;
        e._fullScreen = !1;
        e._popupName = "";
        e.nWidgerts = [];
        e.bannerPosition = null;
        e.nativePosition = null;
        e.align = !1;
        e._bgNode = null;
        e._closePosition = null;
        e._isShow = !1;
        e._showComplete = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "fullScreen", {
        get: function () {
            return this._fullScreen;
        },
        set: function (t) {
            this._fullScreen = t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "popupName", {
        get: function () {
            return this._popupName;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        var e = this;
        t.prototype.onLoad.call(this);
        var n = cc.view.getVisibleSize();
        if (this.transBack) {
            this._bgNode = new cc.Node("BgNode");
            var i = this._bgNode.addComponent(cc.Sprite);
            $resLoader.ResLoader.loadAsset({
                path: "textures/transback",
                type: cc.SpriteFrame,
                bundleName: $frameEnum.Frame.EBundleName.RES
            })
                .then(function (t) {
                    i.spriteFrame = t;
                    e._bgNode.color = new cc.Color(e.bgColor.r, e.bgColor.g, e.bgColor.b);
                    e._bgNode.setContentSize(n.width, n.height);
                })
                .catch(function () {});
            i.type = cc.Sprite.Type.SLICED;
            i.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            this.node.addChild(this._bgNode, -1);
            this._bgNode.opacity = 0;
            cc.tween(this._bgNode)
                .to(0.25, {
                    opacity: this.bgColor.a
                })
                .start();
        }
        if (this.blockInput) {
            this.node.setContentSize(n);
            this.node.addComponent(cc.BlockInputEvents);
        }
    };
    e.prototype._init = function (t, e, n) {
        this._popupName = t;
        this._closePosition = e;
        this.nWidgerts.forEach(function (t) {
            if (t) {
                var e = t.getComponent(cc.Widget);
                if (e) {
                    e.enabled = !1;
                }
            }
        });
        this.init(n);
    };
    e.prototype._show = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (t) {
                switch (t.label) {
                    case 0:
                        this._isShow = !0;
                        $eventManager.EventManager.instance.emit($appProxy.AppEvent.POPUP_SHOW, this._popupName);
                        this.node.active = !0;
                        cc.Tween.stopAllByTarget(this.node);
                        this.node.setPosition(0, 0, 0);
                        return this.anim ? (c.CUSTOM !== this.animType ? [3, 2] : [4, this.customShowAnim()]) : [3, 10];
                    case 1:
                        t.sent();
                        return [3, 10];
                    case 2:
                        if (c.SCALE_EASING !== this.animType) {
                            return [3, 4];
                        } else {
                            return [4, this._scaleEasingAnim()];
                        }
                    case 3:
                        t.sent();
                        return [3, 10];
                    case 4:
                        if (c.SCALE != this.animType) {
                            return [3, 6];
                        } else {
                            return [4, this._scaleAnim()];
                        }
                    case 5:
                        t.sent();
                        return [3, 10];
                    case 6:
                        if (c.FADE != this.animType) {
                            return [3, 8];
                        } else {
                            return [4, this._fadeAnim()];
                        }
                    case 7:
                        t.sent();
                        return [3, 10];
                    case 8:
                        if (c.ANIMATION_CLIP != this.animType) {
                            return [3, 10];
                        } else {
                            return [4, this.animationClipShowAnim()];
                        }
                    case 9:
                        t.sent();
                        t.label = 10;
                    case 10:
                        this.updateAlignment();
                        this._showComplete = !0;
                        this.nWidgerts.forEach(function (t) {
                            if (t) {
                                var e = t.getComponent(cc.Widget);
                                if (e) {
                                    e.enabled = !0;
                                }
                            }
                        });
                        this.onShow();
                        return [2];
                }
            });
        });
    };
    e.prototype.customShowAnim = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t;
            var e = this;
            return __generator(this, function () {
                if ((t = $popupManager.PopupManager.instance.globalAnim)) {
                    return [
                        2,
                        new Promise(function (n) {
                            t.clone(e.node)
                                .call(function () {
                                    n(!0);
                                })
                                .start();
                        })
                    ];
                } else {
                    return [2, Promise.resolve()];
                }
            });
        });
    };
    e.prototype.animationClipShowAnim = function () {
        return __awaiter(this, void 0, Promise, function () {
            var t;
            var e = this;
            return __generator(this, function () {
                t = this.node.getComponent(cc.Animation);
                return [
                    2,
                    new Promise(function (n) {
                        if (e.anim) {
                            t.once(
                                cc.Animation.EventType.FINISHED,
                                function () {
                                    n();
                                },
                                e
                            );
                            t.play();
                        } else {
                            n();
                        }
                    })
                ];
            });
        });
    };
    e.prototype._scaleEasingAnim = function () {
        var t = this;
        this.node.scale = 0;
        return new Promise(function (e) {
            cc.tween(t.node)
                .to(
                    0.35,
                    {
                        scale: 1
                    },
                    {
                        easing: "backOut"
                    }
                )
                .call(function () {
                    e(!0);
                })
                .start();
        });
    };
    e.prototype._scaleAnim = function () {
        var t = this;
        this.node.scale = 0;
        return new Promise(function (e) {
            cc.tween(t.node)
                .to(
                    0.25,
                    {
                        scale: 1
                    },
                    {
                        easing: "backOut",
                        onUpdate: function (e) {
                            if (t._bgNode) {
                                t._bgNode.scale = 1 / e.scale;
                            }
                        }
                    }
                )
                .call(function () {
                    e(!0);
                })
                .start();
        });
    };
    e.prototype._fadeAnim = function () {
        var t = this;
        this.node.opacity = 0;
        return new Promise(function (e) {
            cc.tween(t.node)
                .to(0.25, {
                    opacity: 255
                })
                .call(function () {
                    e(!0);
                })
                .start();
        });
    };
    e.prototype._hide = function (t) {
        var e = this;
        if (void 0 === t) {
            t = !0;
        }
        $eventManager.EventManager.instance.emit($appProxy.AppEvent.POPUP_HIDE, this._popupName);
        return this.hideAnim && t
            ? new Promise(function (t) {
                  e.onHideAnim()
                      .then(function () {
                          e.onHide();
                          e.node.active = !1;
                          t();
                      })
                      .catch();
              })
            : (this.onHide(), (this.node.active = !1), Promise.resolve());
    };
    e.prototype.onHideAnim = function () {
        var t = this;
        cc.Tween.stopAllByTarget(this.node);
        if (this._bgNode) {
            cc.tween(this._bgNode)
                .to(this.closeTime, {
                    opacity: 0
                })
                .start();
        }
        if (this.useCloseAnimChip && this.closeAnimChip) {
            var e = this.node.getComponent(cc.Animation);
            if (e) {
                return new Promise(function (n) {
                    e.once(
                        cc.Animation.EventType.FINISHED,
                        function () {
                            n();
                        },
                        t
                    );
                    e.play(t.closeAnimChip.name);
                });
            }
        }
        var n = Object.create(null);
        if (c.SCALE === this.animType) {
            n.scale = 0.5;
        } else {
            if (c.FADE === this.animType) {
                n.opacity = 0;
            }
        }
        if (null != this._closePosition) {
            n.position = this._closePosition;
        }
        return new Promise(function (e) {
            if (c.FADE != t.animType) {
                cc.tween(t.node)
                    .to(
                        t.closeTime,
                        {
                            scale: 0.5
                        },
                        {
                            onUpdate: function (e) {
                                if (t._bgNode) {
                                    t._bgNode.scale = 1 / e.scale;
                                }
                            }
                        }
                    )
                    .call(function () {
                        e();
                    })
                    .start();
            } else {
                cc.tween(t.node)
                    .to(t.closeTime, {
                        opacity: 0
                    })
                    .call(function () {
                        e();
                    })
                    .start();
            }
        });
    };
    e.prototype.init = function () {};
    e.prototype.onShow = function () {};
    e.prototype.onHide = function () {};
    e.prototype.removeUI = function (t, e) {
        if (void 0 === t) {
            t = $popupManager.PopupCacheMode.ONCE;
        }
        if (void 0 === e) {
            e = !0;
        }
        $popupManager.PopupManager.instance.remove(this.popupName, t, !0, e);
    };
    e.prototype.updateAlignment = function () {
        if (this.align) {
            //
        } else {
            this.node.getComponentsInChildren(cc.Widget).forEach(function (t) {
                t.updateAlignment();
            });
        }
    };
    __decorate(
        [
            _({
                tooltip: "是否需要默认透明背景"
            })
        ],
        e.prototype,
        "transBack",
        void 0
    );
    __decorate(
        [
            _({
                tooltip: "是否不能穿透"
            })
        ],
        e.prototype,
        "blockInput",
        void 0
    );
    __decorate(
        [
            _({
                tooltip: "背景颜色",
                visible: function () {
                    return this.transBack;
                }
            })
        ],
        e.prototype,
        "bgColor",
        void 0
    );
    __decorate(
        [
            _({
                tooltip: "是否需要动画"
            })
        ],
        e.prototype,
        "anim",
        void 0
    );
    __decorate(
        [
            _({
                tooltip: "是否需要关闭动画"
            })
        ],
        e.prototype,
        "hideAnim",
        void 0
    );
    __decorate(
        [
            _({
                type: cc.Enum(c),
                tooltip: "动画类型",
                visible: function () {
                    return this.anim;
                }
            })
        ],
        e.prototype,
        "animType",
        void 0
    );
    __decorate(
        [
            _({
                tooltip: "关闭使用自定义动画"
            })
        ],
        e.prototype,
        "useCloseAnimChip",
        void 0
    );
    __decorate(
        [
            _({
                type: cc.AnimationClip,
                visible: function () {
                    return this.useCloseAnimChip;
                }
            })
        ],
        e.prototype,
        "closeAnimChip",
        void 0
    );
    __decorate(
        [
            _({
                tooltip: "关闭动画所需时间",
                visible: function () {
                    return this.hideAnim;
                }
            })
        ],
        e.prototype,
        "closeTime",
        void 0
    );
    __decorate(
        [
            _({
                tooltip: "该弹框是否覆盖了整个屏幕"
            })
        ],
        e.prototype,
        "_fullScreen",
        void 0
    );
    __decorate([_({})], e.prototype, "fullScreen", null);
    __decorate([_([cc.Node])], e.prototype, "nWidgerts", void 0);
    return __decorate([y], e);
})($componentBase.ComponentBase);
exports.PopupBase = g;
