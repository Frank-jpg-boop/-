exports.ProxyDataBase = void 0;
t.prototype.resetData = function () {
  const t = this;
  const e = this.createInitData();
  Object.keys(e).forEach(function (n) {
    t.localData[n] = e[n];
  });
};
function t(t) {
  const e = this;
  this.localData = null;
  this.localData = this.createInitData();
  if (t) {
    Object.keys(t).forEach(function (n) {
      e.localData[n] = t[n];
    });
  }
}
const i = t;
exports.ProxyDataBase = i;
