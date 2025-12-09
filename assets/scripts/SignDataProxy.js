var i;
exports.signDataProxy = exports.SignDataProxy = exports.SignData = exports.ESignDataEvent = void 0;
var r;
var $cfg = require("./Cfg");
var $proxyBase = require("./ProxyBase");
var $proxyDataBase = require("./ProxyDataBase");
var $eventManager = require("./EventManager");
var $timeUtil = require("./TimeUtil");
var $redPointMgr = require("./RedPointMgr");
var $redPointPathConfig = require("./RedPointPathConfig");
var $itemDataProxy = require("./ItemDataProxy");
var $localDataProxy = require("./LocalDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
!(function (t) {
    t.UPDATE_SIGN_DATA = "UPDATE_SIGN_DATA";
})((r = exports.ESignDataEvent || (exports.ESignDataEvent = {})));
var y = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.createInitData = function () {
        return {
            sevenSignDay: 0,
            lastSevenSignTime: 0
        };
    };
    return e;
})($proxyDataBase.ProxyDataBase);
exports.SignData = y;
var _ = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.initData = function () {
        this.updateRedPoint();
    };
    Object.defineProperty(e.prototype, "curSevenSignDay", {
        get: function () {
            return this._data.localData.sevenSignDay + 1;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.canSevenSign = function () {
        return (
            this.curSevenSignDay <= 7 &&
            !$timeUtil.TimeUtil.isSameDay(this._data.localData.lastSevenSignTime, $timeUtil.TimeUtil.getTime())
        );
    };
    e.prototype.getSevenSignRewarad = function (t) {
        var e = this.curSevenSignDay;
        if (!(e > 7)) {
            this._data.localData.sevenSignDay = e;
            this._data.localData.lastSevenSignTime = $timeUtil.TimeUtil.getTime();
            var n = $cfg.default.instance.dataSign.getById(e).reward.split("_").map(Number);
            var i = n[0];
            var o = n[1];
            var s = [];
            var c = $cfg.default.instance.dataItem.getById(i);
            if (3 == c.type) {
                $itemDataProxy.itemDataProxy.randomChip(c.rare, o * (t ? 2 : 1)).forEach(function (t, e) {
                    s.push({
                        itemId: e,
                        itemNum: t
                    });
                });
            } else {
                if (4 == c.type) {
                    $playerDataProxy.playerDataProxy.updateSkinRedPoint(), $localDataProxy.localDataProxy.saveData();
                } else {
                    s = [
                        {
                            itemId: i,
                            itemNum: o * (t ? 2 : 1)
                        }
                    ];
                }
            }
            $eventManager.EventManager.instance.emit($itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE, s);
            $eventManager.EventManager.instance.emit(r.UPDATE_SIGN_DATA);
            this.updateRedPoint();
        }
    };
    e.prototype.updateRedPoint = function () {
        var t = this.canSevenSign();
        $redPointMgr.default.instance.setRedPointNum(
            $redPointPathConfig.ERedPointPathName.GAME_BATTLE_SEVENSIGN,
            t ? 1 : 0
        );
    };
    return e;
})($proxyBase.ProxyBase);
exports.SignDataProxy = _;
exports.signDataProxy = new _(y);
