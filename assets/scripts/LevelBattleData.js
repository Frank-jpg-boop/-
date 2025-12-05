exports.levelBattleData = exports.LevelBattleData = exports.ELevelBattleDataEvent = void 0;
var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $mathUtil = require("./MathUtil");
var $itemDataProxy = require("./ItemDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $bagConst = require("./BagConst");
!(function (t) {
    t.GOLD_CHANGE = "gold_change";
    t.ELECTRIC_CHANGE = "electric_change";
    t.WAVE_CHANGE = "wave_change";
    t.CONSUME_BAG_ITEM = "consume_bag_item";
    t.BAG_ITEM_CHANGE = "bag_item_change";
    t.ADD_SKILL = "add_skill";
    t.REMOVE_SKILL = "remove_skill";
    t.ENEMY_LEVEL_UPDATE = "monster_level_update";
})((i = exports.ELevelBattleDataEvent || (exports.ELevelBattleDataEvent = {})));
var p = (function () {
    function t() {
        this.maxResurgenceCount = 3;
        this.electricPowerCount = 6;
        this._cfgStage = null;
        this._data = null;
        this.extraRoomEnemyLv = 0;
    }
    Object.defineProperty(t.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "gold", {
        get: function () {
            return this._data.gold;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "electric", {
        get: function () {
            return this._data.electric;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rescue", {
        get: function () {
            return this._data.rescue;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "stageId", {
        get: function () {
            return this._data.curStageId;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "cfgStage", {
        get: function () {
            return this._cfgStage;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "curWave", {
        get: function () {
            return this._data.curWave;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "bagData", {
        get: function () {
            return this._data.bagData;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "residueSurvivorNum", {
        get: function () {
            var t = $cfg.default.instance.dataStage.getById(this._data.curStageId);
            var e = this._data.bagData.bagEquipDatas.filter(function (t) {
                return 999 == t.rewardId;
            });
            return t.maxNpc - $stageDataProxy.stageDataProxy.getStageInfo(t.id).survivalKeys.length - e.length;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "curWaveInfo", {
        get: function () {
            var t = null;
            if (0 == this._data.curWave) {
                t = 1;
            } else {
                t = this._data.curWave;
            }
            var e = $cfg.default.instance.dataStage.getById(this._data.curStageId);
            var n = e.waveSet.split("|");
            if (0 == n.length) {
                return {
                    waveId: 0,
                    enemyLv: 0
                };
            }
            if (t > n.length) {
                var i = e.waveRepeat.split("|").map(Number);
                var r = i[(t - n.length) % i.length];
                var a = Math.floor((t - n.length) / i.length);
                return {
                    waveId: r,
                    enemyLv: Math.floor((e.waveRepeatLv + this.extraRoomEnemyLv) * Math.pow(e.waveRepeatLvUp, a))
                };
            }
            var s = n[t - 1].split("_").map(Number);
            return {
                waveId: s[0],
                enemyLv: s[1] + this.extraRoomEnemyLv
            };
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "stageEnemyLvScale", {
        get: function () {
            var t = $cfg.default.instance.dataStageUp.getById(this._data.curStageId);
            if (t) {
                return t.level;
            } else {
                return 1;
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "stageEnemyAtkScale", {
        get: function () {
            var t = $cfg.default.instance.dataStageUp.getById(this._data.curStageId);
            if (t) {
                return t.atk;
            } else {
                return 1;
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "skillIds", {
        get: function () {
            return this._data.skillIds.slice();
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "moonLvIndex", {
        get: function () {
            for (
                var t = this._cfgStage.moonShow.split("|").map(Number),
                    e = this.curWaveInfo.enemyLv,
                    n = t.length - 1,
                    i = 0;
                i < t.length;
                i++
            ) {
                if (e <= t[i]) {
                    n = i - 1;
                    break;
                }
            }
            return n;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "skillExMap", {
        get: function () {
            for (var t = new Map(), e = 0, n = Object.entries(this._data.skillExDataMap); e < n.length; e++) {
                var i = n[e];
                var o = i[0];
                var r = i[1];
                t.set(Number(o), r);
            }
            return t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "enemyLevelRate", {
        get: function () {
            var t = $stageDataProxy.stageDataProxy.getStageSurvivalCount(this._data.curStageId);
            var e = this._cfgStage.survivor.split("|").length;
            var n = Number($cfg.default.instance.dataCons.getById(20).val);
            var i = Math.max(e - t, 1);
            return Math.pow(e / i, n);
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (t) {
        var e = this;
        this._data = {
            curStageId: t,
            curWave: 0,
            gold: 0,
            electric: 0,
            rescue: 0,
            resurgenceCount: 0,
            bagData: {
                isUnlock: !1,
                bagEquipDatas: []
            },
            skillIds: [],
            skillExDataMap: {},
            skillExRefreshCount: 0,
            skillExAllSelectCount: 0,
            skillRefreshCount: 0,
            bagItemRecord: new Set(),
            stageBossCfg: {
                id: 0,
                lv: 0
            },
            exploreValue: 0,
            commonPurpleNotShowCount: 0,
            commonOrangeNotShowCount: 0
        };
        this._cfgStage = $cfg.default.instance.dataStage.getById(t);
        var n = $cfg.default.instance.dataSkin.getById($playerDataProxy.playerDataProxy.skinId);
        this._data.skillIds.push(n.baseSkill);
        if (-1 != n.baseChoose) {
            this.addSkillEx(n.baseChoose);
        }
        this._data.skillIds.forEach(function (t) {
            $cfg.default.instance.dataSkill
                .getById(t)
                .speReward.split("|")
                .forEach(function (t) {
                    var n = t.split("_").map(Number);
                    var i = n[0];
                    var o = n[1];
                    if ($itemDataProxy.itemDataProxy.getItemValue(i) > 0) {
                        e.addSkillEx(o);
                    }
                });
        });
        this.extraRoomEnemyLv = 0;
        if ("" != this._cfgStage.bossVal) {
            var l = [];
            this._cfgStage.bossVal.split("|").forEach(function (t) {
                var e = t.split("_").map(Number);
                var n = e[0];
                var i = e[1];
                var o = e[2];
                l.push({
                    id: i,
                    lv: o,
                    prob: n
                });
            });
            var u = $mathUtil.MathUtil.weightedRandom(
                l.map(function (t) {
                    return t.prob;
                })
            );
            this._data.stageBossCfg = {
                id: l[u].id,
                lv: l[u].lv
            };
        }
        $eventManager.EventManager.instance.emit(i.GOLD_CHANGE, this._data.gold, 0);
        $eventManager.EventManager.instance.emit(i.ELECTRIC_CHANGE, this._data.electric, 0);
    };
    t.prototype.updateGold = function (t) {
        t = Math.floor(t);
        this._data.gold += t;
        $eventManager.EventManager.instance.emit(i.GOLD_CHANGE, this._data.gold, t);
    };
    t.prototype.updateElectric = function (t) {
        this._data.electric += t;
        $eventManager.EventManager.instance.emit(i.ELECTRIC_CHANGE, this._data.electric, t);
    };
    t.prototype.addRescue = function (t) {
        this._data.rescue += t;
    };
    t.prototype.consumeBagItem = function (t) {
        var e = this._data.bagData.bagEquipDatas.findIndex(function (e) {
            return e.rewardId === t;
        });
        if (-1 != e) {
            var n = this._data.bagData.bagEquipDatas[e];
            this._data.bagData.bagEquipDatas.splice(e, 1);
            $eventManager.EventManager.instance.emit(i.CONSUME_BAG_ITEM, n);
            $eventManager.EventManager.instance.emit(i.BAG_ITEM_CHANGE);
            return n;
        }
    };
    t.prototype.hasBagItem = function (t) {
        return this._data.bagData.bagEquipDatas.some(function (e) {
            return e.rewardId === t;
        });
    };
    t.prototype.getWaveId = function (t) {
        var e = $cfg.default.instance.dataStage.getById(this._data.curStageId);
        var n = e.waveSet.split("|");
        if (t > n.length) {
            var i = e.waveRepeat.split("|").map(Number);
            return i[(t - n.length) % i.length];
        }
        return Number(n[t - 1].split("_")[0]);
    };
    t.prototype.enterNextWave = function () {
        this._data.curWave++;
        $eventManager.EventManager.instance.emit(i.WAVE_CHANGE);
        $eventManager.EventManager.instance.emit(i.ENEMY_LEVEL_UPDATE);
    };
    t.prototype.gm_enterWave = function (t) {
        this._data.curWave = t;
        $eventManager.EventManager.instance.emit(i.WAVE_CHANGE);
        $eventManager.EventManager.instance.emit(i.ENEMY_LEVEL_UPDATE);
    };
    t.prototype.getSkillExDataById = function (t) {
        if (this._data.skillExDataMap[t]) {
            return this._data.skillExDataMap[t];
        } else {
            return null;
        }
    };
    t.prototype.addSkill = function (t) {
        if (-1 == this._data.skillIds.indexOf(t)) {
            this._data.skillIds.push(t);
            $eventManager.EventManager.instance.emit(i.ADD_SKILL, t);
        }
    };
    t.prototype.removeSkill = function (t) {
        var e = this._data.skillIds.indexOf(t);
        if (-1 != e) {
            this._data.skillIds.splice(e, 1);
            $eventManager.EventManager.instance.emit(i.REMOVE_SKILL, t);
        }
    };
    t.prototype.addSkillEx = function (t) {
        if (this._data.skillExDataMap[t]) {
            this._data.skillExDataMap[t].count++;
        } else {
            this._data.skillExDataMap[t] = {
                id: t,
                count: 1
            };
        }
    };
    t.prototype.getBagNullGridCount = function () {
        for (var t = new Map(), e = 0; e < $bagConst.BAG_ROW; ++e) {
            for (var n = 0; n < $bagConst.BAG_COL; ++n) {
                t.set(e + "&" + n, !0);
            }
        }
        if (!this._data.bagData.isUnlock) {
            var i = $bagConst.BAG_LOCK_GRID[1].grids.slice();
            $playerDataProxy.playerDataProxy.bagAddGridPoss.forEach(function (t) {
                i.splice(i.indexOf(t), 1);
            });
            i.forEach(function (e) {
                t.set(e, !1);
            });
        }
        for (e = 0; e < this._data.bagData.bagEquipDatas.length; ++e) {
            for (
                var r = this._data.bagData.bagEquipDatas[e],
                    a = $cfg.default.instance.dataReward.getById(r.rewardId),
                    s = $bagConst.BAG_EQUIP_FORM[a.boxSet].grids.slice(),
                    l = r.rowCol.split("&").map(Number),
                    p = [],
                    h = 0;
                h < s.length;
                h++
            ) {
                var f = s[h];
                p.push(l[0] + f[0] + "&" + (l[1] + f[1]));
            }
            p.forEach(function (e) {
                t.set(e, !1);
            });
        }
        return Array.from(t.values()).filter(function (t) {
            return t;
        }).length;
    };
    t.prototype.findBagPutRowCol = function (t) {
        for (var e = new Map(), n = 0; n < $bagConst.BAG_ROW; ++n) {
            for (var i = 0; i < $bagConst.BAG_COL; ++i) {
                e.set(n + "&" + i, !0);
            }
        }
        if (!this._data.bagData.isUnlock) {
            var r = $bagConst.BAG_LOCK_GRID[1].grids.slice();
            $playerDataProxy.playerDataProxy.bagAddGridPoss.forEach(function (t) {
                r.splice(r.indexOf(t), 1);
            });
            r.forEach(function (t) {
                e.set(t, !1);
            });
        }
        for (n = 0; n < this._data.bagData.bagEquipDatas.length; ++n) {
            for (
                var a = this._data.bagData.bagEquipDatas[n],
                    s = $cfg.default.instance.dataReward.getById(a.rewardId),
                    l = $bagConst.BAG_EQUIP_FORM[s.boxSet].grids.slice(),
                    p = a.rowCol.split("&").map(Number),
                    h = [],
                    f = 0;
                f < l.length;
                f++
            ) {
                var d = l[f];
                h.push(p[0] + d[0] + "&" + (p[1] + d[1]));
            }
            h.forEach(function (t) {
                e.set(t, !1);
            });
        }
        for (n = 0; n < $bagConst.BAG_ROW; ++n) {
            for (i = 0; i < $bagConst.BAG_COL; ++i) {
                var m = !0;
                if (e.get(n + "&" + i)) {
                    l = $bagConst.BAG_EQUIP_FORM[$cfg.default.instance.dataReward.getById(t).boxSet].grids.slice();
                    for (var y = 0; y < l.length; y++) {
                        d = l[y];
                        if (!e.get(n + d[0] + "&" + (i + d[1]))) {
                            m = !1;
                            break;
                        }
                    }
                } else {
                    m = !1;
                }
                if (m) {
                    return n + "&" + i;
                }
            }
        }
        return "";
    };
    t.prototype.update = function () {};
    return t;
})();
exports.LevelBattleData = p;
exports.levelBattleData = new p();
