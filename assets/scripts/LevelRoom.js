var i;
var $cfg = require("./Cfg");
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $effectMgr = require("./EffectMgr");
var $frameAnimEffect = require("./FrameAnimEffect");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $guideArrow = require("./GuideArrow");
var $roomLockMask = require("./RoomLockMask");
var $enemyRefreshMgr = require("./EnemyRefreshMgr");
var $actorMgr = require("./ActorMgr");
var $unitMgr = require("./UnitMgr");
var w = cc._decorator;
var C = w.ccclass;
var M = w.property;
var I = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.pRoomLockMask = null;
        e._cfgRoom = null;
        e._exData = null;
        e._isUnlock = !1;
        e._curUnlockCost = 0;
        e._doorIds = [];
        e._ladderIds = [];
        e._unlockRangeIds = [];
        e._searchPointIds = [];
        e._lockMask = null;
        e._isArriveed = !1;
        e._isOpenLight = !1;
        e._groundY = 0;
        e._rangeRect = null;
        e._cobwebDi = null;
        e._cobwebTop = null;
        e._guideArrows = [];
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "layer", {
        get: function () {
            return this._exData.layer;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isUnlock", {
        get: function () {
            return this._isUnlock;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isOpenLight", {
        get: function () {
            return this._isOpenLight;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "cfg", {
        get: function () {
            return this._cfgRoom;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "exData", {
        get: function () {
            return this._exData;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "curUnlockResidueCost", {
        get: function () {
            return this._cfgRoom.openVal - this._curUnlockCost;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isArriveed", {
        get: function () {
            return this._isArriveed;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "rangeRect", {
        get: function () {
            return this._rangeRect;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onLoad = function () {};
    e.prototype.init = function (t) {
        this._isArriveed = !1;
        this._exData = t;
        this.node.width = t.size.width;
        this.node.height = t.size.height;
        this.node.setPosition(t.pos.x, t.pos.y);
        this._rangeRect = new cc.Rect(t.pos.x, t.pos.y, t.size.width, t.size.height);
        this._cfgRoom = $cfg.default.instance.dataRoom.getById(this._exData.cfgId);
        if (1 == this._cfgRoom.openType) {
            $eventManager.EventManager.instance.on(
                $battleEnum.EBattleEvent.ROOM_UNLOCK_INFORM,
                this.onEventUnlockRoomInform,
                this
            );
        }
        this.initLockState();
        if (!this.isUnlock && !this._cfgRoom.isOut) {
            var e = cc.instantiate(this.pRoomLockMask);
            $battleMgr.default.instance.getCurScene().effectParent.addChild(e);
            e.width = this.node.width;
            e.height = this.node.height;
            e.setPosition(t.pos.x, t.pos.y);
            this._lockMask = e.getComponent($roomLockMask.default);
            this._isOpenLight = !1;
        }
        this.initLadder();
        this.initBaseItem();
        this.initSearchPoint();
        this.initEnemyRefreshPoint();
        if (0 != $levelBattleData.levelBattleData.cfgStage.id || (12 != this._cfgRoom.id && 22 != this._cfgRoom.id)) {
            //
        } else {
            $eventManager.EventManager.instance.on($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
        }
    };
    e.prototype.onDestroy = function () {
        if (1 == this._cfgRoom.openType) {
            $eventManager.EventManager.instance.off(
                $battleEnum.EBattleEvent.ROOM_UNLOCK_INFORM,
                this.onEventUnlockRoomInform,
                this
            );
        }
        if (0 != $levelBattleData.levelBattleData.cfgStage.id || (12 != this._cfgRoom.id && 22 != this._cfgRoom.id)) {
            //
        } else {
            $eventManager.EventManager.instance.off($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
        }
    };
    e.prototype.onPathInitComplete = function () {
        var t = this;
        var e = $battleMgr.default.instance.getCurScene();
        if (e) {
            this._groundY = Number.MAX_SAFE_INTEGER;
            this._exData.pathPointIds.forEach(function (n) {
                var i = e.level.path.getPoint(n);
                if (i) {
                    if (i.pos.y < t.node.y) {
                        return;
                    }
                    t._groundY = Math.min(t._groundY, i.pos.y);
                }
            });
            this.initRoomUnlockRange();
            this.initDoor();
            this.initCreateEnemy();
        }
    };
    e.prototype.resetGoundY = function (t) {
        this._groundY = t;
    };
    e.prototype.playerArrive = function () {
        var t = this;
        if (!this._isArriveed) {
            this._isArriveed = !0;
            $levelBattleData.levelBattleData.extraRoomEnemyLv += this._cfgRoom.plusLv;
            $levelBattleData.levelBattleData.data.exploreValue += 1;
            $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.ROOM_ACTIVATE, this._cfgRoom.id);
            $eventManager.EventManager.instance.emit($levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE);
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                12 == this._cfgRoom.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_2
            ) {
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_2
                );
                this._searchPointIds.forEach(function (e) {
                    var n = $unitMgr.UnitMgr.instance.getUnit(e).node.getPosition();
                    $battleMgr.default.instance.createOtherNode(
                        "GuideArrow",
                        function (e) {
                            var i = e.getComponent($guideArrow.default);
                            i.show("搜索一下这里");
                            n.y += 50;
                            i.node.setPosition(n);
                            t._guideArrows.push(i);
                        },
                        $battleMgr.default.instance.getCurScene().lowEffectParent
                    );
                });
            }
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                21 == this._cfgRoom.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_5
            ) {
                var e = $battleMgr.default.instance.getCurScene();
                var n = $actorMgr.default.instance.getActor(e.playerId);
                if (n) {
                    n.lockTouchMove = !0;
                    n.clearMove();
                }
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_5
                );
            }
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                22 == this._cfgRoom.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_7
            ) {
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_7
                );
                this._doorIds.forEach(function (e) {
                    var n = $unitMgr.UnitMgr.instance.getUnit(e).node.getPosition();
                    $battleMgr.default.instance.createOtherNode(
                        "GuideArrow",
                        function (e) {
                            var i = e.getComponent($guideArrow.default);
                            i.show("门可以阻挡怪物");
                            n.y += 250;
                            i.node.setPosition(n);
                            t._guideArrows.push(i);
                        },
                        $battleMgr.default.instance.getCurScene().effectParent
                    );
                });
            }
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                23 == this._cfgRoom.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_9
            ) {
                $globalPopupMgr.default.instance.showTips("【前面有人在求救，快去看看吧】");
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_9
                );
            }
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                31 == this._cfgRoom.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_11
            ) {
                $globalPopupMgr.default.instance.showTips("【快点找到撤离点】");
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_11
                );
            }
            this.openLight();
        }
    };
    e.prototype.initDoor = function () {
        var t = this;
        this._doorIds = [];
        this._exData.doors.forEach(function (e) {
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.DOOR,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: $battleMgr.default.instance.getCurScene().unitParent,
                initPos: cc.v2(e.pos.x, e.pos.y),
                prefabName: "Door",
                unitClass: "Door",
                onCreated: function (e) {
                    t._doorIds.push(e.unitId);
                },
                initParam: {
                    hp: e.hp,
                    roomId: e.roomId
                }
            });
        });
    };
    e.prototype.initLadder = function () {
        var t = this;
        this._ladderIds = [];
        this._exData.ladders.forEach(function (e) {
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.LADDER,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: $battleMgr.default.instance.getCurScene().unitParent,
                initPos: cc.v2(e.pos.x, e.pos.y),
                prefabName: "Ladder",
                unitClass: "Ladder",
                onCreated: function (e) {
                    t._ladderIds.push(e.unitId);
                },
                initParam: {
                    roomId: e.roomId,
                    unlockMethod: e.unlockMethod,
                    unlockCost: e.unlockCost,
                    showType: e.showType,
                    bindPointIds: e.bindPointIds,
                    isExitLadder: e.isExitLadder
                }
            });
        });
    };
    e.prototype.initBaseItem = function () {
        var t = this;
        this._exData.baseItemDatas.forEach(function (e) {
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: $battleMgr.default.instance.getCurScene().unitParent,
                prefabName: "SceneGood",
                unitClass: "SceneGood",
                initPos: cc.v2(e.pos.x, e.pos.y),
                initParam: {
                    rewardId: e.param,
                    rewardNum: e,
                    isDroped: !0
                },
                onCreated: function (e) {
                    e.updateRoomId(t._cfgRoom.id);
                }
            });
        });
    };
    e.prototype.initRoomUnlockRange = function () {
        var t = this;
        this._exData.unlockPointIds.forEach(function (e) {
            var n = $battleMgr.default.instance.getCurScene().level.path.getPoint(e);
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.ROOM_UNLOCK_AREA,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: $battleMgr.default.instance.getCurScene().unitParent,
                initPos: cc.v2(n.pos.x, n.pos.y),
                prefabName: "RoomUnlockRange",
                unitClass: "RoomUnlockRange",
                onCreated: function (e) {
                    t._unlockRangeIds.push(e.unitId);
                },
                initParam: {
                    roomId: t._cfgRoom.id
                }
            });
        });
    };
    e.prototype.initEnemyRefreshPoint = function () {
        if (this._isUnlock) {
            this._exData.enemyRefreshDatas.forEach(function (t) {
                $enemyRefreshMgr.EnemyRefreshMgr.instance.addRefreshPoint(t);
            });
        }
    };
    e.prototype.initSearchPoint = function () {
        var t = this;
        this._exData.searchItemDatas.forEach(function (e) {
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.SEARCH_POINT,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: $battleMgr.default.instance.getCurScene().unitParent,
                initPos: cc.v2(e.pos.x, e.pos.y),
                prefabName: "SearchPoint",
                unitClass: "SearchPoint",
                onCreated: function (e) {
                    t._searchPointIds.push(e.unitId);
                },
                initParam: {
                    roomId: t._cfgRoom.id,
                    param: e.param
                }
            });
        });
    };
    e.prototype.initCreateEnemy = function () {
        var t = this;
        var e = $battleMgr.default.instance.getCurScene();
        if (e) {
            var n = cc.v2(this.node.x + this.node.width / 2, this.getGroundY());
            var i = !1;
            var o = null;
            if (1 == $levelBattleData.levelBattleData.cfgStage.turn) {
                o = this._cfgRoom.enemyTurn1;
            } else {
                o = this._cfgRoom.enemyStart;
            }
            if ("" != o) {
                o.split("|").forEach(function (o) {
                    var r = o.split("_").map(Number);
                    var s = r[0];
                    var c = r[1];
                    var u = r[2];
                    var p = c;
                    if (i || 111 != s) {
                        //
                    } else {
                        i = !0;
                    }
                    for (u = Math.floor(u * $levelBattleData.levelBattleData.stageEnemyLvScale); p > 0; ) {
                        p--;
                        var h = n.clone();
                        if (102 == t._cfgRoom.id) {
                            h.x += $randomUtil.RandomUtil.randomInt(-20, 150);
                        } else {
                            h.x += $randomUtil.RandomUtil.randomInt(-120, 120);
                        }
                        var f = $cfg.default.instance.dataEnemy.getById(s);
                        $actorMgr.default.instance.createActor({
                            id: e.getCreateActorId(),
                            cfgId: s,
                            camp: $actorEnum.ETeamType.ENEMY,
                            parent: 2 == f.moveType ? e.effectParent : e.actorParent,
                            prefabName: "Enemy_" + s,
                            initPos: h,
                            actorClass: $actorMgr.default.instance.getActorClassName(s, $actorEnum.ETeamType.ENEMY),
                            onCreated: null,
                            initParam: {
                                rewardMap: new Map(),
                                lv: u,
                                roomId: t._cfgRoom.id,
                                isFixCreate: !0
                            }
                        });
                    }
                });
            }
            if (i) {
                var r = cc.v2(this.node.width / 2, this.node.height / 2);
                r.x += 50;
                r.y += 30;
                $effectMgr.default.instance.createEffect({
                    parent: this.node,
                    prefabName: "ECobwebDi",
                    initPos: r,
                    effectClass: $frameAnimEffect.default,
                    onCreated: function (e) {
                        t._cobwebDi = e;
                    }
                });
                $effectMgr.default.instance.createEffect({
                    parent: e.actorTopParent,
                    prefabName: "ECobwebTop",
                    initPos: this.node.getPosition().add(r),
                    effectClass: $frameAnimEffect.default,
                    onCreated: function (e) {
                        e.node.width = t.node.width - 100;
                        e.node.height = t.node.height + 40;
                        t._cobwebTop = e;
                    }
                });
            }
        }
    };
    e.prototype.destroyCobweb = function () {
        var t = this;
        if (this._cobwebDi) {
            this._cobwebDi.playOnceAllAnim(function () {
                t._cobwebDi = null;
            }, !0);
        }
        if (this._cobwebTop) {
            this._cobwebTop.playOnceAllAnim(function () {
                t._cobwebTop = null;
            }, !0);
        }
    };
    e.prototype.gmCreateEnemy = function (t, e, n) {
        var i = $battleMgr.default.instance.getCurScene();
        if (i) {
            for (var o = cc.v2(this.node.x + this.node.width / 2, this.getGroundY()), r = e; r > 0; ) {
                r--;
                var s = o.clone();
                s.x += $randomUtil.RandomUtil.randomInt(-200, 200);
                var c = $cfg.default.instance.dataEnemy.getById(t);
                $actorMgr.default.instance.createActor({
                    id: i.getCreateActorId(),
                    cfgId: t,
                    camp: $actorEnum.ETeamType.ENEMY,
                    parent: 2 == c.moveType ? i.effectParent : i.actorParent,
                    prefabName: "Enemy_" + t,
                    initPos: s,
                    actorClass: $actorMgr.default.instance.getActorClassName(t, $actorEnum.ETeamType.ENEMY),
                    onCreated: null,
                    initParam: {
                        rewardMap: new Map(),
                        lv: n,
                        roomId: this._cfgRoom.id,
                        isFixCreate: !0
                    }
                });
            }
        }
    };
    e.prototype.initLockState = function () {
        this._isUnlock = 0 == this._cfgRoom.openType;
    };
    e.prototype.updateLockCost = function () {};
    e.prototype.getGroundY = function () {
        return this._groundY;
    };
    e.prototype.triggerUnlock = function (t) {
        switch (this._cfgRoom.openType) {
            case 2:
                this._curUnlockCost += t;
                this.updateLockCost();
                if (this._curUnlockCost >= this._cfgRoom.openVal) {
                    this.unlock();
                    $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_OpenKeyDoor");
                }
                break;
            case 11:
                $levelBattleData.levelBattleData.consumeBagItem(this._cfgRoom.openVal);
                this.unlock();
            case 12:
                this._curUnlockCost += t;
                this.updateLockCost();
                if (this._curUnlockCost >= this._cfgRoom.openVal) {
                    this.unlock();
                }
        }
    };
    e.prototype.openLight = function () {
        var t = this;
        if (this._isUnlock && !this._isOpenLight && this._lockMask && !this._lockMask.isPlaying) {
            this._lockMask.playUnlockAnim(function () {
                t._lockMask.node.active = !1;
                t._lockMask.node.destroy();
                t._lockMask = null;
                t._isOpenLight = !0;
            });
        }
    };
    e.prototype.unlock = function () {
        if (!this._isUnlock) {
            this._isUnlock = !0;
            this._unlockRangeIds.forEach(function (t) {
                $unitMgr.UnitMgr.instance.getUnit(t).remove();
            });
            this._unlockRangeIds = [];
            if (
                0 == $levelBattleData.levelBattleData.cfgStage.id &&
                $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_4
            ) {
                $eventManager.EventManager.instance.emit(
                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                    $guideDataProxy.EGuideStepId.G_4
                );
            }
            var t = $battleMgr.default.instance.getCurScene().level;
            this._exData.pathPointIds.forEach(function (e) {
                t.path.unlockPoint(e);
            });
            if (1 != this._cfgRoom.openType) {
                this.openLight();
            }
            this.initEnemyRefreshPoint();
            this._doorIds.forEach(function (t) {
                $unitMgr.UnitMgr.instance.getUnit(t).playOpenAnim();
            });
            $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.ROOM_UNLOCK_INFORM, this._cfgRoom.id);
        }
    };
    e.prototype.onEventUnlockRoomInform = function (t) {
        if (this._isUnlock) {
            //
        } else {
            if (1 == this._cfgRoom.openType && t == this._cfgRoom.openVal) {
                this.unlock();
            }
        }
    };
    e.prototype.onGuideChange = function (t, e) {
        if (e == $guideDataProxy.EGuideStepId.G_3) {
            this._guideArrows.forEach(function (t) {
                t.hide();
            });
        }
        if (e == $guideDataProxy.EGuideStepId.G_8) {
            this._guideArrows.forEach(function (t) {
                t.hide();
            });
        }
        if (e == $guideDataProxy.EGuideStepId.G_11) {
            this._guideArrows.forEach(function (t) {
                t.hide();
            });
        }
    };
    __decorate([M(cc.Prefab)], e.prototype, "pRoomLockMask", void 0);
    return __decorate([C], e);
})(cc.Component);
exports.default = I;
