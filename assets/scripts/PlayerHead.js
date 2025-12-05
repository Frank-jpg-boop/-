var i;
var $actorHead = require("./ActorHead");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spShield = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this.spShield.node.active = !1;
        this.node.zIndex = cc.macro.MAX_ZINDEX;
    };
    e.prototype.updateShield = function (t, e) {
        var n = t / e;
        this.node.active = n > 0;
        this.spShield.node.active = n > 0;
        cc.Tween.stopAllByTarget(this.spShield);
        cc.tween(this.spShield)
            .to(0.1, {
                fillRange: n
            })
            .start();
    };
    __decorate([l(cc.Sprite)], e.prototype, "spShield", void 0);
    return __decorate([c], e);
})($actorHead.default);
exports.default = u;
