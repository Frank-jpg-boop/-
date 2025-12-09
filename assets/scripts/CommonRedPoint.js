var i;
var a;
var $animUtils = require("./AnimUtils");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
!(function (t) {
    t[(t.BREATHE = 0)] = "BREATHE";
    t[(t.FLOAT = 1)] = "FLOAT";
})(a || (a = {}));
var p = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.animType = a.BREATHE;
        e._initScale = 0;
        e._initY = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this._initScale = this.node.scale;
        this._initY = this.node.y;
    };
    e.prototype.onEnable = function () {
        cc.Tween.stopAllByTarget(this.node);
        switch (this.animType) {
            case a.BREATHE:
                this.node.scale = this._initScale;
                $animUtils.AnimUtil.breathAnim(this.node);
                break;
            case a.FLOAT:
                this.node.y = this._initY;
                $animUtils.AnimUtil.floatAnim(this.node, 0.5, 10);
        }
    };
    e.prototype.setRedPointState = function (t, e) {
        this.node.active = t;
        if (e) {
            this.node.getChildByName("Num").active = !0;
            this.node.getChildByName("Num").getComponent(cc.Label).string = "" + e;
        }
    };
    __decorate(
        [
            u({
                type: cc.Enum(a)
            })
        ],
        e.prototype,
        "animType",
        void 0
    );
    return __decorate([l], e);
})(cc.Component);
exports.default = p;
