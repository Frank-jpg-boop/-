exports.ProxyBase = void 0;
t.prototype.initData = function () {};
t.prototype.init = function (t) {
  if (t) {
    for (let e in t) this._data[e] = t[e];
    this.initData();
  }
};
function t(t) {
  this._data = null;
  this._data = new t();
}
const i = t;
exports.ProxyBase = i;
