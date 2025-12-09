var i;
exports.BgFit = exports.ZSFullFitType = void 0;
var a;
var $componentBase = require("./ComponentBase");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = c.menu;
!(function (t) {
    t[(t.ALL = 0)] = "ALL";
    t[(t.WIDTH = 1)] = "WIDTH";
    t[(t.HEIGHT = 2)] = "HEIGHT";
})((a = exports.ZSFullFitType || (exports.ZSFullFitType = {})));
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.fitType = a.ALL;
        e.fit = !0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        var t = cc.winSize;
        var e = 1;
        var n = 1;
        if (a.WIDTH !== this.fitType && a.ALL !== this.fitType) {
            //
        } else {
            e = t.width / this.node.width;
        }
        if (a.HEIGHT !== this.fitType && a.ALL !== this.fitType) {
            //
        } else {
            n = t.height / this.node.height;
        }
        if (this.fit) {
            this.node.scale = Math.max(e, n);
        } else {
            this.node.scaleX = e;
            this.node.scaleY = n;
        }
    };
    __decorate(
        [
            u({
                type: cc.Enum(a),
                tooltip: "适配模式"
            })
        ],
        e.prototype,
        "fitType",
        void 0
    );
    __decorate(
        [
            u({
                tooltip: "是否等比缩放"
            })
        ],
        e.prototype,
        "fit",
        void 0
    );
    return __decorate([l, p("自定义组件/背景适配")], e);
})($componentBase.ComponentBase);
exports.BgFit = h;
