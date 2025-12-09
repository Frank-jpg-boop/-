import $componentBase from './ComponentBase';
let i;
export const CustomToggle = void 0;
(function () {
  if (cc.Toggle) {
    const t = cc.Toggle.prototype._updateCheckMark;
    cc.Toggle.prototype._updateCheckMark = function () {
      let e;
      t.call(this);
      const n = null;
      if (null === (e = this.node) || void 0 === e) {
        n = void 0;
      } else {
        n = e.getComponent('CustomToggle');
      }
      if (n) {
        n.updateCheckMark(this);
      }
    };
  }
})();
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
const u = s.menu;
const p = s.requireComponent;
e.prototype.updateCheckMark = function (t) {
  if (this.unCheckMark) {
    this.unCheckMark.active = !t.isChecked;
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.unCheckMark = null;
  return e;
}
export const CustomToggle = h;
