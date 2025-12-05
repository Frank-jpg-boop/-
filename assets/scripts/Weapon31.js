var i;
var $effectBase = require("./EffectBase");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nProgress = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this.nProgress.active = !1;
    };
    e.prototype.show = function () {
        this.node.active = !0;
    };
    e.prototype.hide = function () {
        this.node.active = !1;
    };
    e.prototype.updateProgressCd = function (t) {
        var e = t < 1;
        this.nProgress.active = e;
        if (e) {
            this.nProgress.getChildByName("Bar").getComponent(cc.Sprite).fillRange = t;
        }
    };
    __decorate([l(cc.Node)], e.prototype, "nProgress", void 0);
    return __decorate([c], e);
})($effectBase.default);
exports.default = u;
