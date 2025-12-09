var i;
exports.YXCollectionView =
    exports.YXLayout =
    exports.YXLayoutAttributes =
    exports.YXEdgeInsets =
    exports.YXIndexPath =
        void 0;
var a;
var s;
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = (c.requireComponent, c.executionOrder);
var h = c.disallowMultiple;
var f = c.help;
var d = cc.Enum;
var m = cc.Node;
var y = cc.Prefab;
var _ = cc.ValueType;
var g = cc.NodePool;
var v = cc.Component;
var b = cc.ScrollView;
var E = (cc.Event.EventMouse, cc.Event.EventTouch, cc.Mask);
var S = cc.Node.EventType;
var P = new cc.Vec3();
var A = new cc.Rect();
var w = new cc.Rect();
(function (t) {
    t[(t.HORIZONTAL = 0)] = "HORIZONTAL";
    t[(t.VERTICAL = 1)] = "VERTICAL";
})(a || (a = {}));
d(a);
(function (t) {
    t[(t.RECYCLE = 0)] = "RECYCLE";
    t[(t.PRELOAD = 1)] = "PRELOAD";
})(s || (s = {}));
d(s);
var C = (function () {
    function t() {
        this.prefab = null;
        this.identifier = "";
        this.comp = "";
    }
    __decorate(
        [
            u({
                type: y,
                tooltip: "cell 节点预制体，必须配置"
            })
        ],
        t.prototype,
        "prefab",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "节点重用标识符\n如果确定此列表仅使用一种节点类型，可以忽略此配置"
            })
        ],
        t.prototype,
        "identifier",
        void 0
    );
    __decorate(
        [
            u({
                tooltip:
                    "节点挂载的自定义组件\n如果需要监听 NodePool 的重用/回收事件，确保你的自定义组件已经实现了 YXCollectionViewCell 接口并配置此属性为你的自定义组件名\n如果不需要，可以忽略此配置"
            })
        ],
        t.prototype,
        "comp",
        void 0
    );
    return __decorate([l("_yx_editor_register_cell_info")], t);
})();
var M = (function (t) {
    function e(e, n) {
        var i = t.call(this) || this;
        i.section = 0;
        i.item = 0;
        i.section = e;
        i.item = n;
        return i;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "row", {
        get: function () {
            return this.item;
        },
        set: function (t) {
            this.item = t;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.clone = function () {
        return new e(this.section, this.item);
    };
    e.prototype.equals = function (t) {
        return this.section == t.section && this.item == t.item;
    };
    e.prototype.set = function (t) {
        this.section = t.section;
        this.item = t.item;
    };
    e.prototype.toString = function () {
        return this.section + " - " + this.item;
    };
    e.ZERO = new e(0, 0);
    return e;
})(_);
exports.YXIndexPath = M;
var I = (function (t) {
    function e(e, n, i, o) {
        var r = t.call(this) || this;
        r.top = e;
        r.left = n;
        r.bottom = i;
        r.right = o;
        return r;
    }
    __extends(e, t);
    e.prototype.clone = function () {
        return new e(this.top, this.left, this.bottom, this.right);
    };
    e.prototype.equals = function (t) {
        return this.top == t.top && this.left == t.left && this.bottom == t.bottom && this.right == t.right;
    };
    e.prototype.set = function (t) {
        this.top = t.top;
        this.left = t.left;
        this.bottom = t.bottom;
        this.right = t.right;
    };
    e.prototype.toString = function () {
        return "[ " + this.top + ", " + this.left + ", " + this.bottom + ", " + this.right + " ]";
    };
    e.ZERO = new e(0, 0, 0, 0);
    return e;
})(_);
exports.YXEdgeInsets = I;
var R = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    return e;
})(v);
var D = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype._onMouseWheel = function () {};
    e.prototype._startInertiaScroll = function (e) {
        t.prototype._startInertiaScroll.call(this, e);
        if (this._yxOnStartInertiaScroll) {
            this._yxOnStartInertiaScroll(e);
        }
    };
    e.prototype._onTouchBegan = function (e, n) {
        if (0 != this.node.getComponent(B).scrollEnabled) {
            var i = [e.target];
            if (n) {
                i = i.concat(n);
            }
            for (var o = 0; o < i.length; o++) {
                var r = i[o];
                r._yx_scroll_target = null;
                var a = r.getComponent(B);
                if (a) {
                    var s = a.scrollView.getScrollOffset();
                    s.x = -s.x;
                    a._scroll_offset_on_touch_start = s;
                }
            }
            t.prototype._onTouchBegan.call(this, e, n);
        }
    };
    e.prototype._onTouchMoved = function (e, n) {
        if (0 != this.node.getComponent(B).scrollEnabled) {
            var i = this._yxGetScrollTarget(e, n);
            if (this.node === i) {
                t.prototype._onTouchMoved.call(this, e, n);
            }
        }
    };
    e.prototype.hasNestedViewGroup = function () {
        return !1;
    };
    e.prototype._stopPropagationIfTargetIsMe = function (e) {
        if (1 != this._touchMoved) {
            t.prototype._stopPropagationIfTargetIsMe.call(this, e);
        } else {
            e.stopPropagation();
        }
    };
    e.prototype._yxGetScrollTarget = function (t, n) {
        var i = t.target._yx_scroll_target;
        if (i) {
            return i;
        }
        var o = [t.target];
        if (n) {
            o = o.concat(n);
        }
        if (1 == o.length) {
            return o[0];
        }
        var r = t.touch;
        var a = r.getLocation().subtract(r.getStartLocation());
        var s = Math.abs(a.x);
        var c = Math.abs(a.y);
        if (Math.abs(s - c) < 5) {
            return null;
        }
        for (var l = null, u = 0; u < o.length; u++) {
            var p = (f = o[u]).getComponent(e);
            if (p) {
                var h = f.getComponent(B);
                if (h && 0 == h.scrollEnabled) {
                    continue;
                }
                if (null == l) {
                    l = f;
                }
                if (p.horizontal && p.vertical) {
                    continue;
                }
                if (!p.horizontal && !p.vertical) {
                    continue;
                }
                if (p.horizontal && s > c) {
                    l = f;
                    break;
                }
                if (p.vertical && c > s) {
                    l = f;
                    break;
                }
            }
        }
        if (l) {
            for (u = 0; u < o.length; u++) {
                var f;
                (f = o[u])._yx_scroll_target = l;
            }
        }
        return l;
    };
    return e;
})(b);
exports.YXLayoutAttributes = function () {
    this.indexPath = null;
    this.frame = null;
    this.zIndex = 0;
    this.opacity = null;
    this.scale = null;
    this.offset = null;
    this.eulerAngles = null;
};
var T = (function () {
    function t() {
        this.contentSize = cc.Size.ZERO;
        this.attributes = [];
    }
    t.prototype.initOffset = function () {};
    t.prototype.targetOffset = function () {
        return null;
    };
    t.prototype.onScrollEnded = function () {};
    t.prototype.layoutAttributesForElementsInRect = function (t) {
        for (var e = [], n = 0; n < this.attributes.length; n++) {
            var i = this.attributes[n];
            if (1 == t.intersects(i.frame)) {
                e.push(i);
            }
        }
        return e;
    };
    t.prototype.layoutAttributesForItemAtIndexPath = function (t) {
        return this.attributes.find(function (e) {
            return e.indexPath.equals(t);
        });
    };
    t.prototype.scrollTo = function () {
        return null;
    };
    t.prototype.shouldUpdateAttributesZIndex = function () {
        return !1;
    };
    t.prototype.shouldUpdateAttributesOpacity = function () {
        return !1;
    };
    t.prototype.shouldUpdateAttributesForBoundsChange = function () {
        return !1;
    };
    return t;
})();
exports.YXLayout = T;
var B = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mask = !0;
        e.scrollEnabled = !0;
        e.scrollDirection = n.ScrollDirection.VERTICAL;
        e.mode = n.Mode.RECYCLE;
        e.preloadNodesLimitPerFrame = 2;
        e.preloadProgress = null;
        e.frameInterval = 1;
        e.recycleInterval = 1;
        e.registerCellForEditor = [];
        e.pools = new Map();
        e.makers = new Map();
        e.numberOfSections = 1;
        e.numberOfItems = 0;
        e.cellForItemAt = null;
        e.onCellDisplay = null;
        e.onCellEndDisplay = null;
        e.onTouchItemAt = null;
        e.layout = null;
        e.visibleNodesMap = new Map();
        e.preloadNodesMap = new Map();
        e._late_reload_data = !1;
        e.reloadDataCounter = 0;
        e._frameIdx = 0;
        e._late_update_visible_data = !1;
        e._late_recycle_invisible_node = !1;
        e.preloadIdx = null;
        e._scroll_offset_on_touch_start = null;
        return e;
    }
    var n;
    __extends(e, t);
    n = e;
    Object.defineProperty(e.prototype, "scrollView", {
        get: function () {
            var t = this.node.getComponent(D);
            if (null == t) {
                t = this.node.addComponent(D);
            }
            if (null == t.content) {
                var e = new m("com.yx.scroll.content");
                e.parent = t.node;
                e.setContentSize(this.node.getContentSize());
                t.content = e;
            }
            if (this.mask) {
                var n = t.node.getComponent(E);
                if (null == n) {
                    (n = t.node.addComponent(E)).type = E.Type.RECT;
                }
            }
            return t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "_scrollView", {
        get: function () {
            return this.scrollView;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.register = function (t, e, n) {
        if (void 0 === n) {
            n = null;
        }
        var i = new g(n);
        this.pools.set(t, i);
        this.makers.set(t, e);
    };
    e.prototype.dequeueReusableCell = function (t) {
        var e = this.pools.get(t);
        if (null == e) {
            throw new Error(
                "YXCollectionView: 未注册标识符为 `" +
                    t +
                    "` 的 cell，请先调用 YXCollectionView 的 register() 方法注册 cell 节点"
            );
        }
        var n = null;
        if (null == n) {
            n = e.get();
        }
        if (null == n) {
            ((n = this.makers.get(t)()).getComponent(R) || n.addComponent(R)).identifier = t;
            n.on(S.TOUCH_END, this.onTouchItem, this);
        }
        return n;
    };
    e.prototype.onTouchItem = function (t) {
        if (this.onTouchItemAt) {
            var e = t.target.getComponent(R);
            this.onTouchItemAt(e.attributes.indexPath, this);
        }
    };
    Object.defineProperty(e.prototype, "visibleRect", {
        get: function () {
            var t = A;
            t.origin = this.scrollView.getScrollOffset();
            t.x = -t.x;
            t.size = this.scrollView.node.getContentSize();
            return t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "visibleNodes", {
        get: function () {
            var t = [];
            this.visibleNodesMap.forEach(function (e) {
                t.push(e);
            });
            return t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "visibleCells", {
        get: function () {
            var t = [];
            this.visibleNodesMap.forEach(function (e) {
                t.push(e.getComponent(R));
            });
            return t;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.getVisibleNode = function (t) {
        return this.visibleNodesMap.get(t.toString());
    };
    e.prototype.getVisibleCell = function (t) {
        var e = this.getVisibleNode(t);
        if (null == e) {
            return null;
        } else {
            return e.getComponent(R);
        }
    };
    e.prototype.getCellComp = function (t) {
        if (null == t) {
            return null;
        } else {
            return t.getComponent(R);
        }
    };
    e.prototype.reloadData = function () {
        if (this.node.activeInHierarchy && this.node.parent) {
            this._reloadData();
        } else {
            this._late_reload_data = !0;
        }
    };
    e.prototype.update_reloadDataIfNeeds = function () {
        if (0 != this._late_reload_data) {
            this._reloadData();
        }
    };
    e.prototype._reloadData = function () {
        var t = this;
        this._late_reload_data = !1;
        if (null == this.layout) {
            throw new Error("YXCollectionView: 参数错误，请正确配置 layout 以确定布局方案");
        }
        this.scrollView.stopAutoScroll();
        this.pools.forEach(function (t) {
            t.clear();
        });
        if (this.mode == s.RECYCLE) {
            this.visibleNodesMap.forEach(function (e, n) {
                var i = e.getComponent(R);
                t.pools.get(i.identifier).put(e);
                t.visibleNodesMap.delete(n);
                if (t.onCellEndDisplay) {
                    t.onCellEndDisplay(i.node, i.attributes.indexPath, t);
                }
            });
            this.visibleNodesMap.clear();
        }
        if (this.mode == s.PRELOAD) {
            this.visibleNodesMap.forEach(function (t) {
                if (t) {
                    t.removeFromParent();
                    t.destroy();
                }
            });
            this.visibleNodesMap.clear();
            this.preloadNodesMap.forEach(function (t) {
                if (t) {
                    t.removeFromParent();
                    t.destroy();
                }
            });
            this.preloadNodesMap.clear();
            this.preloadIdx = 0;
        }
        var e = this.scrollView.getScrollOffset();
        e.x = -e.x;
        this.layout.prepare(this);
        this.scrollView.content.setContentSize(this.layout.contentSize);
        if (this.reloadDataCounter <= 0) {
            this.layout.initOffset(this);
        } else {
            var n = this.scrollView.getMaxScrollOffset();
            cc.Vec2.min(e, e, n);
            this.scrollView.scrollToOffset(e);
        }
        this.markForUpdateVisibleData(!0);
        this.reloadDataCounter++;
    };
    e.prototype.reloadVisibleCells = function (t) {
        if (void 0 === t) {
            t = null;
        }
        if (null == t) {
            t = this.visibleRect;
        }
        var e = this.layout.layoutAttributesForElementsInRect(t, this);
        var n = this.layout.shouldUpdateAttributesZIndex();
        if (n) {
            if (null != e && e != this.layout.attributes) {
                //
            } else {
                e = this.layout.attributes.slice();
            }
            e.sort(function (t, e) {
                return t.zIndex - e.zIndex;
            });
        }
        for (var i = 0; i < e.length; i++) {
            var o = e[i];
            var r = null;
            if (null == r) {
                r = this.preloadNodesMap.get(o.indexPath.toString());
            }
            if (null == r) {
                r = this.getVisibleNode(o.indexPath);
            }
            if (null == r) {
                r = this.cellForItemAt(o.indexPath, this);
            }
            if (null == r) {
                throw new Error("需要实现 cellForItemAt 方法并确保正确的返回了节点");
            }
            var a = this.restoreCellNodeIfNeeds(r);
            this.applyLayoutAttributes(r, o);
            if (n) {
                r.setSiblingIndex(-1);
            }
            this.visibleNodesMap.set(o.indexPath.toString(), r);
            if (1 == a && this.onCellDisplay) {
                this.onCellDisplay(r, o.indexPath, this);
            }
        }
        e = [];
    };
    e.prototype.restoreCellNodeIfNeeds = function (t) {
        var e = 0;
        if (t.parent != this.scrollView.content) {
            t.parent = this.scrollView.content;
            e = 1;
        }
        if (this.mode == s.PRELOAD && 255 !== t.opacity) {
            t.opacity = 255;
            e = 1;
        }
        return e;
    };
    e.prototype.recycleInvisibleNodes = function (t) {
        var e = this;
        if (void 0 === t) {
            t = null;
        }
        if (null == t) {
            t = this.visibleRect;
        }
        var n = w;
        var i = this.scrollView.content.getContentSize();
        this.visibleNodesMap.forEach(function (o, r) {
            var a = o.getComponent(R);
            var c = o.getBoundingBox();
            n.size = c.size;
            n.x = 0.5 * (i.width - n.width) + o.position.x;
            n.y = 0.5 * (i.height - n.height) - o.position.y;
            if (0 == t.intersects(n)) {
                if (e.mode == s.PRELOAD) {
                    (o.opacity = 0), e.preloadNodesMap.set(a.attributes.indexPath.toString(), o);
                } else {
                    e.pools.get(a.identifier).put(o);
                }
                e.visibleNodesMap.delete(r);
                if (e.onCellEndDisplay) {
                    e.onCellEndDisplay(a.node, a.attributes.indexPath, e);
                }
            }
        });
    };
    e.prototype.applyLayoutAttributes = function (t, e) {
        t.getComponent(R).attributes = e;
        t.setContentSize(e.frame.size);
        P.x = 0.5 * -(this.layout.contentSize.width - e.frame.width) + e.frame.x;
        P.y = 0.5 * +(this.layout.contentSize.height - e.frame.height) - e.frame.y;
        P.z = t.position.z;
        if (e.offset) {
            cc.Vec3.add(P, P, e.offset);
        }
        t.position = P;
        if (e.scale) {
            t.scaleX = e.scale.x;
            t.scaleY = e.scale.y;
            t.scaleZ = e.scale.z;
        }
        if (e.eulerAngles) {
            t.eulerAngles = e.eulerAngles;
        }
        if (this.layout.shouldUpdateAttributesOpacity() && e.opacity) {
            t.opacity = e.opacity;
        }
    };
    e.prototype.scrollTo = function (t, e, n) {
        var i;
        if (void 0 === e) {
            e = 0;
        }
        if (void 0 === n) {
            n = !0;
        }
        var o = this.layout.scrollTo(t, this);
        if (null == o) {
            if (null === (i = this.layout.layoutAttributesForItemAtIndexPath(t, this)) || void 0 === i) {
                o = void 0;
            } else {
                o = i.frame.origin;
            }
        }
        if (o) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToOffset(o, e, n);
            this.markForUpdateVisibleData();
        }
    };
    e.prototype.onLoad = function () {
        for (
            var t = function (t) {
                    var n = e.registerCellForEditor[t];
                    e.register(
                        n.identifier,
                        function () {
                            return cc.instantiate(n.prefab);
                        },
                        n.comp
                    );
                },
                e = this,
                n = 0;
            n < this.registerCellForEditor.length;
            n++
        ) {
            t(n);
        }
        this.node.on("scroll-began", this.onScrollBegan, this);
        this.node.on("scrolling", this.onScrolling, this);
        this.node.on("touch-up", this.onScrollTouchUp, this);
        this.node.on("scroll-ended", this.onScrollEnded, this);
        this._scrollView._yxOnStartInertiaScroll = this.onStartInertiaScroll.bind(this);
    };
    e.prototype.onDestroy = function () {
        this.node.off("scroll-began", this.onScrollBegan, this);
        this.node.off("scrolling", this.onScrolling, this);
        this.node.off("touch-up", this.onScrollTouchUp, this);
        this.node.off("scroll-ended", this.onScrollEnded, this);
        this.visibleNodesMap.forEach(function (t) {
            if (t && t.isValid) {
                t.removeFromParent();
                t.destroy();
            }
        });
        this.visibleNodesMap.clear();
        this.visibleNodesMap = null;
        this.preloadNodesMap.forEach(function (t) {
            if (t && t.isValid) {
                t.removeFromParent();
                t.destroy();
            }
        });
        this.preloadNodesMap.clear();
        this.preloadNodesMap = null;
        this.pools.forEach(function (t) {
            t.clear();
        });
        this.pools.clear();
        this.pools = null;
        this.makers.clear();
        this.makers = null;
        if (this.layout) {
            this.layout.attributes = [];
        }
    };
    e.prototype.update = function (t) {
        this._frameIdx++;
        this.update_reloadVisibleCellsIfNeeds(t);
        this.update_recycleInvisibleNodesIfNeeds(t);
        this.update_reloadDataIfNeeds(t);
        this.update_preloadNodeIfNeeds(t);
    };
    e.prototype.markForUpdateVisibleData = function (t) {
        if (void 0 === t) {
            t = !1;
        }
        if (t) {
            var e = this.visibleRect;
            this.reloadVisibleCells(e);
            return void this.recycleInvisibleNodes(e);
        }
        this._late_update_visible_data = !0;
        this._late_recycle_invisible_node = !0;
    };
    e.prototype.update_reloadVisibleCellsIfNeeds = function () {
        if ((this.frameInterval <= 1 || this._frameIdx % this.frameInterval == 0) && this._late_update_visible_data) {
            this._late_update_visible_data = !1;
            this.reloadVisibleCells();
        }
    };
    e.prototype.update_recycleInvisibleNodesIfNeeds = function () {
        if (
            this.recycleInterval >= 1 &&
            this._frameIdx % this.recycleInterval == 0 &&
            this._late_recycle_invisible_node
        ) {
            this._late_recycle_invisible_node = !1;
            this.recycleInvisibleNodes();
        }
    };
    e.prototype.update_preloadNodeIfNeeds = function () {
        if (
            this.mode === s.PRELOAD &&
            null != this.preloadIdx &&
            !(this.preloadIdx >= this.layout.attributes.length || this.preloadNodesLimitPerFrame <= 0)
        ) {
            for (var t = 0, e = !1; !e && t < this.preloadNodesLimitPerFrame; ) {
                var n = this.layout.attributes[this.preloadIdx];
                var i = n.indexPath.toString();
                var o = null;
                if (null == o) {
                    o = this.getVisibleNode(n.indexPath);
                }
                if (null == o) {
                    o = this.preloadNodesMap.get(i);
                }
                if (null == o) {
                    o = this.cellForItemAt(n.indexPath, this);
                    this.restoreCellNodeIfNeeds(o);
                    this.applyLayoutAttributes(o, n);
                    this.visibleNodesMap.set(i, o);
                    this._late_recycle_invisible_node = !0;
                }
                this.preloadNodesMap.set(i, o);
                this.preloadIdx++;
                t++;
                if (this.preloadProgress) {
                    this.preloadProgress(this.preloadIdx, this.layout.attributes.length);
                }
                e = this.preloadIdx >= this.layout.attributes.length;
            }
        }
    };
    e.prototype.onScrollBegan = function () {};
    e.prototype.onScrolling = function () {
        this.markForUpdateVisibleData(this.layout.shouldUpdateAttributesForBoundsChange());
        this._late_recycle_invisible_node = !0;
    };
    e.prototype.onScrollTouchUp = function () {
        this.recycleInvisibleNodes();
    };
    e.prototype.onScrollEnded = function () {
        this.markForUpdateVisibleData();
        this.recycleInvisibleNodes();
        this.layout.onScrollEnded(this);
    };
    e.prototype.onStartInertiaScroll = function (t) {
        var e = this.layout.targetOffset(this, t, this._scroll_offset_on_touch_start);
        if (e) {
            this.scrollView.scrollToOffset(e.offset, e.time);
            this.markForUpdateVisibleData();
        }
    };
    Object.defineProperty(e.prototype, "visibleIndexPaths", {
        get: function () {
            var t = [];
            this.visibleNodesMap.forEach(function (e) {
                var n = e.getComponent(R);
                t.push(n.attributes.indexPath.clone());
            });
            return t;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.getVisibleNodeIndexPath = function (t) {
        var e = this.getCellComp(t);
        if (e) {
            return e.attributes.indexPath;
        } else {
            return null;
        }
    };
    e.ScrollDirection = a;
    e.Mode = s;
    __decorate(
        [
            u({
                tooltip: "自动给挂载节点添加 mask 组件",
                visible: !0
            })
        ],
        e.prototype,
        "mask",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "允许手势滚动"
            })
        ],
        e.prototype,
        "scrollEnabled",
        void 0
    );
    __decorate(
        [
            u({
                type: a,
                tooltip: "列表滚动方向"
            })
        ],
        e.prototype,
        "scrollDirection",
        void 0
    );
    __decorate(
        [
            u({
                type: s,
                tooltip:
                    "列表单元节点加载模式 (详细区别查看枚举注释)\nRECYCLE: 根据列表显示范围加载需要的节点，同类型的节点会进行复用\nPRELOAD: 会实例化所有节点，并非真正的虚拟列表，仅仅是把显示范围外的节点透明了，如果列表数据量很大仍然会卡"
            })
        ],
        e.prototype,
        "mode",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "预加载模式下每帧加载多少个节点",
                visible: function () {
                    return this.mode == s.PRELOAD;
                }
            })
        ],
        e.prototype,
        "preloadNodesLimitPerFrame",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "每多少帧刷新一次可见节点，1 表示每帧都刷"
            })
        ],
        e.prototype,
        "frameInterval",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "滚动过程中，每多少帧回收一次不可见节点，1表示每帧都回收，0表示不在滚动过程中回收不可见节点"
            })
        ],
        e.prototype,
        "recycleInterval",
        void 0
    );
    __decorate(
        [
            u({
                type: [C],
                visible: !0,
                displayName: "Register Cells",
                tooltip: "配置此列表内需要用到的 cell 节点类型"
            })
        ],
        e.prototype,
        "registerCellForEditor",
        void 0
    );
    return (n = __decorate([l, h, p(-1), f("https://gitee.com/568071718/creator-collection-view-doc")], e));
})(v);
exports.YXCollectionView = B;
