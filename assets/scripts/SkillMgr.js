exports.SkillMgr = void 0;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var $attrMgr = require("./AttrMgr");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $gameEnum = require("./GameEnum");
var $attrEnum = require("./AttrEnum");
var $skillEnum = require("./SkillEnum");
var $levelBattleData = require("./LevelBattleData");
var $skill_101 = require("./Skill_101");
var $skill_11 = require("./Skill_11");
var $skill_111 = require("./Skill_111");
var $skill_121 = require("./Skill_121");
var $skill_21 = require("./Skill_21");
var $skill_31 = require("./Skill_31");
var $skill_41 = require("./Skill_41");
var $skill_51 = require("./Skill_51");
var $skill_61 = require("./Skill_61");
var $skill_71 = require("./Skill_71");
var $skill_81 = require("./Skill_81");
var $skill_91 = require("./Skill_91");
var C = (function () {
    function t() {}
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
    t.prototype.getCommonSkillExProbRate = function () {
        var t = Number($cfg.default.instance.dataCons.getById(101).val);
        t -= $localDataProxy.localDataProxy.getDailyRefreshValue(
            $gameEnum.Game.EDailyRefreshDataKey.WIN_SUB_HEIGHT_RATE
        );
        t += $localDataProxy.localDataProxy.getDailyRefreshValue(
            $gameEnum.Game.EDailyRefreshDataKey.LOSE_ADD_HEIGHT_RATE
        );
        var e = $cfg.default.instance.dataCons.getById(102).val.split("|").map(Number);
        var n = e[0];
        var o = e[1];
        t = Math.max(t, n);
        return Math.min(t, o);
    };
    t.prototype.getCommonSkillExProbRateByQuality = function (t) {
        if (1 == t) {
            return 1;
        }
        if (2 == t) {
            return 1;
        }
        if (3 == t) {
            var e = Number($cfg.default.instance.dataCons.getById(103).val);
            var n = Number($cfg.default.instance.dataCons.getById(104).val);
            return Math.min(Math.pow(e, $levelBattleData.levelBattleData.data.commonPurpleNotShowCount), n);
        }
        if (4 == t) {
            return (
                (e = Number($cfg.default.instance.dataCons.getById(105).val)),
                (n = Number($cfg.default.instance.dataCons.getById(106).val)),
                Math.min(Math.pow(e, $levelBattleData.levelBattleData.data.commonOrangeNotShowCount), n)
            );
        } else {
            return void 0;
        }
    };
    t.prototype.createSkill = function (t, e) {
        var n = null;
        switch (t) {
            case 11:
                n = new $skill_11.Skill_11();
                break;
            case 21:
                n = new $skill_21.Skill_21();
                break;
            case 31:
                n = new $skill_31.Skill_31();
                break;
            case 41:
                n = new $skill_41.Skill_41();
                break;
            case 51:
                n = new $skill_51.Skill_51();
                break;
            case 61:
                n = new $skill_61.Skill_61();
                break;
            case 71:
                n = new $skill_71.Skill_71();
                break;
            case 81:
                n = new $skill_81.Skill_81();
                break;
            case 91:
                n = new $skill_91.Skill_91();
                break;
            case 101:
                n = new $skill_101.Skill_101();
                break;
            case 111:
                n = new $skill_111.Skill_111();
                break;
            case 121:
                n = new $skill_121.Skill_121();
        }
        n.init(e, t);
        return n;
    };
    t.prototype.refreshSkillIds = function () {
        var t = [];
        var e = [];
        var n = $levelBattleData.levelBattleData.skillIds;
        $cfg.default.instance.dataSkill.sheet().forEach(function (e) {
            if (e.isInfo) {
                //
            } else {
                if ($playerDataProxy.playerDataProxy.isUnlockSkill(e.id)) {
                    if (
                        n.some(function (t) {
                            return $cfg.default.instance.dataSkill.getById(t).mainType == e.mainType;
                        })
                    ) {
                        //
                    } else {
                        t.push(e.id);
                    }
                }
            }
        });
        for (var o = 3; t.length > 0 && o > 0; ) {
            var s = t.map(function (t) {
                return $cfg.default.instance.dataSkill.getById(t).weight;
            });
            var c = $mathUtil.MathUtil.weightedRandom(s);
            e.push(t[c]);
            t.splice(c, 1);
            --o;
        }
        e.sort(function () {
            if ($randomUtil.RandomUtil.randomInt(0, 2)) {
                return 1;
            } else {
                return -1;
            }
        });
        return e;
    };
    t.prototype.selectSkill = function (t) {
        $levelBattleData.levelBattleData.addSkill(t);
    };
    t.prototype.refreshSkillExIds = function (t) {
        var e = this;
        var n = 0 == t;
        var o = $attrMgr.AttrMgr.instance.getPlayerAttrValue($attrEnum.E_AttrType.PURPLE_ORANGE_RATE);
        var c = [];
        var u = [];
        var h = [];
        $levelBattleData.levelBattleData.skillIds.forEach(function (t) {
            var n = $cfg.default.instance.dataSkill.getById(t);
            var o = null;
            if ("" == n.chooseBase) {
                o = [];
            } else {
                o = n.chooseBase.split("|").map(Number);
            }
            var r = [];
            var a = $playerDataProxy.playerDataProxy.getArtifactLv(t);
            if ("" != n.chooseLv) {
                n.chooseLv.split("|").forEach(function (t) {
                    var e = t.split("_");
                    var n = e[0];
                    var i = e[1];
                    if (a >= Number(n)) {
                        r.push.apply(r, i.split("&").map(Number));
                    }
                });
            }
            o.push.apply(o, r);
            o.forEach(function (t) {
                var n = $cfg.default.instance.dataChoose.getById(t);
                if (e.checkSkillEx(t)) {
                    if (n.rare > 2) {
                        u.push(t);
                    }
                    c.push(t);
                }
            });
        });
        for (var d = 3; u.length > 0 && t > 0; ) {
            var m = u.map(function (t) {
                var e = $cfg.default.instance.dataChoose.getById(t);
                if (e.rare > 2) {
                    return Math.ceil(e.weight * o);
                } else {
                    return e.weight;
                }
            });
            var y = $mathUtil.MathUtil.weightedRandom(m);
            var _ = u[y];
            h.push(_);
            u.splice(y, 1);
            var g = c.indexOf(_);
            if (-1 != g) {
                c.splice(g, 1);
            }
            --t;
            --d;
        }
        for (var v = n ? this.getCommonSkillExProbRate() : 1; c.length > 0 && d > 0; ) {
            m = c.map(function (t) {
                var r = $cfg.default.instance.dataChoose.getById(t);
                if (r.rare > 2) {
                    var a = null;
                    if (n) {
                        a = e.getCommonSkillExProbRateByQuality(r.rare);
                    } else {
                        a = 1;
                    }
                    return Math.ceil(r.weight * o * v * a);
                }
                return r.weight;
            });
            y = $mathUtil.MathUtil.weightedRandom(m);
            h.push(c[y]);
            c.splice(y, 1);
            --d;
        }
        if (n) {
            if (
                h.some(function (t) {
                    var e = $cfg.default.instance.dataChoose.getById(t);
                    return !(!e || 3 != e.rare);
                })
            ) {
                $levelBattleData.levelBattleData.data.commonPurpleNotShowCount = 0;
            } else {
                $levelBattleData.levelBattleData.data.commonPurpleNotShowCount++;
            }
            if (
                h.some(function (t) {
                    var e = $cfg.default.instance.dataChoose.getById(t);
                    return !(!e || 4 != e.rare);
                })
            ) {
                $levelBattleData.levelBattleData.data.commonOrangeNotShowCount = 0;
            } else {
                $levelBattleData.levelBattleData.data.commonOrangeNotShowCount++;
            }
        }
        h.sort(function () {
            if ($randomUtil.RandomUtil.randomInt(0, 2)) {
                return 1;
            } else {
                return -1;
            }
        });
        return h;
    };
    t.prototype.checkSkillEx = function (t) {
        for (
            var e = $cfg.default.instance.dataChoose.getById(t),
                n = "" == e.first ? [] : e.first.split("|").map(Number),
                o = !0,
                r = 0;
            r < n.length;
            ++r
        ) {
            if (!$levelBattleData.levelBattleData.getSkillExDataById(n[r])) {
                o = !1;
                break;
            }
        }
        if (!o) {
            return !1;
        }
        var a = $levelBattleData.levelBattleData.getSkillExDataById(t);
        return !(a && a.count >= e.boxNum);
    };
    t.prototype.selectSkillEx = function (t) {
        $levelBattleData.levelBattleData.addSkillEx(t);
        var e = $cfg.default.instance.dataChoose.getById(t);
        $eventManager.EventManager.instance.emit($skillEnum.ESkillEvent.SELECT_SKILL_EX + e.withSkill, t);
    };
    t.prototype.hasSkillEx = function () {
        for (
            var t = function (t) {
                    var n = $cfg.default.instance.dataSkill.getById($levelBattleData.levelBattleData.skillIds[t]);
                    var o = null;
                    if ("" == n.chooseBase) {
                        o = [];
                    } else {
                        o = n.chooseBase.split("|").map(Number);
                    }
                    var r = [];
                    var a = $playerDataProxy.playerDataProxy.getArtifactLv(n.id);
                    if ("" != n.chooseLv) {
                        n.chooseLv.split("|").forEach(function (t) {
                            var e = t.split("_");
                            var n = e[0];
                            var i = e[1];
                            if (a >= Number(n)) {
                                r.push.apply(r, i.split("&").map(Number));
                            }
                        });
                    }
                    o.push.apply(o, r);
                    for (var s = 0; s < o.length; ++s) {
                        if (e.checkSkillEx(o[s])) {
                            return {
                                value: !0
                            };
                        }
                    }
                },
                e = this,
                n = 0;
            n < $levelBattleData.levelBattleData.skillIds.length;
            ++n
        ) {
            var o = t(n);
            if ("object" == typeof o) {
                return o.value;
            }
        }
        return !1;
    };
    return t;
})();
exports.SkillMgr = C;
