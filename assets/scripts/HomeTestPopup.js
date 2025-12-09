import $cfg from './Cfg';
import $itemEnum from './ItemEnum';
import $eventManager from './EventManager';
import $popupBase from './PopupBase';
import $util from './Util';
import $dataMgr from './DataMgr';
import $globalPopupMgr from './GlobalPopupMgr';
import $itemDataProxy from './ItemDataProxy';
import $playerDataProxy from './PlayerDataProxy';
import $stageDataProxy from './StageDataProxy';
let i;
const y = cc._decorator;
const _ = y.ccclass;
const g = y.property;
e.prototype.onClickBtnAddChip = function () {
  $cfg.default.instance.dataItem
    .queryAll(function (t) {
      return 2 == t.type;
    })
    .forEach(function (t) {
      $itemDataProxy.itemDataProxy.updateItemValue(t.id, 200);
    });
};
e.prototype.onClickBtnAddSur = function () {
  $itemDataProxy.itemDataProxy.updateItemValue(
    $itemEnum.E_ItemId.SURVIVOR,
    5,
  );
};
e.prototype.onClickBtnAddDiamond = function () {
  $itemDataProxy.itemDataProxy.updateItemValue(
    $itemEnum.E_ItemId.DIAMOND,
    1e4,
  );
};
e.prototype.onClickBtnAddGold = function () {
  $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.GOLD, 1e5);
};
e.prototype.onClickBtnPassNext = function () {
  $stageDataProxy.stageDataProxy.gmPassStage(
    $stageDataProxy.stageDataProxy.passStageId + 1,
  );
  const t = Math.min(
    $stageDataProxy.stageDataProxy.passStageId + 1,
    $stageDataProxy.stageDataProxy.maxStageId,
  );
  $globalPopupMgr.default.instance.showTips(
    "当前关卡: 第" +
      $util.default.numToString(t) +
      "章:" +
      $cfg.default.instance.dataStage.getById(t).name,
  );
  $eventManager.EventManager.instance.emit(
    $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
  );
};
e.prototype.onBtnClear = function () {
  $dataMgr.DataMgr.instance.resetData();
};
e.prototype.onBtnStage = function () {
  const t = this.mStageEditBox.string;
  if ("" == t || isNaN(Number(t) - 1)) {
    $globalPopupMgr.default.instance.showTips("请输入要通过的章节");
  } else {
    $stageDataProxy.stageDataProxy.gmPassStage(Number(t) - 1);
    const e = Math.min(
      $stageDataProxy.stageDataProxy.passStageId + 1,
      $stageDataProxy.stageDataProxy.maxStageId,
    );
    $globalPopupMgr.default.instance.showTips(
      "当前关卡: 第" +
        $util.default.numToString(e) +
        "章:" +
        $cfg.default.instance.dataStage.getById(e).name,
    );
    $eventManager.EventManager.instance.emit(
      $playerDataProxy.EPlayDataEvent.GM_PASS_STAGE,
    );
    this.removeUI();
  }
};
e.prototype.onBtnItem = function () {
  const t = this.mItemEditBox.string.split("_").map(Number);
  if (t[0] && t[1]) {
    $itemDataProxy.itemDataProxy.updateItemValue(t[0], t[1]);
    $globalPopupMgr.default.instance.showTips("添加成功!");
  } else {
    $globalPopupMgr.default.instance.showTips("参数错误！");
  }
};
e.prototype.init = function () {
  this.mItemEditBox.node.active = yzll.gameConfig.isGameTest;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mStageEditBox = null;
  e.mItemEditBox = null;
  e.nButtonNode = null;
  return e;
}
exports.default = v;
