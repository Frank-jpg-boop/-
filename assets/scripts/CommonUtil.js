exports.CommonUtil = void 0;
t.isObjEmpty = function (t) {
  return Object.keys(t).length <= 0;
};
t.isEmpty = function (t) {
  return null == t || "undefined" === t || "" === t;
};
t.zeroVal = function (t, e) {
  if (this.isEmpty(e[t])) {
    e[t] = 0;
  }
};
t.print = function (t, e) {
  if (yzll.gameConfig.debug) {
    console.log(t, e);
  }
};
function t() {}
const i = t;
exports.CommonUtil = i;
