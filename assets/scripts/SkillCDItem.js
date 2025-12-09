var i;
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spIcon = null;
        e.spCd = null;
        e.spDuration = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        var e = Math.floor(t / 10);
        $resLoader.ResLoader.setSpritFrame(
            this.spIcon,
            $frameEnum.Frame.EBundleName.GAME,
            "textures/skill/IconM_ski" + e
        );
        this.spCd.node.active = !1;
        this.spDuration.node.active = !1;
    };
    e.prototype.updateCd = function (t) {
        this.spCd.node.active = t > 0;
        this.spCd.fillRange = t;
    };
    e.prototype.updateDuration = function (t) {
        this.spDuration.node.active = t > 0;
        this.spDuration.fillRange = t;
    };
    __decorate([u(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([u(cc.Sprite)], e.prototype, "spCd", void 0);
    __decorate([u(cc.Sprite)], e.prototype, "spDuration", void 0);
    return __decorate([l], e);
})(cc.Component);
exports.default = p;
