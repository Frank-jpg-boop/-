var i;
exports.CustomScrollViewEx = exports.ScrollViewCustomProperty = void 0;
var a;
var $componentBase = require("./ComponentBase");
var $nodePoolManager = require("./NodePoolManager");
var $commonUtil = require("./CommonUtil");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
var f = u.menu;
var d = u.requireComponent;
!(function (t) {
    t.ItemIndex = "ItemIndex";
})((a = exports.ScrollViewCustomProperty || (exports.ScrollViewCustomProperty = {})));
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mScrollView = null;
        e.mContent = null;
        e._usefulList = [];
        e._itemAmount = 0;
        e._initLen = 0;
        e._itemHeight = 0;
        e._checkSize = 0;
        e._extra = null;
        e._titleHeight = 0;
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
        this._extra.startItemIndex = this._extra.startItemIndex || 0;
        this._extra.updateItemInfo = this._extra.updateItemInfo || null;
        this.mScrollView.scrollToTop();
        var i = this._extra.startItemIndex || 0;
        if (i > 0 && i > t - e) {
            i = t - e;
        }
        this._extra.startItemIndex = i;
        var o = new cc.Component.EventHandler();
        o.component = "CustomScrollViewEx";
        o.handler = "onScrolling";
        o.target = this.node;
        o.customEventData = "";
        this.mScrollView.scrollEvents.splice(0, this.mScrollView.scrollEvents.length);
        this.mScrollView.scrollEvents.push(o);
        this.recycle();
        this._usefulList = [];
        this._itemAmount = t;
        this._initLen = e;
        var r = $nodePoolManager.default.instance.getNode(this._extra.prefab);
        this._itemHeight = r.height;
        var a = $nodePoolManager.default.instance.getNode(this._extra.titlePrefab);
        this._titleHeight = a.height;
        this._checkSize = this._itemHeight * this._initLen;
        this.mContent.height = this._itemHeight * this._itemAmount + this._titleHeight * this._extra.titleIdx.length;
        this.mContent.y = this._itemHeight * this._extra.startItemIndex + this.mScrollView.node.height / 2;
        $nodePoolManager.default.instance.putNode(r);
        $nodePoolManager.default.instance.putNode(a);
        for (var s = 0; s < this._extra.titleIdx.length; ++s) {
            this.addTitle(s);
        }
        for (s = 0; s < this._initLen; ++s) {
            this.addItem(s);
        }
    };
    e.prototype.recycle = function () {
        for (var t = this.mContent.children.length, e = 0; e < t; ++e) {
            if (this.mContent.children[0].name == this._extra.prefab.name) {
                for (var n = this.mContent.children[0].children.length, i = 0; i < n; ++i) {
                    $nodePoolManager.default.instance.putNode(this.mContent.children[0].children[0]);
                }
            }
            $nodePoolManager.default.instance.putNode(this.mContent.children[0]);
        }
    };
    e.prototype.getChildren = function () {
        return this._usefulList;
    };
    e.prototype.addTitle = function (t) {
        var e = $nodePoolManager.default.instance.getNode(this._extra.titlePrefab);
        var n = cc.v3(0, 0, 0);
        if (0 == t) {
            n = cc.v3(e.position.x, -this._titleHeight / 2);
        } else {
            var i = this._extra.titleIdx[t] - this._extra.titleIdx[t - 1];
            n = cc.v3(e.position.x, -(this._titleHeight / 2 + this._itemHeight * i + this._titleHeight * t));
        }
        this.mContent.addChild(e);
        e.position = n;
        if (this._extra.updateTitleInfo) {
            this._extra.updateTitleInfo.call(this._extra.target, e, t);
        }
    };
    e.prototype.addItem = function (t) {
        for (
            var e = $nodePoolManager.default.instance.getNode(this._extra.prefab),
                n = cc.v3(0, 0, 0),
                i = this._extra.startItemIndex + t,
                o = 0,
                r = this._extra.titleIdx.length - 1;
            r >= 0;
            --r
        ) {
            if (t >= this._extra.titleIdx[r]) {
                o = r + 1;
                break;
            }
        }
        n = cc.v3(e.position.x, -(this._itemHeight / 2 + this._itemHeight * i + this._titleHeight * o), 0);
        this._usefulList.push(e);
        this.mContent.addChild(e);
        e.position = n;
        e[a.ItemIndex] = i;
        this.updateItemInfo(e, i + o, i);
        return e;
    };
    e.prototype.moveItem = function (t) {
        var e = null;
        var n = null;
        var i = null;
        var o = null;
        if ("down" == t) {
            if ((c = (e = this._usefulList[this._initLen - 1])[a.ItemIndex]) >= this._itemAmount - 1) {
                return;
            }
            n = this._usefulList[0];
            for (var r = !1, s = this._extra.titleIdx.length - 1; s >= 0; --s) {
                if (c == this._extra.titleIdx[s] - 1) {
                    r = !0;
                    break;
                }
            }
            i = cc.v3(n.position.x, e.position.y - this._itemHeight - (r ? this._titleHeight : 0));
            o = e[a.ItemIndex] + 1;
            this._usefulList.splice(0, 1);
            this._usefulList.push(n);
            n[a.ItemIndex] = o;
        } else if ("up" == t) {
            var c;
            if ((c = (e = this._usefulList[0])[a.ItemIndex]) <= 0) {
                return;
            }
            n = this._usefulList[this._initLen - 1];
            r = !1;
            for (s = this._extra.titleIdx.length - 1; s >= 0; --s) {
                if (c == this._extra.titleIdx[s] - 1) {
                    r = !0;
                    break;
                }
            }
            i = cc.v3(n.position.x, e.position.y + this._itemHeight + (r ? this._titleHeight : 0));
            o = e[a.ItemIndex] - 1;
            this._usefulList.splice(this._initLen - 1, 1);
            this._usefulList.splice(0, 0, n);
            n[a.ItemIndex] = o;
        }
        if (n) {
            n.position = i;
            n[a.ItemIndex] = o;
            var l = 0;
            for (s = this._extra.titleIdx.length - 1; s >= 0; --s) {
                if (o >= this._extra.titleIdx[s]) {
                    l = s + 1;
                    break;
                }
            }
            this.updateItemInfo(n, o + l, o);
        }
    };
    e.prototype.updateItemInfo = function (t, e, n) {
        if (this._extra.updateItemInfo) {
            this._extra.updateItemInfo.call(this._extra.target, t, e, n);
        }
    };
    e.prototype.onScrolling = function () {
        if (this.mScrollView && this.mContent) {
            for (var t = 0; t < this._usefulList.length; ++t) {
                var e = this._usefulList[t].convertToWorldSpaceAR(cc.v3(0, 0, 0));
                var n = this.node.convertToNodeSpaceAR(e);
                if (n.y - this._itemHeight / 2 > this._checkSize / 2) {
                    this.moveItem("down");
                    break;
                }
                if (n.y + this._itemHeight / 2 < -this._checkSize / 2) {
                    this.moveItem("up");
                    break;
                }
            }
        } else {
            $commonUtil.CommonUtil.print("请初始化 scrollView 或 content");
        }
    };
    __decorate([h(cc.ScrollView)], e.prototype, "mScrollView", void 0);
    __decorate([h(cc.Node)], e.prototype, "mContent", void 0);
    return __decorate([p, f("自定义组件/滚动视图Ex"), d(cc.ScrollView)], e);
})($componentBase.ComponentBase);
exports.CustomScrollViewEx = m;
