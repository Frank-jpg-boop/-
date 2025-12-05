var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $timeUtil = require("./TimeUtil");
var $frameEnum = require("./FrameEnum");
var $commonRedPoint = require("./CommonRedPoint");
var $adMgr = require("./AdMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var _ = cc._decorator;
var g = _.ccclass;
var v = _.property;
var b = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lNum = null;
        e.spIcon = null;
        e.lTime = null;
        e.lDesc = null;
        e.nAd = null;
        e.redPoint = null;
        e.spQuality = null;
        e._time = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(
            $playerDataProxy.EPlayDataEvent.UPDATE_ONLINE_REWARD,
            this.updateView,
            this
        );
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(
            $playerDataProxy.EPlayDataEvent.UPDATE_ONLINE_REWARD,
            this.updateView,
            this
        );
    };
    e.prototype.onEnable = function () {
        $localDataProxy.localDataProxy.saveData();
    };
    e.prototype.updateView = function () {
        var t = $cfg.default.instance.dataMerchant.getById($playerDataProxy.playerDataProxy.onlineRewardId + 1);
        this.node.active = null != t;
        if (t) {
            this._time = 60 * t.time;
            var e = t.reward.split("_").map(Number);
            var n = e[0];
            var i = e[1];
            $resLoader.ResLoader.setSpritFrame(
                this.spIcon,
                $itemDataProxy.itemDataProxy.getItemIconBundleName(n),
                $itemDataProxy.itemDataProxy.getItemIconPath(n)
            );
            $resLoader.ResLoader.setSpritFrame(
                this.spQuality,
                $frameEnum.Frame.EBundleName.RES,
                "textures/atlas/quality/pic_wuping_di_" + $cfg.default.instance.dataItem.getById(n).rare
            );
            this.lNum.string = "x" + i;
            if ($playerDataProxy.playerDataProxy.canGetOnlineReward()) {
                this.lTime.node.active = !1;
                this.nAd.active = !1;
                this.lDesc.string = "点击领取";
                this.redPoint.setRedPointState(!0);
            } else {
                this.lTime.node.active = !0;
                this.nAd.active = 1 == t.adGet;
                if (this.nAd.active) {
                    var o = 6 == t.id;
                    this.nAd.getChildByName("Layout").getChildByName("Ad").active = !o;
                    this.nAd.getChildByName("Layout").getChildByName("Share").active = o;
                }
                this.lDesc.string = "后可领取";
                this.redPoint.setRedPointState(!1);
            }
        }
    };
    e.prototype.update = function () {
        if (this.lTime.node.active && this._time > 0) {
            var t = this._time - $playerDataProxy.playerDataProxy.onlineTime;
            if (t <= 0) {
                this.updateView();
                this.lTime.string = "00:00";
            } else {
                this.lTime.string = $timeUtil.TimeUtil.format_HHMMSS(1e3 * t);
            }
        }
    };
    e.prototype.onClickBtnAd = function () {
        var t = $cfg.default.instance.dataMerchant.getById($playerDataProxy.playerDataProxy.onlineRewardId + 1);
        if (t) {
            if (6 != t.id) {
                $adMgr.AdMgr.instance.showVideoAd({
                    id: 1,
                    eventId: "AD_OnlineReward",
                    success: function () {
                        $playerDataProxy.playerDataProxy.getOnlineReward(!0);
                    }
                });
            } else {
                mm.platform.shareAppMessage({
                    success: function () {
                        $playerDataProxy.playerDataProxy.getOnlineReward(!0);
                    }
                });
            }
        }
    };
    e.prototype.onClickBtnGet = function () {
        if ($playerDataProxy.playerDataProxy.canGetOnlineReward()) {
            $playerDataProxy.playerDataProxy.getOnlineReward(!1);
        } else {
            $globalPopupMgr.default.instance.showTips("累积在线时长可领取奖励");
        }
    };
    e.prototype.onClickBtnRole = function () {
        $globalPopupMgr.default.instance.showTips("累积在线时长可领取奖励");
    };
    __decorate([v(cc.Label)], e.prototype, "lNum", void 0);
    __decorate([v(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([v(cc.Label)], e.prototype, "lTime", void 0);
    __decorate([v(cc.Label)], e.prototype, "lDesc", void 0);
    __decorate([v(cc.Node)], e.prototype, "nAd", void 0);
    __decorate([v($commonRedPoint.default)], e.prototype, "redPoint", void 0);
    __decorate([v(cc.Sprite)], e.prototype, "spQuality", void 0);
    return __decorate([g], e);
})(cc.Component);
exports.default = b;
