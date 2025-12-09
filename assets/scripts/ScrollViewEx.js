var i;
var a;
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = s.menu;
var p = s.requireComponent;
var h = s.disallowMultiple;
!(function (t) {
    t[(t.ONE = 1)] = "ONE";
    t[(t.TWO = 2)] = "TWO";
    t[(t.MORE = 3)] = "MORE";
})(a || (a = {}));
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.childLayerType = a.ONE;
        e.childLayerNum = 3;
        e._scrollView = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this._scrollView = this.node.getComponent(cc.ScrollView);
    };
    e.prototype.onEnable = function () {
        this.node.on("scrolling", this.onEventUpdateOpacity, this);
        this._scrollView.content.on(cc.Node.EventType.CHILD_REMOVED, this.onEventUpdateOpacity, this);
        this._scrollView.content.on(cc.Node.EventType.CHILD_ADDED, this.onEventUpdateOpacity, this);
        this._scrollView.content.on(cc.Node.EventType.CHILD_REORDER, this.onEventUpdateOpacity, this);
    };
    e.prototype.onDisable = function () {
        this.node.off("scrolling", this.onEventUpdateOpacity, this);
        this._scrollView.content.off(cc.Node.EventType.CHILD_REMOVED, this.onEventUpdateOpacity, this);
        this._scrollView.content.off(cc.Node.EventType.CHILD_ADDED, this.onEventUpdateOpacity, this);
        this._scrollView.content.off(cc.Node.EventType.CHILD_REORDER, this.onEventUpdateOpacity, this);
    };
    e.prototype.updateOpacity = function () {
        var t = this;
        this._scrollView.getComponentsInChildren(cc.Layout).forEach(function (t) {
            t.updateLayout();
        });
        for (
            var e = this.childLayerType == a.MORE ? this.childLayerNum : this.childLayerType,
                n = [],
                i = [this._scrollView.content];
            e > 0;

        ) {
            n = [];
            i.forEach(function (t) {
                n.push.apply(n, t.children);
            });
            i = n.slice();
            e--;
        }
        n.forEach(function (e) {
            if (t.checkCollision(e)) {
                e.opacity = 255;
            } else {
                e.opacity = 0;
            }
        });
    };
    e.prototype.onEventUpdateOpacity = function () {
        this.updateOpacity();
    };
    e.prototype.getBoundingBoxToWorld = function (t) {
        var e = t._contentSize.width;
        var n = t._contentSize.height;
        var i = cc.rect(-t._anchorPoint.x * e, -t._anchorPoint.y * n, e, n);
        t._calculWorldMatrix();
        i.transformMat4(i, t._worldMatrix);
        return i;
    };
    e.prototype.checkCollision = function (t) {
        var e = this.getBoundingBoxToWorld(this.node.getComponent(cc.ScrollView).content.parent);
        var n = this.getBoundingBoxToWorld(t);
        return e.intersects(n);
    };
    __decorate(
        [
            l({
                type: cc.Enum(a)
            })
        ],
        e.prototype,
        "childLayerType",
        void 0
    );
    __decorate(
        [
            l({
                type: cc.Integer,
                visible: function () {
                    return this.childLayerType == a.MORE;
                }
            })
        ],
        e.prototype,
        "childLayerNum",
        void 0
    );
    return __decorate([c, h(), p(cc.ScrollView), u("自定义组件/ScrollViewEx")], e);
})(cc.Component);
exports.default = f;
