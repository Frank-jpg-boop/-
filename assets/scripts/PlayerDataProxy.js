var i;
exports.playerDataProxy = exports.PlayerDataProxy = exports.PlayerData = exports.EPlayDataEvent = void 0;
var r;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $taskEnum = require("./TaskEnum");
var $proxyBase = require("./ProxyBase");
var $proxyDataBase = require("./ProxyDataBase");
var $eventManager = require("./EventManager");
var $timeUtil = require("./TimeUtil");
var $redPointMgr = require("./RedPointMgr");
var $redPointPathConfig = require("./RedPointPathConfig");
var $playerActionMgr = require("./PlayerActionMgr");
var $userCenterMgr = require("./UserCenterMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $signDataProxy = require("./SignDataProxy");
var $stageDataProxy = require("./StageDataProxy");
!(function (t) {
    t.UPDATE_SKIN = "update_skin";
    t.UPDATE_ARTIFACT_LEVEL = "UPDATE_ARTIFACT_LEVEL";
    t.UPDATE_BUILD_LEVEL = "UPDATE_BUILD_LEVEL";
    t.UPDATE_BUILD_TIME = "UPDATE_BUILD_TIME";
    t.GM_PASS_STAGE = "GM_PASS_STAGE";
    t.UPDATE_ONLINE_REWARD = "UPDATE_ONLINE_REWARD";
})((r = exports.EPlayDataEvent || (exports.EPlayDataEvent = {})));
var E = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.createInitData = function () {
        return {
            skinId: 1,
            unlockSkins: [1],
            videoNum: 0,
            skinVideoData: [],
            shopData: {
                goldVideoNum: 0,
                openBoxExp: 0,
                openBoxTime: 0,
                isOpenBigBox: !1
            },
            dscountShopData: {
                videoNum: 0,
                goodsDatas: []
            },
            artifactData: [],
            buildDatas: [],
            surviveDatas: [],
            bagAddGridPoss: [],
            onlineTime: 0,
            onlineRewardId: 0
        };
    };
    return e;
})($proxyDataBase.ProxyDataBase);
exports.PlayerData = E;
var S = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._updateRedPointTime = 0;
        e.skinRed = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "skinId", {
        get: function () {
            return this._data.localData.skinId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "videoNum", {
        get: function () {
            return this._data.localData.videoNum;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "goldVideoNum", {
        get: function () {
            return this._data.localData.shopData.goldVideoNum || 0;
        },
        set: function (t) {
            this._data.localData.shopData.goldVideoNum = t;
            $localDataProxy.localDataProxy.saveData();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "openBoxTime", {
        get: function () {
            return this._data.localData.shopData.openBoxTime;
        },
        set: function (t) {
            this._data.localData.shopData.openBoxTime = t;
            $localDataProxy.localDataProxy.saveData();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "isOpenBigBox", {
        get: function () {
            return this._data.localData.shopData.isOpenBigBox;
        },
        set: function (t) {
            this._data.localData.shopData.isOpenBigBox = t;
            $localDataProxy.localDataProxy.saveData();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "openBoxExp", {
        get: function () {
            return this._data.localData.shopData.openBoxExp;
        },
        set: function (t) {
            this._data.localData.shopData.openBoxExp = t;
            $localDataProxy.localDataProxy.saveData();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "dscountVideoNum", {
        get: function () {
            return this._data.localData.dscountShopData.videoNum;
        },
        set: function (t) {
            this._data.localData.dscountShopData.videoNum = t;
            $localDataProxy.localDataProxy.saveData();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "dscountGoodsDatas", {
        get: function () {
            return this._data.localData.dscountShopData.goodsDatas;
        },
        set: function (t) {
            this._data.localData.dscountShopData.goodsDatas = t;
            $localDataProxy.localDataProxy.saveData();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "buildDatas", {
        get: function () {
            return this._data.localData.buildDatas;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "bagAddGridPoss", {
        get: function () {
            return this._data.localData.bagAddGridPoss.slice();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "canExBag", {
        get: function () {
            return this._data.localData.bagAddGridPoss.length < 7;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "onlineTime", {
        get: function () {
            return this._data.localData.onlineTime;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "onlineRewardId", {
        get: function () {
            return this._data.localData.onlineRewardId;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initData = function () {
        var t = this;
        if (2 == $userCenterMgr.UserCenterMgr.instance.zbState) {
            $cfg.default.instance.dataSkill.sheet().forEach(function (e) {
                if (e.isInfo) {
                    //
                } else {
                    if (t.getArtifactLv(e.id) < 15) {
                        t.setArtifactLv(e.id, 15);
                    }
                }
            });
        }
        this.updateSurviveRewardRedPoint();
        this.updateSkillRedPoint();
        this.updateBuildRedPoint();
        this.updateShopRedPoint();
        this.updateStageExploreRedPoint();
        this.updateSkinRedPoint();
    };
    e.prototype.resetGame = function () {
        this._data.localData.buildDatas = [];
        this._data.localData.surviveDatas = [];
        this._data.localData.bagAddGridPoss = [];
    };
    e.prototype.updateSecond = function () {
        if ($stageDataProxy.stageDataProxy.passStageId >= 1) {
            this._data.localData.onlineTime += 1;
        }
        if ("home" == cc.director.getScene().name) {
            this._updateRedPointTime += 1;
            if (this._updateRedPointTime >= 20) {
                this._updateRedPointTime = 0;
                this.updateBuildRedPoint();
            }
        }
    };
    e.prototype.canGetOnlineReward = function () {
        var t = $cfg.default.instance.dataMerchant.getById(this._data.localData.onlineRewardId + 1);
        return t && 60 * t.time <= this._data.localData.onlineTime;
    };
    e.prototype.getOnlineReward = function (t) {
        var e = $cfg.default.instance.dataMerchant.getById(this._data.localData.onlineRewardId + 1);
        var n = e.reward.split("_").map(Number);
        var i = n[0];
        var o = n[1];
        var s = [];
        var c = $cfg.default.instance.dataItem.getById(i);
        if (3 == c.type) {
            $itemDataProxy.itemDataProxy.randomChip(c.rare, o).forEach(function (t, e) {
                s.push({
                    itemId: e,
                    itemNum: t
                });
            });
        } else {
            s = [
                {
                    itemId: i,
                    itemNum: o
                }
            ];
        }
        if (t) {
            this._data.localData.onlineTime = 60 * e.time;
        }
        this._data.localData.onlineRewardId += 1;
        $eventManager.EventManager.instance.emit($itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE, s);
        this.updateBuildRedPoint();
        $eventManager.EventManager.instance.emit(r.UPDATE_ONLINE_REWARD);
    };
    e.prototype.pushBagAddGridPos = function (t) {
        if (this._data.localData.bagAddGridPoss.includes(t)) {
            //
        } else {
            this._data.localData.bagAddGridPoss.push(t);
            $localDataProxy.localDataProxy.saveData();
        }
    };
    e.prototype.setBuildLv = function (t, e) {
        var n = this._data.localData.buildDatas.findIndex(function (e) {
            return e.loc == t;
        });
        if (n >= 0) {
            this._data.localData.buildDatas[n].lv = e;
        } else {
            this._data.localData.buildDatas.push({
                loc: t,
                lv: e,
                peopleNum: 0,
                startTime: $timeUtil.TimeUtil.getTime()
            });
        }
        $eventManager.EventManager.instance.emit(r.UPDATE_BUILD_LEVEL, t);
        $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.BUILD_UP_LV);
        this.updateBuildRedPoint();
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.getBuildLv = function (t) {
        var e = this._data.localData.buildDatas.findIndex(function (e) {
            return e.loc == t;
        });
        if (e >= 0) {
            return this._data.localData.buildDatas[e].lv;
        } else {
            return 1;
        }
    };
    e.prototype.getBuildUnlockStage = function (t) {
        if (0 == t) {
            return 0;
        } else {
            return $cfg.default.instance.dataBuild.queryOne(function (e) {
                return e.loc == t && 1 == e.lv;
            }).unlock;
        }
    };
    e.prototype.setBuildPeopleNum = function (t, e) {
        var n = this._data.localData.buildDatas.findIndex(function (e) {
            return e.loc == t;
        });
        if (n >= 0) {
            this._data.localData.buildDatas[n].peopleNum = e;
        } else {
            this._data.localData.buildDatas.push({
                loc: t,
                lv: 1,
                peopleNum: e,
                startTime: $timeUtil.TimeUtil.getTime()
            });
        }
        $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.BUILD_UP_STAR);
        this.updateBuildRedPoint();
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.getBuildPeopleNum = function (t) {
        var e = this._data.localData.buildDatas.findIndex(function (e) {
            return e.loc == t;
        });
        if (e >= 0) {
            return this._data.localData.buildDatas[e].peopleNum;
        } else {
            return 0;
        }
    };
    e.prototype.getIsFirstUnlockBuild = function (t) {
        return (
            this._data.localData.buildDatas.findIndex(function (e) {
                return e.loc == t;
            }) < 0 &&
            (this._data.localData.buildDatas.push({
                loc: t,
                lv: 1,
                peopleNum: 0,
                startTime: $timeUtil.TimeUtil.getTime()
            }),
            $localDataProxy.localDataProxy.saveData(),
            !0)
        );
    };
    e.prototype.checkBuildLvUp = function (t) {
        var e = this.getBuildLv(t);
        var n = $cfg.default.instance.dataBuild.queryOne(function (n) {
            return n.loc == t && n.lv == e;
        });
        if (!n) {
            return !1;
        }
        var i = $cfg.default.instance.dataBuild.queryOne(function (n) {
            return n.loc == t && n.lv == e + 1;
        });
        return (
            !!i &&
            !($stageDataProxy.stageDataProxy.passStageId + 1 < i.unlock) &&
            $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.SURVIVOR) >= n.max &&
            $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD) >= n.need
        );
    };
    e.prototype.setBuildStartTime = function (t, e) {
        var n = this._data.localData.buildDatas.findIndex(function (e) {
            return e.loc == t;
        });
        if (n >= 0) {
            this._data.localData.buildDatas[n].startTime = e;
        } else {
            this._data.localData.buildDatas.push({
                loc: t,
                lv: 1,
                peopleNum: 0,
                startTime: e
            });
        }
        $localDataProxy.localDataProxy.saveData();
        $eventManager.EventManager.instance.emit(r.UPDATE_BUILD_TIME, t);
        this.updateBuildRedPoint();
        return this._data.localData.buildDatas[n];
    };
    e.prototype.getBuildStartTime = function (t) {
        var e = this._data.localData.buildDatas.findIndex(function (e) {
            return e.loc == t;
        });
        if (e >= 0) {
            return this._data.localData.buildDatas[e].startTime;
        } else {
            return $timeUtil.TimeUtil.getTime();
        }
    };
    e.prototype.getBuildData = function (t) {
        var e = this._data.localData.buildDatas.findIndex(function (e) {
            return e.loc == t;
        });
        if (e >= 0) {
            return this._data.localData.buildDatas[e];
        } else {
            return null;
        }
    };
    e.prototype.isUnlockSkill = function (t) {
        var e = $cfg.default.instance.dataSkill.getById(t);
        return null != e && (0 == e.unlockType || $stageDataProxy.stageDataProxy.passStageId >= e.unlockVal);
    };
    e.prototype.setArtifactLv = function (t, e) {
        var n = this._data.localData.artifactData.findIndex(function (e) {
            return e.id == t;
        });
        if (n >= 0) {
            this._data.localData.artifactData[n].lv = e;
        } else {
            this._data.localData.artifactData.push({
                id: t,
                lv: e
            });
        }
        $eventManager.EventManager.instance.emit(r.UPDATE_ARTIFACT_LEVEL, t);
        this.updateSkillRedPoint();
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.getArtifactLv = function (t) {
        var e = this._data.localData.artifactData.findIndex(function (e) {
            return e.id == t;
        });
        if (e >= 0) {
            return this._data.localData.artifactData[e].lv;
        } else {
            return 1;
        }
    };
    e.prototype.setDscountGoodsBuyNum = function (t, e) {
        var n = this._data.localData.dscountShopData.goodsDatas.findIndex(function (e) {
            return e.cfgId == t;
        });
        if (n >= 0) {
            this._data.localData.dscountShopData.goodsDatas[n].buyNum = e;
            $localDataProxy.localDataProxy.saveData();
        }
    };
    e.prototype.getDscountGoodsBuyNum = function (t) {
        var e = this._data.localData.dscountShopData.goodsDatas.findIndex(function (e) {
            return e.cfgId == t;
        });
        if (e >= 0) {
            return this._data.localData.dscountShopData.goodsDatas[e].buyNum;
        } else {
            return 0;
        }
    };
    e.prototype.setSkinId = function (t) {
        this._data.localData.skinId = t;
        $localDataProxy.localDataProxy.saveData();
        $eventManager.EventManager.instance.emit(r.UPDATE_SKIN);
    };
    e.prototype.addVideoNum = function () {
        this._data.localData.videoNum += 1;
        var t = $cfg.default.instance.dataSkin.sheet();
        for (var e in t) {
            var n = t[e];
            if (5 == n.unlockType) {
                if (this.isUnlockSkin(n.id)) {
                    //
                } else {
                    this.videoNum;
                    n.unlockVal;
                }
            }
        }
        this.updateSkinRedPoint();
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.isUnlockSkin = function (t) {
        return this._data.localData.unlockSkins.includes(t);
    };
    e.prototype.unlockSkin = function (t) {
        if (this.isUnlockSkin(t)) {
            //
        } else {
            this._data.localData.unlockSkins.push(t);
            this.updateSkinRedPoint();
            $localDataProxy.localDataProxy.saveData();
        }
    };
    e.prototype.getSkinVideoNum = function (t) {
        var e = this._data.localData.skinVideoData.findIndex(function (e) {
            return t == e.skinId;
        });
        if (e >= 0) {
            return this._data.localData.skinVideoData[e].videoNum;
        } else {
            return 0;
        }
    };
    e.prototype.setSkinVideoNum = function (t) {
        var e = this._data.localData.skinVideoData.findIndex(function (e) {
            return t == e.skinId;
        });
        if (e >= 0) {
            this._data.localData.skinVideoData[e].videoNum += 1;
        } else {
            this._data.localData.skinVideoData.push({
                skinId: t,
                videoNum: 1
            });
        }
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.setDailyRefreshValue = function () {
        this._data.localData.shopData.goldVideoNum = 0;
        this._data.localData.shopData.isOpenBigBox = !1;
        this._data.localData.dscountShopData.videoNum = 0;
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.getBoxLevel = function () {
        var t = exports.playerDataProxy.openBoxExp;
        var e = $cfg.default.instance.dataShopBox.sheet();
        var i = 1;
        for (var o in e) {
            var r = e[o];
            if (r.exp <= t) {
                i = r.level + 1;
            }
        }
        var s = Object.keys(e);
        var c = e[s[s.length - 1]].level;
        if (i > c) {
            i = c;
        }
        return i;
    };
    e.prototype.getArtifactUpGreadNeedNum = function (t) {
        var e = $cfg.default.instance.dataSkill.getById(t).cost.split("|")[this.getArtifactLv(t) - 1];
        if (e) {
            return e.split("_").map(Number)[1];
        } else {
            return -1;
        }
    };
    e.prototype.getArtifactUpGreadNeeItemId = function (t) {
        return $cfg.default.instance.dataSkill.getById(t).cost.split("|")[0].split("_").map(Number)[0];
    };
    e.prototype.getPeopleRewardIsReceive = function (t, e) {
        if (this._data.localData.surviveDatas) {
            //
        } else {
            this._data.localData.surviveDatas = [];
        }
        for (var n = this._data.localData.surviveDatas, i = 0; i < n.length; ++i) {
            var o = n[i];
            if (o.stageId == t) {
                return o.peopleRewards.indexOf(e) >= 0;
            }
        }
        return !1;
    };
    e.prototype.getSurviveBoxIsReceive = function (t) {
        for (var e = this._data.localData.surviveDatas, n = 0; n < e.length; ++n) {
            var i = e[n];
            if (i.stageId == t) {
                return i.isRewardBox;
            }
        }
        return !1;
    };
    e.prototype.receivePeopleRewardId = function (t, e) {
        var n = this._data.localData.surviveDatas;
        if (
            n.findIndex(function (e) {
                return e.stageId == t;
            }) < 0
        ) {
            n.push({
                stageId: t,
                isRewardBox: !1,
                peopleRewards: []
            });
        }
        for (var i = 0; i < n.length; ++i) {
            var o = n[i];
            if (o.stageId == t) {
                if (o.peopleRewards.indexOf(e) < 0) {
                    o.peopleRewards.push(e);
                    $localDataProxy.localDataProxy.saveData();
                }
                break;
            }
        }
        this.updateSurviveRewardRedPoint();
    };
    e.prototype.receiveSurviveBox = function (t) {
        var e = this._data.localData.surviveDatas;
        if (
            e.findIndex(function (e) {
                return e.stageId == t;
            }) < 0
        ) {
            e.push({
                stageId: t,
                isRewardBox: !1,
                peopleRewards: []
            });
        }
        for (var n = 0; n < e.length; ++n) {
            var i = e[n];
            if (i.stageId == t) {
                i.isRewardBox = !0;
                $localDataProxy.localDataProxy.saveData();
                break;
            }
        }
        this.updateSurviveRewardRedPoint();
    };
    e.prototype.getCanRefreshDscountShop = function (t) {
        var e = $cfg.default.instance.dataSkill.sheet();
        var i = $stageDataProxy.stageDataProxy.passStageId;
        var o = [];
        var r = [];
        for (var s in e)
            if ("" != (l = e[s]).icon && (0 == l.unlockType || (1 == l.unlockType && i >= l.unlockVal))) {
                r.push(l);
            }
        for (var c = 0; c < r.length; ++c) {
            var l = r[c];
            var u = exports.playerDataProxy.getArtifactUpGreadNeeItemId(l.id);
            if (t.indexOf(u) >= 0) {
                o.push(u);
            }
        }
        return o;
    };
    e.prototype.updateSurviveRewardRedPoint = function () {
        for (var t = $stageDataProxy.stageDataProxy.passStageId, e = !1, n = 1; n <= t + 1; ++n) {
            if (this.getStageSurviveIsCanReward(n)) {
                e = !0;
                break;
            }
        }
        $redPointMgr.default.instance.setRedPointNum(
            $redPointPathConfig.ERedPointPathName.GAME_BATTLE_SURVIVE_REWARD,
            e ? 1 : 0
        );
    };
    e.prototype.getStageSurviveIsCanReward = function (t) {
        var e = $cfg.default.instance.dataStage.getById(t);
        if (!e) {
            return !1;
        }
        for (
            var i = e.survivor.split("|").map(function (t) {
                    return Number(t) + e.checkSur;
                }),
                o = function (e) {
                    var n = $cfg.default.instance.dataSurvivor.queryOne(function (t) {
                        return t.id == i[e];
                    });
                    if (
                        $stageDataProxy.stageDataProxy.isRescueSurvival(t, n.id) &&
                        !r.getPeopleRewardIsReceive(t, n.id)
                    ) {
                        return {
                            value: !0
                        };
                    }
                },
                r = this,
                s = 0;
            s < i.length;
            ++s
        ) {
            var c = o(s);
            if ("object" == typeof c) {
                return c.value;
            }
        }
        return (
            $stageDataProxy.stageDataProxy.getStageSurvivalCount(t) >= i.length &&
            !exports.playerDataProxy.getSurviveBoxIsReceive(t)
        );
    };
    e.prototype.getBoxReward = function (t) {
        for (var e = t.split("_"), i = [], o = 0; o < e.length; ++o) {
            var r = e[o].split("&").map(Number);
            var s = $cfg.default.instance.dataItem.getById(r[0]);
            if (3 == s.type) {
                for (
                    var c = s.val.split("|").map(Number),
                        l = exports.playerDataProxy.getCanRefreshDscountShop(c),
                        u = function () {
                            var t = Math.floor(1e4 * Math.random()) % l.length;
                            var e = l[t];
                            var n = i.findIndex(function (t) {
                                return t.itemId == e;
                            });
                            if (n < 0) {
                                i.push({
                                    itemId: e,
                                    itemNum: 1
                                });
                            } else {
                                i[n].itemNum += 1;
                            }
                        },
                        p = 0;
                    p < r[1];
                    ++p
                ) {
                    u();
                }
            } else {
                i.push({
                    itemId: r[0],
                    itemNum: r[1]
                });
            }
        }
        return i;
    };
    e.prototype.updateSkillRedPoint = function () {
        for (
            var t = !1,
                e = $cfg.default.instance.dataSkill.queryAll(function (t) {
                    return !t.isInfo && exports.playerDataProxy.isUnlockSkill(t.id);
                }),
                i = 0;
            i < e.length;
            ++i
        ) {
            var o = e[i];
            var r = exports.playerDataProxy.getArtifactUpGreadNeedNum(o.id);
            var s = exports.playerDataProxy.getArtifactUpGreadNeeItemId(o.id);
            var c = $itemDataProxy.itemDataProxy.getItemValue(s);
            if (r > 0 && c >= r) {
                t = !0;
                break;
            }
        }
        $redPointMgr.default.instance.setRedPointNum($redPointPathConfig.ERedPointPathName.GAME_SKILL, t ? 1 : 0);
    };
    e.prototype.updateBuildRedPoint = function () {
        var t = !1;
        var e = $stageDataProxy.stageDataProxy.passStageId >= 1;
        if (e && this.canGetOnlineReward()) {
            t = !0;
        }
        if (e && !t) {
            for (
                var i = function (e) {
                        var i = $cfg.default.instance.dataBuild.queryOne(function (t) {
                            return t.loc == e && 1 == t.lv;
                        }).unlock;
                        if ($stageDataProxy.stageDataProxy.passStageId >= i) {
                            if (o.checkBuildLvUp(e)) {
                                t = !0;
                                return "break";
                            }
                            if (2 != e && 5 != e && 10 != e) {
                                return "continue";
                            }
                            var r = exports.playerDataProxy.getBuildLv(e);
                            var s = $cfg.default.instance.dataBuild.queryOne(function (t) {
                                return t.loc == e && r == t.lv;
                            });
                            var c = exports.playerDataProxy.getBuildStartTime(e);
                            var l = null;
                            if (2 == e) {
                                l = 6e4 * Number(s.ImpVal2);
                            } else {
                                l = 36e5 * Number(s.ImpVal2);
                            }
                            var u = $timeUtil.TimeUtil.getTime() - c;
                            if (u > l) {
                                u = l;
                            }
                            if (
                                (2 == e ? Math.floor(u / 1e3 / 60) : Math.floor(u / 1e3 / 60 / 60)) * Number(s.ImpVal) >
                                0
                            ) {
                                t = !0;
                                return "break";
                            }
                        }
                    },
                    o = this,
                    r = 1;
                r <= 10 && "break" !== i(r);
                ++r
            ) {}
        }
        $redPointMgr.default.instance.setRedPointNum($redPointPathConfig.ERedPointPathName.GAME_BUILD, t ? 1 : 0);
    };
    e.prototype.updateShopRedPoint = function () {
        var t = !1;
        var e = $stageDataProxy.stageDataProxy.passStageId >= 1;
        var n = $cfg.default.instance.dataShopDaily.getById(11);
        if (e && n && this._data.localData.shopData.goldVideoNum < n.freeNum) {
            t = !0;
        }
        if (e && !t) {
            var i = $cfg.default.instance.dataShopDaily.getById(1);
            if (i && this._data.localData.dscountShopData.videoNum < i.freeNum) {
                t = !0;
            }
        }
        $redPointMgr.default.instance.setRedPointNum($redPointPathConfig.ERedPointPathName.GAME_SHOP, t ? 1 : 0);
    };
    e.prototype.updateStageExploreRedPoint = function () {
        for (var t = !1, e = $stageDataProxy.stageDataProxy.passStageId, n = 1; n <= e + 1; ++n) {
            if (this.hasStageExploreReward(n)) {
                t = !0;
                break;
            }
        }
        $redPointMgr.default.instance.setRedPointNum(
            $redPointPathConfig.ERedPointPathName.GAME_BATTLE_EXPLORE,
            t ? 1 : 0
        );
    };
    e.prototype.hasStageExploreReward = function (t) {
        var e = $cfg.default.instance.dataStage.getById(t);
        if (!e) {
            return !1;
        }
        for (
            var n = $stageDataProxy.stageDataProxy.stageData.stageInfos[t],
                i = e.boxReward.split("|"),
                o = n.exploreValue || 0,
                r = e.maxRoom,
                s = 0;
            s < i.length;
            ++s
        ) {
            var c = null;
            if (n) {
                c = n.boxState[s];
            } else {
                c = 0;
            }
            var l = i[s].split("_");
            if ((!c || 0 == c) && o >= Math.floor(Number(l[0]) * r)) {
                return !0;
            }
        }
        return !1;
    };
    e.prototype.checkGetSkin = function (t) {
        var e = $cfg.default.instance.dataSkin.getById(t);
        return (
            !!e &&
            !this._data.localData.unlockSkins.includes(t) &&
            (4 == e.unlockType
                ? $signDataProxy.signDataProxy.curSevenSignDay > e.unlockVal
                : 5 == e.unlockType && this.videoNum >= e.unlockVal)
        );
    };
    e.prototype.updateSkinRedPoint = function () {
        var t = !1;
        var e =
            Number($cfg.default.instance.dataCons.getById(15).val) - 1 <= $stageDataProxy.stageDataProxy.passStageId;
        if (this.skinRed) {
            t = !0;
        }
        if (!t && e) {
            for (var n = $cfg.default.instance.dataSkin.sheet(), i = 0; i < n.length; ++i) {
                if (this.checkGetSkin(n[i].id)) {
                    t = !0;
                    break;
                }
            }
        }
        $redPointMgr.default.instance.setRedPointNum($redPointPathConfig.ERedPointPathName.GAME_BATTLE_SKIN, t ? 1 : 0);
    };
    e.prototype.isUnlockOfflineReward = function () {
        return (
            $stageDataProxy.stageDataProxy.passStageId >= this.getBuildUnlockStage(2) &&
            this._data.localData.buildDatas.some(function (t) {
                return 2 == t.loc;
            })
        );
    };
    return e;
})($proxyBase.ProxyBase);
exports.PlayerDataProxy = S;
exports.playerDataProxy = new S(E);
