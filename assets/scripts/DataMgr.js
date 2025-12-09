exports.DataMgr = void 0;
var $globalEnum = require("./GlobalEnum");
var $commonUtil = require("./CommonUtil");
var $sqlUtil = require("./SqlUtil");
var $timeUtil = require("./TimeUtil");
var $popupManager = require("./PopupManager");
var $sceneManager = require("./SceneManager");
var $battleMgr = require("./BattleMgr");
var $gameEnum = require("./GameEnum");
var $guideDataProxy = require("./GuideDataProxy");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $signDataProxy = require("./SignDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $taskDataProxy = require("./TaskDataProxy");
var $userDataProxy = require("./UserDataProxy");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $proxyDataMgr = require("./ProxyDataMgr");
var $userCenterMgr = require("./UserCenterMgr");
var S = (function () {
    function t() {
        this._intervalId = null;
        this._saveLocalDataTime = 0;
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (t, e) {
        if (void 0 === t) {
            t = "";
        }
        if (this._intervalId) {
            clearInterval(this._intervalId);
        }
        this._intervalId = setInterval(this.updateSecond.bind(this), 1e3);
        this.initUserData(t);
        this.initLocalData(e);
        this.initItemData();
        this.initStageData();
        this.initSignData();
        this.initPlayerData();
        this.initGuideData();
        this.initTaskData();
        this.initCustomData();
        $localDataProxy.localDataProxy.saveData();
    };
    t.prototype.updateSecond = function () {
        $playerDataProxy.playerDataProxy.updateSecond();
        $localDataProxy.localDataProxy.updateSecond();
    };
    t.prototype.initUserData = function (t) {
        var e = new $userDataProxy.UserData(t);
        $userDataProxy.userDataProxy.init(e);
        $commonUtil.CommonUtil.print("uid:", $userDataProxy.userDataProxy.data.uid);
    };
    t.prototype.initLocalData = function (t) {
        var e;
        var n = $sqlUtil.SqlUtil.getLocalUserData($localDataProxy.localDataProxy.localKey, "");
        var i = null;
        if ("" == n) {
            i = null;
        } else {
            i = JSON.parse(n);
        }
        var o = new $localDataProxy.LocalData();
        var s = null;
        if (t && t.localData) {
            s = JSON.parse(t.localData);
        } else {
            s = null;
        }
        if (i && s) {
            if (i.code >= s.code) {
                e = i;
            } else {
                e = s;
            }
            Object.keys(e).forEach(function (t) {
                o[t] = e[t];
            });
        } else {
            if (s) {
                Object.keys(s).forEach(function (t) {
                    o[t] = s[t];
                });
            } else {
                i &&
                    Object.keys(i).forEach(function (t) {
                        o[t] = i[t];
                    });
            }
        }
        if (
            0 != o.dailyRefreshNumberTime &&
            $timeUtil.TimeUtil.isSameDay(o.dailyRefreshNumberTime, $timeUtil.TimeUtil.getTime())
        ) {
            //
        } else {
            o.dailyRefreshNumberTime = $timeUtil.TimeUtil.getTime();
            o.dailyRefreshNumberData = {};
            if (o.playerData) {
                o.playerData.shopData.goldVideoNum = 0;
                o.playerData.shopData.isOpenBigBox = !1;
                o.playerData.dscountShopData.videoNum = 0;
                o.playerData.dscountShopData.goodsDatas = [];
                o.playerData.onlineTime = 0;
                o.playerData.onlineRewardId = 0;
            }
        }
        $localDataProxy.localDataProxy.init(o);
    };
    t.prototype.initPlayerData = function () {
        var t = new $playerDataProxy.PlayerData($localDataProxy.localDataProxy.data.playerData);
        $localDataProxy.localDataProxy.data.playerData = t.localData;
        $playerDataProxy.playerDataProxy.init(t);
    };
    t.prototype.initItemData = function () {
        var t = new $itemDataProxy.ItemData($localDataProxy.localDataProxy.data.itemData);
        $localDataProxy.localDataProxy.data.itemData = t.localData;
        $itemDataProxy.itemDataProxy.init(t);
    };
    t.prototype.initStageData = function () {
        var t = new $stageDataProxy.StageData($localDataProxy.localDataProxy.data.stageData);
        $localDataProxy.localDataProxy.data.stageData = t.localData;
        $stageDataProxy.stageDataProxy.init(t);
    };
    t.prototype.initGuideData = function () {
        var t = new $guideDataProxy.GuideData($localDataProxy.localDataProxy.data.guideData);
        $localDataProxy.localDataProxy.data.guideData = t.localData;
        $guideDataProxy.guideDataProxy.init(t);
    };
    t.prototype.initTaskData = function () {
        var t = new $taskDataProxy.TaskData($localDataProxy.localDataProxy.data.taskData);
        $localDataProxy.localDataProxy.data.taskData = t.localData;
        $taskDataProxy.taskDataProxy.init(t);
    };
    t.prototype.initSignData = function () {
        var t = new $signDataProxy.SignData($localDataProxy.localDataProxy.data.signData);
        $localDataProxy.localDataProxy.data.signData = t.localData;
        $signDataProxy.signDataProxy.init(t);
    };
    t.prototype.initCustomData = function () {
        for (var t in $globalEnum.Global.ELocalCustomDataKey)
            $proxyDataMgr.ProxyDataMgr.instance.initCustomDataProxy(
                t,
                $localDataProxy.localDataProxy.data.customData[t]
            );
    };
    t.prototype.resetData = function (t) {
        if (void 0 === t) {
            t = null;
        }
        $userCenterMgr.UserCenterMgr.instance.clearData(function () {
            $battleMgr.default.instance.clear();
            $localDataProxy.localDataProxy.clearData();
            $popupManager.PopupManager.instance.removeAll($popupManager.PopupCacheMode.CACHE);
            if (t) {
                t();
            }
            if (cc.sys.platform == cc.sys.WECHAT_GAME || cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
                mm.platform.restartMiniProgramSync();
            } else {
                $sceneManager.SceneManager.instance.runScene("load", "", null, !1);
            }
        });
    };
    t.prototype.checkSubscriptionReward = function () {
        var t = this;
        if ($playerDataProxy.playerDataProxy.isUnlockOfflineReward()) {
            if (
                1 ==
                $localDataProxy.localDataProxy.getDailyRefreshValue($gameEnum.Game.EDailyRefreshDataKey.SUBSCRIPT_OFF)
            ) {
                this.subscriptionReward();
            } else {
                mm.platform.requestSubscribeMessage(mm.platform.tmplIds, function (e, n) {
                    if (e) {
                        if (n && "accept" == n[mm.platform.tmplIds[0]]) {
                            $localDataProxy.localDataProxy.setPermanentValue(
                                $gameEnum.Game.EDailyRefreshDataKey.SUBSCRIPT_OFF,
                                1
                            ),
                                t.subscriptionReward(!0);
                        } else {
                            $localDataProxy.localDataProxy.setPermanentValue(
                                $gameEnum.Game.EDailyRefreshDataKey.SUBSCRIPT_OFF,
                                0
                            ),
                                $globalPopupMgr.default.instance.showTips("订阅失败");
                        }
                    } else {
                        $globalPopupMgr.default.instance.showTips("订阅失败");
                    }
                });
            }
        }
    };
    t.prototype.subscriptionReward = function (t) {
        if (void 0 === t) {
            t = !1;
        }
        var e = "通知时间=" + ($timeUtil.TimeUtil.getTime() + 288e5);
        var n = {
            templateId: mm.platform.tmplIds.length > 0 ? mm.platform.tmplIds[0] : "",
            sendTime: Math.floor(28800),
            params: e,
            page: "1"
        };
        $userCenterMgr.UserCenterMgr.instance.subscribe(n, function () {
            console.log("订阅成功");
            if (t) {
                $globalPopupMgr.default.instance.showTips("订阅成功!");
            }
        });
    };
    t._instance = null;
    t.token = "";
    t.isSidebarCardInGameForTT = !1;
    t.isAddDeskEnterGame = !1;
    return t;
})();
exports.DataMgr = S;
