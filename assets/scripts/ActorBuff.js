import $eventManager from './EventManager';
import $battleEnum from './BattleEnum';
import $buffMgr from './BuffMgr';
t.prototype.deleteBuffMap = function (t) {
  if (this.buffMap.has(t)) {
    this.buffMap.delete(t);
  }
};
t.prototype.reset = function () {
  this.buffMap.clear();
};
t.prototype.update = function (t) {
  this.buffMap.forEach(function (e) {
    e.update(t);
  });
};
t.prototype.removeAllDebuff = function () {
  this.buffMap.forEach(function (t) {
    if (t.isDebuff) {
      t.remove();
    }
  });
};
t.prototype.clear = function (t) {
  if (void 0 === t) {
    t = !0;
  }
  this.buffMap.forEach(function (e) {
    e.remove(t);
  });
  this.buffMap.clear();
};
t.prototype.remove = function (t) {
  if (this.buffMap.has(t)) {
    this.buffMap.get(t).remove();
  }
};
t.prototype.add = function (t) {
  for (const e = [], n = 1; n < arguments.length; n++) {
    e[n - 1] = arguments[n];
  }
  const a = null;
  if (this.buffMap.has(t.buffId)) {
    (a = this.buffMap.get(t.buffId)).again.apply(a, e);
  } else {
    a = $buffMgr.default.instance.createBuff(t);
    this.buffMap.set(t.buffId, a);
    $eventManager.EventManager.instance.emit(
      $battleEnum.EBattleEvent.ADD_BUFF_EFFECT,
      t,
      a,
      e,
    );
    a.trigger.apply(a, e);
  }
  return a;
};
t.prototype.get = function (t) {
  if (this.buffMap.has(t)) {
    return this.buffMap.get(t);
  } else {
    return null;
  }
};
t.prototype.has = function (t) {
  return this.buffMap.has(t);
};
function t() {
  this.buffMap = new Map();
}
const a = t;
exports.default = a;
