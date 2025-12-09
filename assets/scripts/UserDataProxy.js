var i;
exports.userDataProxy = exports.UserDataProxy = exports.UserData = exports.EUserDataEvent = void 0;
var r;
var $globalEnum = require("./GlobalEnum");
var $proxyBase = require("./ProxyBase");
var $eventManager = require("./EventManager");
var $sqlUtil = require("./SqlUtil");
!(function (t) {
    t.UPDATE_HEAD_PATH = "update_head_path";
})((r = exports.EUserDataEvent || (exports.EUserDataEvent = {})));
var u = function (t) {
    if (void 0 === t) {
        t = "";
    }
    this.uid = "";
    this.nickName = "我";
    this.headPath = "";
    this.uid = t;
};
exports.UserData = u;
var p = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "uidKey", {
        get: function () {
            return $globalEnum.Global.ELocalDataKey.USER_UID + "_" + yzll.gameConfig.name;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "codeKey", {
        get: function () {
            return $globalEnum.Global.ELocalDataKey.USER_CODE + "_" + yzll.gameConfig.name;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.initData = function () {};
    e.prototype.setNickName = function (t) {
        this._data.nickName = t;
    };
    e.prototype.setHeadPath = function (t) {
        this._data.headPath = t;
        $eventManager.EventManager.instance.emit(r.UPDATE_HEAD_PATH);
    };
    e.prototype.setUid = function (t) {
        this._data.uid = t;
        $sqlUtil.SqlUtil.setLocalUserData(this.uidKey, t);
    };
    e.prototype.checkActive = function () {
        return (
            !yzll.gameConfig.isZB ||
            1 == $sqlUtil.SqlUtil.getLocalUserData($globalEnum.Global.ELocalDataKey.ZB_ACTIVE_GAME + this._data.uid)
        );
    };
    e.prototype.activeZBGame = function () {
        $sqlUtil.SqlUtil.setLocalUserData($globalEnum.Global.ELocalDataKey.ZB_ACTIVE_GAME + this._data.uid, 1);
    };
    return e;
})($proxyBase.ProxyBase);
exports.UserDataProxy = p;
exports.userDataProxy = new p(u);
