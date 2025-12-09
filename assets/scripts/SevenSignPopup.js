import $popupBase from './PopupBase';
import $adMgr from './AdMgr';
import $signDataProxy from './SignDataProxy';
import $sevenDayItem from './SevenDayItem';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
e.prototype.onClickBtnDoubleSign = function () {
  const t = this;
  $adMgr.AdMgr.instance.showVideoAd({
    id: 1,
    eventId: "AD_SevenSign",
    success: function () {
      $signDataProxy.signDataProxy.getSevenSignRewarad(!0);
      t.updateDayView();
    },
  });
};
e.prototype.onClickBtnSign = function () {
  $signDataProxy.signDataProxy.getSevenSignRewarad(!1);
  this.updateDayView();
};
e.prototype.onClickBtnClose = function () {
  this.removeUI();
};
e.prototype.updateDayView = function (t) {
  if (void 0 === t) {
    t = !1;
  }
  const e = $signDataProxy.signDataProxy.canSevenSign();
  this.nDayView.children.forEach(function (n, i) {
    const o = n.getComponent($sevenDayItem.default);
    if (t) {
      o.initView(i + 1);
    }
    o.updateView(e);
  });
  this.nButton.active = e;
  this.nComplete.active = !e;
  this.nButton.getChildByName("BtnDoubleSign").active =
    2 != $signDataProxy.signDataProxy.curSevenSignDay &&
    6 != $signDataProxy.signDataProxy.curSevenSignDay;
};
e.prototype.init = function () {
  this.updateDayView(!0);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nDayView = null;
  e.nButton = null;
  e.nComplete = null;
  return e;
}
exports.default = f;
