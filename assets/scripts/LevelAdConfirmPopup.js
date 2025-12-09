import $popupBase from './PopupBase';
import $adMgr from './AdMgr';
import $battleMgr from './BattleMgr';
import $levelBattleData from './LevelBattleData';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
e.prototype.onClickBtnCancel = function () {
  if (this._onAdCancel) {
    this._onAdCancel();
  }
  this.removeUI();
};
e.prototype.onClickBtnAd = function () {
  const t = this;
  $adMgr.AdMgr.instance.showVideoAd({
    id: 1,
    eventId: this._adEventId,
    eventData: {
      userA: "" + $levelBattleData.levelBattleData.cfgStage.id,
    },
    success: function () {
      if (t._onAdComplete) {
        t._onAdComplete();
      }
      t.removeUI();
    },
    fail: function () {},
    error: function () {},
  });
};
e.prototype.onHide = function () {
  if (this._battlePlayState) {
    $battleMgr.default.instance.getCurScene().resume();
  }
};
e.prototype.init = function (t) {
  this.lName.string = t.name;
  this.lDesc.string = t.desc;
  this._onAdComplete = t.onAdComplete;
  this._onAdCancel = t.onAdCancel;
  this._adEventId = t.adEventId;
  this._battlePlayState = t.battlePlayState;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lName = null;
  e.lDesc = null;
  e._onAdComplete = null;
  e._onAdCancel = null;
  e._adEventId = "";
  e._battlePlayState = !1;
  return e;
}
exports.default = f;
