var i;
var $animUtils = require("./AnimUtils");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $battleMgr = require("./BattleMgr");
var $actorMgr = require("./ActorMgr");
var $levelBattleData = require("./LevelBattleData");
var h = cc._decorator;
var f = h.ccclass;
var d = h.property;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nView = null;
        e._exitPos = null;
        e._isInit = !1;
        e._isInView = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.initView = function () {
        var t = $battleMgr.default.instance.getCurScene();
        this._exitPos = t.level.playerExitPos;
        this.nView.active = !1;
        this._isInit = !0;
        this._isInView = !1;
    };
    e.prototype.update = function () {
        if (this._isInit) {
            var t = $battleMgr.default.instance.getCurScene();
            if (t) {
                var e = $actorMgr.default.instance.getActor(t.playerId);
                if (e) {
                    if (
                        0 == $levelBattleData.levelBattleData.cfgStage.id &&
                        $guideMgr.GuideMgr.instance.cfgGuideStepId < $guideDataProxy.EGuideStepId.G_12
                    ) {
                        this.nView.active = !1;
                    } else {
                        var n = t.effectParent.convertToWorldSpaceAR(this._exitPos);
                        var i = t.cameraCtrl.gameWorldPosToUiWorldPos(n);
                        var o = this.node.parent.convertToNodeSpaceAR(i);
                        var r = this.node.parent.height - 200;
                        if (new cc.Rect(-this.node.parent.width / 2, -r / 2, this.node.parent.width, r).contains(o)) {
                            this.nView.active = !0;
                            this.nView.angle = 0;
                            this.nView.getChildByName("Arrow").angle = 180;
                            o.y += 230;
                            this.node.setPosition(o);
                            return void (
                                this._isInView || ((this._isInView = !0), $animUtils.AnimUtil.floatAnim(this.nView))
                            );
                        }
                        if (this._isInView) {
                            this._isInView = !1;
                            cc.Tween.stopAllByTarget(this.nView);
                            this.nView.angle = 0;
                            this.nView.getChildByName("Arrow").angle = 0;
                            this.nView.setPosition(0, 0);
                        }
                        var h = t.cameraCtrl.gameWorldPosToUiWorldPos(e.node.convertToWorldSpaceAR(cc.v2(0, 0)));
                        var f = i.sub(h);
                        var d = f.normalize();
                        var m = this.node.parent.convertToNodeSpaceAR(h);
                        var y = f.mag();
                        if (y < 50) {
                            this.nView.active = !1;
                        } else {
                            y = Math.min(y, 350);
                            this.nView.getChildByName("Arrow").angle = 0;
                            var _ = m.add(d.mul(y));
                            this.node.setPosition(_);
                            this.nView.active = !0;
                            this.nView.angle = (180 * Math.atan2(d.y, d.x)) / Math.PI - 90;
                        }
                    }
                } else {
                    this.nView.active = !1;
                }
            } else {
                this.nView.active = !1;
            }
        }
    };
    __decorate([d(cc.Node)], e.prototype, "nView", void 0);
    return __decorate([f], e);
})(cc.Component);
exports.default = m;
