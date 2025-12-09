import $cfg from './Cfg';
import $taskEnum from './TaskEnum';
import $proxyBase from './ProxyBase';
import $proxyDataBase from './ProxyDataBase';
import $eventManager from './EventManager';
import $redPointMgr from './RedPointMgr';
import $redPointPathConfig from './RedPointPathConfig';
import $playerActionMgr from './PlayerActionMgr';
import $itemDataProxy from './ItemDataProxy';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
import $stageDataProxy from './StageDataProxy';
let i;
exports.taskDataProxy =
  exports.TaskDataProxy =
  exports.TaskData =
  exports.ETaskEvent =
    void 0;
let r;
!(function (t) {
  t.UPDATE_MAIN_TASK = "UPDATE_MAIN_TASK";
})((r = exports.ETaskEvent || (exports.ETaskEvent = {})));
e.prototype.createInitData = function () {
  return {
    mainTaskData: {
      curTaskId: 1,
      curTaskCount: 0,
      curTaskMaxCount: 1,
      curTaskParam: null,
    },
  };
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const g = e;
exports.TaskData = g;
e.prototype.updateRedPoint = function () {
  const t = !1;
  if (
    this._data.localData.mainTaskData &&
    this._data.localData.mainTaskData.curTaskCount >=
      this._data.localData.mainTaskData.curTaskMaxCount
  ) {
    t = !0;
  }
  $redPointMgr.default.instance.setRedPointNum(
    $redPointPathConfig.ERedPointPathName.GAME_BATTLE_TASK,
    t ? 1 : 0,
  );
};
e.prototype.getMainTaskReward = function (t) {
  if (!this.isCompleteMainTask) {
    const e = $cfg.default.instance.dataTask.getById(
      this.curMainTaskData.curTaskId,
    );
    const n = e.reward.split("_").map(Number);
    const i = [
      {
        itemId: n[0],
        itemNum: n[1],
      },
    ];
    $itemDataProxy.itemDataProxy.addItems(i);
    const o = e.id + 1;
    if ($cfg.default.instance.dataTask.getById(o)) {
      this._data.localData.mainTaskData.curTaskId = o;
      this.initMainTaskCount();
    } else {
      this._data.localData.mainTaskData = null;
    }
    this.updateRedPoint();
    $localDataProxy.localDataProxy.saveData();
    if (t) {
      t(i);
    }
    $eventManager.EventManager.instance.emit(r.UPDATE_MAIN_TASK);
  }
};
e.prototype.onDailyTaskActionUpdate = function (t) {
  for (const e = [], n = 1; n < arguments.length; n++) {
    e[n - 1] = arguments[n];
  }
  if (!this.isCompleteMainTask) {
    const i = $cfg.default.instance.dataTask.getById(
      this.curMainTaskData.curTaskId,
    );
    if (t == i.condition) {
      switch (t) {
        case $taskEnum.EPlayerActionType.WEAPON_UP:
          const o = i.parm.split("|").map(Number), c = o[0];
          o[1];
          this._data.localData.mainTaskData.curTaskCount =
            $playerDataProxy.playerDataProxy.getArtifactLv(c);
          break;
        case $taskEnum.EPlayerActionType.BUILD_UP_LV:
          const l = i.parm.split("|").map(Number), p = l[0];
          l[1];
          this._data.localData.mainTaskData.curTaskCount =
            $playerDataProxy.playerDataProxy.getBuildLv(p);
          break;
        case $taskEnum.EPlayerActionType.BUILD_UP_STAR:
          const h = i.parm.split("|").map(Number);
          p = h[0];
          h[1];
          this._data.localData.mainTaskData.curTaskCount =
            $playerDataProxy.playerDataProxy.getBuildPeopleNum(p);
          break;
        case $taskEnum.EPlayerActionType.ARRIVE_LEVEL:
          this._data.localData.mainTaskData.curTaskCount =
            $stageDataProxy.stageDataProxy.passStageId + 1 >= Number(i.parm)
              ? 1
              : 0;
          this._data.localData.mainTaskData.curTaskMaxCount = 1;
          break;
        default:
          this._data.localData.mainTaskData.curTaskCount++;
      }
      this.updateRedPoint();
      $eventManager.EventManager.instance.emit(r.UPDATE_MAIN_TASK);
      $localDataProxy.localDataProxy.saveData();
    }
  }
};
e.prototype.initMainTaskCount = function () {
  if (this._data.localData.mainTaskData) {
    const t = $cfg.default.instance.dataTask.getById(
      this._data.localData.mainTaskData.curTaskId,
    );
    switch (t.condition) {
      case $taskEnum.EPlayerActionType.WEAPON_UP:
        const e = t.parm.split("|").map(Number), n = e[0], i = e[1];
        this._data.localData.mainTaskData.curTaskCount =
          $playerDataProxy.playerDataProxy.getArtifactLv(n);
        this._data.localData.mainTaskData.curTaskMaxCount = i;
        break;
      case $taskEnum.EPlayerActionType.BUILD_UP_LV:
        const o = t.parm.split("|").map(Number), r = o[0];
        i = o[1];
        this._data.localData.mainTaskData.curTaskCount =
          $playerDataProxy.playerDataProxy.getBuildLv(r);
        this._data.localData.mainTaskData.curTaskMaxCount = i;
        break;
      case $taskEnum.EPlayerActionType.BUILD_UP_STAR:
        const c = t.parm.split("|").map(Number), l = ((r = c[0]), c[1]);
        this._data.localData.mainTaskData.curTaskCount =
          $playerDataProxy.playerDataProxy.getBuildPeopleNum(r);
        this._data.localData.mainTaskData.curTaskMaxCount = l;
        break;
      case $taskEnum.EPlayerActionType.ARRIVE_LEVEL:
        this._data.localData.mainTaskData.curTaskCount =
          $stageDataProxy.stageDataProxy.passStageId + 1 >= Number(t.parm)
            ? 1
            : 0;
        this._data.localData.mainTaskData.curTaskMaxCount = 1;
        break;
      default:
        this._data.localData.mainTaskData.curTaskCount = 0;
        this._data.localData.mainTaskData.curTaskMaxCount = Number(t.parm);
    }
  }
};
e.prototype.initData = function () {
  this.updateRedPoint();
  $playerActionMgr.PlayerActionMgr.instance.registerEvent(
    $taskEnum.ETaskType.MAIN_LINE,
    this.onDailyTaskActionUpdate,
    this,
  );
};
Object.defineProperty(e.prototype, "isCompleteMainTask", {
  get: function () {
    return null == this._data.localData.mainTaskData;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "curMainTaskData", {
  get: function () {
    return this._data.localData.mainTaskData;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const v = e;
exports.TaskDataProxy = v;
exports.taskDataProxy = new v(g);
