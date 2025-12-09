import $cfg from './Cfg';
import $flyItemAnimCtrl from './FlyItemAnimCtrl';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $nodeUtil from './NodeUtil';
import $itemDataProxy from './ItemDataProxy';
import $taskDataProxy from './TaskDataProxy';
import $homeEnum from './HomeEnum';
let i;
const m = cc._decorator;
const y = m.ccclass;
const _ = m.property;
e.prototype.onClickBtnThis = function () {
  const t = this;
  const e = $taskDataProxy.taskDataProxy.curMainTaskData;
  if (e.curTaskCount >= e.curTaskMaxCount) {
    $taskDataProxy.taskDataProxy.getMainTaskReward(function (e) {
      e.forEach(function (e) {
        const n = Math.floor(Number(e.itemNum));
        n = Math.min(n, 20);
        const i = {
          itemId: e.itemId,
          itemNum: n,
          layerType: 1,
          isTop: !0,
          startWorldPos: $nodeUtil.default.nodeWorldPos(t.nReward.getChildByName('Icon')),
          onComplete: null,
        };
        $eventManager.EventManager.instance.emit(
          $flyItemAnimCtrl.EFlyItemAnimEvent.FLY_ITEM_ANIM,
          i,
        );
      });
    });
  } else {
    const n = $cfg.default.instance.dataTask.getById(e.curTaskId);
    if (1 == n.goto) {
      $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 2);
    } else {
      if (2 == n.goto) {
        $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 3);
      } else {
        if (3 == n.goto) {
          $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 1);
        } else {
          4 == n.goto &&
            $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 0);
        }
      }
    }
  }
};
e.prototype.updateView = function () {
  if ($taskDataProxy.taskDataProxy.isCompleteMainTask) {
    this.nView.active = !1;
  } else {
    this.nView.active = !0;
    const t = $taskDataProxy.taskDataProxy.curMainTaskData;
    const e = $cfg.default.instance.dataTask.getById(t.curTaskId);
    const n = t.curTaskCount;
    const i = t.curTaskMaxCount;
    const o =
      '<b><outline  color = black width = 2>' +
      e.des +
      '\n(<color = ' +
      (n >= i ? '#00ff00' : '#ff0000') +
      '>' +
      Math.min(n, i) +
      '</c>/' +
      i +
      ')</outline></b>';
    this.lDesc.string = o;
    this.nComplete.active = n >= i;
    const r = e.reward.split('_').map(Number);
    const s = r[0];
    const c = r[1];
    this.nReward.getChildByName('Num').getComponent(cc.Label).string = c.toString();
    $resLoader.ResLoader.setSpritFrame(
      this.nReward.getChildByName('Icon').getComponent(cc.Sprite),
      $frameEnum.Frame.EBundleName.RES,
      $itemDataProxy.itemDataProxy.getItemIconPath(s),
    );
  }
};
e.prototype.onEnable = function () {
  if (this.nView.active) {
    this.nView.x = -160;
    cc.tween(this.nView)
      .to(
        0.3,
        {
          x: 145,
        },
        {
          easing: 'sineIn',
        },
      )
      .start();
  }
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $taskDataProxy.ETaskEvent.UPDATE_MAIN_TASK,
    this.updateView,
    this,
  );
};
e.prototype.start = function () {};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $taskDataProxy.ETaskEvent.UPDATE_MAIN_TASK,
    this.updateView,
    this,
  );
  this.updateView();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lDesc = null;
  e.nComplete = null;
  e.nReward = null;
  e.nView = null;
  return e;
}
export default g;
