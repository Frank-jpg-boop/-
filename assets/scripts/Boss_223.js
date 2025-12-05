var i;
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $basicsProxy = require("./BasicsProxy");
var $battleMgr = require("./BattleMgr");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $enemyRefreshMgr = require("./EnemyRefreshMgr");
var $door = require("./Door");
var $actorBase = require("./ActorBase");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var _ = cc._decorator;
var g = _.ccclass;
var v =
    (_.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._sound = null;
            e._isShowBossTag = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._sound = this.node.getComponent(cc.AudioSource);
        };
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.BOSS;
        };
        e.prototype.playAnimAttack = function (t, e, n) {
            var i = !1;
            if (n) {
                var o = n.getComponent($door.default);
                if (o && o.state != $door.EDoorState.DESTROY) {
                    i = !0;
                }
            }
            this._spCtrl.playAnim(
                i ? "atk2" : "atk1",
                1,
                !1,
                function () {
                    if (e) {
                        e();
                    }
                },
                function (e, n) {
                    if (t) {
                        t(n);
                    }
                }
            );
        };
        e.prototype.attackHit = function (t) {
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_TriangleHeadAtk");
            if (t && t.isValid) {
                var e = t.getComponent($door.default);
                if (e && e.state != $door.EDoorState.DESTROY) {
                    e.beHurt(e.hp);
                } else {
                    var n = t.getComponent($actorBase.default);
                    if (n) {
                        n.beHurt(this.getHurt());
                    }
                }
            }
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            var n = $actorMgr.default.instance.getActor($battleMgr.default.instance.getCurScene().playerId);
            if (0 != $basicsProxy.basicsProxy.effectVolume && this._isTrigger && n && !n.isDead()) {
                var i = Math.max(0, 1 - this.node.position.sub(n.node.position).mag() / 1e3);
                i = Math.min(1, i);
                this._sound.volume = i;
            } else {
                this._sound.volume = 0;
            }
            if (!this._isShowBossTag && this._isTrigger) {
                var o = this.node.convertToWorldSpaceAR(cc.v2());
                if ($battleMgr.default.instance.isScreenOut(o, 60, 100)) {
                    //
                } else {
                    this._isShowBossTag = !0;
                    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.LOOKAT_BOSS, o);
                }
            }
        };
        e.prototype.onBeforeHurt = function (e) {
            t.prototype.onBeforeHurt.call(this, e);
            var n = Number(this._cfg.val1);
            if (e.damage > n) {
                e.damage = n;
            }
        };
        e.prototype.onBossTrigger = function () {
            var e = $enemyRefreshMgr.EnemyRefreshMgr.instance.randomRefreshPoint();
            this.setPos(e.pos);
            t.prototype.onBossTrigger.call(this);
        };
        return __decorate([g], e);
    })($enemyBase.default));
exports.default = v;
