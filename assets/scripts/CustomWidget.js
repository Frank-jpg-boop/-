var i;
exports.CustomWidget = void 0;
var $appBase = require("./AppBase");
var $componentBase = require("./ComponentBase");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = c.menu;
var h = c.requireComponent;
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.bar = !1;
        e.customMargin = !1;
        e.margin = 0;
        e.delay = !1;
        e.delayTime = 1;
        e._borderMargin = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        t.prototype.onLoad.call(this);
        var e = cc.view.getFrameSize();
        var n = this.node.getComponent(cc.Widget);
        var i = e.height / e.width;
        if (i > 1) {
            this._borderMargin = n.top;
        } else {
            this._borderMargin = n.left;
        }
        if (this.bar && (i > 2 || i < 0.5)) {
            var o = $appBase.AppBase.getSystemInfoSync();
            var r = o.safeArea;
            var s = o.statusBarHeight;
            if (0 === s && r) {
                s = r.top || r.left;
            }
            var c;
            var l = cc.winSize;
            if (i > 1) {
                c = (s / e.height) * l.height;
            } else {
                c = (s / e.width) * l.width;
            }
            if (this.customMargin) {
                this._borderMargin = this.margin + c;
            } else {
                this._borderMargin += c;
            }
            this.setWidget();
        } else {
            this.bar = !1;
        }
    };
    e.prototype.onEnable = function () {
        t.prototype.onEnable.call(this);
        if (this.bar) {
            if (this.delay) {
                this.scheduleOnce(this.setWidget, this.delayTime);
            } else {
                this.setWidget();
            }
        }
    };
    e.prototype.setWidget = function () {
        var t = this.node.getComponent(cc.Widget);
        var e = cc.view.getFrameSize();
        if (e.height / e.width > 1) {
            t.top = this._borderMargin;
        } else {
            t.left = this._borderMargin;
        }
        t.updateAlignment();
    };
    __decorate(
        [
            u({
                tooltip: "是否开启刘海屏适配"
            })
        ],
        e.prototype,
        "bar",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "自定义顶边距"
            })
        ],
        e.prototype,
        "customMargin",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "自定义定边距的距离",
                visible: function () {
                    return this.customMargin;
                }
            })
        ],
        e.prototype,
        "margin",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "是否延迟适配"
            })
        ],
        e.prototype,
        "delay",
        void 0
    );
    __decorate(
        [
            u({
                type: cc.Float,
                tooltip: "延迟适配的时间",
                visible: function () {
                    return this.delay;
                }
            })
        ],
        e.prototype,
        "delayTime",
        void 0
    );
    return __decorate([l, h(cc.Widget), p("自定义组件/widget")], e);
})($componentBase.ComponentBase);
exports.CustomWidget = f;
