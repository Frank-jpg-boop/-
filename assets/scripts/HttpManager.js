export const NET_ERROR_CODE = {
  NONE: 0,
  TIME_OUT: 1,
  ERROR: 2
};
let i = NET_ERROR_CODE;
export const HttpManager = exports.NET_ERROR_CODE = void 0;;
t._instance = null;
t.prototype.doHttpAsynPostNotToken = function (t, e) {
  const n = this;
  return new Promise(function (a, s) {});
};
t.prototype.doHttpAsynPost = function (t, e, n) {
  const a = this;
  if (void 0 === n) {
    n = '';
  }
  return new Promise(function (s, c) {});
};
t.prototype.doHttpAsynGet = function (t) {
  const e = this;
  return new Promise(function (n, a) {});
};
t.prototype.getUrl = function () {
  return '';
};
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t.prototype, 'account', {
  get: function () {
    return this._account;
  },
  set: function (t) {
    this._account = t;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._account = '';
  this._serverInfo = null;
  this.timeOut = 5e3;
}
const a = t;
export const HttpManager = a;;
