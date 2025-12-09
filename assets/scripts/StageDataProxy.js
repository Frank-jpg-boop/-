var i;
exports.stageDataProxy = exports.StageDataProxy = exports.StageData = void 0;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $taskEnum = require("./TaskEnum");
var $proxyBase = require("./ProxyBase");
var $proxyDataBase = require("./ProxyDataBase");
var $randomUtil = require("./RandomUtil");
var $levelBattleData = require("./LevelBattleData");
var $gameEnum = require("./GameEnum");
var $playerActionMgr = require("./PlayerActionMgr");
var $userCenterMgr = require("./UserCenterMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var g = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.createInitData = function () {
        return {
            stageInfos: {},
            passStageId: 0,
            day: 365
        };
    };
    return e;
})($proxyDataBase.ProxyDataBase);
exports.StageData = g;
var v = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.selectedStageId = 1;
        e.startStagePeople = 0;
        e.startPassStageId = 0;
        e.isUnlockNewStage = !1;
        e.unlockSkillId = 0;
        e.isBackBattleFail = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "day", {
        get: function () {
            return this._data.localData.day;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "stageData", {
        get: function () {
            return this._data.localData;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "passStageId", {
        get: function () {
            return this._data.localData.passStageId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "maxStageId", {
        get: function () {
            return $cfg.default.instance.dataStage.sheet().length - 1;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initData = function () {
        var t = this;
        if (2 != $userCenterMgr.UserCenterMgr.instance.zbState && 3 != $userCenterMgr.UserCenterMgr.instance.zbState) {
            //
        } else {
            this._data.localData.passStageId = this.maxStageId;
        }
        this.selectedStageId = this.passStageId + 1;
        if (this.selectedStageId > this.maxStageId) {
            this.selectedStageId = this.maxStageId;
        }
        $cfg.default.instance.dataStage.sheet().forEach(function (e) {
            if (t._data.localData.stageInfos[e.id]) {
                //
            } else {
                t._data.localData.stageInfos[e.id] = {
                    survivalKeys: [],
                    boxState: [],
                    exploreValue: 0
                };
            }
        });
    };
    e.prototype.enterStage = function (t) {
        if (0 == t) {
            this._data.localData.stageInfos[t].survivalKeys = [];
            $itemDataProxy.itemDataProxy.setItemValue($itemEnum.E_ItemId.SURVIVOR, 0);
            this._data.localData.day = 365;
        }
        this._data.localData.day--;
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.getStageSurvivalCount = function (t) {
        return this._data.localData.stageInfos[t].survivalKeys.length;
    };
    e.prototype.updatePassStageId = function () {
        var t = this._data.localData.passStageId + 1;
        var e = t + 1;
        if (!(e > this.maxStageId)) {
            var n = $cfg.default.instance.dataStage.getById(e);
            if (n && this._data.localData.stageInfos[t].survivalKeys.length >= n.need) {
                this._data.localData.passStageId = t;
                $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.ARRIVE_LEVEL);
                var i = $cfg.default.instance.dataCons.getById(15).val;
                if (Number(i) - 1 == t) {
                    $playerDataProxy.playerDataProxy.skinRed = !0;
                    $playerDataProxy.playerDataProxy.updateSkinRedPoint();
                }
                $playerDataProxy.playerDataProxy.updateShopRedPoint();
            }
        }
    };
    e.prototype.passStage = function (t, e, n) {
        if (n) {
            this.updatePassStageId();
            if (this.startPassStageId != this.passStageId) {
                (this.selectedStageId = Math.min(this.passStageId + 1, this.maxStageId)),
                    (this.isUnlockNewStage = !0),
                    (this.unlockSkillId = this.getUnlockSkillId());
            } else {
                if (t == this.passStageId + 1) {
                    if (this.getStageSurvivalCount(t) == this.startStagePeople) {
                        this.selectedStageId = Math.min(this.passStageId + 1, this.maxStageId);
                    } else {
                        this.selectedStageId = Math.min(this.passStageId + 2, this.maxStageId);
                    }
                } else {
                    this.selectedStageId = Math.min(this.passStageId + 1, this.maxStageId);
                }
            }
        }
        this.updateExploreValue(t, e, !1);
        var i = $localDataProxy.localDataProxy.getDailyRefreshValue(
            $gameEnum.Game.EDailyRefreshDataKey.WIN_SUB_HEIGHT_RATE
        );
        $localDataProxy.localDataProxy.setDailyRefreshValue(
            $gameEnum.Game.EDailyRefreshDataKey.WIN_SUB_HEIGHT_RATE,
            i + $levelBattleData.levelBattleData.cfgStage.getWin
        );
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.getUnlockSkillId = function () {
        var t = this;
        var e = $cfg.default.instance.dataSkill.queryOne(function (e) {
            return 0 == e.isInfo && e.unlockVal == t.passStageId;
        });
        if (e) {
            return e.id;
        } else {
            return 0;
        }
    };
    e.prototype.updateExploreValue = function (t, e, n) {
        if (void 0 === n) {
            n = !0;
        }
        if (!this._data.localData.stageInfos[t].exploreValue || e > this._data.localData.stageInfos[t].exploreValue) {
            this._data.localData.stageInfos[t].exploreValue = e;
        }
        $playerDataProxy.playerDataProxy.updateSurviveRewardRedPoint();
        $playerDataProxy.playerDataProxy.updateStageExploreRedPoint();
        if (n) {
            $localDataProxy.localDataProxy.saveData();
        }
    };
    e.prototype.getStageInfo = function (t) {
        return this._data.localData.stageInfos[t];
    };
    e.prototype.checkOver = function () {
        return this._data.localData.day <= 0;
    };
    e.prototype.resetGame = function () {
        this._data.resetData();
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.isRescueSurvival = function (t, e) {
        return this._data.localData.stageInfos[t].survivalKeys.includes(e.toString());
    };
    e.prototype.gmPassStage = function (t) {
        if (!(t <= this.passStageId)) {
            t = Math.min(t, this.maxStageId);
            if ($cfg.default.instance.dataStage.getById(t)) {
                for (
                    var e = function (t) {
                            var e = $cfg.default.instance.dataStage.getById(t);
                            var i = e.survivor.split("|").map(function (t) {
                                return (Number(t) + e.checkSur).toString();
                            });
                            var o = [];
                            var s = $cfg.default.instance.dataStage.getById(t + 1);
                            if (s) {
                                var c = s.need;
                                for (
                                    $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.SURVIVOR, c, !1);
                                    c > 0;

                                ) {
                                    var l = $randomUtil.RandomUtil.randomInt(0, i.length);
                                    o.push(i[l]);
                                    i.splice(l, 1);
                                    c--;
                                }
                            }
                            n._data.localData.stageInfos[t].survivalKeys = o;
                        },
                        n = this,
                        i = this.passStageId + 1;
                    i <= t;
                    ++i
                ) {
                    e(i);
                }
            }
            this._data.localData.passStageId = t;
            $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.ARRIVE_LEVEL);
            this.selectedStageId = Math.min(this.passStageId + 1, this.maxStageId);
            $playerDataProxy.playerDataProxy.updateShopRedPoint();
            $localDataProxy.localDataProxy.saveData();
        }
    };
    return e;
})($proxyBase.ProxyBase);
exports.StageDataProxy = v;
exports.stageDataProxy = new v(g);
