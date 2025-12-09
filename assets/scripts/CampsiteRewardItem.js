var i;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $audioUtil = require("./AudioUtil");
var $resLoader = require("./ResLoader");
var $mathUtil = require("./MathUtil");
var $timeUtil = require("./TimeUtil");
var $frameEnum = require("./FrameEnum");
var $dataMgr = require("./DataMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var g = cc._decorator;
var v = g.ccclass;
var b = g.property;
var E = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mIcon = null;
        e.mNumLab = null;
        e.mMaxLab = null;
        e.mCountDownLab = null;
        e.mRoot = null;
        e._buildData = null;
        e._startTime = 0;
        e._maxTime = 0;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "buildData", {
        get: function () {
            return this._buildData;
        },
        set: function (t) {
            this._buildData = t;
            this.initCampsiteRewardItem();
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initCampsiteRewardItem = function () {
        this._startTime = $playerDataProxy.playerDataProxy.getBuildStartTime(this.buildData.loc);
        if (2 == this.buildData.loc) {
            this._maxTime = 6e4 * Number(this.buildData.ImpVal2);
        } else {
            this._maxTime = 36e5 * Number(this.buildData.ImpVal2);
        }
        this.scheduleTimer();
        this.unschedule(this.scheduleTimer);
        this.schedule(this.scheduleTimer, 1);
    };
    e.prototype.scheduleTimer = function () {
        var t = $timeUtil.TimeUtil.getTime() - this._startTime;
        if (t >= this._maxTime) {
            this.mMaxLab.active = !0;
            this.mCountDownLab.node.active = !1;
        } else {
            this.mMaxLab.active = !1;
            this.mCountDownLab.node.active = !1;
            this.mCountDownLab.string = $timeUtil.TimeUtil.format_HHMMSS(t);
        }
        this.setRewardData();
    };
    e.prototype.setRewardData = function () {
        var t = $timeUtil.TimeUtil.getTime() - this._startTime;
        if (t > this._maxTime) {
            t = this._maxTime;
        }
        var e = 0;
        if (2 == this._buildData.loc) {
            e = Math.floor(t / 1e3 / 60);
            this.setRewardIconFrame($itemEnum.E_ItemId.GOLD);
        } else {
            if (10 == this._buildData.loc) {
                (e = Math.floor(t / 1e3 / 60 / 60)), this.setRewardIconFrame($itemEnum.E_ItemId.DIAMOND);
            } else {
                5 == this._buildData.loc && ((e = Math.floor(t / 1e3 / 60 / 60)), this.setRewardIconFrame(201));
            }
        }
        var n = e * Number(this.buildData.ImpVal);
        this.mNumLab.string = "x" + $mathUtil.MathUtil.formatValue(n);
        this.mRoot.active = n > 0;
        this.node.getComponent(cc.Button).enabled = n > 0;
    };
    e.prototype.setRewardIconFrame = function (t) {
        var e = this;
        $resLoader.ResLoader.loadAsset({
            path: $itemDataProxy.itemDataProxy.getItemIconPath(t),
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.RES
        })
            .then(function (t) {
                e.mIcon.spriteFrame = t;
            })
            .catch(function (t) {
                console.log("error:", t);
            });
    };
    e.prototype.onItemClick = function () {
        var t = $timeUtil.TimeUtil.getTime() - this._startTime;
        if (t > this._maxTime) {
            t = this._maxTime;
        }
        var e =
            (2 == this._buildData.loc ? Math.floor(t / 1e3 / 60) : Math.floor(t / 1e3 / 60 / 60)) *
            Number(this.buildData.ImpVal);
        if (e <= 0) {
            $globalPopupMgr.default.instance.showTips("暂无奖励");
        } else {
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_CollectRewards");
            if (2 == this._buildData.loc) {
                $globalPopupMgr.default.instance.showAwardNotice([
                    {
                        itemId: $itemEnum.E_ItemId.GOLD,
                        itemNum: e
                    }
                ]);
            } else {
                if (10 == this._buildData.loc) {
                    $globalPopupMgr.default.instance.showAwardNotice([
                        {
                            itemId: $itemEnum.E_ItemId.DIAMOND,
                            itemNum: e
                        }
                    ]);
                } else {
                    5 == this._buildData.loc && this.getDebrisReward(e);
                }
            }
            this._startTime = $timeUtil.TimeUtil.getTime();
            this.scheduleTimer();
            $playerDataProxy.playerDataProxy.setBuildStartTime(this._buildData.loc, this._startTime);
            $dataMgr.DataMgr.instance.checkSubscriptionReward();
        }
    };
    e.prototype.getDebrisReward = function (t) {
        var e = [];
        var n = [];
        var i = $cfg.default.instance.dataSkill.sheet();
        var o = $stageDataProxy.stageDataProxy.passStageId;
        for (var r in i) {
            var s = i[r];
            if ("" != s.icon && (0 == s.unlockType || (1 == s.unlockType && o >= s.unlockVal))) {
                e.push({
                    id: s.id,
                    weight: s.weight
                });
                n.push(s.weight);
            }
        }
        for (
            var c = [],
                l = function () {
                    var t = $mathUtil.MathUtil.weightedRandom(n);
                    if (t < 0) {
                        t = 0;
                    }
                    var i = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(e[t].id);
                    var o = c.findIndex(function (t) {
                        return t.itemId == i;
                    });
                    if (o >= 0) {
                        c[o].itemNum += 1;
                    } else {
                        c.push({
                            itemId: i,
                            itemNum: 1
                        });
                    }
                },
                p = 0;
            p < t;
            ++p
        ) {
            l();
        }
        $globalPopupMgr.default.instance.showAwardNotice(c);
    };
    __decorate([b(cc.Sprite)], e.prototype, "mIcon", void 0);
    __decorate([b(cc.Label)], e.prototype, "mNumLab", void 0);
    __decorate([b(cc.Node)], e.prototype, "mMaxLab", void 0);
    __decorate([b(cc.Label)], e.prototype, "mCountDownLab", void 0);
    __decorate([b(cc.Node)], e.prototype, "mRoot", void 0);
    return __decorate([v], e);
})(cc.Component);
exports.default = E;
