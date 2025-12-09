import $eventManager from './EventManager';
import $popupBase from './PopupBase';
import $util from './Util';
import $adMgr from './AdMgr';
import $globalPopupMgr from './GlobalPopupMgr';
import $reportMgr from './ReportMgr';
import $localDataProxy from './LocalDataProxy';
import $stageDataProxy from './StageDataProxy';
import $battleMgr from './BattleMgr';
import $battleEnum from './BattleEnum';
import $levelBattleData from './LevelBattleData';
import $gameEnum from './GameEnum';
import $electricItem from './ElectricItem';
import $resultBagView from './ResultBagView';
let i;
const b = cc._decorator;
const E = b.ccclass;
const S = b.property;
e.prototype.getCurResurgenceType = function () {
  for (const t = $levelBattleData.levelBattleData.data.resurgenceCount, e = []; ; ) {
    if (1 == $levelBattleData.levelBattleData.cfgStage.id) {
      e = [0, 1, 1];
      break;
    }
    const n = $localDataProxy.localDataProxy.getPlayGameDay() + 1;
    if (1 == n) {
      e = [2, 1, 1];
      break;
    }
    if (n >= 2 && n <= 7) {
      e = [1, 1, 1];
      break;
    }
    e = [1, 1, 1];
    break;
  }
  return e[t];
};
e.prototype.onClickBtnResurgence = function () {
  const t = this;
  if (!this._isLockClick) {
    this._isLockClick = !0;
    if ($battleMgr.default.instance.gm_InfiniteResurrection) {
      this.resurgence(!0);
    } else {
      switch (this.getCurResurgenceType()) {
        case 0:
          this.resurgence();
          break;
        case 1:
          $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: 'AD_Rebirth',
            eventData: {
              userA: '' + $levelBattleData.levelBattleData.cfgStage.id,
            },
            success: function () {
              t.resurgence();
            },
            fail: function () {
              t._isLockClick = !1;
            },
            error: function (e) {
              cc.log(e);
              t._isLockClick = !1;
            },
          });
          break;
        case 2:
          mm.platform.shareAppMessage({
            success: function () {
              t.resurgence();
            },
            fail: function () {
              t._isLockClick = !1;
            },
          });
      }
      $util.default.delay(
        1,
        function () {
          t._isLockClick = !1;
        },
        this,
      );
    }
  }
};
e.prototype.onClickBtnBack = function () {
  const t = $localDataProxy.localDataProxy.getDailyRefreshValue(
    $gameEnum.Game.EDailyRefreshDataKey.LOSE_ADD_HEIGHT_RATE,
  );
  $localDataProxy.localDataProxy.setDailyRefreshValue(
    $gameEnum.Game.EDailyRefreshDataKey.LOSE_ADD_HEIGHT_RATE,
    t + $levelBattleData.levelBattleData.cfgStage.getLose,
  );
  $reportMgr.ReportMgr.instance.reportEvent('BA_StageLose', {
    userA: '' + $levelBattleData.levelBattleData.cfgStage.id,
  });
  return $levelBattleData.levelBattleData.electric >=
    $levelBattleData.levelBattleData.electricPowerCount
    ? (this.removeUI(),
      $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.REVIVE_PLAYER, !0),
      void $battleMgr.default.instance.getCurScene().scheduleWin())
    : (($stageDataProxy.stageDataProxy.isBackBattleFail = !0),
      $stageDataProxy.stageDataProxy.checkOver()
        ? (this.removeUI(), void $globalPopupMgr.default.instance.showLevelOver())
        : void $battleMgr.default.instance.exitLevelScene());
};
e.prototype.resurgence = function (t) {
  let e;
  if (void 0 === t) {
    t = !1;
  }
  if (t) {
    //
  } else {
    $levelBattleData.levelBattleData.data.resurgenceCount++;
  }
  this.removeUI();
  if (this._battlePlayState) {
    if (null === (e = $battleMgr.default.instance.getCurScene()) || void 0 === e) {
      //
    } else {
      e.resume();
    }
  }
  $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.REVIVE_PLAYER);
};
e.prototype.onShow = function () {
  this.resultBagView.init($levelBattleData.levelBattleData.bagData.bagEquipDatas, !1);
};
e.prototype.init = function (t) {
  this.electric.init(!0);
  this._isLockClick = !1;
  this._battlePlayState = t.battlePlayState;
  $battleMgr.default.instance.getCurScene().pause();
  this.nBtnResurgence.active =
    $levelBattleData.levelBattleData.data.resurgenceCount <
    $levelBattleData.levelBattleData.maxResurgenceCount;
  if (this.nBtnResurgence.active) {
    const e = this.nBtnResurgence.getChildByName('Layout').getChildByName('Share');
    const n = this.nBtnResurgence.getChildByName('Layout').getChildByName('Ad');
    const i = this.getCurResurgenceType();
    e.active = 2 == i;
    n.active = 1 == i;
    this.nBtnResurgence
      .getChildByName('Layout')
      .getChildByName('Count')
      .getComponent(cc.Label).string =
      '(' +
      ($levelBattleData.levelBattleData.maxResurgenceCount -
        $levelBattleData.levelBattleData.data.resurgenceCount) +
      '/' +
      $levelBattleData.levelBattleData.maxResurgenceCount +
      ')';
  }
  const o =
    $levelBattleData.levelBattleData.electric >=
    $levelBattleData.levelBattleData.electricPowerCount;
  this.nTips.active = !1;
  if (o) {
    this.nBtnBack.getChildByName('Desc').getComponent(cc.Label).string = '紧急撤离';
  } else {
    this.nBtnBack.getChildByName('Desc').getComponent(cc.Label).string = '放弃';
  }
  if (o) {
    this.nBtnBack.getChildByName('Tips').getComponent(cc.Label).string = '电池已足够';
  } else {
    this.nBtnBack.getChildByName('Tips').getComponent(cc.Label).string = '电池不足以紧急撤离';
  }
  $stageDataProxy.stageDataProxy.updateExploreValue(
    $levelBattleData.levelBattleData.cfgStage.id,
    $levelBattleData.levelBattleData.data.exploreValue,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.resultBagView = null;
  e.nBtnResurgence = null;
  e.electric = null;
  e.nBtnBack = null;
  e.nTips = null;
  e._battlePlayState = !1;
  e._isLockClick = !1;
  return e;
}
export default P;
