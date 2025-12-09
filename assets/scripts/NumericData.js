import $numeric from './Numeric';
exports.NumericData = void 0;
t.prototype.clear = function () {
  this.propertyMap.forEach(function (t) {
    t.clear();
  });
  this.propertyMap.clear();
};
t.prototype.getNumeric = function (t) {
  if (this.propertyMap.has(t)) {
    return this.propertyMap.get(t);
  } else {
    return null;
  }
};
t.prototype.init = function (t) {
  for (let e in t)
    if (isNaN(e)) {
      //
    } else {
      this.propertyMap.set(Number(e), new $numeric.default());
    }
};
function t() {
  this.propertyMap = new Map();
}
const o = t;
exports.NumericData = o;
