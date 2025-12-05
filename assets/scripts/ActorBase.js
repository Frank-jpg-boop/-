var i;
var $eventManager = require("./EventManager");
var $nodePoolManager = require("./NodePoolManager");
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $actorBuff = require("./ActorBuff");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $numericData = require("./NumericData");
var $simplyRectCollider = require("./SimplyRectCollider");
var $effectMgr = require("./EffectMgr");
var $spAnimEffect = require("./SpAnimEffect");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $buffEnum = require("./BuffEnum");
var $levelBattleData = require("./LevelBattleData");
var $actorHead = require("./ActorHead");
var $unitBase = require("./UnitBase");
var $actorMgr = require("./ActorMgr");
var I = cc._decorator;
var R = I.ccclass;
var D =
    (I.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._cfgId = 0;
            e._camp = $actorEnum.ETeamType.PLAYER;
            e._hp = 0;
            e._isPauseAnim = !1;
            e._actorType = $actorEnum.EActorType.PLAYER;
            e._actorAttribute = null;
            e._sm = null;
            e._head = null;
            e._hurtCollider = null;
            e._buff = null;
            e._pathPos = null;
            e._isRepeling = !1;
            e._seceondTime = 0;
            e._isRealBoss = !0;
            e._isGroundMove = !1;
            e.moveDir = cc.Vec2.ZERO;
            e.fixedZIndex = 0;
            e.attackTarget = null;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "camp", {
            get: function () {
                return this._camp;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "actorType", {
            get: function () {
                return this._actorType;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "curState", {
            get: function () {
                return this._sm.currentState.stateType;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "hurtColliderRect", {
            get: function () {
                return this._hurtCollider.rect;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "curHp", {
            get: function () {
                return this._hp;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "head", {
            get: function () {
                return this._head;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "rightHeight", {
            get: function () {
                return this.node.getChildByName("Body").height;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isRepeling", {
            get: function () {
                return this._isRepeling;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "buff", {
            get: function () {
                return this._buff;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "dirX", {
            get: function () {
                if (this.node.getChildByName("Body").scaleX > 0) {
                    return 1;
                } else {
                    return -1;
                }
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "pathPos", {
            get: function () {
                return this._pathPos.clone();
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isRealBoss", {
            get: function () {
                return this._isRealBoss;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "isGroundMove", {
            get: function () {
                return this._isGroundMove;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            var e = this.node.getChildByName("HurtCollisider");
            if (e) {
                this._hurtCollider = e.getComponent($simplyRectCollider.default);
            }
        };
        e.prototype.onDestroy = function () {};
        e.prototype.init = function (t, e, n, i, o, r) {
            if (void 0 === r) {
                r = null;
            }
            return __awaiter(this, void 0, Promise, function () {
                var a = this;
                return __generator(this, function (s) {
                    switch (s.label) {
                        case 0:
                            this._unitId = t;
                            this._cfgId = i;
                            this._camp = o;
                            this._hp = 0;
                            this.node.scale = 1;
                            this._initParam = r;
                            this._isRemove = !1;
                            this._isRepeling = !1;
                            this.initType();
                            this.initConfig();
                            this.initAttribute();
                            this._hp =
                                this._initParam && this._initParam.initHp
                                    ? this._initParam.initHp
                                    : this.getAttribute($attrEnum.E_AttrType.HP).value;
                            if (this._initParam && this._initParam.initHpRate) {
                                this._hp *= this._initParam.initHpRate;
                                this._hp = Math.floor(this._hp);
                            }
                            this.initAreaObject(e, n);
                            return [4, this.initAnim()];
                        case 1:
                            s.sent();
                            this.registerState();
                            this.registerEvent();
                            this.initHead();
                            this.initBuff();
                            this.initSkill();
                            this.initPos();
                            this.changeState($actorEnum.EActorStateType.IDLE);
                            return [4, this.playShowAnim()];
                        case 2:
                            s.sent();
                            this.updateUnifyPos();
                            this._pathPos = this.node.getPosition();
                            $eventManager.EventManager.instance.emit($actorEnum.EActorEvent.HP_CHANGE + this._unitId);
                            return [
                                2,
                                new Promise(function (t) {
                                    a.updatePathData();
                                    if (a._initParam && a._initParam.roomId) {
                                        a.updateRoomId(a._initParam.roomId);
                                    }
                                    a.updateAreaKey();
                                    a._isInit = !0;
                                    a.onInit();
                                    t();
                                })
                            ];
                    }
                });
            });
        };
        e.prototype.initType = function () {};
        e.prototype.initConfig = function () {
            this._isGroundMove = !0;
        };
        e.prototype.initAttribute = function () {
            this._actorAttribute = new $numericData.NumericData();
        };
        e.prototype.initAnim = function () {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function () {
                    return [
                        2,
                        new Promise(function (t) {
                            t();
                        })
                    ];
                });
            });
        };
        e.prototype.registerState = function () {};
        e.prototype.initHead = function () {
            var t = this;
            if (this.actorType != $actorEnum.EActorType.BOSS) {
                $battleMgr.default.instance.createOtherNode(
                    this._actorType == $actorEnum.EActorType.PLAYER ? "PlayerHead" : "EnemyHead",
                    function (e) {
                        t._head = e.getComponent($actorHead.default);
                        if (t._head) {
                            t._head.init(t.rightHeight + 10, !1);
                            t._head.updateHP(t._hp, t._actorAttribute.getNumeric($attrEnum.E_AttrType.HP).value);
                        }
                    }
                );
            }
        };
        e.prototype.registerEvent = function () {};
        e.prototype.initSkill = function () {};
        e.prototype.initBuff = function () {
            this._buff = new $actorBuff.default();
        };
        e.prototype.playShowAnim = function () {
            var t = this;
            return new Promise(function (e) {
                if (t._initParam && t._initParam.showAnim) {
                    t._initParam.showAnim(t, function () {
                        e();
                    });
                } else {
                    e();
                }
            });
        };
        e.prototype.initPos = function () {};
        e.prototype.onInit = function () {};
        e.prototype.update = function () {
            if (this._head) {
                this._head.node.x = this.node.x;
                this._head.node.y = this.node.y + this._head.headOffsetY;
            }
        };
        e.prototype.updateActor = function (t) {
            if (!this._isInit || this.isDead() || this._isRemove) {
                //
            } else {
                if (this._sm) {
                    this._sm.update(t);
                }
                if (this._buff) {
                    this._buff.update(t);
                }
                this._seceondTime -= t;
                if (this._seceondTime <= 0) {
                    this._seceondTime = 1;
                    this.updateSecond();
                }
                this.onUpdate(t);
            }
        };
        e.prototype.onUpdate = function () {};
        e.prototype.updateSecond = function () {
            this.onSecondUpdate();
        };
        e.prototype.onSecondUpdate = function () {};
        e.prototype.setPos = function (t, e) {
            if (void 0 === e) {
                e = !0;
            }
            $mathUtil.MathUtil.vec2Fixed(t);
            this.node.setPosition(t);
            this.updateUnifyPos();
            this.updateAreaKey();
            if (e) {
                this._pathPos = t;
            }
        };
        e.prototype.setDirX = function (t) {
            var e = this.node.getChildByName("Body");
            e.scaleX = Math.abs(e.scaleX) * (t ? 1 : -1);
        };
        e.prototype.setHp = function (t) {
            this._hp = t;
            if (this._head) {
                this._head.updateHP(this._hp, this._actorAttribute.getNumeric($attrEnum.E_AttrType.HP).value);
            }
        };
        e.prototype.canBeHurt = function () {
            return !(
                !this._isInit ||
                this.isDead() ||
                (this._sm && this.curState == $actorEnum.EActorStateType.RETREAT)
            );
        };
        e.prototype.beHurt = function (t) {
            if (
                !$battleMgr.default.instance.getCurScene().isPlay ||
                $battleMgr.default.instance.getCurScene().isResult
            ) {
                return 0;
            }
            if (!this.canBeHurt()) {
                return 0;
            }
            if (!t || t.damage <= 0) {
                return 0;
            }
            if (this._buff && this._buff.has($buffEnum.EBuffId.EASY)) {
                t.damage *= 1 + this._buff.get($buffEnum.EBuffId.EASY).addHurtValue;
            }
            t.damage = Math.floor(t.damage);
            this.onBeforeHurt(t);
            if (!t || t.damage <= 0) {
                return 0;
            }
            this._hp -= t.damage;
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                this._actorType == $actorEnum.EActorType.PLAYER &&
                this._hp <= 0
            ) {
                this._hp = 1;
            }
            this.onBeHurt(t);
            if (this._hp < 0) {
                this._hp = 0;
            }
            var e = this.getAttribute($attrEnum.E_AttrType.HP).value;
            if (this._head) {
                this._head.updateHP(this._hp, e);
            }
            if (0 == this._hp) {
                this.changeState($actorEnum.EActorStateType.DEAD);
            }
            var n = this.node.getPosition();
            n.y += this.rightHeight + $randomUtil.RandomUtil.randomInt(0, 30);
            n.x += $randomUtil.RandomUtil.randomInt(-20, 20);
            var i = $battleEnum.EBattlePopupNumType.COMMON_HURT;
            if (this._actorType == $actorEnum.EActorType.PLAYER) {
                n.y += 20;
                i = $battleEnum.EBattlePopupNumType.PLAYER_HURT;
            }
            if (t.isCrit) {
                i = $battleEnum.EBattlePopupNumType.CRIT;
            }
            $battleMgr.default.instance.popupNum(n, $mathUtil.MathUtil.formatValue(t.damage), i);
            return this._hp;
        };
        e.prototype.onBeforeHurt = function (t) {
            $eventManager.EventManager.instance.emit($actorEnum.EActorEvent.BEFORE_BE_HURT + this._unitId, t, this);
        };
        e.prototype.onBeHurt = function (t) {
            $eventManager.EventManager.instance.emit($actorEnum.EActorEvent.BE_HURT + this._unitId, t, this);
            if (this._actorType == $actorEnum.EActorType.BOSS) {
                $eventManager.EventManager.instance.emit(
                    $actorEnum.EActorEvent.BOSS_HP_CHANGE,
                    this.curHp,
                    this.getAttribute($attrEnum.E_AttrType.HP).value
                );
            }
        };
        e.prototype.beRecover = function (t) {
            if (!this.isDead()) {
                t = Math.floor(t);
                var e = this._actorAttribute.getNumeric($attrEnum.E_AttrType.HP).value;
                if (!((t = Math.min(t, e - this._hp)) <= 0)) {
                    this._hp += t;
                    this._hp = Math.min(this._hp, e);
                    if (this._head) {
                        this._head.updateHP(this._hp, e);
                    }
                    var n = this.node.getPosition();
                    n.y += this.rightHeight;
                    $battleMgr.default.instance.popupNum(
                        n,
                        "+" + $mathUtil.MathUtil.formatValue(t),
                        $battleEnum.EBattlePopupNumType.HEAL
                    );
                    $effectMgr.default.instance.createEffect({
                        parent: this.node,
                        prefabName: "EHeal",
                        initPos: cc.v2(0, 0.3 * this.rightHeight),
                        effectClass: $spAnimEffect.default,
                        onCreated: function (t) {
                            t.node.setSiblingIndex(0);
                            t.playDefaultAnim("animation", 2, !1);
                        }
                    });
                }
            }
        };
        e.prototype.canBeRepel = function () {
            return !this.isDead() && !this._isRepeling && "" == this._pathPointId && "" != this._pathLineId;
        };
        e.prototype.beRepel = function (t, e) {
            var n = this;
            if (this.canBeRepel()) {
                var i = $battleMgr.default.instance.getCurScene().level.path.getLine(this._pathLineId);
                if (i) {
                    if (1 == Math.abs(i.dir.x)) {
                        var o = e;
                        if (t.x > this.node.x) {
                            var r = null;
                            if (i.endPos.x < i.startPos.x) {
                                r = i.endPos;
                            } else {
                                r = i.startPos;
                            }
                            if (Math.abs(r.x - this.node.x) < e) {
                                o = Math.abs(r.x - this.node.x);
                            }
                            o *= -1;
                        } else {
                            if (i.endPos.x > i.startPos.x) {
                                r = i.endPos;
                            } else {
                                r = i.startPos;
                            }
                            Math.abs(r.x - this.node.x) < e && (o = Math.abs(r.x - this.node.x));
                        }
                        this._isRepeling = !0;
                        cc.tween(this.node)
                            .by(
                                0.2,
                                {
                                    x: o
                                },
                                {
                                    easing: "quintOut"
                                }
                            )
                            .call(function () {
                                n.setPos(n.node.getPosition(), !0);
                                n._isRepeling = !1;
                            })
                            .start();
                    } else if (1 == Math.abs(i.dir.y)) {
                        var a = e;
                        if (t.y > this.node.y) {
                            if (i.endPos.y < i.startPos.y) {
                                r = i.endPos;
                            } else {
                                r = i.startPos;
                            }
                            Math.abs(r.y - this.node.y) < e && (a = Math.abs(r.y - this.node.y));
                            a *= -1;
                        } else {
                            if (i.endPos.y > i.startPos.y) {
                                r = i.endPos;
                            } else {
                                r = i.startPos;
                            }
                            Math.abs(r.y - this.node.y) < e && (a = Math.abs(r.y - this.node.y));
                        }
                        this._isRepeling = !0;
                        cc.tween(this.node)
                            .by(
                                0.2,
                                {
                                    y: a
                                },
                                {
                                    easing: "quintOut"
                                }
                            )
                            .call(function () {
                                n.setPos(n.node.getPosition(), !0);
                                n._isRepeling = !1;
                            })
                            .start();
                    }
                }
            }
        };
        e.prototype.isDead = function () {
            return (
                !cc.isValid(this) ||
                this._hp <= 0 ||
                (this._sm && this._sm.currentState.stateType == $actorEnum.EActorStateType.DEAD)
            );
        };
        e.prototype.canBeSearch = function () {
            return this._isInit && !this.isDead();
        };
        e.prototype.canAttackTarget = function (t) {
            return !(!t || t.isDead());
        };
        e.prototype.getAttribute = function (t) {
            return this._actorAttribute.getNumeric(t);
        };
        e.prototype.changeState = function (t) {
            for (var e, n = [], i = 1; i < arguments.length; i++) {
                n[i - 1] = arguments[i];
            }
            (e = this._sm).changeState.apply(e, __spreadArrays([t], n));
        };
        e.prototype.die = function () {
            this.onDie();
            this.remove();
            $eventManager.EventManager.instance.emit($actorEnum.EActorEvent.ACTOR_DEAD_REMOVE, this);
        };
        e.prototype.onDie = function () {
            $eventManager.EventManager.instance.emit($actorEnum.EActorEvent.ACTOR_DEAD, this);
        };
        e.prototype.remove = function () {
            if (this._isRemove) {
                //
            } else {
                this._isRemove = !0;
                cc.Tween.stopAllByTarget(this.node);
                this.onRemove();
            }
        };
        e.prototype.onRemove = function () {
            var t = this;
            this._isInit = !1;
            this._areaKeys.forEach(function (e) {
                $gridAreaDivisionMgr.default.instance.removeAreaObject(t, e);
            });
            if (this._head) {
                $nodePoolManager.default.instance.putNode(this._head.node, !0);
                this._head = null;
            }
            if (this._buff) {
                this._buff.clear(!1);
            }
            this._actorAttribute.clear();
            this._actorAttribute = null;
            $actorMgr.default.instance.remoreActor(this._unitId);
            this.unRegisterEvent();
            this.destroy();
            $nodePoolManager.default.instance.putNode(this.node, !0);
        };
        e.prototype.unRegisterEvent = function () {};
        e.prototype.canAttack = function () {
            return !0;
        };
        e.prototype.commonAttackHitEffect = function () {};
        e.prototype.attack = function (t) {
            $eventManager.EventManager.instance.emit($actorEnum.EActorEvent.COMMON_ATTACK + this._unitId);
            this.onAttack(t);
        };
        e.prototype.onAttack = function () {};
        e.prototype.searchTarget = function () {
            return null;
        };
        e.prototype.getBeHurtPos = function () {
            var t = this.node.getChildByName("Body").height;
            return this.node.getPosition().add(cc.v2(0, 0.5 * t));
        };
        e.prototype.pause = function () {
            this.node.pauseAllActions();
        };
        e.prototype.resume = function () {
            this.node.resumeAllActions();
        };
        return __decorate([R], e);
    })($unitBase.default));
exports.default = D;
