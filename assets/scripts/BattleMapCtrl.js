let i;
const a = cc._decorator;
const s = a.ccclass;
const c =
  (a.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._spBg = null;
      return e;
    }
    e.prototype.onLoad = function () {
      this._spBg = this.node.getChildByName('Bg').getComponent(cc.Sprite);
    };
    e.prototype.init = function () {};
    e.prototype.update = function (t) {
      this.updateMove(t);
    };
    e.prototype.updateMove = function () {};
  })(cc.Component));
export default c;
