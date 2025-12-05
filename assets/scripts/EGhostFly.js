var i;
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var $gameUI = require("./GameUI");
var $battleMgr = require("./BattleMgr");
var $frameAnimEffect = require("./FrameAnimEffect");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.motionStreak = null;
        e._targetPos = null;
        e._onComplete = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        this.node.angle = 0;
        this.motionStreak.enabled = !1;
        t.prototype.onInit.call(this);
    };
    e.prototype.play = function (t, e) {
        var n = this;
        this._onComplete = e;
        this._targetPos = this.node.parent.convertToNodeSpaceAR(t);
        this.playOnceAllAnim(function () {
            n.flyTargetPos();
        }, !1);
    };
    e.prototype.flyTargetPos = function () {
        var t = this;
        var e = $battleMgr.default.instance.getCurScene();
        var n = e.uiNode.getComponent($gameUI.default).nGameUILayer;
        var i = e.cameraCtrl.gameWorldPosToUiWorldPos(this.node.convertToWorldSpaceAR(cc.v2()));
        var o = n.convertToNodeSpaceAR(i);
        this.node.parent = n;
        this.node.setPosition(o);
        this.motionStreak.enabled = !0;
        var r = cc.v2(o.x + $randomUtil.RandomUtil.randomInt(-100, 100), o.y + 100);
        var u = cc.v2(this._targetPos.x + $randomUtil.RandomUtil.randomInt(-100, 100), this._targetPos.y - 100);
        $mathUtil.MathUtil.bezierTo(this.node, 1, r, u, this._targetPos, function (e) {
            var n = e.x - t.node.x;
            var i = e.y - t.node.y;
            var o = cc.v2(n, i).normalizeSelf();
            if (0 == o.x && 0 == o.y) {
                //
            } else {
                t.node.angle = $mathUtil.MathUtil.radians2Angle(cc.v2(1, 0).signAngle(o)) - 90;
            }
        })
            .call(function () {
                if (t._onComplete) {
                    t._onComplete();
                }
                t.remove();
            })
            .start();
    };
    __decorate([f(cc.MotionStreak)], e.prototype, "motionStreak", void 0);
    return __decorate([h], e);
})($frameAnimEffect.default);
exports.default = d;
