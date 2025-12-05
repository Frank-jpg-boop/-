exports.ProxyDataMgr = void 0;
var $globalEnum = require("./GlobalEnum");
var $userSetDataProxy = require("./UserSetDataProxy");
var r = (function () {
    function t() {}
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
    t.prototype.initCustomDataProxy = function (t, e) {
        if (t === $globalEnum.Global.ELocalCustomDataKey.USER_SET) {
            var n = new $userSetDataProxy.UserSetData();
            this.formatData(n, e);
            $userSetDataProxy.userSetDataProxy.init(n);
        }
    };
    t.prototype.formatData = function (t, e) {
        for (var n in e) "object" == typeof e[n] && t[n] ? this.formatData(t[n], e[n]) : (t[n] = e[n]);
    };
    t._instance = null;
    return t;
})();
exports.ProxyDataMgr = r;
