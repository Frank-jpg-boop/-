let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
e.prototype.updateMove = function (t) {
  this.node.x += this.moveSpeed * t;
  if (this.moveSpeed > 0 && this.node.x > this.maxX) {
    this.node.x = this.minX;
  }
  if (this.moveSpeed < 0 && this.node.x < this.minX) {
    this.node.x = this.maxX;
  }
};
e.prototype.update = function (t) {
  this.updateMove(t);
};
e.prototype.updateData = function (t, e) {
  this.minX = t;
  this.maxX = e;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.moveSpeed = -10;
  e.minX = 0;
  e.maxX = 0;
  return e;
}
exports.default = l;
