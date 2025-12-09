var i;
var $cfg = require("./Cfg");
var $audioUtil = require("./AudioUtil");
var $animUtils = require("./AnimUtils");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $campsitePeopleItem = require("./CampsitePeopleItem");
var $campsiteRewardItem = require("./CampsiteRewardItem");
var d = cc._decorator;
var m = d.ccclass;
var y = d.property;
var _ = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mCampsitePeopleItemPb = null;
        e.rewardItem = null;
        e._roomLoc = 0;
        e._maxLv = 0;
        e._unlockStageId = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.initData = function (t) {
        var e = this;
        this._roomLoc = t;
        this._maxLv = $cfg.default.instance.dataBuild.queryAll(function (t) {
            return t.loc == e._roomLoc;
        }).length;
        this._unlockStageId = $playerDataProxy.playerDataProxy.getBuildUnlockStage(this._roomLoc);
    };
    e.prototype.updateView = function () {
        var t = this;
        var e = $stageDataProxy.stageDataProxy.passStageId >= this._unlockStageId;
        var n = this.node.getChildByName("lv").getComponent(cc.Label);
        var i = this.node.getChildByName("lockMask");
        var o = this.node.getChildByName("upArrow");
        if (e) {
            n.node.active = !0;
            var r = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
            if (r >= this._maxLv) {
                n.string = "MAX";
            } else {
                n.string = "Lv." + $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
            }
            if ($playerDataProxy.playerDataProxy.getIsFirstUnlockBuild(this._roomLoc)) {
                i.active = !0;
                i.getChildByName("unlockTips").active = !1;
                i.getChildByName("lockIcon").active = !1;
                $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_HomeBuild");
                cc.tween(i)
                    .to(0.5, {
                        opacity: 0
                    })
                    .call(function () {
                        i.active = !1;
                    })
                    .start();
            } else {
                i.active = !1;
            }
            if (this.rewardItem) {
                this.rewardItem.node.active = !0;
                var l = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
                var h = $cfg.default.instance.dataBuild.queryOne(function (e) {
                    return e.loc == t._roomLoc && e.lv == l;
                });
                this.rewardItem.buildData = h;
            }
            var f = $playerDataProxy.playerDataProxy.checkBuildLvUp(this._roomLoc);
            if (o.active != f) {
                if (f) {
                    o.y = -73;
                    $animUtils.AnimUtil.floatAnim(o, 1, 10);
                }
                o.active = f;
            }
            this.updatePoeple();
        } else {
            if (this.rewardItem) {
                this.rewardItem.node.active = !1;
            }
            n.node.active = !1;
            i.active = !0;
            var d = i.getChildByName("unlockTips");
            var m = i.getChildByName("lockIcon");
            if (
                $stageDataProxy.stageDataProxy.passStageId >=
                $playerDataProxy.playerDataProxy.getBuildUnlockStage(this._roomLoc - 1)
            ) {
                d.active = !0;
                m.active = !1;
                d.getComponent(cc.Label).string = "第" + (this._unlockStageId + 1) + "章解锁";
            } else {
                m.active = !0;
                d.active = !1;
            }
            o.active = !1;
            o.y = -73;
        }
    };
    e.prototype.getMaxPoeple = function () {
        for (
            var t = this,
                e = 0,
                n = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc),
                i = function (n) {
                    var i = $cfg.default.instance.dataBuild.queryOne(function (e) {
                        return e.loc == t._roomLoc && e.lv == n;
                    });
                    e += i.max;
                },
                o = 1;
            o <= n;
            ++o
        ) {
            i(o);
        }
        return e;
    };
    e.prototype.updatePoeple = function () {
        var t = this.node.getChildByName("People");
        var e = t.childrenCount;
        var n = Math.min(this.getMaxPoeple(), 5);
        if (n > e) {
            for (var i = e; i < n; ++i) {
                var o = cc.instantiate(this.mCampsitePeopleItemPb);
                t.addChild(o);
                o.getComponent($campsitePeopleItem.default).joinRoom(this.node);
            }
        }
    };
    e.prototype.onClickBtnThis = function () {
        var t = this;
        if (this.node.getChildByName("lockMask").getChildByName("lockIcon").active) {
            $globalPopupMgr.default.instance.showTips("暂未解锁");
        } else if ($stageDataProxy.stageDataProxy.passStageId >= this._unlockStageId) {
            var e = $playerDataProxy.playerDataProxy.getBuildLv(this._roomLoc);
            var n = $cfg.default.instance.dataBuild.queryOne(function (n) {
                return n.loc == t._roomLoc && n.lv == e;
            });
            $globalPopupMgr.default.instance.showCampsiteBuildDetailsPopup(n);
        } else {
            $globalPopupMgr.default.instance.showTips("第" + (this._unlockStageId + 1) + "章解锁");
        }
    };
    __decorate([y(cc.Prefab)], e.prototype, "mCampsitePeopleItemPb", void 0);
    __decorate([y($campsiteRewardItem.default)], e.prototype, "rewardItem", void 0);
    return __decorate([m], e);
})(cc.Component);
exports.default = _;
