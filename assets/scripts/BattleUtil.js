export const BattleUtil = void 0;
t.getPerpendicularVector = function (t, e) {
  return cc.v2(-t.y, t.x).add(e);
};
t.randomRangeFloat = function (t, e) {
  return Math.random() * (e - t) + t;
};
t.randomRangeInt = function (t, e) {
  e = 0 | +e;
  return (t = 0 | +t) + Math.floor(Math.random() * (e - t));
};
t.lerp = function (t, e, n) {
  return t + (e - t) * n;
};
function t() {}
const i = t;
export const BattleUtil = i;
