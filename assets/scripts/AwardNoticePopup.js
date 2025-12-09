import $cfg from './Cfg';
import $flyItemAnimCtrl from './FlyItemAnimCtrl';
import $eventManager from './EventManager';
import $popupBase from './PopupBase';
import $nodeUtil from './NodeUtil';
import $globalPopupMgr from './GlobalPopupMgr';
import $commonIconItem from './CommonIconItem';
let i;
const m = cc._decorator;
const y = m.ccclass;
const _ = m.property;
e.prototype.onClickBtnClose = function () {
  const t = this;
  this._rewardDatas.forEach(function (e) {
    const n = Math.floor(Number(e.itemNum));
    n = Math.min(n, 20);
    const i = {
      itemId: e.itemId,
      itemNum: n,
      layerType: 1,
      isTop: !0,
      startWorldPos: $nodeUtil.default.nodeWorldPos(t.node),
      onComplete: null,
    };
    $eventManager.EventManager.instance.emit($flyItemAnimCtrl.EFlyItemAnimEvent.FLY_ITEM_ANIM, i);
  });
  const e = [];
  this._rewardDatas.forEach(function (t) {
    if (111 == $cfg.default.instance.dataItem.getById(t.itemId).type) {
      e.push(t.itemId);
    }
  });
  if (e.length > 0) {
    $globalPopupMgr.default.instance.showUnlockRemainsPopup(e);
  }
  this.removeUI();
};
e.prototype.onHide = function () {
  if (this._onClose) {
    this._onClose();
  }
};
e.prototype.updateReward = function (t) {};
e.prototype.onShow = function () {
  this.nBtnClose.active = !1;
  this.updateReward(this._rewardDatas);
};
e.prototype.init = function (t) {
  this._rewardDatas = t.rewards;
  this._onClose = t.onClose;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nRewardView = null;
  e.pCommonItemIcon = null;
  e.nBtnClose = null;
  e._rewardDatas = [];
  e._onClose = null;
  return e;
}
export default g;
