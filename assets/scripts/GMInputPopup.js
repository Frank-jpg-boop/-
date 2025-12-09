import $popupBase from './PopupBase';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
e.prototype.onClickBtnOk = function () {
  const t = this.nInputView.children.map(function (t) {
    return t.getChildByName('EditBox').getComponent(cc.EditBox).string;
  });
  if (this._onClickOk) {
    this._onClickOk(t);
  }
  this.removeUI();
};
e.prototype.onClickBtnClose = function () {
  this.removeUI();
};
e.prototype.init = function (t) {
  this.lTitle.string = t.title;
  for (const e = t.inputDatas.length - this.nInputView.childrenCount; e > 0; ) {
    const n = cc.instantiate(this.nInputView.children[0]);
    this.nInputView.addChild(n);
    e--;
  }
  this.nInputView.children.forEach(function (e, n) {
    e.active = t.inputDatas.length > n;
    if (e.active) {
      const i = t.inputDatas[n];
      e.getChildByName('Title').getComponent(cc.Label).string = i.title;
    }
  });
  this._onClickOk = t.onClickOk;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lTitle = null;
  e.nInputView = null;
  e._onClickOk = null;
  return e;
}
export default u;
