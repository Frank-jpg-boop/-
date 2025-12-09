let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
e.prototype.update = function (t) {
  if (this.time > 0) {
    this.time -= t;
    if (this.time < 0) {
      this.time = 0;
    }
    const e = (2 * Math.abs(this.time - this.median)) / this.duration;
    this.material.setProperty('u_rate', e);
    if (this.spAnim) {
      this.spAnim._updateMaterial();
    }
  }
};
e.prototype.show = function (t) {
  if (void 0 === t) {
    t = this.duration;
  }
  if (0 == this.time) {
    this.duration = t;
    this.time = this.duration;
    this.median = this.duration / 2;
    this.material.setProperty('u_rate', 1);
  }
};
e.prototype.onDisable = function () {
  this.time = 0;
  this.material.setProperty('u_rate', 1);
};
e.prototype.onEnable = function () {
  this.time = 0;
  this.material.setProperty('u_rate', 1);
};
e.prototype.onLoad = function () {
  this.time = 0;
  this.median = this.duration / 2;
  if (this.node.getComponent(cc.Sprite)) {
    this.material = this.node.getComponent(cc.Sprite).getMaterial(0);
  } else {
    this.spAnim = this.node.getComponent(sp.Skeleton);
    this.material = this.spAnim.getMaterial(0);
  }
  this.material.setProperty('u_rate', 1);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.duration = 0;
  e.median = 0;
  e.time = 0;
  e.material = null;
  e.spAnim = null;
  return e;
}
export default l;
