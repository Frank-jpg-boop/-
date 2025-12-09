var i;
var $cfg = require("./Cfg");
var $animationCfgMgr = require("./AnimationCfgMgr");
var $animationCtrl = require("./AnimationCtrl");
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $stateMachine = require("./StateMachine");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $shimmerWhite = require("./ShimmerWhite");
var $door = require("./Door");
var $unitMgr = require("./UnitMgr");
var $actorBase = require("./ActorBase");
var $actorMgr = require("./ActorMgr");
var $enemyAttackState = require("./EnemyAttackState");
var $enemyDeadState = require("./EnemyDeadState");
var $enemyStopState = require("./EnemyStopState");
var $enemyIdleState = require("./EnemyIdleState");
var $enemyWalkState = require("./EnemyWalkState");
var $spAnimCtrl = require("./SpAnimCtrl");
var $frameEnum = require("./FrameEnum");
var $enemySkillState = require("./EnemySkillState");
var $bulletMgr = require("./BulletMgr");
var $commonEnemyBullet = require("./CommonEnemyBullet");
var $nodeUtil = require("./NodeUtil");
var $effectMgr = require("./EffectMgr");
var $spAnimEffect = require("./SpAnimEffect");
var $itemDataProxy = require("./ItemDataProxy");
var $eventManager = require("./EventManager");
var $audioUtil = require("./AudioUtil");
var $levelBattleData = require("./LevelBattleData");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $skillMgr = require("./SkillMgr");
var W = cc._decorator;
var q = W.ccclass;
var z =
    (W.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._animCtrl = null;
            e._spCtrl = null;
            e._cfg = null;
            e._isFixCreate = !1;
            e._isWaveRefresh = !1;
            e._atkAnimName = "atk";
            e._standAnimName = "stand";
            e._dieAnimName = "die";
            e._moveAnimName = "move";
            e._attackCD = 0;
            e._rewardMap = null;
            e._attackRange = 0;
            e._shootPosNode = null;
            e._isTrigger = !1;
            e._flagEffect = null;
            e._nTagParent = null;
            e.dropMaxOffsetX = 50;
            e.dropMinOffsetX = -50;
            e.tempCollisionDoorIds = [];
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "cfg", {
            get: function () {
                return this._cfg;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isFixCreate", {
            get: function () {
                return this._isFixCreate;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "shootPos", {
            get: function () {
                return $nodeUtil.default.nodeParentChangeLocalPos(this._shootPosNode, this.node.parent);
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isWaveRefresh", {
            get: function () {
                return this._isWaveRefresh;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isTrigger", {
            get: function () {
                return this._isTrigger;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "attackRange", {
            get: function () {
                return this._attackRange;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isGuideEnemy", {
            get: function () {
                return this._initParam && this._initParam.isGuideEnemy;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isNotReward", {
            get: function () {
                return this._initParam && this._initParam.isNotReward;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._shootPosNode = this.node.getChildByName("Body").getChildByName("ShootPos");
            this._nTagParent = this.node;
            this.node.opacity = 0;
        };
        e.prototype.onEnable = function () {};
        e.prototype.initConfig = function () {
            this._cfg = $cfg.default.instance.dataEnemy.getById(this._cfgId);
            this._attackRange = this._cfg.edge + $randomUtil.RandomUtil.randomInt(20, 50);
            this._isGroundMove = 1 == this._cfg.moveType;
        };
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.ENEMY;
        };
        e.prototype.initPos = function () {
            var t = this.searchTarget();
            if (t) {
                this.setDirX(t.node.x > this.node.x);
            }
        };
        e.prototype.initAttribute = function () {
            var e = this;
            t.prototype.initAttribute.call(this);
            this._actorAttribute.init($attrEnum.E_AttrType);
            var n = null;
            if (this._initParam && this._initParam.lv) {
                n = this._initParam.lv;
            } else {
                n = 0;
            }
            n = Math.ceil(n * $levelBattleData.levelBattleData.enemyLevelRate);
            var i = Math.floor(
                (this._cfg.ark + this._cfg.arkP * n) * $levelBattleData.levelBattleData.stageEnemyAtkScale
            );
            this.getAttribute($attrEnum.E_AttrType.ATK).setFixBase(i);
            var o = Math.floor(
                this._cfg.hp + this._cfg.hpP * n * (this._initParam && this._initParam.isGuideEnemy ? 0.5 : 1)
            );
            if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
                o -= 300;
            }
            this.getAttribute($attrEnum.E_AttrType.HP).setFixBase(o);
            this.getAttribute($attrEnum.E_AttrType.SPEED).setBaseGetValueFunc(function () {
                var t = e._cfg.spe;
                if (1 != e._cfg.moveType) {
                    return t;
                }
                var n = $battleMgr.default.instance.getCurScene();
                var i = $actorMgr.default.instance.getActor(n.playerId);
                if (i) {
                    var o = n.level.getRoomById(e.roomId);
                    var r = n.level.getRoomById(i.roomId);
                    if (o && r) {
                        var a = Math.abs(o.layer - r.layer);
                        t *= Math.pow(1.4, a);
                    }
                }
                if (e._initParam && e._initParam.waitRescueFlag) {
                    return t * (1 == e._initParam.waitRescueFlag ? 1.5 : 2);
                } else {
                    return t;
                }
            });
            var r = $cfg.default.instance.dataAtt.getById($attrEnum.E_AttrType.CRIT_HURT).val;
            this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).setFixBase(r);
        };
        e.prototype.onInit = function () {
            var e = this;
            this._isTrigger = this._actorType != $actorEnum.EActorType.BOSS;
            if (this._actorType == $actorEnum.EActorType.BOSS) {
                $eventManager.EventManager.instance.on(
                    $battleEnum.EBattleEvent.TRIGGER_BOSS_INFORM,
                    this.onBossTrigger,
                    this
                );
            }
            this._isWaveRefresh =
                !(!this._initParam || !this._initParam.isWaveRefresh) && this._initParam.isWaveRefresh;
            this._rewardMap = this._initParam.rewardMap;
            if ("" != this._cfg.dropAll) {
                this._cfg.dropAll.split("|").forEach(function (t) {
                    var n = t.split("_").map(Number);
                    var i = n[0];
                    var o = n[1];
                    if ($itemDataProxy.itemDataProxy.checkCanDropReward(i)) {
                        if (e._rewardMap.has(i)) {
                            e._rewardMap.set(i, e._rewardMap.get(i) + o);
                        } else {
                            e._rewardMap.set(i, o);
                        }
                    }
                });
            }
            if ("" != this._cfg.dropPro) {
                this._cfg.dropPro.split("|").forEach(function (t) {
                    var n = t.split("_").map(Number);
                    var i = n[0];
                    var o = n[1];
                    if ($itemDataProxy.itemDataProxy.checkCanDropReward(i) && Math.random() < o) {
                        if (e._rewardMap.has(i)) {
                            e._rewardMap.set(i, e._rewardMap.get(i) + 1);
                        } else {
                            e._rewardMap.set(i, 1);
                        }
                    }
                });
            }
            if (
                $battleMgr.default.instance.gm_InfiniteCandy &&
                Math.random() < 0.5 &&
                $skillMgr.SkillMgr.instance.hasSkillEx()
            ) {
                if (this._rewardMap.has(111)) {
                    this._rewardMap.set(111, this._rewardMap.get(111) + 1);
                } else {
                    this._rewardMap.set(111, 1);
                }
            }
            this._isFixCreate = !(!this._initParam || !this._initParam.isFixCreate) && this._initParam.isFixCreate;
            this._nTagParent.active = !0;
            t.prototype.onInit.call(this);
        };
        e.prototype.initAnim = function () {
            var t = this;
            var e = this.node.getChildByName("Body").getChildByName("Anim");
            if (0 == this._cfg.isBoss) {
                this._animCtrl = e.getComponent($animationCtrl.default);
            } else {
                this._nTagParent != this.node && (this._nTagParent.active = !1);
                $effectMgr.default.instance.createEffect({
                    parent: this._nTagParent,
                    prefabName: "EEnemyFlag",
                    initPos: cc.v2(0, this.rightHeight + 30),
                    effectClass: $spAnimEffect.default,
                    onCreated: function (e) {
                        e.node.setSiblingIndex(0);
                        if (t.isDead()) {
                            e.remove();
                        } else {
                            if (2 == t._cfg.isBoss) {
                                e.spAnimCtrls[0].spAnim.setSkin("boss"),
                                    (e.spAnimCtrls[0].node.active = !0),
                                    (e.spAnimCtrls[1].node.active = !1),
                                    e.playDefaultAnim("loop", 1, !0);
                            } else {
                                (e.spAnimCtrls[0].node.active = !1),
                                    (e.spAnimCtrls[1].node.active = !0),
                                    e.spAnimCtrls[1].playAnim("stand", 1, !0);
                            }
                            t._flagEffect = e;
                        }
                    }
                });
                this._spCtrl = e.getComponent($spAnimCtrl.default);
            }
            return new Promise(function (e) {
                if (!t._animCtrl) {
                    if (t._spCtrl) {
                        return t._spCtrl.init(), void e();
                    } else {
                        return void 0;
                    }
                }
                t._animCtrl
                    .loadAtlasAnimation(
                        $frameEnum.Frame.EBundleName.GAME,
                        "textures/anim_enemy/enemy" + t._cfg.id + "/enemy" + t._cfg.id,
                        $animationCfgMgr.AnimationCfgMgr.instance.getEnemyAnimCfg(t._cfgId),
                        function () {
                            e();
                        }
                    )
                    .catch(function () {
                        e();
                    });
            });
        };
        e.prototype.playShowAnim = function () {
            var t = this;
            return new Promise(function (e) {
                cc.tween(t.node)
                    .to(0.2, {
                        opacity: 255
                    })
                    .call(function () {
                        if (t._initParam && t._initParam.showAnim) {
                            t._initParam.showAnim(t, function () {
                                e();
                            });
                        } else {
                            e();
                        }
                    })
                    .start();
            });
        };
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine();
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $enemyIdleState.EnemyIdleState(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $enemyWalkState.EnemyWalkState(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $enemyAttackState.EnemyAttackState(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $enemyDeadState.EnemyDeadState(this));
            this._sm.addState($actorEnum.EActorStateType.STOP, new $enemyStopState.EnemyStopState(this));
            this._sm.addState($actorEnum.EActorStateType.SKILL, new $enemySkillState.EnemySkillState(this));
        };
        e.prototype.playAnimIdle = function () {
            if (this.isDead()) {
                //
            } else {
                if (this._animCtrl) {
                    this._animCtrl.playAnim(this._standAnimName, !0);
                }
                if (this._spCtrl) {
                    this._spCtrl.playAnim(this._standAnimName, 1, !0);
                }
            }
        };
        e.prototype.playAnimWalk = function () {
            if (this.isDead()) {
                //
            } else {
                if (this._animCtrl) {
                    this._animCtrl.playAnim(this._moveAnimName, !0);
                }
                if (this._spCtrl) {
                    this._spCtrl.playAnim(this._moveAnimName, 1, !0);
                }
            }
        };
        e.prototype.playAnimAttack = function (t, e) {
            var n = this;
            if (this.isDead()) {
                //
            } else {
                if (this._animCtrl) {
                    this._animCtrl.playAnim(
                        this._atkAnimName,
                        !1,
                        function () {
                            n._attackCD = n._cfg.arkWait;
                            if (e) {
                                e();
                            }
                        },
                        function () {
                            if (t) {
                                t();
                            }
                        }
                    );
                }
                if (this._spCtrl) {
                    this._spCtrl.playAnim(
                        this._atkAnimName,
                        1,
                        !1,
                        function () {
                            n._attackCD = n._cfg.arkWait;
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
                }
            }
        };
        e.prototype.playAnimDie = function (t) {
            if (this._animCtrl) {
                this._animCtrl.playAnim(this._dieAnimName, !1, function () {
                    if (t) {
                        t();
                    }
                });
            }
            if (this._spCtrl) {
                this._spCtrl.playAnim(this._dieAnimName, 1, !1, function () {
                    if (t) {
                        t();
                    }
                });
            }
        };
        e.prototype.playAnimSkill = function (t) {
            for (var e = [], n = 1; n < arguments.length; n++) {
                e[n - 1] = arguments[n];
            }
            if (t) {
                t();
            }
        };
        e.prototype.setAnimPauseState = function (t) {
            this._isPauseAnim = t;
            if (this._animCtrl) {
                if (t) {
                    this._animCtrl.animation.pause();
                } else {
                    this._animCtrl.animation.resume();
                }
            }
            if (this._spCtrl) {
                this._spCtrl.spAnim.paused = t;
            }
        };
        e.prototype.beStop = function (t) {
            if (this.isDead()) {
                //
            } else {
                if (this._sm.currentState.stateType == $actorEnum.EActorStateType.STOP) {
                    this._sm.currentState.again(t);
                } else {
                    this.changeState($actorEnum.EActorStateType.STOP, t);
                }
            }
        };
        e.prototype.canAttack = function () {
            return t.prototype.canAttack.call(this) && this._attackCD <= 0;
        };
        e.prototype.canBeSearch = function () {
            var e = $battleMgr.default.instance.getCurScene();
            return (
                !!e &&
                !(this._isFixCreate && !e.level.getRoomById(this._roomId).isArriveed) &&
                !(this._actorType == $actorEnum.EActorType.BOSS && !this._isTrigger) &&
                t.prototype.canBeSearch.call(this)
            );
        };
        e.prototype.canBeRepel = function () {
            return t.prototype.canBeRepel.call(this) && 0 == this._cfg.isHard;
        };
        e.prototype.canBeHurt = function () {
            var e = $battleMgr.default.instance.getCurScene();
            return (
                !!e &&
                !(this._isFixCreate && this._isGroundMove && !e.level.getRoomById(this._roomId).isArriveed) &&
                !(this._actorType == $actorEnum.EActorType.BOSS && !this._isTrigger) &&
                t.prototype.canBeHurt.call(this)
            );
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            if (this._attackCD > 0) {
                this._attackCD -= e;
                if (this._attackCD <= 0) {
                    this._attackCD = 0;
                }
            }
            var n = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            var i = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(this.node.x, this.node.y);
            this.checkDoor(i.key, n, e);
        };
        e.prototype.checkDoor = function (t, e, n) {
            for (
                var i = this,
                    o = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                        t,
                        $gridAreaDivisionMgr.E_AreaObjectType.DOOR
                    ),
                    r = 0;
                r < this.tempCollisionDoorIds.length;
                r++
            ) {
                var a = $unitMgr.UnitMgr.instance.getUnit(this.tempCollisionDoorIds[r]);
                if (a) {
                    if (o.includes(a)) {
                        //
                    } else {
                        this.tempCollisionDoorIds.splice(r, 1);
                        a.onEnemyExit(this);
                        r--;
                    }
                } else {
                    this.tempCollisionDoorIds.splice(r, 1);
                    r--;
                }
            }
            o.forEach(function (t) {
                var o = t.getComponent($door.default);
                var r = o.selfCollider;
                if (o && r) {
                    if (
                        $simplyCollisionDetector.default.isCollisionPointToRect(
                            new $simplyVec2.default(e.x, e.y),
                            r.rect
                        )
                    ) {
                        if (i.tempCollisionDoorIds.includes(o.unitId)) {
                            o.onEnemyStay(i, n);
                        } else {
                            i.tempCollisionDoorIds.push(o.unitId);
                            o.onEnemyEnter(i);
                        }
                    } else {
                        var a = i.tempCollisionDoorIds.indexOf(o.unitId);
                        if (-1 != a) {
                            i.tempCollisionDoorIds.splice(a, 1);
                            o.onEnemyExit(i);
                        }
                    }
                }
            });
        };
        e.prototype.attackHit = function (t) {
            for (var e = [], n = 1; n < arguments.length; n++) {
                e[n - 1] = arguments[n];
            }
            if (t && t.isValid) {
                var i = t.getComponent($door.default);
                if (i && i.state != $door.EDoorState.DESTROY) {
                    i.beHurt(this.getAttribute($attrEnum.E_AttrType.ATK).value);
                } else if (2 != this._cfg.enemyType && 3 != this._cfg.enemyType) {
                    var o = t.getComponent($actorBase.default);
                    if (o && cc.Vec2.squaredDistance(o.node.getPosition(), this.node.getPosition()) <= 1e4) {
                        o.beHurt(this.getHurt());
                    }
                } else {
                    var r = this._cfg.hitAni;
                    this.shootCommonBullet(t, this._cfg.enemyType, function (t) {
                        var e = $battleMgr.default.instance.getCurScene();
                        $effectMgr.default.instance.createEffect({
                            parent: e.effectParent,
                            prefabName: r,
                            initPos: t,
                            effectClass: $spAnimEffect.default,
                            onCreated: function (t) {
                                t.playOnceAllAnim();
                            }
                        });
                    });
                }
            }
        };
        e.prototype.shootCommonBullet = function (t, e, n) {
            var i = this;
            if (void 0 === n) {
                n = null;
            }
            var o = t.getComponent($actorBase.default);
            var r = void 0;
            if (o) {
                var s = o.getBeHurtPos();
                if (2 == e) {
                    var c = s.sub(this.shootPos).normalize();
                    var l = Number($cfg.default.instance.dataCons.getById(171).val);
                    s = this.shootPos.add(c.mul(this._attackRange * l));
                }
                if (3 == e) {
                    var h = $battleMgr.default.instance.getCurScene();
                    r = h.level.getLayerPosY(h.level.findLayerByPos(s));
                }
                $bulletMgr.default.instance.createBullet({
                    parent: $battleMgr.default.instance.getCurScene().bulletParent,
                    prefabName: "CommonEnemyBullet",
                    initPos: this.shootPos,
                    iconPath: "textures/bullet/Enemy" + this._cfg.id + "_zidan",
                    bulletClass: $commonEnemyBullet.default,
                    onCreated: function (t) {
                        t.shoot(i, s, {
                            bulletType: e,
                            bezierHeight: 3 == e ? $randomUtil.RandomUtil.randomInt(150, 200) : 0,
                            onRemove: n,
                            groundY: r
                        });
                    }
                });
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
        e.prototype.canAttackTarget = function (e) {
            return (
                t.prototype.canAttackTarget.call(this, e) &&
                cc.Vec2.squaredDistance(e.node.getPosition(), this.node.getPosition()) <=
                    this._attackRange * this._attackRange
            );
        };
        e.prototype.updatePathData = function () {
            for (
                var t = $mathUtil.MathUtil.vec2Fixed(this._pathPos),
                    e = $battleMgr.default.instance.getCurScene().level.path,
                    n = (1 * this.getAttribute($attrEnum.E_AttrType.SPEED).value) / 60;
                ;

            ) {
                var i = e.findPathPointByPos(t, n - 0.5);
                if ("" != i) {
                    this._pathPointId = i;
                    this._pathLineId = "";
                    break;
                }
                var o = e.findPathLineByPos(t);
                if ("" != o) {
                    this._pathLineId = o;
                    this._pathPointId = "";
                }
                break;
            }
            this.updateRoomId();
        };
        e.prototype.onBeHurt = function (e) {
            var n = this;
            t.prototype.onBeHurt.call(this, e);
            var i = this.node.getChildByName("Body").getComponent(cc.Animation);
            if (i) {
                this.fixedZIndex = cc.macro.MAX_ZINDEX;
                i.once(
                    cc.Animation.EventType.FINISHED,
                    function () {
                        n.fixedZIndex = 0;
                    },
                    this
                );
                if (e.skillId && 21 == e.skillId) {
                    $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_JinQianJianMingZhong", 0.2);
                } else {
                    $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_MonsterHurt", 0.2);
                }
                i.play("EnemyHurt", 0);
            }
            var o = this.node.getChildByName("Body").getChildByName("Anim").getComponent($shimmerWhite.default);
            if (o) {
                o.show(0.2);
            }
        };
        e.prototype.searchTarget = function () {
            for (
                var t = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER),
                    e = this.node.getPosition(),
                    n = Number.MAX_VALUE,
                    i = null,
                    o = 0;
                o < t.length;
                o++
            ) {
                var r = t[o];
                if (!r.isDead() && r.canBeSearch()) {
                    var a = cc.Vec2.squaredDistance(r.node.getPosition(), e);
                    if (null == i || a < n) {
                        n = a;
                        i = r;
                    }
                }
            }
            return i;
        };
        e.prototype.onRemove = function () {
            if (this._actorType == $actorEnum.EActorType.BOSS) {
                $eventManager.EventManager.instance.on(
                    $battleEnum.EBattleEvent.TRIGGER_BOSS_INFORM,
                    this.onBossTrigger,
                    this
                );
            }
            if (this._flagEffect) {
                this._flagEffect.remove();
            }
            t.prototype.onRemove.call(this);
        };
        e.prototype.onDie = function () {
            var e = this;
            this.tempCollisionDoorIds.forEach(function (t) {
                var n = $unitMgr.UnitMgr.instance.getUnit(t);
                if (n) {
                    n.onEnemyExit(e);
                }
            });
            this.tempCollisionDoorIds = [];
            var n = $battleMgr.default.instance.getCurScene();
            var i = 0;
            if (!n.isResult && !this.isNotReward) {
                for (var o = this.node.getPosition(), r = 0; ; ) {
                    if (this.isGroundMove && (c = n.level.getRoomById(this.roomId))) {
                        i = this.roomId;
                        r = c.getGroundY();
                        break;
                    }
                    var s = n.level.findLayerByPos(o);
                    if (-1 != s) {
                        var c;
                        r = n.level.getLayerPosY(s);
                        if ((c = n.level.getRoomByPos(s, this.node.getPosition()))) {
                            i = c.cfg.id;
                        }
                        break;
                    }
                    if ("" != this._pathLineId) {
                        var l = n.level.path.getLine(this._pathLineId);
                        r = l.startPos.y;
                        i = l.roomId;
                    } else if ("" != this._pathPointId) {
                        var h = n.level.path.getPoint(this._pathPointId);
                        r = h.pos.y;
                        i = h.roomId;
                    }
                    break;
                }
                o.y += 0.5 * this.rightHeight;
                var d = 0;
                this._rewardMap.forEach(function (t, s) {
                    if ($itemDataProxy.itemDataProxy.checkCanDropReward(s)) {
                        $cfg.default.instance.dataReward.getById(s);
                        for (
                            var c = t,
                                l = function () {
                                    var t =
                                        (25 * Math.min(Math.floor(d / 2) + 1, 5) +
                                            $randomUtil.RandomUtil.randomInt(-10, 10)) *
                                        (d % 2 == 0 ? 1 : -1);
                                    t = Math.max(t, e.dropMinOffsetX);
                                    t = Math.min(t, e.dropMaxOffsetX);
                                    $unitMgr.UnitMgr.instance.createUnit({
                                        areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                                        areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                                        parent: n.unitParent,
                                        prefabName: "SceneGood",
                                        unitClass: "SceneGood",
                                        initPos: o,
                                        initParam: {
                                            rewardId: s,
                                            rewardNum: 1
                                        },
                                        onCreated: function (e) {
                                            e.updateRoomId(i);
                                            e.drop(r, t, 0.5, 40, 0.2);
                                        }
                                    });
                                    --c;
                                    d++;
                                };
                            c > 0;

                        ) {
                            l();
                        }
                    }
                });
            }
            t.prototype.onDie.call(this);
        };
        e.prototype.pause = function () {
            if (this._animCtrl) {
                this._animCtrl.animation.pause();
            }
            if (this._spCtrl) {
                this._spCtrl.spAnim.paused = !0;
            }
            t.prototype.pause.call(this);
        };
        e.prototype.resume = function () {
            if (this._isPauseAnim) {
                //
            } else {
                if (this._animCtrl) {
                    this._animCtrl.animation.resume();
                }
                if (this._spCtrl) {
                    this._spCtrl.spAnim.paused = !1;
                }
            }
            t.prototype.resume.call(this);
        };
        e.prototype.onBossTrigger = function () {
            this._isTrigger = !0;
        };
        e.prototype.checkPlayerCollision = function () {
            return !1;
        };
        e.prototype.playerCollisionEnter = function () {};
        e.prototype.playerCollisionStay = function () {};
        e.prototype.playerCollisionExit = function () {};
        e.prototype.checkGuide = function () {
            return !this.isGuideEnemy || $guideMgr.GuideMgr.instance.cfgGuideStepId != $guideDataProxy.EGuideStepId.G_7;
        };
        return __decorate([q], e);
    })($actorBase.default));
exports.default = z;
