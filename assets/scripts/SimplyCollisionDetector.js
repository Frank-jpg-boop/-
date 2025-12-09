import $simplyVec2 from './SimplyVec2';
t.isCollisionPointToRect = function (t, e) {
  const n = e.center;
  if (e.rotation % 360 != 0) {
    const i = t.sub(n);
    t = n.add(i.rotate(-1 * e.radian));
  }
  return e.contains(t);
};
t.isCollisionPointToCircle = function (t, e) {
  return (
    $simplyVec2.default.squaredDistance(t, e.center) <= e.radius * e.radius
  );
};
t.rectCross = function (t, e, n) {
  const o = t.rVertexs
    .map(function (t) {
      return $simplyVec2.default.dot(t, n);
    })
    .sort(function (t, e) {
      return t - e;
    });
  const r = e.rVertexs
    .map(function (t) {
      return $simplyVec2.default.dot(t, n);
    })
    .sort(function (t, e) {
      return t - e;
    });
  const a = o[0];
  const s = o[o.length - 1];
  const c = r[0];
  const l = r[r.length - 1];
  return s >= c && l >= a;
};
t.isCollisionOBBRectToRect = function (e, n) {
  const i = e.rAxisX;
  const o = e.rAxisY;
  const r = n.rAxisX;
  const a = n.rAxisY;
  return !!(
    t.rectCross(e, n, i) &&
    t.rectCross(e, n, o) &&
    t.rectCross(e, n, r) &&
    t.rectCross(e, n, a)
  );
};
t.isCollisionAABBRectToRect = function (t, e) {
  return t.intersects(e) || t.containsRect(e) || e.containsRect(t);
};
t.isCollisionRectToRect = function (e, n) {
  if (e.rotation % 360 != 0 || n.rotation % 360 != 0) {
    return t.isCollisionOBBRectToRect(e, n);
  } else {
    return t.isCollisionAABBRectToRect(e, n);
  }
};
t.isCollisionRectToCircle = function (t, e) {
  const n = t.center;
  const o = t.a3;
  const r = t.rotation;
  const a = e.radius;
  const s = e.center;
  if (r % 360 != 0) {
    const c = s.sub(n);
    s = n.add(c.rotate(-1 * t.radian));
  }
  const l = o.sub(n);
  const u = new $simplyVec2.default(Math.abs(s.x - n.x), Math.abs(s.y - n.y));
  return (
    new $simplyVec2.default(
      Math.max(u.x - l.x, 0),
      Math.max(u.y - l.y, 0),
    ).lengthSqr() <=
    a * a
  );
};
t.isCollisionCircleToCircle = function (t, e) {
  return (
    $simplyVec2.default.distance(t.center, e.center) <= t.radius + e.radius
  );
};
function t() {}
const o = t;
exports.default = o;
