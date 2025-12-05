var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $randomUtil = require("./RandomUtil");
var $frameEnum = require("./FrameEnum");
var $animUtils = require("./AnimUtils");
var $battleMgr = require("./BattleMgr");
var $spAnimCtrl = require("./SpAnimCtrl");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $boss_621_Atk = require("./Boss_621_Atk");
var $boss_621_Idle = require("./Boss_621_Idle");
var $boss_621_Skin = require("./Boss_621_Skin");
var $boss_621_Walk = require("./Boss_621_Walk");
var A = cc._decorator;
var w = A.ccclass;
var C =
    (A.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isTransfiguration = !1;
            e._isGiveing = !1;
            e._nWaitView = null;
            e._spAnimWaitCtrl = null;
            e._needItems = [];
            e._rangeAngles = [60, 120];
            e._skinId = 1;
            e._switchSKinRound = 0;
            e._spAnimCommonAtk = null;
            e.minRange = 200;
            e.maxRange = 400;
            e._skin1ItemIds = [];
            e.skin2ItemIds = [];
            e._skin3ItemIds = [];
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "rangeAngles", {
            get: function () {
                return this._rangeAngles;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "skinId", {
            get: function () {
                return this._skinId;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "spAnimCommonAtk", {
            get: function () {
                return this._spAnimCommonAtk;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._nWaitView = this.node.getChildByName("Body").getChildByName("WaitView");
            this._spAnimCommonAtk = this.node
                .getChildByName("Body")
                .getChildByName("CommonAtkAnim")
                .getComponent($spAnimCtrl.default);
        };
        e.prototype.initPos = function () {
            var t = $battleMgr.default.instance.getCurScene().level.getRoomById(621);
            if (t) {
                var e = cc.v2(t.node.x + t.node.width / 2, t.getGroundY());
                e.x += $randomUtil.RandomUtil.randomInt(-200, 200);
                this.updateRoomId(621);
                this.node.setPosition(e);
            }
        };
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $boss_621_Atk.Boss_621_Atk(this));
            this._sm.addState($actorEnum.EActorStateType.IDLE, new $boss_621_Idle.Boss_621_Idle(this));
            this._sm.addState($actorEnum.EActorStateType.WALK, new $boss_621_Walk.Boss_621_Walk(this));
            this._sm.addState($actorEnum.EActorStateType.EXTEND_1, new $boss_621_Skin.Boss_621_Skin(this));
        };
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.BOSS;
        };
        e.prototype.initAnim = function () {
            this._nWaitView.active = !0;
            this._spAnimWaitCtrl = this._nWaitView.getChildByName("Anim").getComponent($spAnimCtrl.default);
            this._spAnimWaitCtrl.init();
            this._spAnimWaitCtrl.playAnim("stand1", 1, !0);
            this.node.getChildByName("Body").getChildByName("Anim").active = !1;
            return t.prototype.initAnim.call(this);
        };
        e.prototype.onInit = function () {
            this._skin1ItemIds = [];
            this.setSkinId(1);
            this._isGiveing = !1;
            this._isTransfiguration = !1;
            this._needItems = this._cfg.val3.split("|").map(Number);
            this.showItemBubble();
            t.prototype.onInit.call(this);
        };
        e.prototype.showItemBubble = function (t, e) {
            if (void 0 === t) {
                t = null;
            }
            if (void 0 === e) {
                e = !1;
            }
            var n = this._needItems[0];
            var i = this._nWaitView.getChildByName("Bubble");
            if (n) {
                var o = $cfg.default.instance.dataReward.getById(n);
                $resLoader.ResLoader.setSpritFrame(
                    cc.find("Item/View/Icon", i).getComponent(cc.Sprite),
                    $frameEnum.Frame.EBundleName.RES,
                    "textures/atlas/item_scene/" + o.spr
                );
            }
            if (e) {
                cc.tween(i)
                    .to(0.2, {
                        scale: 0
                    })
                    .call(function () {
                        if (t) {
                            t();
                        }
                    })
                    .start();
            } else {
                cc.tween(i)
                    .to(0.2, {
                        scale: 0
                    })
                    .to(
                        0.3,
                        {
                            scale: 1.5
                        },
                        {
                            easing: "backOut"
                        }
                    )
                    .to(0.1, {
                        scale: 1
                    })
                    .delay(0.5)
                    .call(function () {
                        $animUtils.AnimUtil.swingAnim(i, 15, 0, 0.5, 1);
                        if (t) {
                            t();
                        }
                    })
                    .start();
            }
        };
        e.prototype.canBeSearch = function () {
            return this._isTransfiguration && t.prototype.canBeSearch.call(this);
        };
        e.prototype.canBeHurt = function () {
            return this._isTransfiguration && t.prototype.canBeHurt.call(this);
        };
        e.prototype.canAttackTarget = function (t) {
            if (!t || t.isDead()) {
                return !1;
            }
            var e = t.node.getPosition().sub(this.node.getPosition());
            var n = e.magSqr();
            var i = (180 * cc.Vec2.RIGHT_R.signAngle(e.normalize().mul(-1))) / Math.PI;
            return (
                i >= this._rangeAngles[0] &&
                i <= this._rangeAngles[1] &&
                n >= this.minRange * this.minRange &&
                n <= this.maxRange * this.maxRange
            );
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            if (this.canGiveItem()) {
                this.giveItem();
            }
        };
        e.prototype.playAnimSkinChange = function (t) {
            if (void 0 === t) {
                t = null;
            }
            this._spCtrl.playAnim("change" + this._skinId, 1, !1, function () {
                if (t) {
                    t();
                }
            });
        };
        e.prototype.playAnimAttack = function (t, e) {
            var n = this;
            this._skin1ItemIds.forEach(function (t) {
                var e = $actorMgr.default.instance.getActor(t);
                if (e && !e.isDead()) {
                    e.changeState($actorEnum.EActorStateType.DEAD);
                }
            });
            this._skin1ItemIds = [];
            this._skin3ItemIds.forEach(function (t) {
                var e = $actorMgr.default.instance.getActor(t);
                if (e && !e.isDead()) {
                    e.changeState($actorEnum.EActorStateType.DEAD);
                }
            });
            this._skin3ItemIds = [];
            if (2 == this._skinId) {
                this.readySkin2Item();
            }
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
        };
        e.prototype.setSkinId = function (t) {
            if (3 == this._skinId) {
                this._switchSKinRound++;
            }
            this._skinId = t;
            this._atkAnimName = "atk_skin" + t;
            this._standAnimName = "stand_skin" + t;
            this._dieAnimName = "die_skin" + t;
            this._moveAnimName = "stand_skin" + t;
        };
        e.prototype.canGiveItem = function () {
            if (this._isTransfiguration) {
                return !1;
            }
            if (this._isGiveing) {
                return !1;
            }
            if (0 == this._needItems.length) {
                return !1;
            }
            var t = $battleMgr.default.instance.getCurScene();
            if (!t) {
                return !1;
            }
            var e = $actorMgr.default.instance.getActor(t.playerId);
            return !(
                !e ||
                e.isDead() ||
                !(
                    this._roomId == e.roomId &&
                    Math.abs(e.node.x - this.node.x) < 50 &&
                    $levelBattleData.levelBattleData.hasBagItem(Number(this._needItems[0]))
                )
            );
        };
        e.prototype.giveItem = function () {
            var t = this;
            this._isGiveing = !0;
            var e = this._needItems.shift();
            var n = this._nWaitView.getChildByName("Bubble");
            var i = cc.find("Item/View/Icon", n);
            $eventManager.EventManager.instance.emit(
                $battleEnum.EBattleEvent.CONSUME_FLY_ITEM,
                e,
                1,
                i.convertToWorldSpaceAR(cc.v2(0, 0)),
                function () {
                    $levelBattleData.levelBattleData.consumeBagItem(e);
                    if (1 == t._needItems.length) {
                        t._spAnimWaitCtrl.playAnim("stand2", 1, !0);
                    }
                    t.showItemBubble(function () {
                        t._isGiveing = !1;
                        if (0 == t._needItems.length) {
                            $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.TRIGGER_BOSS);
                        }
                    }, 0 == t._needItems.length);
                }
            );
        };
        e.prototype.transfiguration = function () {
            var t = this;
            this._nWaitView.getChildByName("Bubble").active = !1;
            this._spAnimWaitCtrl.playAnim("change", 1, !1, function () {
                t._nWaitView.active = !1;
                t.node.getChildByName("Body").getChildByName("Anim").active = !0;
                t._spCtrl.playAnim("appear", 1, !1, function () {
                    $eventManager.EventManager.instance.emit(
                        $battleEnum.EBattleEvent.LOOKAT_BOSS,
                        t.node.convertToWorldSpaceAR(cc.v2())
                    );
                    t._isTransfiguration = !0;
                    t._isTrigger = !0;
                });
            });
        };
        e.prototype.onBossTrigger = function () {
            this.transfiguration();
        };
        e.prototype.getAttackCount = function () {
            return Number(this._cfg.val1) + Number(this._cfg.val2) * this._switchSKinRound;
        };
        e.prototype.attackHit = function () {
            $battleMgr.default.instance.getCurScene();
            this.node.getPosition();
            switch (this._skinId) {
                case 1:
                    this.releaseSkin1Item();
                    break;
                case 2:
                    this.releaseSkin2Item();
                    break;
                case 3:
                    this.releaseSkin3Item();
            }
        };
        e.prototype.releaseSkin1Item = function () {
            var t = this;
            var e = $battleMgr.default.instance.getCurScene();
            var n = this.node.getPosition();
            var i = this.getAttackCount();
            var o = 120 / i;
            var r = e.level.findLayerByPos(n);
            if (-1 != r) {
                for (
                    var a = n.clone(),
                        s = function (n) {
                            var i = ((210 + n * o) * Math.PI) / 180;
                            var s = cc.v2(Math.cos(i), Math.sin(i));
                            var u = $randomUtil.RandomUtil.randomInt(1, r + 1);
                            var p = e.level.getLayerPosY(u);
                            var h = cc.v2(0, p);
                            h.x = a.x + (s.x / s.y) * (h.y - a.y);
                            var f = e.getCreateActorId();
                            $actorMgr.default.instance.createActor({
                                id: f,
                                cfgId: -1,
                                camp: $actorEnum.ETeamType.ENEMY,
                                parent: e.effectParent,
                                prefabName: "BossItem_621_Skin1",
                                initPos: a,
                                actorClass: "BossItem_621_Skin1",
                                onCreated: function () {
                                    t._skin1ItemIds.push(f);
                                },
                                initParam: {
                                    rewardMap: new Map(),
                                    lv: c._initParam.lv,
                                    moveTargetPos: h,
                                    maxHp: Math.floor(
                                        c.getAttribute($attrEnum.E_AttrType.HP).value * Number(c._cfg.val4)
                                    ),
                                    atk: c.getAttribute($attrEnum.E_AttrType.ATK).value
                                }
                            });
                        },
                        c = this,
                        u = 0;
                    u < i;
                    u++
                ) {
                    s(u);
                }
            }
        };
        e.prototype.readySkin2Item = function () {
            for (
                var t = this,
                    e = this.node.getChildByName("Body").getPosition().add(cc.v2(0, -50)),
                    n = $battleMgr.default.instance.getCurScene(),
                    i = $actorMgr.default.instance.getActor(n.playerId).node.getPosition(),
                    o = this.getAttackCount(),
                    r = 300 / o,
                    a = o >> 1,
                    s = function (o) {
                        var s = e.clone();
                        s.x += (o - a) * r;
                        var l = s.add(c.node.getPosition());
                        var u = (180 * cc.Vec2.RIGHT_R.signAngle(i.sub(l).normalize())) / Math.PI;
                        var p = n.getCreateActorId();
                        $actorMgr.default.instance.createActor({
                            id: p,
                            cfgId: -1,
                            camp: $actorEnum.ETeamType.ENEMY,
                            parent: c.node,
                            prefabName: "BossItem_621_Skin2",
                            initPos: s,
                            actorClass: "BossItem_621_Skin2",
                            onCreated: function () {
                                t.skin2ItemIds.push(p);
                            },
                            initParam: {
                                rewardMap: new Map(),
                                lv: c._initParam.lv,
                                initAngle: u,
                                maxHp: Math.floor(c.getAttribute($attrEnum.E_AttrType.HP).value * Number(c._cfg.val4)),
                                atk: c.getAttribute($attrEnum.E_AttrType.ATK).value
                            }
                        });
                    },
                    c = this,
                    l = 0;
                l < o;
                ++l
            ) {
                s(l);
            }
        };
        e.prototype.releaseSkin2Item = function () {
            var t = this;
            this.skin2ItemIds.forEach(function (e, n) {
                var i = $actorMgr.default.instance.getActor(e);
                if (i) {
                    t.scheduleOnce(function () {
                        i.shoot();
                    }, 0.2 * n);
                }
            });
            this.skin2ItemIds.length = 0;
        };
        e.prototype.releaseSkin3Item = function () {
            for (
                var t = this,
                    e = this.node.getPosition().add(cc.v2(0, 100)),
                    n = $battleMgr.default.instance.getCurScene(),
                    i = this.getAttackCount(),
                    o = 1e3 / i,
                    r = i >> 1,
                    a = function (i) {
                        var a = e.clone().add(cc.v2(0, -1e3));
                        a.x += (i - r) * o + $randomUtil.RandomUtil.randomInt(-50, 50);
                        var c = n.getCreateActorId();
                        $actorMgr.default.instance.createActor({
                            id: c,
                            cfgId: -1,
                            camp: $actorEnum.ETeamType.ENEMY,
                            parent: n.effectParent,
                            prefabName: "BossItem_621_Skin3",
                            initPos: e,
                            actorClass: "BossItem_621_Skin3",
                            onCreated: function (e) {
                                t._skin3ItemIds.push(c);
                                e.drop();
                            },
                            initParam: {
                                rewardMap: new Map(),
                                lv: s._initParam.lv,
                                targetPos: a,
                                maxHp: Math.floor(s.getAttribute($attrEnum.E_AttrType.HP).value * Number(s._cfg.val4)),
                                atk: s.getAttribute($attrEnum.E_AttrType.ATK).value
                            }
                        });
                    },
                    s = this,
                    c = 0;
                c < i;
                ++c
            ) {
                a(c);
            }
        };
        return __decorate([w], e);
    })($enemyBase.default));
exports.default = C;
