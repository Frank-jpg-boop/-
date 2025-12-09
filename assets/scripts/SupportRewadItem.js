import $cfg from './Cfg';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $timeUtil from './TimeUtil';
import $frameEnum from './FrameEnum';
import $commonRedPoint from './CommonRedPoint';
import $adMgr from './AdMgr';
import $globalPopupMgr from './GlobalPopupMgr';
import $itemDataProxy from './ItemDataProxy';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
let i;
const _ = cc._decorator;
const g = _.ccclass;
const v = _.property;
e.prototype.onClickBtnRole = function () {
  $globalPopupMgr.default.instance.showTips('累积在线时长可领取奖励');
};
e.prototype.onClickBtnGet = function () {
  if ($playerDataProxy.playerDataProxy.canGetOnlineReward()) {
    $playerDataProxy.playerDataProxy.getOnlineReward(!1);
  } else {
    $globalPopupMgr.default.instance.showTips('累积在线时长可领取奖励');
  }
};
e.prototype.onClickBtnAd = function () {
  const t = $cfg.default.instance.dataMerchant.getById(
    $playerDataProxy.playerDataProxy.onlineRewardId + 1,
  );
  if (t) {
    if (6 != t.id) {
      $adMgr.AdMgr.instance.showVideoAd({
        id: 1,
        eventId: 'AD_OnlineReward',
        success: function () {
          $playerDataProxy.playerDataProxy.getOnlineReward(!0);
        },
      });
    } else {
      mm.platform.shareAppMessage({
        success: function () {
          $playerDataProxy.playerDataProxy.getOnlineReward(!0);
        },
      });
    }
  }
};
e.prototype.update = function () {
  if (this.lTime.node.active && this._time > 0) {
    const t = this._time - $playerDataProxy.playerDataProxy.onlineTime;
    if (t <= 0) {
      this.updateView();
      this.lTime.string = '00:00';
    } else {
      this.lTime.string = $timeUtil.TimeUtil.format_HHMMSS(1e3 * t);
    }
  }
};
e.prototype.updateView = function () {
  const t = $cfg.default.instance.dataMerchant.getById(
    $playerDataProxy.playerDataProxy.onlineRewardId + 1,
  );
  this.node.active = null != t;
  if (t) {
    this._time = 60 * t.time;
    const e = t.reward.split('_').map(Number);
    const n = e[0];
    const i = e[1];
    $resLoader.ResLoader.setSpritFrame(
      this.spIcon,
      $itemDataProxy.itemDataProxy.getItemIconBundleName(n),
      $itemDataProxy.itemDataProxy.getItemIconPath(n),
    );
    $resLoader.ResLoader.setSpritFrame(
      this.spQuality,
      $frameEnum.Frame.EBundleName.RES,
      'textures/atlas/quality/pic_wuping_di_' + $cfg.default.instance.dataItem.getById(n).rare,
    );
    this.lNum.string = 'x' + i;
    if ($playerDataProxy.playerDataProxy.canGetOnlineReward()) {
      this.lTime.node.active = !1;
      this.nAd.active = !1;
      this.lDesc.string = '点击领取';
      this.redPoint.setRedPointState(!0);
    } else {
      this.lTime.node.active = !0;
      this.nAd.active = 1 == t.adGet;
      if (this.nAd.active) {
        const o = 6 == t.id;
        this.nAd.getChildByName('Layout').getChildByName('Ad').active = !o;
        this.nAd.getChildByName('Layout').getChildByName('Share').active = o;
      }
      this.lDesc.string = '后可领取';
      this.redPoint.setRedPointState(!1);
    }
  }
};
e.prototype.onEnable = function () {
  $localDataProxy.localDataProxy.saveData();
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $playerDataProxy.EPlayDataEvent.UPDATE_ONLINE_REWARD,
    this.updateView,
    this,
  );
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $playerDataProxy.EPlayDataEvent.UPDATE_ONLINE_REWARD,
    this.updateView,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lNum = null;
  e.spIcon = null;
  e.lTime = null;
  e.lDesc = null;
  e.nAd = null;
  e.redPoint = null;
  e.spQuality = null;
  e._time = 0;
  return e;
}
export default b;
