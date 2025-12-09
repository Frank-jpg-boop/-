let i;
const a = cc._decorator;
const s = a.ccclass;
const c =
  (a.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.setDialogueMsg = function (t) {
      this.node.getChildByName("des").getComponent(cc.Label).string = t;
    };
  })(cc.Component));
exports.default = c;
