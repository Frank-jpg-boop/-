var i;
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $battleMgr = require("./BattleMgr");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $boss_122_Atk = require("./Boss_122_Atk");
var $boss_122_Face = require("./Boss_122_Face");
var $boss_122_Idle = require("./Boss_122_Idle");
var $boss_122_Walk = require("./Boss_122_Walk");
var _ = cc._decorator;
var g = _.ccclass;
var v =
    (_.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isShowBossTag = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.onEnable = function () {
            this.node.opacity = 0;
        };
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.BOSS;
        };
        e.prototype.playShowAnim = function () {
            var t = this;
            return new Promise(function (e) {
                t.fadeIn(function () {
                    e();
                });
            });
        };
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $boss_122_Idle.Boss_122_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $boss_122_Walk.Boss_122_Walk(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $boss_122_Atk.Boss_122_Atk(this));
            this._sm.addState($actorEnum.EActorStateType.EXTEND_1, new $boss_122_Face.Boss_122_Face(this));
        };
        e.prototype.attackHit = function (t) {
            if (t && t.isValid) {
                this.shootCommonBullet(t, 3, null);
            }
        };
        e.prototype.isFace = function () {
            var t = $battleMgr.default.instance.getCurScene();
            if (!t) {
                return !1;
            }
            var e = $actorMgr.default.instance.getActor(t.playerId);
            return (
                !!e &&
                !$battleMgr.default.instance.isScreenOut(this.node.convertToWorldSpaceAR(cc.v2()), 50, 300) &&
                (e.node.x > this.node.x ? e.dirX < 0 : e.node.x < this.node.x && e.dirX > 0)
            );
        };
        e.prototype.canBeHurt = function () {
            return t.prototype.canBeHurt.call(this) && this.curState != $actorEnum.EActorStateType.EXTEND_1;
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            if (!this._isShowBossTag && this._isTrigger) {
                var n = this.node.convertToWorldSpaceAR(cc.v2());
                if ($battleMgr.default.instance.isScreenOut(n, 60, 100)) {
                    //
                } else {
                    this._isShowBossTag = !0;
                    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.LOOKAT_BOSS, n);
                }
            }
        };
        e.prototype.playAnimShowFace = function () {
            var t = this;
            this._spCtrl.playAnim("hide_start", 1, !1, function () {
                t._spCtrl.playAnim("hide_stand", 1, !0);
            });
        };
        e.prototype.playAnimHideFace = function (t) {
            this._spCtrl.playAnim("hide_over", 1, !1, function () {
                if (t) {
                    t();
                }
            });
        };
        e.prototype.fadeIn = function (t) {
            this.node.opacity = 0;
            cc.tween(this.node)
                .to(0.3, {
                    opacity: 255
                })
                .call(function () {
                    if (t) {
                        t();
                    }
                })
                .start();
        };
        e.prototype.fadeOut = function (t) {
            cc.tween(this.node)
                .to(0.3, {
                    opacity: 0
                })
                .call(function () {
                    if (t) {
                        t();
                    }
                })
                .start();
        };
        e.prototype.onBossTrigger = function () {
            this.node.setPosition(cc.v2(0, 0));
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_GhostEnters");
            t.prototype.onBossTrigger.call(this);
        };
        return __decorate([g], e);
    })($enemyBase.default));
exports.default = v;
