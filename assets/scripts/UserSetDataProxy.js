var i;
exports.userSetDataProxy = exports.UserSetDataProxy = exports.UserSetData = void 0;
var $globalEnum = require("./GlobalEnum");
var $proxyBase = require("./ProxyBase");
var $basicsProxy = require("./BasicsProxy");
var $localDataProxy = require("./LocalDataProxy");
var l = function () {
    this.isVibration = !0;
    this.musicVolume = 1;
    this.effectVolume = 1;
};
exports.UserSetData = l;
var u = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "isVibration", {
        get: function () {
            return this._data.isVibration;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initData = function () {
        $basicsProxy.basicsProxy.bgmVolume = this._data.musicVolume;
        $basicsProxy.basicsProxy.effectVolume = this._data.effectVolume;
    };
    e.prototype.setMusicVolume = function (t) {
        this._data.musicVolume = t;
        this.saveData();
    };
    e.prototype.setEffectVolume = function (t) {
        this._data.effectVolume = t;
        this.saveData();
    };
    e.prototype.setVibration = function (t) {
        this._data.isVibration = t;
        this.saveData();
    };
    e.prototype.saveData = function () {
        $localDataProxy.localDataProxy.writeLocalCustomData(
            $globalEnum.Global.ELocalCustomDataKey.USER_SET,
            this._data
        );
    };
    return e;
})($proxyBase.ProxyBase);
exports.UserSetDataProxy = u;
exports.userSetDataProxy = new u(l);
