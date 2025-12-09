var i;
exports.localDataProxy = exports.LocalDataProxy = exports.LocalData = exports.ELocalDataEvent = void 0;
var $globalEnum = require("./GlobalEnum");
var $proxyBase = require("./ProxyBase");
var $sqlUtil = require("./SqlUtil");
var $timeUtil = require("./TimeUtil");
var $userCenterMgr = require("./UserCenterMgr");
var $userDataProxy = require("./UserDataProxy");
(exports.ELocalDataEvent || (exports.ELocalDataEvent = {})).ON_STAGE_UPDATE = "on_stage_update";
var p = function() {
    this.code = 0;
    this.permanentNumberData = {};
    this.dailyRefreshNumberTime = 0;
    this.dailyRefreshNumberData = {};
    this.itemData = null;
    this.stageData = null;
    this.guideData = null;
    this.playerData = null;
    this.taskData = null;
    this.customData = {};
    this.createTime = 0;
    this.signData = null;
};
exports.LocalData = p;
var h = (function(t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._isInit = !1;
        e._isNeedSaveSvr = !1;
        e._saveSvrTime = 0;
        e._saveSvrInterval = 30;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "data", {
        get: function() {
            return this._data;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "localKey", {
        get: function() {
            return (
                $globalEnum.Global.ELocalDataKey.LOCAL_DATA +
                "_" +
                yzll.gameConfig.name +
                "_" +
                $userDataProxy.userDataProxy.data.uid
            );
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initData = function() {
        this.updateRedPoint();
        this._isInit = !0;
        this._isNeedSaveSvr = !1;
        if (this._data.createTime && 0 != this._data.createTime) {
            //
        } else {
            this._data.createTime = $timeUtil.TimeUtil.getTime();
        }
    };
    e.prototype.saveData = function() {
        if (this._isInit) {
            this._data.code++;
            $sqlUtil.SqlUtil.setLocalUserData(this.localKey, JSON.stringify(this._data));
            this._isNeedSaveSvr = !0;
        }
    };
    e.prototype.getPlayGameDay = function() {
        return $timeUtil.TimeUtil.getDiffDayNum(this._data.createTime, $timeUtil.TimeUtil.getTime());
    };
    e.prototype.saveDataToSvr = function() {
        console.log("保存服务器数据");
        $userCenterMgr.UserCenterMgr.instance.saveData("localData", JSON.stringify(this._data));
    };
    e.prototype.updateSecond = function() {
        // if (this._saveSvrTime > 0) {
        //     this._saveSvrTime--;
        // } else {
        //     if (this._isNeedSaveSvr) {
        //         this._saveSvrTime = this._saveSvrInterval;
        //         this._isNeedSaveSvr = !1;
        //         this.saveDataToSvr();
        //     }
        // }
    };
    e.prototype.getPermanentValue = function(t) {
        if (this._data.permanentNumberData[t]) {
            return this._data.permanentNumberData[t];
        } else {
            return 0;
        }
    };
    e.prototype.setPermanentValue = function(t, e) {
        this._data.permanentNumberData[t] = e;
        this.saveData();
        this.updateRedPoint();
    };
    e.prototype.getDailyRefreshValue = function(t) {
        if (this._data.dailyRefreshNumberData[t]) {
            return this._data.dailyRefreshNumberData[t];
        } else {
            return 0;
        }
    };
    e.prototype.setDailyRefreshValue = function(t, e) {
        this._data.dailyRefreshNumberData[t] = e;
        this.saveData();
        this.updateRedPoint();
    };
    e.prototype.writeLocalCustomData = function(t, e) {
        this._data.customData[t] = e;
        this.saveData();
    };
    e.prototype.updateRedPoint = function() {};
    e.prototype.clearData = function() {
        $sqlUtil.SqlUtil.setLocalUserData(exports.localDataProxy.localKey, "");
    };
    return e;
})($proxyBase.ProxyBase);
exports.LocalDataProxy = h;
exports.localDataProxy = new h(p);