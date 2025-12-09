let i;
export const EBagEquipItemState = {
  UNLOCK: 1,
  WAIT_UNLOCK: 2,
  LOCK: 3
};
let a = EBagEquipItemState;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
e.prototype.setHeightQualityActive = function (t, e) {
  this.nQuality.active = t;
  if (t) {
    this.nQuality.children.forEach(function (t, n) {
      t.active = n == e - 1;
    });
  }
};
e.prototype.resetQuality = function () {
  this.setHeightQualityActive(0 != this._quality, this._quality);
};
e.prototype.setQuality = function (t, e) {
  if (void 0 === e) {
    e = !0;
  }
  this._quality = t;
  if (e) {
    this.resetQuality();
  }
};
e.prototype.setState = function (t) {
  this.nView.active = t !== a.LOCK;
  this.nLock.active = t === a.WAIT_UNLOCK;
};
e.prototype.setValid = function (t) {
  this._bIsValid = t;
};
Object.defineProperty(e.prototype, 'isShow', {
  get: function () {
    return this.nView.active;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'bIsValid', {
  get: function () {
    return this._bIsValid;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nView = null;
  e.nLock = null;
  e.nQuality = null;
  e._bIsValid = !0;
  e._quality = 0;
  return e;
}
export default u;;
