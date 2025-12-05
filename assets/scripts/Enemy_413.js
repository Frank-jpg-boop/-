var i;
var $battleMgr = require("./BattleMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $actorEnum = require("./ActorEnum");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $enemy_413_Atk = require("./Enemy_413_Atk");
var $enemy_413_Idle = require("./Enemy_413_Idle");
var $enemy_413_Skill = require("./Enemy_413_Skill");
var $enemy_413_Walk = require("./Enemy_413_Walk");
var m = cc._decorator;
var y = m.ccclass;
var _ =
    (m.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._roomCentrePos = null;
            e._skillHurtCollider = null;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "roomCentrePos", {
            get: function () {
                return this._roomCentrePos;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "spAnimCtrl", {
            get: function () {
                return this._spCtrl;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "skillHurtCollider", {
            get: function () {
                return this._skillHurtCollider;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._skillHurtCollider = this.node
                .getChildByName("SkillHurtCollider")
                .getComponent($simplyCircleCollider.default);
        };
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $enemy_413_Idle.Enemy_413_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $enemy_413_Walk.Enemy_413_Walk(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemy_413_Atk.Enemy_413_Atk(this));
            this._sm.addState($actorEnum.EActorStateType.SKILL, new $enemy_413_Skill.Enemy_413_Skill(this));
        };
        e.prototype.onInit = function () {
            t.prototype.onInit.call(this);
            this.node.getChildByName("Body").getChildByName("Shade").active = !0;
            var e = $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId);
            this._roomCentrePos = cc.v2(e.node.x + e.node.width / 2, e.getGroundY());
        };
        e.prototype.enterAttackCd = function () {
            this._attackCD = this._cfg.arkWait;
        };
        e.prototype.searchTarget = function () {
            for (
                var t = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER),
                    e = this.node.getPosition(),
                    n = ($battleMgr.default.instance.getCurScene(), Number.MAX_VALUE),
                    i = null,
                    o = 0;
                o < t.length;
                o++
            ) {
                var r = t[o];
                if (!r.isDead() && r.canBeSearch() && r.roomId == this.roomId) {
                    var s = cc.Vec2.squaredDistance(r.node.getPosition(), e);
                    if (null == i || s < n) {
                        n = s;
                        i = r;
                    }
                }
            }
            return i;
        };
        e.prototype.updatePos = function () {
            this.updateUnifyPos();
            this.updateAreaKey();
        };
        return __decorate([y], e);
    })($enemyBase.default));
exports.default = _;
