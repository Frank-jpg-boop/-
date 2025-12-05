var i;
exports.basicsProxy = void 0;
var $proxyBase = require("./ProxyBase");
var $timeUtil = require("./TimeUtil");
var s = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "bgmVolume", {
        get: function () {
            return this._data.bgm_volume;
        },
        set: function (t) {
            this._data.bgm_volume = t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "effectVolume", {
        get: function () {
            return this._data.effect_volume;
        },
        set: function (t) {
            this._data.effect_volume = t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "vibrateEnable", {
        get: function () {
            return this._data.vibrate_enable;
        },
        set: function (t) {
            this._data.vibrate_enable = t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "followTime", {
        get: function () {
            return this._data.follow_time;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "shortcutTime", {
        get: function () {
            return this._data.shortcut_time;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "favoriteGuideTime", {
        get: function () {
            return this._data.favorite_guide_time;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.addCustomAdNum = function () {
        this._data.custom_ad_num = (this._data.custom_ad_num || 0) + 1;
    };
    e.prototype.saveSettings = function () {};
    e.prototype.getTodayNum = function (t) {
        this._checkSameDay();
        return this._data.today_num[t] || 0;
    };
    e.prototype._checkSameDay = function () {
        var t = $timeUtil.TimeUtil.getTime();
        if (!$timeUtil.TimeUtil.isSameDay(t, this._data.sync_time)) {
            for (var e in this._data.today_num) this._data.today_num[e] = 0;
            this._data.sync_time = t;
        }
    };
    return e;
})($proxyBase.ProxyBase);
exports.basicsProxy = new s(function () {
    this.bgm_volume = 1;
    this.effect_volume = 1;
    this.vibrate_enable = !0;
    this.follow_time = 0;
    this.shortcut_time = 0;
    this.favorite_guide_time = 0;
    this.rv_sum = 0;
    this.rv_list = "";
    this.custom_ad_num = 0;
    this.today_num = {};
    this.sync_time = 0;
    this.push_id = null;
    this.push_open_time = 0;
});
