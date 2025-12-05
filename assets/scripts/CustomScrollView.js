var i;
exports.CustomScrollView = exports.ScrollDirection = exports.ScrollViewCustomProperty = void 0;
var a;
var s;
var $componentBase = require("./ComponentBase");
var $nodePoolManager = require("./NodePoolManager");
var $commonUtil = require("./CommonUtil");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = p.menu;
var m = p.requireComponent;
(function (t) {
    t.ItemIndex = "ItemIndex";
})((a = exports.ScrollViewCustomProperty || (exports.ScrollViewCustomProperty = {})));
(function (t) {
    t[(t.horizontal = 0)] = "horizontal";
    t[(t.vertical = 1)] = "vertical";
})((s = exports.ScrollDirection || (exports.ScrollDirection = {})));
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mScrollView = null;
        e.mContent = null;
        e.mDir = s.horizontal;
        e._itemAmount = 0;
        e._initLen = 0;
        e._itemHeight = 0;
        e._itemWidth = 0;
        e._checkSize = 0;
        e._extra = null;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "children", {
        get: function () {
            return this.mContent.children;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initScrollView = function (t, e, n) {
        this._extra = n;
        this._extra.paddingLeft = this._extra.paddingLeft || 0;
        this._extra.paddingTop = this._extra.paddingTop || 0;
        this._extra.startItemIndex = this._extra.startItemIndex || 0;
        this._extra.updateItemInfo = this._extra.updateItemInfo || null;
        if (this.mDir == s.horizontal) {
            this.mScrollView.scrollToLeft();
        } else {
            if (this.mDir == s.vertical) {
                this.mScrollView.scrollToTop();
            }
        }
        var i = this._extra.startItemIndex || 0;
        if (i > 0 && i > t - e) {
            i = t - e;
        }
        this._extra.startItemIndex = i;
        var o = new cc.Component.EventHandler();
        o.component = "CustomScrollView";
        o.handler = "onScrolling";
        o.target = this.node;
        o.customEventData = "";
        this.mScrollView.scrollEvents.splice(0, this.mScrollView.scrollEvents.length);
        this.mScrollView.scrollEvents.push(o);
        this.recycle(n.bPutChild);
        this._itemAmount = t;
        this._initLen = e;
        var r = $nodePoolManager.default.instance.getNode(this._extra.prefab);
        this._itemWidth = r.width;
        this._itemHeight = r.height;
        if (this.mDir == s.horizontal) {
            this._checkSize = this._itemWidth * this._initLen;
            this.mContent.width = this._itemWidth * this._itemAmount + this._extra.paddingLeft;
            this.mContent.x = this._itemWidth * this._extra.startItemIndex - this.mScrollView.node.width / 2;
        } else {
            if (this.mDir == s.vertical) {
                this._checkSize = this._itemHeight * this._initLen;
                this.mContent.height = this._itemHeight * this._itemAmount + this._extra.paddingTop;
                this.mContent.y = this._itemHeight * this._extra.startItemIndex + this.mScrollView.node.height / 2;
            }
        }
        $nodePoolManager.default.instance.putNode(r);
        for (var a = 0; a < this._initLen; ++a) {
            this.addItem(a);
        }
    };
    e.prototype.recycle = function (t) {
        for (var e = this.mContent.children.length, n = 0; n < e; ++n) {
            if (t) {
                for (var i = this.mContent.children[0].children.length, o = 0; o < i; ++o) {
                    $nodePoolManager.default.instance.putNode(this.mContent.children[0].children[0]);
                }
            }
            $nodePoolManager.default.instance.putNode(this.mContent.children[0]);
        }
    };
    e.prototype.setEnable = function (t) {
        this.mScrollView.enabled = t;
    };
    e.prototype.getChildren = function () {
        return this.mContent.children;
    };
    e.prototype.addNewItem = function (t, e) {
        if (this._itemAmount < t) {
            this._initLen++;
            this._checkSize = this._itemWidth * this._initLen;
            this.addItem(this._initLen - 1);
        }
        this._itemAmount++;
        this.mScrollView.stopAutoScroll();
        if (this.mDir == s.horizontal) {
            this.mContent.width = this._itemWidth * this._itemAmount + this._extra.paddingLeft;
            e && this.mScrollView.scrollToRight(0.2);
        } else {
            if (this.mDir == s.vertical) {
                this.mContent.height = this._itemHeight * this._itemAmount + this._extra.paddingTop;
                if (e) {
                    this.mScrollView.scrollToBottom(0.2);
                }
            }
        }
    };
    e.prototype.addItem = function (t) {
        var e = $nodePoolManager.default.instance.getNode(this._extra.prefab);
        var n = cc.v3(0, 0, 0);
        var i = this._extra.startItemIndex + t;
        if (0 == i) {
            if (this.mDir == s.horizontal) {
                n = cc.v3(this._itemWidth / 2 + this._extra.paddingLeft, 0, 0);
            } else {
                this.mDir == s.vertical && (n = cc.v3(e.position.x, -this._itemHeight / 2 - this._extra.paddingTop, 0));
            }
        } else {
            if (this.mDir == s.horizontal) {
                n = cc.v3(this._itemWidth / 2 + this._itemWidth * i + this._extra.paddingLeft, 0, 0);
            } else {
                this.mDir == s.vertical &&
                    (n = cc.v3(
                        e.position.x,
                        -(this._itemHeight / 2 + this._itemHeight * i) - this._extra.paddingTop,
                        0
                    ));
            }
        }
        this.mContent.addChild(e);
        e.position = n;
        e.setSiblingIndex(i);
        e[a.ItemIndex] = i;
        this.updateItemInfo(e, i);
        return e;
    };
    e.prototype.moveItem = function (t) {
        var e = null;
        var n = null;
        var i = null;
        var o = null;
        var r = null;
        if ("down" == t) {
            if ((e = this.mContent.children[this._initLen - 1])[a.ItemIndex] >= this._itemAmount - 1) {
                return;
            }
            n = this.mContent.children[0];
            i = cc.v3(n.position.x, e.position.y - this._itemHeight);
            o = e.getSiblingIndex() + 1;
            r = e[a.ItemIndex] + 1;
        } else if ("up" == t) {
            if ((e = this.mContent.children[0])[a.ItemIndex] <= 0) {
                return;
            }
            n = this.mContent.children[this._initLen - 1];
            i = cc.v3(n.position.x, e.position.y + this._itemHeight);
            o = 0;
            r = e[a.ItemIndex] - 1;
        } else if ("right" == t) {
            if ((e = this.mContent.children[this._initLen - 1])[a.ItemIndex] >= this._itemAmount - 1) {
                return;
            }
            n = this.mContent.children[0];
            i = cc.v3(e.position.x + this._itemWidth, 0);
            o = e.getSiblingIndex() + 1;
            r = e[a.ItemIndex] + 1;
        } else if ("left" == t) {
            if ((e = this.mContent.children[0])[a.ItemIndex] <= 0) {
                return;
            }
            n = this.mContent.children[this._initLen - 1];
            i = cc.v3(e.position.x - this._itemWidth, 0);
            o = 0;
            r = e[a.ItemIndex] - 1;
        }
        if (n) {
            n.position = i;
            n.setSiblingIndex(o);
            n[a.ItemIndex] = r;
            this.updateItemInfo(n, r);
        }
    };
    e.prototype.updateItemInfo = function (t, e) {
        if (this._extra.updateItemInfo) {
            this._extra.updateItemInfo.call(this._extra.target, t, e);
        }
    };
    e.prototype.onScrolling = function () {
        if (this.mScrollView && this.mContent) {
            if (this.mDir == s.horizontal) {
                for (var t = 0; t < this.mContent.children.length; ++t) {
                    var e = this.mContent.children[t].convertToWorldSpaceAR(cc.v3(0, 0, 0));
                    if ((n = this.node.convertToNodeSpaceAR(e)).x - this._itemWidth / 2 > this._checkSize / 2) {
                        this.moveItem("left");
                        break;
                    }
                    if (n.x + this._itemWidth / 2 < -this._checkSize / 2) {
                        this.moveItem("right");
                        break;
                    }
                }
            } else if (this.mDir == s.vertical) {
                for (t = 0; t < this.mContent.children.length; ++t) {
                    var n;
                    e = this.mContent.children[t].convertToWorldSpaceAR(cc.v3(0, 0, 0));
                    if ((n = this.node.convertToNodeSpaceAR(e)).y - this._itemHeight / 2 > this._checkSize / 2) {
                        this.moveItem("down");
                        break;
                    }
                    if (n.y + this._itemHeight / 2 < -this._checkSize / 2) {
                        this.moveItem("up");
                        break;
                    }
                }
            }
        } else {
            $commonUtil.CommonUtil.print("请初始化 scrollView 或 content");
        }
    };
    __decorate([f(cc.ScrollView)], e.prototype, "mScrollView", void 0);
    __decorate([f(cc.Node)], e.prototype, "mContent", void 0);
    __decorate(
        [
            f({
                type: cc.Enum(s)
            })
        ],
        e.prototype,
        "mDir",
        void 0
    );
    return __decorate([h, d("自定义组件/滚动视图"), m(cc.ScrollView)], e);
})($componentBase.ComponentBase);
exports.CustomScrollView = y;
