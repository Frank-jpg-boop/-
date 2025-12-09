exports.RVOMath =
  exports.KeyValuePair =
  exports.Line =
  exports.Obstacle =
  exports.Vector2 =
    void 0;
t.prototype.lengthSqr = function () {
  return Math.pow(this.x, 2) + Math.pow(this.y, 2);
};
t.prototype.substract = function (t, e) {
  t.x -= e.x;
  t.y -= e.y;
  return t;
};
t.prototype.clone = function () {
  return new t(this.x, this.y);
};
t.prototype.copy = function (t) {
  this.x = t.x;
  this.y = t.y;
  return this;
};
t.prototype.scale = function (e) {
  return new t(this.x * e, this.y * e);
};
t.prototype.multiply = function (t) {
  return this.x * t.x + this.y * t.y;
};
t.prototype.minus = function (e) {
  return new t(this.x - e.x, this.y - e.y);
};
t.prototype.plus = function (e) {
  return new t(this.x + e.x, this.y + e.y);
};
function t(t, e) {
  this.x = 0;
  this.y = 0;
  this.x = t;
  this.y = e;
}
const i = t;
exports.Vector2 = i;
exports.Obstacle = function () {};
exports.Line = function () {};
exports.KeyValuePair = function (t, e) {
  this.key = t;
  this.value = e;
};
t.RVO_EPSILON = 80;
t.leftOf = function (e, n, i) {
  return t.det(e.minus(i), n.minus(e));
};
t.abs = function (e) {
  return Math.sqrt(t.absSq(e));
};
t.det = function (t, e) {
  return t.x * e.y - t.y * e.x;
};
t.sqr = function (t) {
  return t * t;
};
t.distSqPointLineSegment = function (e, n, i) {
  const o = i.minus(e);
  const r = n.minus(e);
  const a = o.multiply(r) / t.absSq(r);
  if (a < 0) {
    return t.absSq(o);
  } else {
    if (a > 1) {
      return t.absSq(i.minus(n));
    } else {
      return t.absSq(i.minus(e.plus(r.scale(a))));
    }
  }
};
t.normalize = function (e) {
  return e.scale(1 / t.abs(e));
};
t.absSq = function (t) {
  return t.multiply(t);
};
function t() {}
const o = t;
exports.RVOMath = o;
