var i;
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $stateMachine = require("./StateMachine");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $spAnimCtrl = require("./SpAnimCtrl");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $door = require("./Door");
var $unitMgr = require("./UnitMgr");
var $actorBase = require("./ActorBase");
var $actorMgr = require("./ActorMgr");
var $impIdleState = require("./ImpIdleState");
var $impWalkState = require("./ImpWalkState");
var $summonAttackState = require("./SummonAttackState");
var $summonDeadState = require("./SummonDeadState");
var $summonBase = require("./SummonBase");
var C = cc._decorator;
var M = C.ccclass;
var I =
    (C.property,
    (function (t) {
        function e() {
            var e = t.call(this) || this;
            e._animCtrl = null;
            e._attackRange = 0;
            e._duration = 0;
            e._tempCollisionDoorIds = [];
            e._attackCd = 0;
            e.ownerRange = 100;
            e.ownerRange = $randomUtil.RandomUtil.randomInt(50, 100);
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "ownerSkill", {
            get: function () {
                return this._initParam.ownerSkill;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            this.node.opacity = 0;
            this._animCtrl = this.node
                .getChildByName("Body")
                .getChildByName("SpAnim")
                .getComponent($spAnimCtrl.default);
            t.prototype.onLoad.call(this);
        };
        e.prototype.initAnim = function () {
            this._animCtrl.init();
            return Promise.resolve();
        };
        e.prototype.initConfig = function () {
            this._attackRange = $randomUtil.RandomUtil.randomInt(20, 50);
            this._duration = this.ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value;
            this._isGroundMove = !0;
        };
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.PLAYER;
        };
        e.prototype.initAttribute = function () {
            t.prototype.initAttribute.call(this);
            this._actorAttribute.init($attrEnum.E_AttrType);
            var e = this.ownerSkill.owner;
            var n = Math.floor(
                e.getAttribute($attrEnum.E_AttrType.ATK).value *
                    this.ownerSkill.getAttribute($attrEnum.E_SkillAttrType.CORE_ATTR_RATE).value
            );
            this.getAttribute($attrEnum.E_AttrType.ATK).setFixBase(n);
            var i = Math.floor(
                e.getAttribute($attrEnum.E_AttrType.HP).value *
                    this.ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value
            );
            this.getAttribute($attrEnum.E_AttrType.HP).setFixBase(i);
            var o =
                this.ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value +
                $randomUtil.RandomUtil.randomInt(0, 30);
            this.getAttribute($attrEnum.E_AttrType.SPEED).setFixBase(o);
            this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).setFixBase(
                this.ownerSkill.owner.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value
            );
            this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).setFixBase(
                this.ownerSkill.owner.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value
            );
        };
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine(new $impIdleState.ImpIdleState(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $summonAttackState.SummonAttackState(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $summonDeadState.SummonDeadState(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $impWalkState.ImpWalkState(this));
        };
        e.prototype.playShowAnim = function () {
            var t = this;
            this.node.opacity = 0;
            return new Promise(function (e) {
                cc.tween(t.node)
                    .to(0.2, {
                        opacity: 255
                    })
                    .call(function () {
                        e();
                    })
                    .start();
            });
        };
        e.prototype.playAnimIdle = function () {
            this._animCtrl.playAnim("stand", 1, !0);
        };
        e.prototype.playAnimWalk = function () {
            this._animCtrl.playAnim("move", 1, !0);
        };
        e.prototype.playAnimAttack = function (t, e) {
            var n = this;
            this._animCtrl.playAnim("atk", 1, !1, function () {
                n._attackCd = n.ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value;
                if (t) {
                    t();
                }
                if (e) {
                    e();
                }
            });
        };
        e.prototype.playAnimDie = function (t) {
            var e = this;
            var n = this.ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value > 0;
            if (n) {
                this.scheduleOnce(function () {
                    e.skillBlast();
                }, 0.2);
            }
            if (this._head) {
                this._head.hide();
            }
            this._animCtrl.playAnim(n ? "skill" : "die", 1, !1, function () {
                if (t) {
                    t();
                }
            });
        };
        e.prototype.skillBlast = function () {
            var t = this.node.getPosition();
            t.y += 50;
            for (
                var e = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(t, 70), n = [], i = 0, o = e;
                i < o.length;
                i++
            ) {
                var r = o[i];
                var s = $gridAreaDivisionMgr.default.instance
                    .getAreaObjectList(r, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                    .filter(function (t) {
                        return !n.includes(t);
                    });
                if (s) {
                    n.push.apply(n, s);
                }
            }
            for (var l = 0, p = n; l < p.length; l++) {
                var h = p[l];
                if (!h.isDead() && cc.Vec2.squaredDistance(h.node.getPosition(), t) <= 4900) {
                    var f = $battleHurtFormulaMgr.default.instance.skillHurt(this.getSkillHurtOption(), h);
                    h.beHurt(f);
                    if (h.isDead()) {
                        $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.IMP_KILL_ENEMY, h.pathPos);
                    }
                }
            }
        };
        e.prototype.getSkillHurtOption = function () {
            return {
                attacker: this,
                baseValue: this.getAttribute($attrEnum.E_AttrType.ATK).value,
                rate: 3,
                critRate: this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value,
                critHurt: this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value,
                hurtSourceType: $battleEnum.EHurtSourceType.SKILL_HURT,
                extraDamage: this.ownerSkill.extraDamage,
                option: {
                    skillId: this.ownerSkill.cfg.id
                }
            };
        };
        e.prototype.canAttack = function () {
            return t.prototype.canAttack.call(this) && this._attackCd <= 0;
        };
        e.prototype.canAttackTarget = function (e) {
            return (
                t.prototype.canAttackTarget.call(this, e) &&
                cc.Vec2.squaredDistance(e.node.getPosition(), this.node.getPosition()) <=
                    this._attackRange * this._attackRange
            );
        };
        e.prototype.onAttackHit = function (t) {
            var e = t.getComponent($actorBase.default);
            e.beHurt(this.getHurt());
            if (e.isDead()) {
                $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.IMP_KILL_ENEMY, e.pathPos);
            }
        };
        e.prototype.getHurt = function () {
            var t = this.getAttribute($attrEnum.E_AttrType.ATK).value;
            var e = Math.random() < this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value;
            if (e) {
                t *= this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value;
            }
            return {
                damage: t,
                isCrit: e,
                attacker: this,
                hurtSource: $battleEnum.EHurtSourceType.COMMON_ATTACK
            };
        };
        e.prototype.searchTarget = function () {
            for (
                var t = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.ENEMY),
                    e = this.ownerSkill.owner.node.getPosition(),
                    n = this.node.getPosition(),
                    i = this.ownerSkill.cfg.edge,
                    o = Number.MAX_VALUE,
                    r = null,
                    a = 0;
                a < t.length;
                a++
            ) {
                var s = t[a];
                if (!s.isDead() && s.canBeSearch() && s.isGroundMove) {
                    var c = s.node.getPosition();
                    if (!(cc.Vec2.squaredDistance(c, e) > i * i)) {
                        var l = cc.Vec2.squaredDistance(c, n);
                        if (null == r || l < o) {
                            o = l;
                            r = s;
                        }
                    }
                }
            }
            return r;
        };
        e.prototype.onUpdate = function (t) {
            if (!(this._duration <= 0)) {
                if (this._attackCd > 0) {
                    this._attackCd -= t;
                    if (this._attackCd <= 0) {
                        this._attackCd = 0;
                    }
                }
                this._duration -= t;
                if (this._duration <= 0) {
                    this.changeState($actorEnum.EActorStateType.DEAD);
                } else {
                    var e = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    var n = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(this.node.x, this.node.y);
                    this.checkDoor(n.key, e, t);
                }
            }
        };
        e.prototype.checkDoor = function (t, e) {
            for (
                var n = this,
                    i = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                        t,
                        $gridAreaDivisionMgr.E_AreaObjectType.DOOR
                    ),
                    o = this._tempCollisionDoorIds,
                    r = 0;
                r < o.length;
                r++
            ) {
                var a = $unitMgr.UnitMgr.instance.getUnit(o[r]);
                if (a && i.includes(a)) {
                    //
                } else {
                    if (a) {
                        a.onImpExit(this);
                    }
                    o.splice(r, 1);
                    r--;
                }
            }
            i.forEach(function (t) {
                var i = t.getComponent($door.default);
                if (i) {
                    if (
                        $simplyCollisionDetector.default.isCollisionPointToRect(
                            new $simplyVec2.default(e.x, e.y),
                            i.selfCollider.rect
                        )
                    ) {
                        if (o.includes(i.unitId)) {
                            //
                        } else {
                            o.push(i.unitId);
                            i.onImpEnter(n);
                        }
                    } else {
                        var r = o.indexOf(i.unitId);
                        if (-1 != r) {
                            o.splice(r, 1);
                            i.onImpExit(n);
                        }
                    }
                }
            });
        };
        e.prototype.onRemove = function () {
            var e = this;
            this._tempCollisionDoorIds.forEach(function (t) {
                var n = $unitMgr.UnitMgr.instance.getUnit(t);
                if (n) {
                    n.onImpExit(e);
                }
            });
            this._tempCollisionDoorIds = [];
            t.prototype.onRemove.call(this);
        };
        return __decorate([M], e);
    })($summonBase.default));
exports.default = I;
