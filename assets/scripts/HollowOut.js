var i;
exports.HollowOutShape = void 0;
var c;
var l = cc._decorator;
var u = l.ccclass;
var p = l.property;
var h = l.requireComponent;
var f = l.executeInEditMode;
var d = l.disallowMultiple;
var m = l.executionOrder;
!(function (t) {
    t[(t.Rect = 1)] = "Rect";
    t[(t.Circle = 2)] = "Circle";
})((c = exports.HollowOutShape || (exports.HollowOutShape = {})));
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._effect = null;
        e._shape = c.Rect;
        e._center = cc.v2();
        e._width = 300;
        e._height = 300;
        e._round = 1;
        e._radius = 200;
        e._feather = 0.5;
        e.sprite = null;
        e.material = null;
        e.tweenRes = null;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "effect", {
        get: function () {
            return this._effect;
        },
        set: function (t) {
            this._effect = t;
            this.init();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "shape", {
        get: function () {
            return this._shape;
        },
        set: function (t) {
            this._shape = t;
            this.updateProperties();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "center", {
        get: function () {
            return this._center;
        },
        set: function (t) {
            this._center = t;
            this.updateProperties();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (t) {
            this._width = t;
            this.updateProperties();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (t) {
            this._height = t;
            this.updateProperties();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "round", {
        get: function () {
            return this._round;
        },
        set: function (t) {
            this._round = t;
            this.updateProperties();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (t) {
            this._radius = t;
            this.updateProperties();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "feather", {
        get: function () {
            return this._feather;
        },
        set: function (t) {
            this._feather = t;
            this.updateProperties();
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        this.init();
    };
    e.prototype.resetInEditor = function () {
        this.init();
    };
    e.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t;
            return __generator(this, function () {
                if (this._effect) {
                    return (
                        (t = this.sprite = this.node.getComponent(cc.Sprite)).spriteFrame &&
                            (t.spriteFrame.getTexture().packable = !1),
                        (this.material = cc.Material.create(this._effect)),
                        t.setMaterial(0, this.material),
                        this.updateProperties(),
                        [2]
                    );
                } else {
                    return [2];
                }
            });
        });
    };
    e.prototype.updateProperties = function () {
        switch (this._shape) {
            case c.Rect:
                this.rect(this._center, this._width, this._height, this._round, this._feather);
                break;
            case c.Circle:
                this.circle(this._center, this._radius, this._feather);
        }
    };
    e.prototype.rect = function (t, e, n, i, o) {
        this._shape = c.Rect;
        if (null != t) {
            this._center = t;
        }
        if (null != e) {
            this._width = e;
        }
        if (null != n) {
            this._height = n;
        }
        if (null != i) {
            if (i >= 0) {
                this._round = i;
            } else {
                this._round = 0;
            }
            var r = Math.min(this._width / 2, this._height / 2);
            if (this._round <= r) {
                this._round = this._round;
            } else {
                this._round = r;
            }
        }
        if (null != o) {
            if (o >= 0) {
                this._feather = o;
            } else {
                this._feather = 0;
            }
            if (this._feather <= this._round) {
                this._feather = this._feather;
            } else {
                this._feather = this._round;
            }
        }
        var a = this.material;
        a.setProperty("size", this.getNodeSize());
        a.setProperty("center", this.getCenter(this._center));
        a.setProperty("width", this.getWidth(this._width));
        a.setProperty("height", this.getHeight(this._height));
        a.setProperty("round", this.getRound(this._round));
        a.setProperty("feather", this.getFeather(this._feather));
    };
    e.prototype.circle = function (t, e, n) {
        this._shape = c.Circle;
        if (null != t) {
            this._center = t;
        }
        if (null != e) {
            this._radius = e;
        }
        if (null != n) {
            if (n >= 0) {
                this._feather = n;
            } else {
                this._feather = 0;
            }
        }
        var i = this.material;
        i.setProperty("size", this.getNodeSize());
        i.setProperty("center", this.getCenter(this._center));
        i.setProperty("width", this.getWidth(2 * this._radius));
        i.setProperty("height", this.getHeight(2 * this._radius));
        i.setProperty("round", this.getRound(this._radius));
        i.setProperty("feather", this.getFeather(this._feather));
    };
    e.prototype.rectTo = function (t, e, n, i, o, r) {
        var a = this;
        if (void 0 === o) {
            o = 0;
        }
        if (void 0 === r) {
            r = 0;
        }
        return new Promise(function (s) {
            a._shape = c.Rect;
            cc.Tween.stopAllByTarget(a);
            a.unscheduleAllCallbacks();
            if (a.tweenRes) {
                a.tweenRes();
            }
            a.tweenRes = s;
            o = Math.min(o, n / 2, i / 2);
            r = Math.min(r, o);
            cc.tween(a)
                .to(t, {
                    center: e,
                    width: n,
                    height: i,
                    round: o,
                    feather: r
                })
                .call(function () {
                    a.scheduleOnce(function () {
                        if (a.tweenRes) {
                            a.tweenRes();
                            a.tweenRes = null;
                        }
                    });
                })
                .start();
        });
    };
    e.prototype.circleTo = function (t, e, n, i) {
        var o = this;
        if (void 0 === i) {
            i = 0;
        }
        return new Promise(function (r) {
            o._shape = c.Circle;
            cc.Tween.stopAllByTarget(o);
            o.unscheduleAllCallbacks();
            if (o.tweenRes) {
                o.tweenRes();
            }
            o.tweenRes = r;
            cc.tween(o)
                .to(t, {
                    center: e,
                    radius: n,
                    feather: i
                })
                .call(function () {
                    o.scheduleOnce(function () {
                        if (o.tweenRes) {
                            o.tweenRes();
                            o.tweenRes = null;
                        }
                    });
                })
                .start();
        });
    };
    e.prototype.reset = function () {
        this.rect(cc.v2(), 0, 0, 0, 0);
    };
    e.prototype.setNodeSize = function () {
        var t = this.node;
        var e = t.width;
        var n = t.height;
        this._radius = Math.sqrt(Math.pow(e, 2) + Math.pow(n, 2)) / 2;
        this.rect(t.getPosition(), e, n, 0, 0);
    };
    e.prototype.getCenter = function (t) {
        var e = this.node;
        var n = e.width;
        var i = e.height;
        var o = (t.x + n / 2) / n;
        var r = (-t.y + i / 2) / i;
        return cc.v2(o, r);
    };
    e.prototype.getNodeSize = function () {
        return cc.v2(this.node.width, this.node.height);
    };
    e.prototype.getWidth = function (t) {
        return t / this.node.width;
    };
    e.prototype.getHeight = function (t) {
        return t / this.node.width;
    };
    e.prototype.getRound = function (t) {
        return t / this.node.width;
    };
    e.prototype.getFeather = function (t) {
        return t / this.node.width;
    };
    __decorate([p], e.prototype, "_effect", void 0);
    __decorate(
        [
            p({
                type: cc.EffectAsset,
                readonly: !0
            })
        ],
        e.prototype,
        "effect",
        null
    );
    __decorate([p], e.prototype, "_shape", void 0);
    __decorate(
        [
            p({
                type: cc.Enum(c)
            })
        ],
        e.prototype,
        "shape",
        null
    );
    __decorate([p], e.prototype, "_center", void 0);
    __decorate([p({})], e.prototype, "center", null);
    __decorate([p], e.prototype, "_width", void 0);
    __decorate(
        [
            p({
                visible: function () {
                    return this._shape === c.Rect;
                }
            })
        ],
        e.prototype,
        "width",
        null
    );
    __decorate([p], e.prototype, "_height", void 0);
    __decorate(
        [
            p({
                visible: function () {
                    return this._shape === c.Rect;
                }
            })
        ],
        e.prototype,
        "height",
        null
    );
    __decorate([p], e.prototype, "_round", void 0);
    __decorate(
        [
            p({
                visible: function () {
                    return this._shape === c.Rect;
                }
            })
        ],
        e.prototype,
        "round",
        null
    );
    __decorate([p], e.prototype, "_radius", void 0);
    __decorate(
        [
            p({
                visible: function () {
                    return this._shape === c.Circle;
                }
            })
        ],
        e.prototype,
        "radius",
        null
    );
    __decorate([p], e.prototype, "_feather", void 0);
    __decorate(
        [
            p({
                visible: function () {
                    return this._shape === c.Circle || this.round > 0;
                }
            })
        ],
        e.prototype,
        "feather",
        null
    );
    return __decorate([u, h(cc.Sprite), f, d, m(-10)], e);
})(cc.Component);
exports.default = y;
