import $resKeeper from './ResKeeper';
export const ResUtil = void 0;
t.instantiate = function (e) {
  const n = cc.instantiate(e);
  const i = t.getResKeeper(n, !0);
  if (i) {
    i.cacheAsset(e);
  }
  return n;
};
t.assignWith = function (e, n, i) {
  const o = t.getResKeeper(n, i);
  if (o && e instanceof cc.Asset) {
    return (o.cacheAsset(e), e);
  } else {
    return (console.error('assignWith ' + e + ' to ' + n + ' faile'), null);
  }
};
t.getResKeeper = function (e, n) {
  if (e) {
    return (
      e.getComponent($resKeeper.ResKeeper) ||
      (n ? e.addComponent($resKeeper.ResKeeper) : t.getResKeeper(e.parent, n))
    );
  } else {
    return null;
  }
};
function t() {}
const o = t;
export const ResUtil = o;
