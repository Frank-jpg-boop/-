let i;
const a = cc._decorator;
const s = a.ccclass;
const c =
  (a.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.show = function () {
      const t = this;
      this.node.opacity = 0;
      cc.Tween.stopAllByTarget(this.node);
      const e = (Math.floor(1e3 * Math.random()) % 91) - 45;
      this.node.angle = e;
      cc.tween(this.node)
        .to(1, {
          opacity: 255,
        })
        .delay(1)
        .to(1, {
          opacity: 0,
        })
        .call(function () {
          t.node.destroy();
          t.node.removeFromParent();
        })
        .start();
    };
  })(cc.Component));
exports.default = c;
