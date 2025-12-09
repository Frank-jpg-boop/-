import $globalEnum from './GlobalEnum';
import $userSetDataProxy from './UserSetDataProxy';
exports.ProxyDataMgr = void 0;
t._instance = null;
t.prototype.formatData = function (t, e) {
  for (let n in e)
    "object" == typeof e[n] && t[n]
      ? this.formatData(t[n], e[n])
      : (t[n] = e[n]);
};
t.prototype.initCustomDataProxy = function (t, e) {
  if (t === $globalEnum.Global.ELocalCustomDataKey.USER_SET) {
    const n = new $userSetDataProxy.UserSetData();
    this.formatData(n, e);
    $userSetDataProxy.userSetDataProxy.init(n);
  }
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const r = t;
exports.ProxyDataMgr = r;
