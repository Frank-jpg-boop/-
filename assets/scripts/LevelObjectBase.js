import $unitBase from './UnitBase';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l =
  (s.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.isCollisionByPlayer = function (t, e) {
      return this.checkPlayerCollision(t, e);
    };
    e.prototype.playerCollisionEnter = function (t) {
      this.onPlayerCollisionEnter(t);
    };
    e.prototype.playerCollisionStay = function (t, e) {
      this.onPlayerCollisionStay(t, e);
    };
    e.prototype.playerCollisionExit = function (t) {
      this.onPlayerCollisionExit(t);
    };
    e.prototype.checkPlayerCollision = function () {
      return !1;
    };
    e.prototype.onPlayerCollisionEnter = function () {};
    e.prototype.onPlayerCollisionStay = function () {};
    e.prototype.onPlayerCollisionExit = function () {};
  })($unitBase.default));
exports.default = l;
