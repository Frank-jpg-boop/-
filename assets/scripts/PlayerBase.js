var i;
var $cfg = require("./Cfg");
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var $attrMgr = require("./AttrMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $userSetDataProxy = require("./UserSetDataProxy");
var $battleMgr = require("./BattleMgr");
var $stateMachine = require("./StateMachine");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $joystick = require("./Joystick");
var $spAnimCtrl = require("./SpAnimCtrl");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $skillMgr = require("./SkillMgr");
var $levelObjectBase = require("./LevelObjectBase");
var $unitMgr = require("./UnitMgr");
var $actorBase = require("./ActorBase");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $playerAttackState = require("./PlayerAttackState");
var $playerBeDragState = require("./PlayerBeDragState");
var $playerDeadState = require("./PlayerDeadState");
var $playerIdleState = require("./PlayerIdleState");
var $playerWalkState = require("./PlayerWalkState");
var L = cc._decorator;
var j = L.ccclass;
var U =
    (L.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isSlide = !1;
            e._spAnimCtrl = null;
            e._moveTargetPointId = "";
            e._beHurtDisTime = 0;
            e._skills = [];
            e._prevMoveDir = cc.Vec2.ZERO;
            e._prevjoystickTower = 0;
            e._invincibleBlickTween = null;
            e._guideMoveDir = null;
            e.lockTouchMove = !1;
            e.needCheckCollisionType = [
                $gridAreaDivisionMgr.E_AreaObjectType.DOOR,
                $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                $gridAreaDivisionMgr.E_AreaObjectType.ROOM_UNLOCK_AREA,
                $gridAreaDivisionMgr.E_AreaObjectType.LADDER,
                $gridAreaDivisionMgr.E_AreaObjectType.SEARCH_POINT,
                $gridAreaDivisionMgr.E_AreaObjectType.SURVIVOR,
                $gridAreaDivisionMgr.E_AreaObjectType.EVACUATION_EXIT
            ];
            e._tempCollisionIdsMap = null;
            e._tempCollisionEnemyIds = null;
            e._isShowGuideTips = !1;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "spAnimCtrl", {
            get: function () {
                return this._spAnimCtrl;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "prevMoveDir", {
            get: function () {
                return this._prevMoveDir;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "moveTargetPointId", {
            get: function () {
                return this._moveTargetPointId;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isSlide", {
            get: function () {
                return this._isSlide;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            this._spAnimCtrl = this.node
                .getChildByName("Body")
                .getChildByName("SpAnim")
                .getComponent($spAnimCtrl.default);
            t.prototype.onLoad.call(this);
        };
        e.prototype.initAttribute = function () {
            t.prototype.initAttribute.call(this);
            this._actorAttribute.init($attrEnum.E_AttrType);
            var e = $attrMgr.AttrMgr.instance.getPlayerAttrMap();
            var n = function (t) {
                if (e.has(t)) {
                    return e.get(t);
                } else {
                    return 0;
                }
            };
            var i = Math.floor(n($attrEnum.E_AttrType.ATK) * n($attrEnum.E_AttrType.ATK_RATE));
            this.getAttribute($attrEnum.E_AttrType.ATK).setFixBase(i);
            var o = n($attrEnum.E_AttrType.SKILL_CD);
            this.getAttribute($attrEnum.E_AttrType.SKILL_CD).setFixBase(o);
            var r = Math.floor(n($attrEnum.E_AttrType.HP) * n($attrEnum.E_AttrType.HP_RATE));
            this.getAttribute($attrEnum.E_AttrType.HP).setFixBase(r);
            var a = n($attrEnum.E_AttrType.CRIT_RATE);
            this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).setFixBase(a);
            var s = n($attrEnum.E_AttrType.CRIT_HURT);
            this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).setFixBase(s);
            var c = n($attrEnum.E_AttrType.SPEED);
            this.getAttribute($attrEnum.E_AttrType.SPEED).setFixBase(c);
        };
        e.prototype.initAnim = function () {
            var e = $cfg.default.instance.dataSkin.getById($playerDataProxy.playerDataProxy.skinId);
            this.spAnimCtrl.init({
                skeletonData: $battleMgr.default.instance.getCurScene().getAsset(e.skin, sp.SkeletonData)
            });
            return t.prototype.initAnim.call(this);
        };
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.PLAYER;
        };
        e.prototype.registerState = function () {
            this._sm = new $stateMachine.StateMachine(new $playerIdleState.PlayerIdleState(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $playerWalkState.PlayerWalkState(this));
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $playerAttackState.PlayerAttackState(this));
            this._sm.addState($actorEnum.EActorStateType.DEAD, new $playerDeadState.PlayerDeadState(this));
            this._sm.addState($actorEnum.EActorStateType.EXTEND_1, new $playerBeDragState.PlayerBeDragState(this));
        };
        e.prototype.registerEvent = function () {
            $eventManager.EventManager.instance.on($joystick.EJoystickEvent.TOUCH_MOVE, this.onJoystickMove, this);
            $eventManager.EventManager.instance.on($joystick.EJoystickEvent.TOUCH_END, this.onJoystickEnd, this);
            $eventManager.EventManager.instance.on($battleEnum.EBattleEvent.REVIVE_PLAYER, this.revive, this);
            $eventManager.EventManager.instance.on(
                $levelBattleData.ELevelBattleDataEvent.ADD_SKILL,
                this.onEventAddSkill,
                this
            );
            $eventManager.EventManager.instance.on(
                $levelBattleData.ELevelBattleDataEvent.REMOVE_SKILL,
                this.onEventRemoveSkill,
                this
            );
            $eventManager.EventManager.instance.on($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
            t.prototype.registerEvent.call(this);
        };
        e.prototype.initSkill = function () {
            var t = this;
            this._skills = [];
            $levelBattleData.levelBattleData.skillIds.forEach(function (e) {
                var n = $skillMgr.SkillMgr.instance.createSkill(e, t);
                $eventManager.EventManager.instance.emit($actorEnum.EPlayerEvent.PLAYER_CREATE_SKILL, e, function (t) {
                    n.bindCDItem(t);
                });
                t._skills.push(n);
            });
            $levelBattleData.levelBattleData.skillExMap.forEach(function (e, n) {
                var i = $cfg.default.instance.dataChoose.getById(n);
                var o = t._skills.find(function (t) {
                    return t.cfg.id == i.withSkill;
                });
                if (o) {
                    for (var r = e.count; r > 0; ) {
                        o.addSkillEx(e.id);
                        r--;
                    }
                }
            });
        };
        e.prototype.onInit = function () {
            var t = this;
            this._prevMoveDir = cc.v2(1, 0);
            this._tempCollisionIdsMap = new Map();
            this.needCheckCollisionType.forEach(function (e) {
                t._tempCollisionIdsMap.set(e, new Map());
            });
            this._tempCollisionEnemyIds = [];
        };
        e.prototype.getTempCollisionIds = function (t) {
            return Array.from(this._tempCollisionIdsMap.get(t).values());
        };
        e.prototype.onJoystickMove = function (t, e, n) {
            if (this.lockTouchMove) {
                //
            } else {
                if (this.curState != $actorEnum.EActorStateType.EXTEND_1) {
                    this.isDead() ||
                        this._isSlide ||
                        (0 != t.x || 0 != t.y ? this.moveToDir(t.clone(), n) : (this.moveDir = null));
                } else {
                    (this._isSlide = !1),
                        this._prevjoystickTower != e && 1 == e && this._sm.currentState.subDrag(),
                        (this._prevjoystickTower = e);
                }
            }
        };
        e.prototype.onJoystickEnd = function () {
            if (
                !this.lockTouchMove &&
                ((this._prevjoystickTower = 0), this.curState != $actorEnum.EActorStateType.EXTEND_1 && !this.isDead())
            ) {
                this.moveDir = null;
                if ("" != this._moveTargetPointId) {
                    var t = $battleMgr.default.instance.getCurScene().level.path.getPoint(this._moveTargetPointId);
                    var e = (1 * this.getAttribute($attrEnum.E_AttrType.SPEED).value) / 60 - 0.1;
                    if (t.isInPoint(this.node.getPosition(), e)) {
                        this.setPos(t.pos);
                    }
                }
                this._moveTargetPointId = "";
                this.updatePathData(!1);
                this.changeState($actorEnum.EActorStateType.IDLE);
            }
        };
        e.prototype.moveToDir = function (t, e) {
            if ("" == this._pathPointId) {
                if ("" == this._pathLineId) {
                    //
                } else {
                    this.moveInLine(t, e);
                }
            } else {
                this.moveInPoint(t, e);
            }
        };
        e.prototype.moveInPoint = function (t, e) {
            var n = this;
            var i = $battleMgr.default.instance.getCurScene();
            var o = i.level.path;
            var r = o.getPoint(this._pathPointId);
            var a = this.node.getPosition();
            var s = o.findPointValidMinLine(t, r, i.isWaitRescue);
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_5 &&
                s &&
                1 == Math.abs(s.dir.y) &&
                11 == this.roomId &&
                $unitMgr.UnitMgr.instance
                    .queryUnit($gridAreaDivisionMgr.E_AreaObjectType.SEARCH_POINT)
                    .filter(function (t) {
                        return 11 == t.roomId;
                    }).length > 0
            ) {
                s = null;
                if (this._isShowGuideTips) {
                    //
                } else {
                    $globalPopupMgr.default.instance.showTips("【还有地方没搜索完】");
                    this._isShowGuideTips = !0;
                    this.scheduleOnce(function () {
                        n._isShowGuideTips = !1;
                    }, 3);
                }
            }
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId >= $guideDataProxy.EGuideStepId.G_7 &&
                s &&
                1 == Math.abs(s.dir.y) &&
                21 == this.roomId
            ) {
                s = null;
                if (this._isShowGuideTips) {
                    //
                } else {
                    $globalPopupMgr.default.instance.showTips("【怪物过来了，别下去，躲避到右边房间去吧！】");
                    this._isShowGuideTips = !0;
                    this.scheduleOnce(function () {
                        n._isShowGuideTips = !1;
                    }, 3);
                }
            }
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_10 &&
                s &&
                1 == Math.abs(s.dir.y) &&
                23 == this.roomId
            ) {
                s = null;
                if (this._isShowGuideTips) {
                    //
                } else {
                    $globalPopupMgr.default.instance.showTips("【救救那个人吧！】");
                    this._isShowGuideTips = !0;
                    this.scheduleOnce(function () {
                        n._isShowGuideTips = !1;
                    }, 3);
                }
            }
            if (null != s) {
                if (this.moveDir && (s.dir.x != this.moveDir.x || s.dir.y != this.moveDir.y) && !this._isSlide) {
                    this._isSlide = !0;
                    var c = r.pos.add(s.dir.mul(50));
                    var u =
                        this.getAttribute($attrEnum.E_AttrType.SPEED).value /
                        this.getAttribute($attrEnum.E_AttrType.SPEED).baseValue;
                    var p = Math.max(0.05, 0.2 / u);
                    cc.tween(this.node)
                        .to(p, {
                            x: c.x,
                            y: c.y
                        })
                        .call(function () {
                            n._isSlide = !1;
                            n.setPos(c, !0);
                        })
                        .start();
                }
                if (this.moveDir) {
                    //
                } else {
                    if (1 == Math.abs(s.dir.x)) {
                        (a.y = r.pos.y), this.setPos(a);
                    } else {
                        1 == Math.abs(s.dir.y) && ((a.x = r.pos.x), this.setPos(a));
                    }
                }
                this._pathPointId = "";
                this._pathLineId = s.lineId;
                this.moveDir = $mathUtil.MathUtil.vec2Fixed(s.dir);
                this._prevMoveDir = this.moveDir.clone();
                this._moveTargetPointId = s.endPoint.pointId;
                this.updateRoomId();
                this.changeState($actorEnum.EActorStateType.WALK);
            } else if ("" != this._moveTargetPointId) {
                var m = o.getPoint(this._moveTargetPointId);
                if (
                    m.isInPoint(this.node.getPosition(), this.getAttribute($attrEnum.E_AttrType.SPEED).value * e - 0.1)
                ) {
                    this.moveDir = null;
                    this._moveTargetPointId = "";
                    this.setPos(m.pos);
                }
            } else {
                this.moveDir = null;
                this._moveTargetPointId = "";
            }
        };
        e.prototype.moveInLine = function (t, e) {
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                22 == this.roomId &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId >= $guideDataProxy.EGuideStepId.G_8
            ) {
                var n = Array.from(this._tempCollisionIdsMap.get($gridAreaDivisionMgr.E_AreaObjectType.DOOR).values());
                if (
                    n &&
                    n.length > 0 &&
                    n.some(function (t) {
                        return 22 == $unitMgr.UnitMgr.instance.getUnit(t).roomId;
                    }) &&
                    t.x < 0
                ) {
                    t = cc.Vec2.ZERO;
                }
            }
            if (0 == t.x && 0 == t.y) {
                this.moveDir = null;
                this._moveTargetPointId = "";
                return void this.changeState($actorEnum.EActorStateType.IDLE);
            }
            var i = $battleMgr.default.instance.getCurScene().level.path;
            var o = this.getAttribute($attrEnum.E_AttrType.SPEED).value * e + 20;
            var r = i.getLine(this._pathLineId);
            var a = this.node.getPosition();
            if (r.startPoint.isInPoint(a, o)) {
                this._pathLineId = "";
                this._pathPointId = r.startPoint.pointId;
                this.moveInPoint(t, e);
            } else if (r.endPoint.isInPoint(a, o)) {
                this._pathLineId = "";
                this._pathPointId = r.endPoint.pointId;
                this.moveInPoint(t, e);
            } else {
                var s = (180 * t.angle(r.dir)) / Math.PI;
                if (s < 90) {
                    this.moveDir = $mathUtil.MathUtil.vec2Fixed(r.dir);
                    this._prevMoveDir = this.moveDir.clone();
                    this._moveTargetPointId = r.endPoint.pointId;
                } else if (s > 90) {
                    var c = i.getLine(r.reverseLineId);
                    if (c) {
                        this.moveDir = $mathUtil.MathUtil.vec2Fixed(c.dir);
                        this._prevMoveDir = this.moveDir.clone();
                        this._moveTargetPointId = c.endPoint.pointId;
                        this._pathLineId = c.lineId;
                    } else {
                        this.moveDir = null;
                        this._moveTargetPointId = "";
                    }
                } else {
                    this.moveDir = null;
                    this._moveTargetPointId = "";
                }
                this.updateRoomId();
            }
            if (this.moveDir && 1 == this.moveDir.y) {
                this.setDirX(t.x > 0);
            }
            this.changeState($actorEnum.EActorStateType.WALK);
        };
        e.prototype.unRegisterEvent = function () {
            $eventManager.EventManager.instance.off($joystick.EJoystickEvent.TOUCH_MOVE, this.onJoystickMove, this);
            $eventManager.EventManager.instance.off($joystick.EJoystickEvent.TOUCH_END, this.onJoystickEnd, this);
            $eventManager.EventManager.instance.off($battleEnum.EBattleEvent.REVIVE_PLAYER, this.revive, this);
            $eventManager.EventManager.instance.off(
                $levelBattleData.ELevelBattleDataEvent.ADD_SKILL,
                this.onEventAddSkill,
                this
            );
            $eventManager.EventManager.instance.off(
                $levelBattleData.ELevelBattleDataEvent.REMOVE_SKILL,
                this.onEventRemoveSkill,
                this
            );
            $eventManager.EventManager.instance.off($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
            t.prototype.unRegisterEvent.call(this);
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            this._skills.forEach(function (t) {
                t.update(e);
            });
            if (this._beHurtDisTime > 0) {
                this._beHurtDisTime -= e;
                if (this._beHurtDisTime < 0) {
                    this._beHurtDisTime = 0;
                    this.exitInvincible();
                }
            }
            var n = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            var i = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(this.node.x, this.node.y);
            this.checkLevelObjectCollision(i.key, n, e);
            this.checkEnemyCollision(i.key, n, e);
            if (this._guideMoveDir) {
                this.moveToDir(this._guideMoveDir.clone(), e);
            }
        };
        e.prototype.checkLevelObjectCollision = function (t, e, n) {
            var i = this;
            this.needCheckCollisionType.forEach(function (o) {
                var r =
                    0 != $levelBattleData.levelBattleData.cfgStage.id &&
                    o != $gridAreaDivisionMgr.E_AreaObjectType.DOOR &&
                    o != $gridAreaDivisionMgr.E_AreaObjectType.GOOD &&
                    o != $gridAreaDivisionMgr.E_AreaObjectType.ROOM_UNLOCK_AREA;
                var a = i._tempCollisionIdsMap.get(o);
                if (r && i.curState == $actorEnum.EActorStateType.WALK) {
                    a.forEach(function (t, e) {
                        var n = $unitMgr.UnitMgr.instance.getUnit(t);
                        if (n) {
                            n.playerCollisionExit(i);
                            a.delete(e);
                        }
                    });
                } else {
                    var s = $gridAreaDivisionMgr.default.instance.getAreaObjectList(t, o);
                    a.forEach(function (t, e) {
                        var n = $unitMgr.UnitMgr.instance.getUnit(t);
                        if (n && s.includes(n)) {
                            //
                        } else {
                            if (n) {
                                n.playerCollisionExit(i);
                            }
                            a.delete(e);
                        }
                    });
                    s.forEach(function (t) {
                        var o = t.getComponent($levelObjectBase.default);
                        if (o) {
                            if (o.isCollisionByPlayer(i, e)) {
                                if (a.has(o.unitId)) {
                                    o.playerCollisionStay(i, n);
                                } else {
                                    a.set(o.unitId, o.unitId), o.playerCollisionEnter(i);
                                }
                            } else {
                                a.has(o.unitId) && (a.delete(o.unitId), o.playerCollisionExit(i));
                            }
                        }
                    });
                }
            });
        };
        e.prototype.checkEnemyCollision = function (t, e, n) {
            var i = this;
            var o = this._tempCollisionEnemyIds;
            if (this.curState != $actorEnum.EActorStateType.WALK) {
                var r = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                    t,
                    $gridAreaDivisionMgr.E_AreaObjectType.ENEMY
                );
                for (a = 0; a < o.length; a++) {
                    if ((s = $actorMgr.default.instance.getActor(o[a])) && r.includes(s)) {
                        //
                    } else {
                        if (s) {
                            s.playerCollisionExit(this);
                        }
                        o.splice(a, 1);
                        a--;
                    }
                }
                r.forEach(function (t) {
                    var r = t.getComponent($enemyBase.default);
                    if (r) {
                        if (r.checkPlayerCollision(i, e)) {
                            if (o.includes(r.unitId)) {
                                r.playerCollisionStay(i, n);
                            } else {
                                o.push(r.unitId);
                                r.playerCollisionEnter(i);
                            }
                        } else {
                            var a = o.indexOf(r.unitId);
                            if (-1 != a) {
                                o.splice(a, 1);
                                r.playerCollisionExit(i);
                            }
                        }
                    }
                });
            } else {
                for (var a = 0; a < o.length; a++) {
                    var s;
                    if ((s = $actorMgr.default.instance.getActor(o[a]))) {
                        s.playerCollisionExit(this);
                        o.splice(a, 1);
                        a--;
                    }
                }
            }
        };
        e.prototype.canBeHurt = function () {
            return (
                !$battleMgr.default.instance.gm_PlayerInvincible &&
                t.prototype.canBeHurt.call(this) &&
                this._beHurtDisTime <= 0
            );
        };
        e.prototype.onBeHurt = function (e) {
            t.prototype.onBeHurt.call(this, e);
            var n = this.node.getChildByName("Body").getChildByName("SpAnim");
            n.color = cc.Color.RED;
            cc.Tween.stopAllByTarget(n);
            cc.tween(n)
                .to(0.1, {
                    color: cc.Color.WHITE
                })
                .start();
            var i = this.node.getChildByName("Body").getComponent(cc.Animation);
            if (i) {
                i.play("PlayerHurt", 0);
            }
            if (e.isNotInvincible) {
                //
            } else {
                this._beHurtDisTime = Number($cfg.default.instance.dataCons.getById(131).val);
                this.enterInvincible();
            }
            if ($userSetDataProxy.userSetDataProxy.isVibration) {
                mm.platform.startVibrate(0);
            }
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_PlayerHit");
        };
        e.prototype.updateRoomId = function (e) {
            var n = this.roomId;
            t.prototype.updateRoomId.call(this, e);
            if (n != this.roomId) {
                var i = $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId);
                if (i) {
                    i.playerArrive();
                }
                $eventManager.EventManager.instance.emit(
                    $battleEnum.EBattleEvent.PLAYER_ROOM_ID_CHANGE_INFORM,
                    this.roomId
                );
                $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.UPDATE_BAG_UI);
            }
        };
        e.prototype.isInRoomPos = function (t) {
            return new cc.Rect(this.node.x, this.node.y, this.node.width, this.node.height).contains(t);
        };
        e.prototype.onRemove = function () {
            var e = this;
            this._tempCollisionIdsMap.forEach(function (t) {
                t.forEach(function (t) {
                    var n = $unitMgr.UnitMgr.instance.getUnit(t);
                    if (n) {
                        n.playerCollisionExit(e);
                    }
                });
            });
            this._tempCollisionIdsMap.clear();
            this._skills.forEach(function (t) {
                t.remove();
            });
            this._skills = [];
            t.prototype.onRemove.call(this);
        };
        e.prototype.revive = function (t) {
            var e = this;
            if (void 0 === t) {
                t = !1;
            }
            var n = this.getAttribute($attrEnum.E_AttrType.HP).value;
            this._hp = n;
            this._head.updateHP(this._hp, n);
            this.changeState($actorEnum.EActorStateType.IDLE);
            if (!t) {
                this._beHurtDisTime = Number($cfg.default.instance.dataCons.getById(132).val);
                this.enterInvincible();
                var i = $battleMgr.default.instance.getCurScene();
                if (!i.isResult) {
                    for (var o = this.node.getPosition(), r = 0; ; ) {
                        if (this.isGroundMove) {
                            var s = i.level.getRoomById(this.roomId);
                            if (s) {
                                r = s.getGroundY();
                                break;
                            }
                        }
                        var c = i.level.findLayerByPos(o);
                        if (-1 != c) {
                            r = i.level.getLayerPosY(c);
                            break;
                        }
                        if ("" != this._pathLineId) {
                            var l = i.level.path.getLine(this._pathLineId);
                            r = l.startPos.y;
                        } else if ("" != this._pathPointId) {
                            var p = i.level.path.getPoint(this._pathPointId);
                            r = p.pos.y;
                        }
                        break;
                    }
                    o.y += 0.5 * this.rightHeight;
                    $unitMgr.UnitMgr.instance.createUnit({
                        areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                        areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                        parent: i.unitParent,
                        prefabName: "SceneGood",
                        unitClass: "SceneGood",
                        initPos: o,
                        initParam: {
                            rewardId: 900,
                            rewardNum: 1
                        },
                        onCreated: function (t) {
                            t.updateRoomId(e.roomId);
                            t.drop(r, $randomUtil.RandomUtil.randomInt(-50, 50), 0.3, 40, 0.2);
                        }
                    });
                }
            }
        };
        e.prototype.enterInvincible = function () {
            if (this._invincibleBlickTween) {
                //
            } else {
                this._invincibleBlickTween = cc
                    .tween(this.node)
                    .to(0.2, {
                        opacity: 100
                    })
                    .to(0.2, {
                        opacity: 255
                    })
                    .union()
                    .repeatForever()
                    .start();
            }
        };
        e.prototype.exitInvincible = function () {
            if (this._invincibleBlickTween) {
                this._invincibleBlickTween.stop();
                this._invincibleBlickTween = null;
            }
            this.node.opacity = 255;
        };
        e.prototype.onEventAddSkill = function (t) {
            var e = $skillMgr.SkillMgr.instance.createSkill(t, this);
            $eventManager.EventManager.instance.emit($actorEnum.EPlayerEvent.PLAYER_CREATE_SKILL, t, function (t) {
                e.bindCDItem(t);
            });
            this._skills.push(e);
        };
        e.prototype.onEventRemoveSkill = function (t) {
            var e = this._skills.findIndex(function (e) {
                return e.cfg.id == t;
            });
            if (-1 != e) {
                this._skills[e].remove();
                this._skills.splice(e, 1);
            }
        };
        e.prototype.pause = function () {
            this._spAnimCtrl.spAnim.paused = !0;
            t.prototype.pause.call(this);
        };
        e.prototype.resume = function () {
            this._spAnimCtrl.spAnim.paused = this._isPauseAnim;
            t.prototype.resume.call(this);
        };
        e.prototype.clearMove = function () {
            this.moveDir = null;
            this._moveTargetPointId = "";
            this.unscheduleAllCallbacks();
            this.changeState($actorEnum.EActorStateType.IDLE);
        };
        e.prototype.onGuideChange = function () {};
        return __decorate([j], e);
    })($actorBase.default));
exports.default = U;
