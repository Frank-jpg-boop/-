var i;
var $nodeUtil = require("./NodeUtil");
var $battleMgr = require("./BattleMgr");
var $spAnimEffect = require("./SpAnimEffect");
var l = cc._decorator;
var u = l.ccclass;
var p = l.property;
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nProgress = null;
        e.nShootPos = null;
        e._isShooting = !1;
        e._onEventComplete = null;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "isShooting", {
        get: function () {
            return this._isShooting;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "shootPos", {
        get: function () {
            var t = $battleMgr.default.instance.getCurScene();
            return $nodeUtil.default.nodeParentChangeLocalPos(this.nShootPos, t.bulletParent);
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this.nProgress.active = !1;
    };
    e.prototype.playShootAnim = function (t, e, n, i) {
        var o = this;
        this._onEventComplete = t;
        this._isShooting = !0;
        var r = this.spAnimCtrls[0].spAnim.findAnimation("atk").duration;
        var a = Math.max(e - r, 0);
        var s = null;
        if (e > r) {
            s = 1;
        } else {
            s = r / e;
        }
        this.setDir(n);
        this.playDefaultAnim(
            "atk",
            s,
            !1,
            function () {
                o.spAnimCtrls[0].spAnim.setToSetupPose();
                o._isShooting = !1;
                if (i) {
                    i(a);
                }
            },
            !1
        );
    };
    e.prototype.setDir = function (t) {
        if (0 != t.x || 0 != t.y) {
            var e = t.x >= 0;
            var n = null;
            if (e) {
                n = 1;
            } else {
                n = -1;
            }
            this.spAnimCtrls[0].spAnim.node.scaleX = Math.abs(this.spAnimCtrls[0].spAnim.node.scaleX) * n;
            var i = (180 * cc.v2(e ? 1 : -1, 0).signAngle(t)) / Math.PI;
            this.spAnimCtrls[0].spAnim.node.angle = i;
            this.nProgress.scaleX = Math.abs(this.nProgress.scaleX) * n;
        }
    };
    e.prototype.reset = function (t) {
        if (void 0 === t) {
            t = 1;
        }
        var e = null;
        if (1 == t) {
            e = 15;
        } else {
            e = -15;
        }
        this.spAnimCtrls[0].spAnim.node.angle = e;
        this.spAnimCtrls[0].spAnim.node.scaleX = Math.abs(this.spAnimCtrls[0].spAnim.node.scaleX) * t;
        this.nProgress.scaleX = Math.abs(this.nProgress.scaleX) * t;
        this.nProgress.angle = e;
    };
    e.prototype.updateProgressCd = function (t) {
        var e = t < 1;
        this.nProgress.active = e;
        if (e) {
            this.nProgress.getChildByName("Bar").getComponent(cc.Sprite).fillRange = t;
        }
    };
    e.prototype.onDefaultAnimFrameEvent = function (t, e) {
        if ("atk" == e && this._onEventComplete) {
            this._onEventComplete();
        }
    };
    __decorate([p(cc.Node)], e.prototype, "nProgress", void 0);
    __decorate([p(cc.Node)], e.prototype, "nShootPos", void 0);
    return __decorate([u], e);
})($spAnimEffect.default);
exports.default = h;
