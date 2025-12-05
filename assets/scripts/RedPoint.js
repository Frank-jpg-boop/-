var i;
var a;
var $redPointPathConfig = require("./RedPointPathConfig");
var $redPointMgr = require("./RedPointMgr");
var $animUtils = require("./AnimUtils");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
!(function (t) {
    t[(t.BREATHE = 0)] = "BREATHE";
    t[(t.FLOAT = 1)] = "FLOAT";
})(a || (a = {}));
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.redPointType = $redPointPathConfig.ERedPointPathName.GAME;
        e.redPointAnimType = a.BREATHE;
        e._initScale = 0;
        e._initY = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        var t = this;
        t._initScale = t.node.scale;
        t._initY = t.node.y;
        t.node.active = !1;
        $redPointMgr.default.instance.registerRedPointChange(
            t.redPointType,
            function (e) {
                t.node.active = e.redPointNum > 0;
                var n = t.node.getChildByName("Num");
                if (n && n.active) {
                    n.active = !0;
                    n.getComponent(cc.Label).string = "" + e.redPointNum;
                }
            },
            this
        );
    };
    e.prototype.onEnable = function () {
        var t = this;
        switch (t.redPointAnimType) {
            case a.BREATHE:
                t.node.scale = t._initScale;
                $animUtils.AnimUtil.breathAnim(this.node);
                break;
            case a.FLOAT:
                t.node.y = t._initY;
                $animUtils.AnimUtil.floatAnim(this.node, 0.5, 10);
        }
    };
    e.prototype.onDestroy = function () {
        $redPointMgr.default.instance.unRegisterRedPointChange(this.redPointType, this);
    };
    __decorate(
        [
            h({
                type: cc.Enum($redPointPathConfig.ERedPointPathName)
            })
        ],
        e.prototype,
        "redPointType",
        void 0
    );
    __decorate(
        [
            h({
                type: cc.Enum(a)
            })
        ],
        e.prototype,
        "redPointAnimType",
        void 0
    );
    return __decorate([p], e);
})(cc.Component);
exports.default = f;
