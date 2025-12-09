var i;
var $audioUtil = require("./AudioUtil");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $actorEnum = require("./ActorEnum");
var $actorMgr = require("./ActorMgr");
var $spAnimEffect = require("./SpAnimEffect");
var h = cc._decorator;
var f = h.ccclass;
var d =
    (h.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.play = function (t) {
            var e = this;
            $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_Boom", 0.3);
            this.playDefaultAnim("atk", 1, !1, function () {
                if (t) {
                    t();
                }
            });
            this.scheduleOnce(function () {
                var t;
                if (null === (t = $battleMgr.default.instance.getCurScene()) || void 0 === t) {
                    //
                } else {
                    t.cameraCtrl.shakeCamera(0.1);
                }
                e.checkBlastHurt(e.node.getPosition(), 200);
            }, 0.08);
        };
        e.prototype.checkBlastHurt = function (t, e) {
            $actorMgr.default.instance
                .queryActorByCamp($actorEnum.ETeamType.ENEMY)
                .filter(function (t) {
                    return !t.isGroundMove;
                })
                .forEach(function (n) {
                    if (n.isDead()) {
                        //
                    } else {
                        if (Math.abs(n.node.y - t.y) < 500 && Math.abs(n.node.x - t.x) <= e) {
                            n.setAnimPauseState(!1);
                            n.changeState($actorEnum.EActorStateType.DEAD);
                        }
                    }
                });
            for (
                var n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(t, e), i = [], o = 0, r = n;
                o < r.length;
                o++
            ) {
                var a = r[o];
                var s = $gridAreaDivisionMgr.default.instance
                    .getAreaObjectList(a, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                    .filter(function (t) {
                        return !i.includes(t);
                    });
                if (s) {
                    i.push.apply(i, s);
                }
            }
            for (var p = 0, h = i; p < h.length; p++) {
                var f = h[p];
                if (f.isDead()) {
                    //
                } else {
                    if (cc.Vec2.squaredDistance(t, f.node.getPosition()) <= e * e) {
                        f.setAnimPauseState(!1);
                        f.changeState($actorEnum.EActorStateType.DEAD);
                    }
                }
            }
        };
        return __decorate([f], e);
    })($spAnimEffect.default));
exports.default = d;
