exports.EnemyRefreshMgr = void 0;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $util = require("./Util");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $itemDataProxy = require("./ItemDataProxy");
var $gameUI = require("./GameUI");
var $battleMgr = require("./BattleMgr");
var $effectMgr = require("./EffectMgr");
var $eRefreshEnemyTips = require("./ERefreshEnemyTips");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $enemyRefreshPoint = require("./EnemyRefreshPoint");
var E = (function () {
    function t() {
        this._refreshPoints = new Array();
        this._curWaveRefreshEnemyDatas = null;
        this._curWaveResidueCreateEnemyNum = 0;
        this._curWaveResidueEnemyNum = 0;
        this._curWaveRewardAllots = null;
        this._curWaveResidueRewardNum = 0;
        this._curWaveProbRewardAllots = null;
        this._waitRescueRefreshDatas = null;
        this._waitRescueTime = 0;
        this._isEnterWaitRescue = !1;
        this._isGmCreateOnce = !1;
        this._isCreated = !1;
        this._guideRefreshEnemyData = null;
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (this._instance) {
                //
            } else {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function () {
        this._guideRefreshEnemyData = null;
        this._isCreated = !1;
        this._curWaveResidueCreateEnemyNum = 0;
        this._isEnterWaitRescue = !1;
        this._refreshPoints = [];
        this._curWaveRefreshEnemyDatas = [];
        this._curWaveProbRewardAllots = [];
        this._waitRescueRefreshDatas = [];
        $eventManager.EventManager.instance.on(
            $actorEnum.EActorEvent.ACTOR_DEAD_REMOVE,
            this.onEventActorDeadRemove,
            this
        );
        $eventManager.EventManager.instance.on($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
    };
    t.prototype.clear = function () {
        this._guideRefreshEnemyData = null;
        this._refreshPoints = [];
        this._curWaveRefreshEnemyDatas = [];
        this._curWaveProbRewardAllots = [];
        this._waitRescueRefreshDatas = [];
        $eventManager.EventManager.instance.off(
            $actorEnum.EActorEvent.ACTOR_DEAD_REMOVE,
            this.onEventActorDeadRemove,
            this
        );
        $eventManager.EventManager.instance.off($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onGuideChange, this);
    };
    t.prototype.onEventActorDeadRemove = function (t) {
        if (t.actorType == $actorEnum.EActorType.ENEMY && !this._isEnterWaitRescue && t instanceof $enemyBase.default) {
            if (!t.isWaveRefresh) {
                return;
            }
            this._curWaveResidueEnemyNum--;
            if (this._curWaveResidueEnemyNum <= 0) {
                $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.WAVE_REFRESH_ENEMY_FINISH);
                $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI, !0);
            }
        }
    };
    t.prototype.onGuideChange = function (t) {
        var e = this;
        if (t == $guideDataProxy.EGuideStepId.G_6) {
            var n = $battleMgr.default.instance.getCurScene();
            var i = this.randomRefreshPoint();
            var r = $actorMgr.default.instance.getActor(n.playerId);
            r.clearMove();
            n.cameraCtrl.lookAtPos(
                n.actorParent.convertToWorldSpaceAR(i.pos),
                2,
                function () {
                    $globalPopupMgr.default.instance.showTips("【怪物出现了】");
                    e._guideRefreshEnemyData = {
                        interval: 1,
                        cd: 0,
                        num: 7,
                        createData: {
                            enemyId: 101,
                            enemyLv: 1
                        }
                    };
                    $util.default.delay(4, function () {
                        n.cameraCtrl.lookAtPos(
                            r.node.convertToWorldSpaceAR(cc.v2(0, 150)),
                            1,
                            function () {
                                r.lockTouchMove = !1;
                                $eventManager.EventManager.instance.emit(
                                    $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                                    $guideDataProxy.EGuideStepId.G_6
                                );
                            },
                            !0
                        );
                    });
                },
                !1
            );
        }
    };
    t.prototype.addRefreshPoint = function (t) {
        var e = new $enemyRefreshPoint.EnemyRefreshPoint(t);
        this._refreshPoints.push(e);
    };
    t.prototype.randomRefreshPoint = function () {
        var t = $randomUtil.RandomUtil.randomInt(0, this._refreshPoints.length);
        return this._refreshPoints[t];
    };
    t.prototype.updateWaveRefreshData = function (t, e) {
        var n = this;
        this._curWaveResidueCreateEnemyNum = 0;
        this._curWaveRefreshEnemyDatas = [];
        var o = $cfg.default.instance.dataWave.getById(t);
        var r = null;
        if (1 == $levelBattleData.levelBattleData.cfgStage.turn) {
            r = o.valTurn1;
        } else {
            r = o.val;
        }
        if ("" != r) {
            r.split("|").forEach(function (t) {
                var i = t.split("_").map(Number);
                var r = i[0];
                var a = i[1];
                var s = {
                    num: a,
                    interval: o.time / a,
                    cd: 0,
                    createData: {
                        enemyId: r,
                        enemyLv: Math.floor(e * $levelBattleData.levelBattleData.stageEnemyLvScale)
                    }
                };
                n._curWaveResidueCreateEnemyNum += a;
                n._curWaveRefreshEnemyDatas.push(s);
            });
        }
        this._curWaveResidueRewardNum = 0;
        this._curWaveRewardAllots = [];
        o.reward1.split("|").forEach(function (t) {
            var e = t.split("_").map(Number);
            var i = e[0];
            var o = e[1];
            if ($itemDataProxy.itemDataProxy.checkCanDropReward(i)) {
                var r = {
                    rewardId: i,
                    num: o
                };
                n._curWaveResidueRewardNum += o;
                n._curWaveRewardAllots.push(r);
            }
        });
        this._curWaveProbRewardAllots = [];
        o.reward2.split("|").forEach(function (t) {
            var e = t.split("_").map(Number);
            var i = e[0];
            var o = e[1];
            if ($itemDataProxy.itemDataProxy.checkCanDropReward(i)) {
                var r = {
                    rewardId: i,
                    num: 1,
                    prob: Math.floor(100 * o)
                };
                n._curWaveProbRewardAllots.push(r);
            }
        });
        this._curWaveResidueEnemyNum += this._curWaveResidueCreateEnemyNum;
    };
    t.prototype.getWaitRescueEnemyLv = function () {
        var t = $cfg.default.instance.dataStage
            .getById($levelBattleData.levelBattleData.stageId)
            .endLv.split("|")
            .map(Number);
        var e = t[0];
        var n = t[1];
        var o = t[2];
        if (this._waitRescueTime <= 20) {
            return e;
        } else {
            if (this._waitRescueTime <= 40) {
                return n;
            } else {
                return o;
            }
        }
    };
    t.prototype.enterWaitRescueRefreshData = function () {
        var t = this;
        this._isEnterWaitRescue = !0;
        this._curWaveRefreshEnemyDatas = [];
        this._curWaveResidueCreateEnemyNum = 0;
        this._curWaveResidueEnemyNum = 0;
        this._waitRescueTime = 0;
        this._waitRescueRefreshDatas = [];
        var e = $cfg.default.instance.dataStage.getById($levelBattleData.levelBattleData.stageId);
        e.endWave.split("|").forEach(function (n) {
            var i = n.split("_").map(Number);
            var o = i[0];
            var r = i[1];
            var a = {
                num: r,
                interval: e.endTime / r,
                cd: 0,
                createData: {
                    enemyId: o,
                    enemyLv: 0
                }
            };
            t._waitRescueRefreshDatas.push(a);
        });
        if ("" != e.endWave2) {
            var n = e.endWave2.split("|");
            var o = n[0];
            var r = n[1].split("_").map(Number);
            var a = r[0];
            var s = r[1];
            var c = r[2];
            var l = s - a;
            var u = 0;
            o.split("&").forEach(function (t) {
                var e = t.split("_").map(Number);
                var n = (e[0], e[1]);
                u += n;
            });
            o.split("&").forEach(function (e) {
                var n = e.split("_").map(Number);
                var i = n[0];
                var o = {
                    num: n[1],
                    interval: l / u,
                    startTime: a,
                    cd: 0,
                    createData: {
                        enemyId: i,
                        enemyLv: 0
                    },
                    range: c
                };
                t._waitRescueRefreshDatas.push(o);
            });
        }
    };
    t.prototype.update = function (t) {
        if (this._isEnterWaitRescue) {
            this._waitRescueTime += t;
        }
        for (var e = 0; e < this._curWaveRefreshEnemyDatas.length; ++e) {
            (n = this._curWaveRefreshEnemyDatas[e]).cd -= t;
            n.cd <= 0 &&
                ((n.cd = n.interval),
                this.createEnemy(n.createData, this.allotPos(), this.allotReward(), 0),
                this._curWaveResidueCreateEnemyNum--,
                n.num--,
                n.num <= 0 && (this._curWaveRefreshEnemyDatas.splice(e, 1), e--));
        }
        for (e = 0; e < this._waitRescueRefreshDatas.length; ++e) {
            var n;
            if ((n = this._waitRescueRefreshDatas[e]).startTime && this._waitRescueTime < n.startTime) {
                //
            } else {
                n.cd -= t;
                if (n.cd <= 0) {
                    n.cd = n.interval;
                    n.createData.enemyLv = this.getWaitRescueEnemyLv();
                    this.createEnemy(
                        n.createData,
                        this.allotPos(!0, n.range),
                        this.allotReward(!0),
                        n.range > 0 ? 2 : 1
                    );
                    n.num--;
                    if (n.num <= 0) {
                        this._waitRescueRefreshDatas.splice(e, 1);
                        e--;
                    }
                }
            }
        }
        if (this._guideRefreshEnemyData) {
            this._guideRefreshEnemyData.cd -= t;
            if (this._guideRefreshEnemyData.cd <= 0) {
                this._guideRefreshEnemyData.cd = this._guideRefreshEnemyData.interval;
                this.createEnemy(
                    this._guideRefreshEnemyData.createData,
                    this._refreshPoints[0].pos,
                    new Map([[1, 2]]),
                    0,
                    !0
                );
                this._guideRefreshEnemyData.num--;
                if (this._guideRefreshEnemyData.num <= 0) {
                    this._guideRefreshEnemyData = null;
                }
            }
        }
    };
    t.prototype.allotReward = function (t) {
        if (void 0 === t) {
            t = !1;
        }
        var e = new Map();
        if (t) {
            return e;
        }
        if (this._curWaveResidueRewardNum > 0) {
            for (
                var n = Math.floor(this._curWaveResidueRewardNum / this._curWaveResidueCreateEnemyNum),
                    i = $randomUtil.RandomUtil.randomInt(Math.max(0, n - 2), n + 3),
                    o = 0;
                o < i && 0 != this._curWaveRewardAllots.length;
                ++o
            ) {
                var a =
                    this._curWaveRewardAllots[$randomUtil.RandomUtil.randomInt(0, this._curWaveRewardAllots.length)];
                var s = e.get(a.rewardId) || 0;
                e.set(a.rewardId, s + 1);
                a.num--;
                if (a.num <= 0) {
                    this._curWaveRewardAllots.splice(this._curWaveRewardAllots.indexOf(a), 1);
                }
            }
            this._curWaveResidueRewardNum -= i;
        }
        if (this._curWaveProbRewardAllots.length > 0) {
            for (o = 0; o < this._curWaveProbRewardAllots.length; ++o) {
                if ($randomUtil.RandomUtil.randomInt(0, 100) < this._curWaveProbRewardAllots[o].prob) {
                    a = this._curWaveProbRewardAllots[o];
                    s = e.get(a.rewardId) || 0;
                    e.set(a.rewardId, s + 1);
                    a.num--;
                    if (a.num <= 0) {
                        this._curWaveProbRewardAllots.splice(o, 1);
                        o--;
                    }
                }
            }
        }
        return e;
    };
    t.prototype.allotPos = function (t, e) {
        if (void 0 === t) {
            t = !1;
        }
        if (void 0 === e) {
            e = 0;
        }
        if (0 == this._refreshPoints.length) {
            return null;
        }
        if (t) {
            var n = $cfg.default.instance.dataStage
                .getById($levelBattleData.levelBattleData.stageId)
                .endRefresh.split("|")
                .map(Number);
            var o = this._refreshPoints.filter(function (t) {
                return n.includes(t.refreshId);
            });
            if (!(e > 0)) {
                return o[$randomUtil.RandomUtil.randomInt(0, o.length)].pos;
            }
            var a = $actorMgr.default.instance.getActor($battleMgr.default.instance.getCurScene().playerId);
            if (a) {
                var s = a.pathPos.clone();
                var c = s.clone();
                var l = 0 == $randomUtil.RandomUtil.randomInt(0, 2);
                c.x = s.x + (l ? -e : e);
                var u = $battleMgr.default.instance.getCurScene().level.path.findPathLineByPos(c);
                if ("" != u) {
                    return c;
                } else {
                    return (
                        (c.x = s.x + (l ? e : -e)),
                        "" != (u = $battleMgr.default.instance.getCurScene().level.path.findPathLineByPos(c))
                            ? c
                            : o[$randomUtil.RandomUtil.randomInt(0, o.length)].pos
                    );
                }
            }
        }
        var p = $randomUtil.RandomUtil.randomInt(0, this._refreshPoints.length);
        return this._refreshPoints[p].pos;
    };
    t.prototype.createEnemy = function (t, e, n, o, r) {
        if (void 0 === r) {
            r = !1;
        }
        if (this._isGmCreateOnce) {
            if (this._isCreated) {
                return;
            }
            this._isCreated = !0;
        }
        if (0 != t.enemyId) {
            var a = $battleMgr.default.instance.getCurScene();
            if (a) {
                var s = $actorMgr.default.instance.getActor(a.playerId);
                if (s) {
                    s.node.getPosition().add(cc.v2(0, 40));
                    $effectMgr.default.instance.createEffect({
                        parent: a.uiNode.getComponent($gameUI.default).nGameUILayer,
                        prefabName: "ERefreshEnemyTips",
                        initPos: cc.v2(),
                        effectClass: $eRefreshEnemyTips.default,
                        onCreated: function (t) {
                            t.play(s, e.add(cc.v2(0, 40)));
                        }
                    });
                }
                var c = $cfg.default.instance.dataEnemy.getById(t.enemyId);
                $actorMgr.default.instance.createActor({
                    id: a.getCreateActorId(),
                    cfgId: t.enemyId,
                    camp: $actorEnum.ETeamType.ENEMY,
                    parent: 2 == c.moveType ? a.effectParent : a.actorParent,
                    prefabName: "Enemy_" + t.enemyId,
                    initPos: e,
                    actorClass: $actorMgr.default.instance.getActorClassName(t.enemyId, $actorEnum.ETeamType.ENEMY),
                    onCreated: null,
                    initParam: {
                        rewardMap: n,
                        lv: t.enemyLv,
                        isWaveRefresh: !r,
                        waitRescueFlag: o,
                        isGuideEnemy: r
                    }
                });
            }
        } else {
            console.error("配置错误,出现了错误怪物id" + t.enemyId);
        }
    };
    t.prototype.createBoss = function (t, e) {
        var n = $battleMgr.default.instance.getCurScene();
        if (n) {
            var o = $cfg.default.instance.dataEnemy.getById(t);
            $actorMgr.default.instance.createActor({
                id: n.getCreateActorId(),
                cfgId: t,
                camp: $actorEnum.ETeamType.ENEMY,
                parent: 2 == o.moveType ? n.effectParent : n.actorParent,
                prefabName: "Boss_" + t,
                initPos: cc.v2(-9999, -9999),
                actorClass: $actorMgr.default.instance.getActorClassName(t, $actorEnum.ETeamType.ENEMY),
                onCreated: null,
                initParam: {
                    rewardMap: new Map(),
                    lv: e
                }
            });
        }
    };
    return t;
})();
exports.EnemyRefreshMgr = E;
