var i;
var a;
var s;
var c;
var l = cc._decorator;
var u = l.ccclass;
var p = l.property;
var h = l.disallowMultiple;
var f = l.menu;
var d = l.executionOrder;
var m = l.requireComponent;
var $listItem = require("./ListItem");
(function (t) {
    t[(t.NODE = 1)] = "NODE";
    t[(t.PREFAB = 2)] = "PREFAB";
})(a || (a = {}));
(function (t) {
    t[(t.NORMAL = 1)] = "NORMAL";
    t[(t.ADHERING = 2)] = "ADHERING";
    t[(t.PAGE = 3)] = "PAGE";
})(s || (s = {}));
(function (t) {
    t[(t.NONE = 0)] = "NONE";
    t[(t.SINGLE = 1)] = "SINGLE";
    t[(t.MULT = 2)] = "MULT";
})(c || (c = {}));
var _ = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.templateType = a.NODE;
        e.tmpNode = null;
        e.tmpPrefab = null;
        e._slideMode = s.NORMAL;
        e.pageDistance = 0.3;
        e.pageItemNum = 1;
        e.pageChangeEvent = new cc.Component.EventHandler();
        e._virtual = !0;
        e.cyclic = !1;
        e.lackCenter = !1;
        e.lackSlide = !1;
        e._updateRate = 0;
        e.frameByFrameRenderNum = 0;
        e.renderEvent = new cc.Component.EventHandler();
        e.selectedMode = c.NONE;
        e.repeatEventSingle = !1;
        e.selectedEvent = new cc.Component.EventHandler();
        e._selectedId = -1;
        e._forceUpdate = !1;
        e._updateDone = !0;
        e._numItems = 0;
        e._inited = !1;
        e._needUpdateWidget = !1;
        e._aniDelRuning = !1;
        e._doneAfterUpdate = !1;
        e.adhering = !1;
        e._adheringBarrier = !1;
        e.curPageNum = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "slideMode", {
        get: function () {
            return this._slideMode;
        },
        set: function (t) {
            this._slideMode = t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "virtual", {
        get: function () {
            return this._virtual;
        },
        set: function (t) {
            if (null != t) {
                this._virtual = t;
            }
            if (0 != this._numItems) {
                this._onScrolling();
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "updateRate", {
        get: function () {
            return this._updateRate;
        },
        set: function (t) {
            if (t >= 0 && t <= 6) {
                this._updateRate = t;
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "selectedId", {
        get: function () {
            return this._selectedId;
        },
        set: function (t) {
            var e;
            var n = this;
            switch (n.selectedMode) {
                case c.SINGLE:
                    if (!n.repeatEventSingle && t == n._selectedId) {
                        return;
                    }
                    e = n.getItemByListId(t);
                    var i = void 0;
                    if (n._selectedId >= 0) {
                        n._lastSelectedId = n._selectedId;
                    } else {
                        n._lastSelectedId = null;
                    }
                    n._selectedId = t;
                    if (e) {
                        (i = e.getComponent($listItem.default)).selected = !0;
                    }
                    if (n._lastSelectedId >= 0 && n._lastSelectedId != n._selectedId) {
                        var o = n.getItemByListId(n._lastSelectedId);
                        if (o) {
                            o.getComponent($listItem.default).selected = !1;
                        }
                    }
                    if (n.selectedEvent) {
                        cc.Component.EventHandler.emitEvents(
                            [n.selectedEvent],
                            e,
                            t % this._actualNumItems,
                            null == n._lastSelectedId ? null : n._lastSelectedId % this._actualNumItems
                        );
                    }
                    break;
                case c.MULT:
                    if (!(e = n.getItemByListId(t))) {
                        return;
                    }
                    i = e.getComponent($listItem.default);
                    if (n._selectedId >= 0) {
                        n._lastSelectedId = n._selectedId;
                    }
                    n._selectedId = t;
                    var r = !i.selected;
                    i.selected = r;
                    var a = n.multSelected.indexOf(t);
                    if (r && a < 0) {
                        n.multSelected.push(t);
                    } else {
                        if (!r && a >= 0) {
                            n.multSelected.splice(a, 1);
                        }
                    }
                    if (n.selectedEvent) {
                        cc.Component.EventHandler.emitEvents(
                            [n.selectedEvent],
                            e,
                            t % this._actualNumItems,
                            null == n._lastSelectedId ? null : n._lastSelectedId % this._actualNumItems,
                            r
                        );
                    }
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "numItems", {
        get: function () {
            return this._actualNumItems;
        },
        set: function (t) {
            var e = this;
            if (e.checkInited(!1)) {
                if (null == t || t < 0) {
                    cc.error("numItems set the wrong::", t);
                } else if (((e._actualNumItems = e._numItems = t), (e._forceUpdate = !0), e._virtual)) {
                    e._resizeContent();
                    e.cyclic && (e._numItems = e._cyclicNum * e._numItems);
                    e._onScrolling();
                    e.frameByFrameRenderNum ||
                        e.slideMode != s.PAGE ||
                        (e.curPageNum = Math.floor(e.nearestListId / e.pageItemNum));
                } else {
                    if (e.cyclic) {
                        e._resizeContent();
                        e._numItems = e._cyclicNum * e._numItems;
                    }
                    var n = e.content.getComponent(cc.Layout);
                    if (n) {
                        n.enabled = !0;
                    }
                    e._delRedundantItem();
                    e.firstListId = 0;
                    if (e.frameByFrameRenderNum > 0) {
                        for (
                            var i = e.frameByFrameRenderNum > e._numItems ? e._numItems : e.frameByFrameRenderNum,
                                o = 0;
                            o < i;
                            o++
                        ) {
                            e._createOrUpdateItem2(o);
                        }
                        if (e.frameByFrameRenderNum < e._numItems) {
                            e._updateCounter = e.frameByFrameRenderNum;
                            e._updateDone = !1;
                        }
                    } else {
                        for (o = 0; o < e._numItems; o++) {
                            e._createOrUpdateItem2(o);
                        }
                        e.displayItemNum = e._numItems;
                    }
                }
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "scrollView", {
        get: function () {
            return this._scrollView;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {
        this._init();
    };
    e.prototype.onDestroy = function () {
        var t = this;
        if (cc.isValid(t._itemTmp)) {
            t._itemTmp.destroy();
        }
        if (cc.isValid(t.tmpNode)) {
            t.tmpNode.destroy();
        }
        if (t._pool) {
            t._pool.clear();
        }
    };
    e.prototype.onEnable = function () {
        this._registerEvent();
        this._init();
        if (this._aniDelRuning) {
            this._aniDelRuning = !1;
            if (this._aniDelItem) {
                if (this._aniDelBeforePos) {
                    this._aniDelItem.position = this._aniDelBeforePos;
                    delete this._aniDelBeforePos;
                }
                if (this._aniDelBeforeScale) {
                    this._aniDelItem.scale = this._aniDelBeforeScale;
                    delete this._aniDelBeforeScale;
                }
                delete this._aniDelItem;
            }
            if (this._aniDelCB) {
                this._aniDelCB();
                delete this._aniDelCB;
            }
        }
    };
    e.prototype.onDisable = function () {
        this._unregisterEvent();
    };
    e.prototype._registerEvent = function () {
        var t = this;
        t.node.on(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, !0);
        t.node.on("touch-up", t._onTouchUp, t);
        t.node.on(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, !0);
        t.node.on("scroll-began", t._onScrollBegan, t, !0);
        t.node.on("scroll-ended", t._onScrollEnded, t, !0);
        t.node.on("scrolling", t._onScrolling, t, !0);
        t.node.on(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
    };
    e.prototype._unregisterEvent = function () {
        var t = this;
        t.node.off(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, !0);
        t.node.off("touch-up", t._onTouchUp, t);
        t.node.off(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, !0);
        t.node.off("scroll-began", t._onScrollBegan, t, !0);
        t.node.off("scroll-ended", t._onScrollEnded, t, !0);
        t.node.off("scrolling", t._onScrolling, t, !0);
        t.node.off(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
    };
    e.prototype._init = function () {
        var t = this;
        if (!t._inited) {
            t._scrollView = t.node.getComponent(cc.ScrollView);
            t.content = t._scrollView.content;
            if (t.content) {
                t._layout = t.content.getComponent(cc.Layout);
                t._align = t._layout.type;
                t._resizeMode = t._layout.resizeMode;
                t._startAxis = t._layout.startAxis;
                t._topGap = t._layout.paddingTop;
                t._rightGap = t._layout.paddingRight;
                t._bottomGap = t._layout.paddingBottom;
                t._leftGap = t._layout.paddingLeft;
                t._columnGap = t._layout.spacingX;
                t._lineGap = t._layout.spacingY;
                t._colLineNum;
                t._verticalDir = t._layout.verticalDirection;
                t._horizontalDir = t._layout.horizontalDirection;
                t.setTemplateItem(cc.instantiate(t.templateType == a.PREFAB ? t.tmpPrefab : t.tmpNode));
                if (t._slideMode != s.ADHERING && t._slideMode != s.PAGE) {
                    //
                } else {
                    t._scrollView.inertia = !1;
                    t._scrollView._onMouseWheel = function () {};
                }
                if (t.virtual) {
                    //
                } else {
                    t.lackCenter = !1;
                }
                t._lastDisplayData = [];
                t.displayData = [];
                t._pool = new cc.NodePool();
                t._forceUpdate = !1;
                t._updateCounter = 0;
                t._updateDone = !0;
                t.curPageNum = 0;
                if (t.cyclic) {
                    t._scrollView._processAutoScrolling = this._processAutoScrolling.bind(t);
                    t._scrollView._startBounceBackIfNeeded = function () {
                        return !1;
                    };
                }
                switch (t._align) {
                    case cc.Layout.Type.HORIZONTAL:
                        switch (t._horizontalDir) {
                            case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                t._alignCalcType = 1;
                                break;
                            case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                t._alignCalcType = 2;
                        }
                        break;
                    case cc.Layout.Type.VERTICAL:
                        switch (t._verticalDir) {
                            case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                t._alignCalcType = 3;
                                break;
                            case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                t._alignCalcType = 4;
                        }
                        break;
                    case cc.Layout.Type.GRID:
                        switch (t._startAxis) {
                            case cc.Layout.AxisDirection.HORIZONTAL:
                                switch (t._verticalDir) {
                                    case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                        t._alignCalcType = 3;
                                        break;
                                    case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                        t._alignCalcType = 4;
                                }
                                break;
                            case cc.Layout.AxisDirection.VERTICAL:
                                switch (t._horizontalDir) {
                                    case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                        t._alignCalcType = 1;
                                        break;
                                    case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                        t._alignCalcType = 2;
                                }
                        }
                }
                t.content.children.forEach(function (e) {
                    e.removeFromParent();
                    if (e != t.tmpNode && e.isValid) {
                        e.destroy();
                    }
                });
                t._inited = !0;
            } else {
                cc.error(t.node.name + "'s cc.ScrollView unset content!");
            }
        }
    };
    e.prototype._processAutoScrolling = function (t) {
        this._scrollView._autoScrollAccumulatedTime += 1 * t;
        var e = Math.min(1, this._scrollView._autoScrollAccumulatedTime / this._scrollView._autoScrollTotalTime);
        if (this._scrollView._autoScrollAttenuate) {
            var n = e - 1;
            e = n * n * n * n * n + 1;
        }
        var i = this._scrollView._autoScrollStartPosition.add(this._scrollView._autoScrollTargetDelta.mul(e));
        var o = this._scrollView.getScrollEndedEventTiming();
        var r = Math.abs(e - 1) <= o;
        if (
            Math.abs(e - 1) <= this._scrollView.getScrollEndedEventTiming() &&
            !this._scrollView._isScrollEndedWithThresholdEventFired
        ) {
            this._scrollView._dispatchEvent("scroll-ended-with-threshold");
            this._scrollView._isScrollEndedWithThresholdEventFired = !0;
        }
        if (r) {
            this._scrollView._autoScrolling = !1;
        }
        var a = i.sub(this._scrollView.getContentPosition());
        this._scrollView._moveContent(this._scrollView._clampDelta(a), r);
        this._scrollView._dispatchEvent("scrolling");
        if (this._scrollView._autoScrolling) {
            //
        } else {
            this._scrollView._isBouncing = !1;
            this._scrollView._scrolling = !1;
            this._scrollView._dispatchEvent("scroll-ended");
        }
    };
    e.prototype.setTemplateItem = function (t) {
        if (t) {
            var e = this;
            e._itemTmp = t;
            if (e._resizeMode == cc.Layout.ResizeMode.CHILDREN) {
                e._itemSize = e._layout.cellSize;
            } else {
                e._itemSize = cc.size(t.width, t.height);
            }
            var n = t.getComponent($listItem.default);
            var i = !1;
            if (n) {
                //
            } else {
                i = !0;
            }
            if (i) {
                e.selectedMode = c.NONE;
            }
            if ((n = t.getComponent(cc.Widget)) && n.enabled) {
                e._needUpdateWidget = !0;
            }
            if (e.selectedMode == c.MULT) {
                e.multSelected = [];
            }
            switch (e._align) {
                case cc.Layout.Type.HORIZONTAL:
                    e._colLineNum = 1;
                    e._sizeType = !1;
                    break;
                case cc.Layout.Type.VERTICAL:
                    e._colLineNum = 1;
                    e._sizeType = !0;
                    break;
                case cc.Layout.Type.GRID:
                    switch (e._startAxis) {
                        case cc.Layout.AxisDirection.HORIZONTAL:
                            var o = e.content.width - e._leftGap - e._rightGap;
                            e._colLineNum = Math.floor((o + e._columnGap) / (e._itemSize.width + e._columnGap));
                            e._sizeType = !0;
                            break;
                        case cc.Layout.AxisDirection.VERTICAL:
                            var r = e.content.height - e._topGap - e._bottomGap;
                            e._colLineNum = Math.floor((r + e._lineGap) / (e._itemSize.height + e._lineGap));
                            e._sizeType = !1;
                    }
            }
        }
    };
    e.prototype.checkInited = function (t) {
        if (void 0 === t) {
            t = !0;
        }
        return !!this._inited || (t && cc.error("List initialization not completed!"), !1);
    };
    e.prototype._resizeContent = function () {
        var t;
        var e = this;
        switch (e._align) {
            case cc.Layout.Type.HORIZONTAL:
                if (e._customSize) {
                    var n = e._getFixedSize(null);
                    t =
                        e._leftGap +
                        n.val +
                        e._itemSize.width * (e._numItems - n.count) +
                        e._columnGap * (e._numItems - 1) +
                        e._rightGap;
                } else {
                    t = e._leftGap + e._itemSize.width * e._numItems + e._columnGap * (e._numItems - 1) + e._rightGap;
                }
                break;
            case cc.Layout.Type.VERTICAL:
                if (e._customSize) {
                    n = e._getFixedSize(null);
                    t =
                        e._topGap +
                        n.val +
                        e._itemSize.height * (e._numItems - n.count) +
                        e._lineGap * (e._numItems - 1) +
                        e._bottomGap;
                } else {
                    t = e._topGap + e._itemSize.height * e._numItems + e._lineGap * (e._numItems - 1) + e._bottomGap;
                }
                break;
            case cc.Layout.Type.GRID:
                switch ((e.lackCenter && (e.lackCenter = !1), e._startAxis)) {
                    case cc.Layout.AxisDirection.HORIZONTAL:
                        var i = Math.ceil(e._numItems / e._colLineNum);
                        t = e._topGap + e._itemSize.height * i + e._lineGap * (i - 1) + e._bottomGap;
                        break;
                    case cc.Layout.AxisDirection.VERTICAL:
                        var o = Math.ceil(e._numItems / e._colLineNum);
                        t = e._leftGap + e._itemSize.width * o + e._columnGap * (o - 1) + e._rightGap;
                }
        }
        var r = e.content.getComponent(cc.Layout);
        if (r) {
            r.enabled = !1;
        }
        e._allItemSize = t;
        e._allItemSizeNoEdge = e._allItemSize - (e._sizeType ? e._topGap + e._bottomGap : e._leftGap + e._rightGap);
        if (e.cyclic) {
            var a = null;
            if (e._sizeType) {
                a = e.node.height;
            } else {
                a = e.node.width;
            }
            e._cyclicPos1 = 0;
            a -= e._cyclicPos1;
            e._cyclicNum = Math.ceil(a / e._allItemSizeNoEdge) + 1;
            var s = null;
            if (e._sizeType) {
                s = e._lineGap;
            } else {
                s = e._columnGap;
            }
            e._cyclicPos2 = e._cyclicPos1 + e._allItemSizeNoEdge + s;
            e._cyclicAllItemSize = e._allItemSize + e._allItemSizeNoEdge * (e._cyclicNum - 1) + s * (e._cyclicNum - 1);
            e._cycilcAllItemSizeNoEdge = e._allItemSizeNoEdge * e._cyclicNum;
            e._cycilcAllItemSizeNoEdge += s * (e._cyclicNum - 1);
        }
        e._lack = !e.cyclic && e._allItemSize < (e._sizeType ? e.node.height : e.node.width);
        var c = null;
        if ((e._lack && e.lackCenter) || !e.lackSlide) {
            c = 0.1;
        } else {
            c = 0;
        }
        var l = null;
        if (e._lack) {
            l = (e._sizeType ? e.node.height : e.node.width) - c;
        } else {
            if (e.cyclic) {
                l = e._cyclicAllItemSize;
            } else {
                l = e._allItemSize;
            }
        }
        if (l < 0) {
            l = 0;
        }
        if (e._sizeType) {
            e.content.height = l;
        } else {
            e.content.width = l;
        }
    };
    e.prototype._onScrolling = function (t) {
        if (void 0 === t) {
            t = null;
        }
        if (null == this.frameCount) {
            this.frameCount = this._updateRate;
        }
        if (!this._forceUpdate && t && "scroll-ended" != t.type && this.frameCount > 0) {
            this.frameCount--;
        } else if (((this.frameCount = this._updateRate), !this._aniDelRuning)) {
            if (this.cyclic) {
                var e = this.content.getPosition();
                if (this._sizeType) {
                    e = e.y;
                } else {
                    e = e.x;
                }
                var n = this._allItemSizeNoEdge + (this._sizeType ? this._lineGap : this._columnGap);
                var i = null;
                if (this._sizeType) {
                    i = cc.v2(0, n);
                } else {
                    i = cc.v2(n, 0);
                }
                switch (this._alignCalcType) {
                    case 1:
                        if (e > -this._cyclicPos1) {
                            this.content.x = -this._cyclicPos2;
                            this._scrollView.isAutoScrolling() &&
                                (this._scrollView._autoScrollStartPosition =
                                    this._scrollView._autoScrollStartPosition.sub(i));
                        } else {
                            if (e < -this._cyclicPos2) {
                                this.content.x = -this._cyclicPos1;
                                if (this._scrollView.isAutoScrolling()) {
                                    this._scrollView._autoScrollStartPosition =
                                        this._scrollView._autoScrollStartPosition.add(i);
                                }
                            }
                        }
                        break;
                    case 2:
                        if (e < this._cyclicPos1) {
                            this.content.x = this._cyclicPos2;
                            this._scrollView.isAutoScrolling() &&
                                (this._scrollView._autoScrollStartPosition =
                                    this._scrollView._autoScrollStartPosition.add(i));
                        } else {
                            if (e > this._cyclicPos2) {
                                this.content.x = this._cyclicPos1;
                                if (this._scrollView.isAutoScrolling()) {
                                    this._scrollView._autoScrollStartPosition =
                                        this._scrollView._autoScrollStartPosition.sub(i);
                                }
                            }
                        }
                        break;
                    case 3:
                        if (e < this._cyclicPos1) {
                            this.content.y = this._cyclicPos2;
                            this._scrollView.isAutoScrolling() &&
                                (this._scrollView._autoScrollStartPosition =
                                    this._scrollView._autoScrollStartPosition.add(i));
                        } else {
                            if (e > this._cyclicPos2) {
                                this.content.y = this._cyclicPos1;
                                if (this._scrollView.isAutoScrolling()) {
                                    this._scrollView._autoScrollStartPosition =
                                        this._scrollView._autoScrollStartPosition.sub(i);
                                }
                            }
                        }
                        break;
                    case 4:
                        if (e > -this._cyclicPos1) {
                            this.content.y = -this._cyclicPos2;
                            this._scrollView.isAutoScrolling() &&
                                (this._scrollView._autoScrollStartPosition =
                                    this._scrollView._autoScrollStartPosition.sub(i));
                        } else {
                            if (e < -this._cyclicPos2) {
                                this.content.y = -this._cyclicPos1;
                                if (this._scrollView.isAutoScrolling()) {
                                    this._scrollView._autoScrollStartPosition =
                                        this._scrollView._autoScrollStartPosition.add(i);
                                }
                            }
                        }
                }
            }
            var o;
            var r;
            var a;
            var s;
            this._calcViewPos();
            if (this._sizeType) {
                o = this.viewTop;
                a = this.viewBottom;
            } else {
                r = this.viewRight;
                s = this.viewLeft;
            }
            if (this._virtual) {
                this.displayData = [];
                var c = void 0;
                var l = 0;
                var u = this._numItems - 1;
                if (this._customSize) {
                    for (var p = !1; l <= u && !p; l++) {
                        c = this._calcItemPos(l);
                        switch (this._align) {
                            case cc.Layout.Type.HORIZONTAL:
                                if (c.right >= s && c.left <= r) {
                                    this.displayData.push(c);
                                } else {
                                    if (0 != l && this.displayData.length > 0) {
                                        p = !0;
                                    }
                                }
                                break;
                            case cc.Layout.Type.VERTICAL:
                                if (c.bottom <= o && c.top >= a) {
                                    this.displayData.push(c);
                                } else {
                                    if (0 != l && this.displayData.length > 0) {
                                        p = !0;
                                    }
                                }
                                break;
                            case cc.Layout.Type.GRID:
                                switch (this._startAxis) {
                                    case cc.Layout.AxisDirection.HORIZONTAL:
                                        if (c.bottom <= o && c.top >= a) {
                                            this.displayData.push(c);
                                        } else {
                                            if (0 != l && this.displayData.length > 0) {
                                                p = !0;
                                            }
                                        }
                                        break;
                                    case cc.Layout.AxisDirection.VERTICAL:
                                        if (c.right >= s && c.left <= r) {
                                            this.displayData.push(c);
                                        } else {
                                            if (0 != l && this.displayData.length > 0) {
                                                p = !0;
                                            }
                                        }
                                }
                        }
                    }
                } else {
                    var h = this._itemSize.width + this._columnGap;
                    var f = this._itemSize.height + this._lineGap;
                    switch (this._alignCalcType) {
                        case 1:
                            l = (s - this._leftGap) / h;
                            u = (r - this._leftGap) / h;
                            break;
                        case 2:
                            l = (-r - this._rightGap) / h;
                            u = (-s - this._rightGap) / h;
                            break;
                        case 3:
                            l = (-o - this._topGap) / f;
                            u = (-a - this._topGap) / f;
                            break;
                        case 4:
                            l = (a - this._bottomGap) / f;
                            u = (o - this._bottomGap) / f;
                    }
                    l = Math.floor(l) * this._colLineNum;
                    u = Math.ceil(u) * this._colLineNum;
                    if (l < 0) {
                        l = 0;
                    }
                    for (--u >= this._numItems && (u = this._numItems - 1); l <= u; l++) {
                        this.displayData.push(this._calcItemPos(l));
                    }
                }
                this._delRedundantItem();
                if (this.displayData.length <= 0 || !this._numItems) {
                    return void (this._lastDisplayData = []);
                }
                this.firstListId = this.displayData[0].id;
                this.displayItemNum = this.displayData.length;
                var d = this._lastDisplayData.length;
                var m = this.displayItemNum != d;
                if (m) {
                    if (this.frameByFrameRenderNum > 0) {
                        this._lastDisplayData.sort(function (t, e) {
                            return t - e;
                        });
                    }
                    m =
                        this.firstListId != this._lastDisplayData[0] ||
                        this.displayData[this.displayItemNum - 1].id != this._lastDisplayData[d - 1];
                }
                if (this._forceUpdate || m) {
                    if (this.frameByFrameRenderNum > 0) {
                        if (this._numItems > 0) {
                            if (this._updateDone) {
                                this._updateCounter = 0;
                            } else {
                                this._doneAfterUpdate = !0;
                            }
                            this._updateDone = !1;
                        } else {
                            this._updateCounter = 0;
                            this._updateDone = !0;
                        }
                    } else {
                        this._lastDisplayData = [];
                        for (var y = 0; y < this.displayItemNum; y++) {
                            this._createOrUpdateItem(this.displayData[y]);
                        }
                        this._forceUpdate = !1;
                    }
                }
                this._calcNearestItem();
            }
        }
    };
    e.prototype._calcViewPos = function () {
        var t = this.content.getPosition();
        switch (this._alignCalcType) {
            case 1:
                this.elasticLeft = t.x > 0 ? t.x : 0;
                this.viewLeft = (t.x < 0 ? -t.x : 0) - this.elasticLeft;
                this.viewRight = this.viewLeft + this.node.width;
                this.elasticRight =
                    this.viewRight > this.content.width ? Math.abs(this.viewRight - this.content.width) : 0;
                this.viewRight += this.elasticRight;
                break;
            case 2:
                this.elasticRight = t.x < 0 ? -t.x : 0;
                this.viewRight = (t.x > 0 ? -t.x : 0) + this.elasticRight;
                this.viewLeft = this.viewRight - this.node.width;
                this.elasticLeft =
                    this.viewLeft < -this.content.width ? Math.abs(this.viewLeft + this.content.width) : 0;
                this.viewLeft -= this.elasticLeft;
                break;
            case 3:
                this.elasticTop = t.y < 0 ? Math.abs(t.y) : 0;
                this.viewTop = (t.y > 0 ? -t.y : 0) + this.elasticTop;
                this.viewBottom = this.viewTop - this.node.height;
                this.elasticBottom =
                    this.viewBottom < -this.content.height ? Math.abs(this.viewBottom + this.content.height) : 0;
                this.viewBottom += this.elasticBottom;
                break;
            case 4:
                this.elasticBottom = t.y > 0 ? Math.abs(t.y) : 0;
                this.viewBottom = (t.y < 0 ? -t.y : 0) - this.elasticBottom;
                this.viewTop = this.viewBottom + this.node.height;
                this.elasticTop = this.viewTop > this.content.height ? Math.abs(this.viewTop - this.content.height) : 0;
                this.viewTop -= this.elasticTop;
        }
    };
    e.prototype._calcItemPos = function (t) {
        var e;
        var n;
        var i;
        var o;
        var r;
        var a;
        var s;
        var c;
        switch (this._align) {
            case cc.Layout.Type.HORIZONTAL:
                switch (this._horizontalDir) {
                    case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                        if (this._customSize) {
                            var l = this._getFixedSize(t);
                            r =
                                this._leftGap +
                                (this._itemSize.width + this._columnGap) * (t - l.count) +
                                (l.val + this._columnGap * l.count);
                            if ((u = this._customSize[t]) > 0) {
                                e = u;
                            } else {
                                e = this._itemSize.width;
                            }
                        } else {
                            r = this._leftGap + (this._itemSize.width + this._columnGap) * t;
                            e = this._itemSize.width;
                        }
                        if (this.lackCenter) {
                            r -= this._leftGap;
                            r += this.content.width / 2 - this._allItemSizeNoEdge / 2;
                        }
                        return {
                            id: t,
                            left: r,
                            right: (a = r + e),
                            x: r + this._itemTmp.anchorX * e,
                            y: this._itemTmp.y
                        };
                    case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                        if (this._customSize) {
                            l = this._getFixedSize(t);
                            a =
                                -this._rightGap -
                                (this._itemSize.width + this._columnGap) * (t - l.count) -
                                (l.val + this._columnGap * l.count);
                            if ((u = this._customSize[t]) > 0) {
                                e = u;
                            } else {
                                e = this._itemSize.width;
                            }
                        } else {
                            a = -this._rightGap - (this._itemSize.width + this._columnGap) * t;
                            e = this._itemSize.width;
                        }
                        if (this.lackCenter) {
                            a += this._rightGap;
                            a -= this.content.width / 2 - this._allItemSizeNoEdge / 2;
                        }
                        return {
                            id: t,
                            right: a,
                            left: (r = a - e),
                            x: r + this._itemTmp.anchorX * e,
                            y: this._itemTmp.y
                        };
                }
                break;
            case cc.Layout.Type.VERTICAL:
                switch (this._verticalDir) {
                    case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                        if (this._customSize) {
                            l = this._getFixedSize(t);
                            i =
                                -this._topGap -
                                (this._itemSize.height + this._lineGap) * (t - l.count) -
                                (l.val + this._lineGap * l.count);
                            if ((u = this._customSize[t]) > 0) {
                                n = u;
                            } else {
                                n = this._itemSize.height;
                            }
                        } else {
                            i = -this._topGap - (this._itemSize.height + this._lineGap) * t;
                            n = this._itemSize.height;
                        }
                        if (this.lackCenter) {
                            i += this._topGap;
                            i -= this.content.height / 2 - this._allItemSizeNoEdge / 2;
                        }
                        return {
                            id: t,
                            top: i,
                            bottom: (o = i - n),
                            x: this._itemTmp.x,
                            y: o + this._itemTmp.anchorY * n
                        };
                    case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                        var u;
                        if (this._customSize) {
                            l = this._getFixedSize(t);
                            o =
                                this._bottomGap +
                                (this._itemSize.height + this._lineGap) * (t - l.count) +
                                (l.val + this._lineGap * l.count);
                            if ((u = this._customSize[t]) > 0) {
                                n = u;
                            } else {
                                n = this._itemSize.height;
                            }
                        } else {
                            o = this._bottomGap + (this._itemSize.height + this._lineGap) * t;
                            n = this._itemSize.height;
                        }
                        if (this.lackCenter) {
                            o -= this._bottomGap;
                            o += this.content.height / 2 - this._allItemSizeNoEdge / 2;
                        }
                        return {
                            id: t,
                            top: (i = o + n),
                            bottom: o,
                            x: this._itemTmp.x,
                            y: o + this._itemTmp.anchorY * n
                        };
                }
            case cc.Layout.Type.GRID:
                var p = Math.floor(t / this._colLineNum);
                switch (this._startAxis) {
                    case cc.Layout.AxisDirection.HORIZONTAL:
                        switch (this._verticalDir) {
                            case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                c =
                                    (o =
                                        (i = -this._topGap - (this._itemSize.height + this._lineGap) * p) -
                                        this._itemSize.height) +
                                    this._itemTmp.anchorY * this._itemSize.height;
                                break;
                            case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                i =
                                    (o = this._bottomGap + (this._itemSize.height + this._lineGap) * p) +
                                    this._itemSize.height;
                                c = o + this._itemTmp.anchorY * this._itemSize.height;
                        }
                        switch (
                            ((s = this._leftGap + (t % this._colLineNum) * (this._itemSize.width + this._columnGap)),
                            this._horizontalDir)
                        ) {
                            case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                s += this._itemTmp.anchorX * this._itemSize.width;
                                s -= this.content.anchorX * this.content.width;
                                break;
                            case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                s += (1 - this._itemTmp.anchorX) * this._itemSize.width;
                                s -= (1 - this.content.anchorX) * this.content.width;
                                s *= -1;
                        }
                        return {
                            id: t,
                            top: i,
                            bottom: o,
                            x: s,
                            y: c
                        };
                    case cc.Layout.AxisDirection.VERTICAL:
                        switch (this._horizontalDir) {
                            case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                a =
                                    (r = this._leftGap + (this._itemSize.width + this._columnGap) * p) +
                                    this._itemSize.width;
                                s = r + this._itemTmp.anchorX * this._itemSize.width;
                                s -= this.content.anchorX * this.content.width;
                                break;
                            case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                s =
                                    (r =
                                        (a = -this._rightGap - (this._itemSize.width + this._columnGap) * p) -
                                        this._itemSize.width) +
                                    this._itemTmp.anchorX * this._itemSize.width;
                                s += (1 - this.content.anchorX) * this.content.width;
                        }
                        switch (
                            ((c = -this._topGap - (t % this._colLineNum) * (this._itemSize.height + this._lineGap)),
                            this._verticalDir)
                        ) {
                            case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                c -= (1 - this._itemTmp.anchorY) * this._itemSize.height;
                                c += (1 - this.content.anchorY) * this.content.height;
                                break;
                            case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                c -= this._itemTmp.anchorY * this._itemSize.height;
                                c += this.content.anchorY * this.content.height;
                                c *= -1;
                        }
                        return {
                            id: t,
                            left: r,
                            right: a,
                            x: s,
                            y: c
                        };
                }
        }
    };
    e.prototype._calcExistItemPos = function (t) {
        var e = this.getItemByListId(t);
        if (!e) {
            return null;
        }
        var n = {
            id: t,
            x: e.x,
            y: e.y
        };
        if (this._sizeType) {
            n.top = e.y + e.height * (1 - e.anchorY);
            n.bottom = e.y - e.height * e.anchorY;
        } else {
            n.left = e.x - e.width * e.anchorX;
            n.right = e.x + e.width * (1 - e.anchorX);
        }
        return n;
    };
    e.prototype.getItemPos = function (t) {
        if (this._virtual || this.frameByFrameRenderNum) {
            return this._calcItemPos(t);
        } else {
            return this._calcExistItemPos(t);
        }
    };
    e.prototype._getFixedSize = function (t) {
        if (!this._customSize) {
            return null;
        }
        if (null == t) {
            t = this._numItems;
        }
        var e = 0;
        var n = 0;
        for (var i in this._customSize)
            if (parseInt(i) < t) {
                e += this._customSize[i];
                n++;
            }
        return {
            val: e,
            count: n
        };
    };
    e.prototype._onScrollBegan = function () {
        if (this._sizeType) {
            this._beganPos = this.viewTop;
        } else {
            this._beganPos = this.viewLeft;
        }
    };
    e.prototype._onScrollEnded = function () {
        var t = this;
        t.curScrollIsTouch = !1;
        if (null != t.scrollToListId) {
            var e = t.getItemByListId(t.scrollToListId);
            t.scrollToListId = null;
            if (e) {
                cc.tween(e)
                    .to(0.1, {
                        scale: 1.06
                    })
                    .to(0.1, {
                        scale: 1
                    })
                    .start();
            }
        }
        t._onScrolling();
        if (t._slideMode != s.ADHERING || t.adhering) {
            if (t._slideMode == s.PAGE) {
                if (null != t._beganPos && t.curScrollIsTouch) {
                    this._pageAdhere();
                } else {
                    t.adhere();
                }
            }
        } else {
            t.adhere();
        }
    };
    e.prototype._onTouchStart = function (t, e) {
        if (
            !this._scrollView.hasNestedViewGroup(t, e) &&
            ((this.curScrollIsTouch = !0), t.eventPhase !== cc.Event.AT_TARGET || t.target !== this.node)
        ) {
            for (var n = t.target; null == n._listId && n.parent; ) {
                n = n.parent;
            }
            if (null != n._listId) {
                this._scrollItem = n;
            } else {
                this._scrollItem = t.target;
            }
        }
    };
    e.prototype._onTouchUp = function () {
        var t = this;
        t._scrollPos = null;
        if (t._slideMode == s.ADHERING) {
            this.adhering && (this._adheringBarrier = !0);
            t.adhere();
        } else {
            if (t._slideMode == s.PAGE) {
                if (null != t._beganPos) {
                    this._pageAdhere();
                } else {
                    t.adhere();
                }
            }
        }
        this._scrollItem = null;
    };
    e.prototype._onTouchCancelled = function (t, e) {
        var n = this;
        if (n._scrollView.hasNestedViewGroup(t, e) || t.simulate) {
            //
        } else {
            n._scrollPos = null;
            if (n._slideMode == s.ADHERING) {
                n.adhering && (n._adheringBarrier = !0), n.adhere();
            } else {
                n._slideMode == s.PAGE && (null != n._beganPos ? n._pageAdhere() : n.adhere());
            }
            this._scrollItem = null;
        }
    };
    e.prototype._onSizeChanged = function () {
        if (this.checkInited(!1)) {
            this._onScrolling();
        }
    };
    e.prototype._onItemAdaptive = function (t) {
        if (
            (!this._sizeType && t.width != this._itemSize.width) ||
            (this._sizeType && t.height != this._itemSize.height)
        ) {
            if (this._customSize) {
                //
            } else {
                this._customSize = {};
            }
            var e = null;
            if (this._sizeType) {
                e = t.height;
            } else {
                e = t.width;
            }
            if (this._customSize[t._listId] != e) {
                this._customSize[t._listId] = e;
                this._resizeContent();
                this.updateAll();
                if (null != this._scrollToListId) {
                    this._scrollPos = null;
                    this.unschedule(this._scrollToSo);
                    this.scrollTo(
                        this._scrollToListId,
                        Math.max(0, this._scrollToEndTime - new Date().getTime() / 1e3)
                    );
                }
            }
        }
    };
    e.prototype._pageAdhere = function () {
        var t = this;
        if (t.cyclic || !(t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0)) {
            var e = null;
            if (t._sizeType) {
                e = t.viewTop;
            } else {
                e = t.viewLeft;
            }
            var n = (t._sizeType ? t.node.height : t.node.width) * t.pageDistance;
            if (Math.abs(t._beganPos - e) > n) {
                switch (t._alignCalcType) {
                    case 1:
                    case 4:
                        if (t._beganPos > e) {
                            t.prePage(0.5);
                        } else {
                            t.nextPage(0.5);
                        }
                        break;
                    case 2:
                    case 3:
                        if (t._beganPos < e) {
                            t.prePage(0.5);
                        } else {
                            t.nextPage(0.5);
                        }
                }
            } else {
                if (t.elasticTop <= 0 && t.elasticRight <= 0 && t.elasticBottom <= 0 && t.elasticLeft <= 0) {
                    t.adhere();
                }
            }
            t._beganPos = null;
        }
    };
    e.prototype.adhere = function () {
        var t = this;
        if (t.checkInited() && !(t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0)) {
            t.adhering = !0;
            t._calcNearestItem();
            var e = (t._sizeType ? t._topGap : t._leftGap) / (t._sizeType ? t.node.height : t.node.width);
            t.scrollTo(t.nearestListId, 0.7, e);
        }
    };
    e.prototype.update = function () {
        if (!(this.frameByFrameRenderNum <= 0 || this._updateDone)) {
            if (this._virtual) {
                for (
                    var t =
                            this._updateCounter + this.frameByFrameRenderNum > this.displayItemNum
                                ? this.displayItemNum
                                : this._updateCounter + this.frameByFrameRenderNum,
                        e = this._updateCounter;
                    e < t;
                    e++
                ) {
                    var n = this.displayData[e];
                    if (n) {
                        this._createOrUpdateItem(n);
                    }
                }
                if (this._updateCounter >= this.displayItemNum - 1) {
                    if (this._doneAfterUpdate) {
                        (this._updateCounter = 0), (this._updateDone = !1), (this._doneAfterUpdate = !1);
                    } else {
                        (this._updateDone = !0),
                            this._delRedundantItem(),
                            (this._forceUpdate = !1),
                            this._calcNearestItem(),
                            this.slideMode == s.PAGE &&
                                (this.curPageNum = Math.floor(this.nearestListId / this.pageItemNum));
                    }
                } else {
                    this._updateCounter += this.frameByFrameRenderNum;
                }
            } else if (this._updateCounter < this._numItems) {
                if (this._updateCounter + this.frameByFrameRenderNum > this._numItems) {
                    t = this._numItems;
                } else {
                    t = this._updateCounter + this.frameByFrameRenderNum;
                }
                for (e = this._updateCounter; e < t; e++) {
                    this._createOrUpdateItem2(e);
                }
                this._updateCounter += this.frameByFrameRenderNum;
            } else {
                this._updateDone = !0;
                this._calcNearestItem();
                this.slideMode == s.PAGE && (this.curPageNum = Math.floor(this.nearestListId / this.pageItemNum));
            }
        }
    };
    e.prototype._createOrUpdateItem = function (t) {
        var e = this.getItemByListId(t.id);
        if (e) {
            if (this._forceUpdate && this.renderEvent) {
                e.setPosition(cc.v2(t.x, t.y));
                this._resetItemSize(e);
                if (this.renderEvent) {
                    cc.Component.EventHandler.emitEvents([this.renderEvent], e, t.id % this._actualNumItems);
                }
            }
        } else {
            var n = this._pool.size() > 0;
            if (n) {
                e = this._pool.get();
            } else {
                e = cc.instantiate(this._itemTmp);
            }
            if (n && cc.isValid(e)) {
                //
            } else {
                e = cc.instantiate(this._itemTmp);
                n = !1;
            }
            if (e._listId != t.id) {
                e._listId = t.id;
                e.setContentSize(this._itemSize);
            }
            e.setPosition(cc.v2(t.x, t.y));
            this._resetItemSize(e);
            this.content.addChild(e);
            if (n && this._needUpdateWidget) {
                var i = e.getComponent(cc.Widget);
                if (i) {
                    i.updateAlignment();
                }
            }
            e.setSiblingIndex(this.content.childrenCount - 1);
            var o = e.getComponent($listItem.default);
            e.listItem = o;
            if (o) {
                o.listId = t.id;
                o.list = this;
                o._registerEvent();
            }
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], e, t.id % this._actualNumItems);
            }
        }
        this._resetItemSize(e);
        this._updateListItem(e.listItem);
        if (this._lastDisplayData.indexOf(t.id) < 0) {
            this._lastDisplayData.push(t.id);
        }
    };
    e.prototype._createOrUpdateItem2 = function (t) {
        var e;
        var n = this.content.children[t];
        if (n) {
            if (this._forceUpdate && this.renderEvent) {
                n._listId = t;
                if (e) {
                    e.listId = t;
                }
                if (this.renderEvent) {
                    cc.Component.EventHandler.emitEvents([this.renderEvent], n, t % this._actualNumItems);
                }
            }
        } else {
            (n = cc.instantiate(this._itemTmp))._listId = t;
            this.content.addChild(n);
            e = n.getComponent($listItem.default);
            n.listItem = e;
            e && ((e.listId = t), (e.list = this), e._registerEvent());
            this.renderEvent && cc.Component.EventHandler.emitEvents([this.renderEvent], n, t % this._actualNumItems);
        }
        this._updateListItem(e);
        if (this._lastDisplayData.indexOf(t) < 0) {
            this._lastDisplayData.push(t);
        }
    };
    e.prototype._updateListItem = function (t) {
        if (t && this.selectedMode > c.NONE) {
            var e = t.node;
            switch (this.selectedMode) {
                case c.SINGLE:
                    t.selected = this.selectedId == e._listId;
                    break;
                case c.MULT:
                    t.selected = this.multSelected.indexOf(e._listId) >= 0;
            }
        }
    };
    e.prototype._resetItemSize = function () {};
    e.prototype._updateItemPos = function (t) {
        var e = null;
        if (isNaN(t)) {
            e = t;
        } else {
            e = this.getItemByListId(t);
        }
        var n = this.getItemPos(e._listId);
        e.setPosition(n.x, n.y);
    };
    e.prototype.setMultSelected = function (t, e) {
        var n = this;
        if (n.checkInited()) {
            if (Array.isArray(t)) {
                //
            } else {
                t = [t];
            }
            if (null == e) {
                n.multSelected = t;
            } else {
                var i = void 0;
                var o = void 0;
                if (e) {
                    for (var r = t.length - 1; r >= 0; r--) {
                        i = t[r];
                        (o = n.multSelected.indexOf(i)) < 0 && n.multSelected.push(i);
                    }
                } else {
                    for (r = t.length - 1; r >= 0; r--) {
                        i = t[r];
                        (o = n.multSelected.indexOf(i)) >= 0 && n.multSelected.splice(o, 1);
                    }
                }
            }
            n._forceUpdate = !0;
            n._onScrolling();
        }
    };
    e.prototype.getMultSelected = function () {
        return this.multSelected;
    };
    e.prototype.hasMultSelected = function (t) {
        return this.multSelected && this.multSelected.indexOf(t) >= 0;
    };
    e.prototype.updateItem = function (t) {
        if (this.checkInited()) {
            if (Array.isArray(t)) {
                //
            } else {
                t = [t];
            }
            for (var e = 0, n = t.length; e < n; e++) {
                var i = t[e];
                var o = this.getItemByListId(i);
                if (o) {
                    cc.Component.EventHandler.emitEvents([this.renderEvent], o, i % this._actualNumItems);
                }
            }
        }
    };
    e.prototype.updateAll = function () {
        if (this.checkInited()) {
            this._selectedId = -1;
            this.numItems = this.numItems;
        }
    };
    e.prototype.getItemByListId = function (t) {
        if (this.content) {
            for (var e = this.content.childrenCount - 1; e >= 0; e--) {
                var n = this.content.children[e];
                if (n._listId == t) {
                    return n;
                }
            }
        }
    };
    e.prototype._getOutsideItem = function () {
        for (var t, e = [], n = this.content.childrenCount - 1; n >= 0; n--) {
            t = this.content.children[n];
            this.displayData.find(function (e) {
                return e.id == t._listId;
            }) || e.push(t);
        }
        return e;
    };
    e.prototype._delRedundantItem = function () {
        if (this._virtual) {
            for (var t = this._getOutsideItem(), e = t.length - 1; e >= 0; e--) {
                var n = t[e];
                if (!this._scrollItem || n._listId != this._scrollItem._listId) {
                    n.isCached = !0;
                    this._pool.put(n);
                    for (var i = this._lastDisplayData.length - 1; i >= 0; i--) {
                        if (this._lastDisplayData[i] == n._listId) {
                            this._lastDisplayData.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        } else {
            for (; this.content.childrenCount > this._numItems; ) {
                this._delSingleItem(this.content.children[this.content.childrenCount - 1]);
            }
        }
    };
    e.prototype._delSingleItem = function (t) {
        t.removeFromParent();
        if (t.destroy) {
            t.destroy();
        }
        t = null;
    };
    e.prototype.aniDelItem = function (t, e, n) {
        var i = this;
        if (!i.checkInited() || i.cyclic || !i._virtual) {
            return cc.error("This function is not allowed to be called!");
        }
        if (!e) {
            return cc.error(
                "CallFunc are not allowed to be NULL, You need to delete the corresponding index in the data array in the CallFunc!"
            );
        }
        if (i._aniDelRuning) {
            return cc.warn("Please wait for the current deletion to finish!");
        }
        var o;
        var r = i.getItemByListId(t);
        if (r) {
            o = r.getComponent($listItem.default);
            i._aniDelRuning = !0;
            i._aniDelCB = e;
            i._aniDelItem = r;
            i._aniDelBeforePos = r.position;
            i._aniDelBeforeScale = r.scale;
            var a = i.displayData[i.displayData.length - 1].id;
            var s = o.selected;
            o.showAni(
                n,
                function () {
                    var n;
                    var o;
                    var l;
                    if (a < i._numItems - 2) {
                        n = a + 1;
                    }
                    if (null != n) {
                        var u = i._calcItemPos(n);
                        i.displayData.push(u);
                        if (i._virtual) {
                            i._createOrUpdateItem(u);
                        } else {
                            i._createOrUpdateItem2(n);
                        }
                    } else {
                        i._numItems--;
                    }
                    if (i.selectedMode == c.SINGLE) {
                        if (s) {
                            i._selectedId = -1;
                        } else {
                            if (i._selectedId - 1 >= 0) {
                                i._selectedId--;
                            }
                        }
                    } else if (i.selectedMode == c.MULT && i.multSelected.length) {
                        var p = i.multSelected.indexOf(t);
                        if (p >= 0) {
                            i.multSelected.splice(p, 1);
                        }
                        for (var h = i.multSelected.length - 1; h >= 0; h--) {
                            if ((m = i.multSelected[h]) >= t) {
                                i.multSelected[h]--;
                            }
                        }
                    }
                    if (i._customSize) {
                        if (i._customSize[t]) {
                            delete i._customSize[t];
                        }
                        var f = {};
                        var d = void 0;
                        for (var m in i._customSize) {
                            d = i._customSize[m];
                            var y = parseInt(m);
                            f[y - (y >= t ? 1 : 0)] = d;
                        }
                        i._customSize = f;
                    }
                    if (null != n) {
                        h = n;
                    } else {
                        h = a;
                    }
                    if (l) {
                        //
                    } else {
                        i._aniDelRuning = !1;
                        e(t);
                        i._aniDelCB = null;
                    }
                },
                !0
            );
        } else {
            e(t);
        }
    };
    e.prototype.scrollTo = function (t, e, n, i) {
        if (void 0 === e) {
            e = 0.5;
        }
        if (void 0 === n) {
            n = null;
        }
        if (void 0 === i) {
            i = !1;
        }
        var o = this;
        if (o.checkInited(!1)) {
            if (null == e) {
                e = 0.5;
            } else {
                if (e < 0) {
                    e = 0;
                }
            }
            if (t < 0) {
                t = 0;
            } else {
                if (t >= o._numItems) {
                    t = o._numItems - 1;
                }
            }
            if (!o._virtual && o._layout && o._layout.enabled) {
                o._layout.updateLayout();
            }
            var r;
            var a;
            var s = o.getItemPos(t);
            if (!s) {
                return !1;
            }
            switch (o._alignCalcType) {
                case 1:
                    r = s.left;
                    r -= null != n ? o.node.width * n : o._leftGap;
                    s = cc.v2(r, 0);
                    break;
                case 2:
                    r = s.right - o.node.width;
                    r += null != n ? o.node.width * n : o._rightGap;
                    s = cc.v2(r + o.content.width, 0);
                    break;
                case 3:
                    a = s.top;
                    a += null != n ? o.node.height * n : o._topGap;
                    s = cc.v2(0, -a);
                    break;
                case 4:
                    a = s.bottom + o.node.height;
                    a -= null != n ? o.node.height * n : o._bottomGap;
                    s = cc.v2(0, -a + o.content.height);
            }
            var c = o.content.getPosition();
            c = Math.abs(o._sizeType ? c.y : c.x);
            var l = null;
            if (o._sizeType) {
                l = s.y;
            } else {
                l = s.x;
            }
            if (Math.abs((null != o._scrollPos ? o._scrollPos : c) - l) > 0.5) {
                o._scrollView.scrollToOffset(s, e);
                o._scrollToListId = t;
                o._scrollToEndTime = new Date().getTime() / 1e3 + e;
                o._scrollToSo = o.scheduleOnce(function () {
                    if (o._adheringBarrier) {
                        //
                    } else {
                        o.adhering = o._adheringBarrier = !1;
                    }
                    o._scrollPos = o._scrollToListId = o._scrollToEndTime = o._scrollToSo = null;
                    if (i) {
                        var e = o.getItemByListId(t);
                        if (e) {
                            cc.tween(e)
                                .to(0.1, {
                                    scale: 1.05
                                })
                                .to(0.1, {
                                    scale: 1
                                })
                                .start();
                        }
                    }
                }, e + 0.1);
                if (e <= 0) {
                    o._onScrolling();
                }
            }
        }
    };
    e.prototype._calcNearestItem = function () {
        var t;
        var e;
        var n;
        var i;
        var o;
        var r;
        var a = this;
        a.nearestListId = null;
        if (a._virtual) {
            a._calcViewPos();
        }
        n = a.viewTop;
        i = a.viewRight;
        o = a.viewBottom;
        r = a.viewLeft;
        for (var s = !1, c = 0; c < a.content.childrenCount && !s; c += a._colLineNum) {
            if ((t = a._virtual ? a.displayData[c] : a._calcExistItemPos(c))) {
                if (a._sizeType) {
                    e = (t.top + t.bottom) / 2;
                } else {
                    e = e = (t.left + t.right) / 2;
                }
                switch (a._alignCalcType) {
                    case 1:
                        if (t.right >= r) {
                            a.nearestListId = t.id;
                            if (r > e) {
                                a.nearestListId += a._colLineNum;
                            }
                            s = !0;
                        }
                        break;
                    case 2:
                        if (t.left <= i) {
                            a.nearestListId = t.id;
                            if (i < e) {
                                a.nearestListId += a._colLineNum;
                            }
                            s = !0;
                        }
                        break;
                    case 3:
                        if (t.bottom <= n) {
                            a.nearestListId = t.id;
                            if (n < e) {
                                a.nearestListId += a._colLineNum;
                            }
                            s = !0;
                        }
                        break;
                    case 4:
                        if (t.top >= o) {
                            a.nearestListId = t.id;
                            if (o > e) {
                                a.nearestListId += a._colLineNum;
                            }
                            s = !0;
                        }
                }
            }
        }
        if (
            (t = a._virtual ? a.displayData[a.displayItemNum - 1] : a._calcExistItemPos(a._numItems - 1)) &&
            t.id == a._numItems - 1
        ) {
            if (a._sizeType) {
                e = (t.top + t.bottom) / 2;
            } else {
                e = e = (t.left + t.right) / 2;
            }
            switch (a._alignCalcType) {
                case 1:
                    if (i > e) {
                        a.nearestListId = t.id;
                    }
                    break;
                case 2:
                    if (r < e) {
                        a.nearestListId = t.id;
                    }
                    break;
                case 3:
                    if (o < e) {
                        a.nearestListId = t.id;
                    }
                    break;
                case 4:
                    if (n > e) {
                        a.nearestListId = t.id;
                    }
            }
        }
    };
    e.prototype.prePage = function (t) {
        if (void 0 === t) {
            t = 0.5;
        }
        if (this.checkInited()) {
            this.skipPage(this.curPageNum - 1, t);
        }
    };
    e.prototype.nextPage = function (t) {
        if (void 0 === t) {
            t = 0.5;
        }
        if (this.checkInited()) {
            this.skipPage(this.curPageNum + 1, t);
        }
    };
    e.prototype.skipPage = function (t, e) {
        var n = this;
        if (n.checkInited()) {
            if (n._slideMode != s.PAGE) {
                return cc.error("This function is not allowed to be called, Must SlideMode = PAGE!");
            } else {
                return void (
                    t < 0 ||
                    t * n.pageItemNum >= n._numItems ||
                    (n.curPageNum != t &&
                        ((n.curPageNum = t),
                        n.pageChangeEvent && cc.Component.EventHandler.emitEvents([n.pageChangeEvent], t),
                        n.scrollTo(t * this.pageItemNum, e)))
                );
            }
        }
    };
    e.prototype.calcCustomSize = function (t) {
        var e = this;
        if (e.checkInited()) {
            if (!e._itemTmp) {
                return cc.error("Unset template item!");
            }
            if (!e.renderEvent) {
                return cc.error("Unset Render-Event!");
            }
            e._customSize = {};
            var n = cc.instantiate(e._itemTmp);
            e.content.addChild(n);
            for (var i = 0; i < t; i++) {
                cc.Component.EventHandler.emitEvents([e.renderEvent], n, i);
                (n.height == e._itemSize.height && n.width == e._itemSize.width) ||
                    (e._customSize[i] = e._sizeType ? n.height : n.width);
            }
            if (Object.keys(e._customSize).length) {
                //
            } else {
                e._customSize = null;
            }
            n.removeFromParent();
            if (n.destroy) {
                n.destroy();
            }
            return e._customSize;
        }
    };
    __decorate(
        [
            p({
                type: cc.Enum(a)
            })
        ],
        e.prototype,
        "templateType",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Node,
                visible: function () {
                    return this.templateType == a.NODE;
                }
            })
        ],
        e.prototype,
        "tmpNode",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Prefab,
                visible: function () {
                    return this.templateType == a.PREFAB;
                }
            })
        ],
        e.prototype,
        "tmpPrefab",
        void 0
    );
    __decorate([p()], e.prototype, "_slideMode", void 0);
    __decorate(
        [
            p({
                type: cc.Enum(s)
            })
        ],
        e.prototype,
        "slideMode",
        null
    );
    __decorate(
        [
            p({
                type: cc.Float,
                range: [0, 1, 0.1],
                slide: !0,
                visible: function () {
                    return this._slideMode == s.PAGE;
                }
            })
        ],
        e.prototype,
        "pageDistance",
        void 0
    );
    __decorate(
        [
            p({
                visible: function () {
                    return this._slideMode == s.PAGE;
                }
            })
        ],
        e.prototype,
        "pageItemNum",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Component.EventHandler,
                visible: function () {
                    return this._slideMode == s.PAGE;
                }
            })
        ],
        e.prototype,
        "pageChangeEvent",
        void 0
    );
    __decorate([p()], e.prototype, "_virtual", void 0);
    __decorate(
        [
            p({
                type: cc.Boolean
            })
        ],
        e.prototype,
        "virtual",
        null
    );
    __decorate(
        [
            p({
                visible: function () {
                    var t = this.slideMode == s.NORMAL;
                    if (t) {
                        //
                    } else {
                        this.cyclic = !1;
                    }
                    return t;
                }
            })
        ],
        e.prototype,
        "cyclic",
        void 0
    );
    __decorate(
        [
            p({
                visible: function () {
                    return this.virtual;
                }
            })
        ],
        e.prototype,
        "lackCenter",
        void 0
    );
    __decorate(
        [
            p({
                visible: function () {
                    var t = this.virtual && !this.lackCenter;
                    if (t) {
                        //
                    } else {
                        this.lackSlide = !1;
                    }
                    return t;
                }
            })
        ],
        e.prototype,
        "lackSlide",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Integer
            })
        ],
        e.prototype,
        "_updateRate",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Integer,
                range: [0, 6, 1],
                slide: !0
            })
        ],
        e.prototype,
        "updateRate",
        null
    );
    __decorate(
        [
            p({
                type: cc.Integer,
                range: [0, 12, 1],
                slide: !0
            })
        ],
        e.prototype,
        "frameByFrameRenderNum",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Component.EventHandler
            })
        ],
        e.prototype,
        "renderEvent",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Enum(c)
            })
        ],
        e.prototype,
        "selectedMode",
        void 0
    );
    __decorate(
        [
            p({
                visible: function () {
                    return this.selectedMode == c.SINGLE;
                }
            })
        ],
        e.prototype,
        "repeatEventSingle",
        void 0
    );
    __decorate(
        [
            p({
                type: cc.Component.EventHandler,
                visible: function () {
                    return this.selectedMode > c.NONE;
                }
            })
        ],
        e.prototype,
        "selectedEvent",
        void 0
    );
    __decorate(
        [
            p({
                serializable: !1
            })
        ],
        e.prototype,
        "_numItems",
        void 0
    );
    return __decorate([u, h(), f("自定义组件/List"), m(cc.ScrollView), d(-5e3)], e);
})(cc.Component);
exports.default = _;
