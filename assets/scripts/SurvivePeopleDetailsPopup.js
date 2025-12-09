import $popupBase from './PopupBase';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l =
  (s.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    e.prototype.init = function (t) {
      const e = t.surviveData;
      this.node.getChildByName('des').getComponent(cc.Label).string = e.info;
    };
  })($popupBase.PopupBase));
export default l;
