var i;
var a;
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = s.disallowMultiple;
var p = s.menu;
var h = s.executionOrder;
!(function (t) {
    t[(t.NONE = 0)] = "NONE";
    t[(t.TOGGLE = 1)] = "TOGGLE";
    t[(t.SWITCH = 2)] = "SWITCH";
})(a || (a = {}));
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.selectedMode = a.NONE;
        e.selectedFlag = null;
        e.selectedSpriteFrame = null;
        e._unselectedSpriteFrame = null;
        e.adaptiveSize = !1;
        e._selected = !1;
        e._eventReg = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (t) {
            this._selected = t;
            if (this.selectedFlag) {
                switch (this.selectedMode) {
                    case a.TOGGLE:
                        this.selectedFlag.active = t;
                        break;
                    case a.SWITCH:
                        var e = this.selectedFlag.getComponent(cc.Sprite);
                        if (e) {
                            if (t) {
                                e.spriteFrame = this.selectedSpriteFrame;
                            } else {
                                e.spriteFrame = this._unselectedSpriteFrame;
                            }
                        }
                }
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "btnCom", {
        get: function () {
            if (this._btnCom) {
                //
            } else {
                this._btnCom = this.node.getComponent(cc.Button);
            }
            return this._btnCom;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        if (this.selectedMode == a.SWITCH) {
            var t = this.selectedFlag.getComponent(cc.Sprite);
            this._unselectedSpriteFrame = t.spriteFrame;
        }
    };
    e.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
    };
    e.prototype._registerEvent = function () {
        if (this._eventReg) {
            //
        } else {
            if (this.btnCom && this.list.selectedMode > 0) {
                this.btnCom.clickEvents.unshift(this.createEvt(this, "onClickThis"));
            }
            if (this.adaptiveSize) {
                this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
            }
            this._eventReg = !0;
        }
    };
    e.prototype._onSizeChange = function () {
        this.list._onItemAdaptive(this.node);
    };
    e.prototype.createEvt = function (t, e, n) {
        if (void 0 === n) {
            n = null;
        }
        if (t.isValid) {
            t.comName =
                t.comName ||
                t.name
                    .match(/\<(.*?)\>/g)
                    .pop()
                    .replace(/\<|>/g, "");
            var i = new cc.Component.EventHandler();
            i.target = n || t.node;
            i.component = t.comName;
            i.handler = e;
            return i;
        }
    };
    e.prototype.showAni = function (t, e, n) {
        var i;
        var o = this;
        switch (t) {
            case 0:
                i = cc
                    .tween(o.node)
                    .to(0.2, {
                        scale: 0.7
                    })
                    .by(0.3, {
                        y: 2 * o.node.height
                    });
                break;
            case 1:
                i = cc
                    .tween(o.node)
                    .to(0.2, {
                        scale: 0.7
                    })
                    .by(0.3, {
                        x: 2 * o.node.width
                    });
                break;
            case 2:
                i = cc
                    .tween(o.node)
                    .to(0.2, {
                        scale: 0.7
                    })
                    .by(0.3, {
                        y: -2 * o.node.height
                    });
                break;
            case 3:
                i = cc
                    .tween(o.node)
                    .to(0.2, {
                        scale: 0.7
                    })
                    .by(0.3, {
                        x: -2 * o.node.width
                    });
                break;
            default:
                i = cc.tween(o.node).to(0.3, {
                    scale: 0.1
                });
        }
        if (e || n) {
            i.call(function () {
                if (n) {
                    o.list._delSingleItem(o.node);
                    for (var t = o.list.displayData.length - 1; t >= 0; t--) {
                        if (o.list.displayData[t].id == o.listId) {
                            o.list.displayData.splice(t, 1);
                            break;
                        }
                    }
                }
                e();
            });
        }
        i.start();
    };
    e.prototype.onClickThis = function () {
        this.list.selectedId = this.listId;
    };
    __decorate(
        [
            l({
                type: cc.Enum(a)
            })
        ],
        e.prototype,
        "selectedMode",
        void 0
    );
    __decorate(
        [
            l({
                type: cc.Node,
                visible: function () {
                    return this.selectedMode > a.NONE;
                }
            })
        ],
        e.prototype,
        "selectedFlag",
        void 0
    );
    __decorate(
        [
            l({
                type: cc.SpriteFrame,
                visible: function () {
                    return this.selectedMode == a.SWITCH;
                }
            })
        ],
        e.prototype,
        "selectedSpriteFrame",
        void 0
    );
    __decorate([l({})], e.prototype, "adaptiveSize", void 0);
    return __decorate([c, u(), p("自定义组件/List Item"), h(-5001)], e);
})(cc.Component);
exports.default = f;
