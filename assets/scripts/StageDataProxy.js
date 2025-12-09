import $cfg from './Cfg';
import $itemEnum from './ItemEnum';
import $taskEnum from './TaskEnum';
import $proxyBase from './ProxyBase';
import $proxyDataBase from './ProxyDataBase';
import $randomUtil from './RandomUtil';
import $levelBattleData from './LevelBattleData';
import $gameEnum from './GameEnum';
import $playerActionMgr from './PlayerActionMgr';
import $userCenterMgr from './UserCenterMgr';
import $itemDataProxy from './ItemDataProxy';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
let i;
exports.stageDataProxy = exports.StageDataProxy = exports.StageData = void 0;
e.prototype.createInitData = function () {
  return {
    stageInfos: {},
    passStageId: 0,
    day: 365,
  };
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const g = e;
exports.StageData = g;
e.prototype.gmPassStage = function (t) {
  if (!(t <= this.passStageId)) {
    t = Math.min(t, this.maxStageId);
    if ($cfg.default.instance.dataStage.getById(t)) {
      for (
        const e = function (t) {
                  const e = $cfg.default.instance.dataStage.getById(t);
                  const i = e.survivor.split("|").map(function (t) {
                    return (Number(t) + e.checkSur).toString();
                  });
                  const o = [];
                  const s = $cfg.default.instance.dataStage.getById(t + 1);
                  if (s) {
                    const c = s.need;
                    for (
                      $itemDataProxy.itemDataProxy.updateItemValue(
                        $itemEnum.E_ItemId.SURVIVOR,
                        c,
                        !1,
                      );
                      c > 0;
                    ) {
                      const l = $randomUtil.RandomUtil.randomInt(0, i.length);
                      o.push(i[l]);
                      i.splice(l, 1);
                      c--;
                    }
                  }
                  n._data.localData.stageInfos[t].survivalKeys = o;
                },
              n = this,
              i = this.passStageId + 1;
        i <= t;
        ++i
      ) {
        e(i);
      }
    }
    this._data.localData.passStageId = t;
    $playerActionMgr.PlayerActionMgr.instance.triggerAction(
      $taskEnum.EPlayerActionType.ARRIVE_LEVEL,
    );
    this.selectedStageId = Math.min(this.passStageId + 1, this.maxStageId);
    $playerDataProxy.playerDataProxy.updateShopRedPoint();
    $localDataProxy.localDataProxy.saveData();
  }
};
e.prototype.isRescueSurvival = function (t, e) {
  return this._data.localData.stageInfos[t].survivalKeys.includes(
    e.toString(),
  );
};
e.prototype.resetGame = function () {
  this._data.resetData();
  $localDataProxy.localDataProxy.saveData();
};
e.prototype.checkOver = function () {
  return this._data.localData.day <= 0;
};
e.prototype.getStageInfo = function (t) {
  return this._data.localData.stageInfos[t];
};
e.prototype.updateExploreValue = function (t, e, n) {
  if (void 0 === n) {
    n = !0;
  }
  if (
    !this._data.localData.stageInfos[t].exploreValue ||
    e > this._data.localData.stageInfos[t].exploreValue
  ) {
    this._data.localData.stageInfos[t].exploreValue = e;
  }
  $playerDataProxy.playerDataProxy.updateSurviveRewardRedPoint();
  $playerDataProxy.playerDataProxy.updateStageExploreRedPoint();
  if (n) {
    $localDataProxy.localDataProxy.saveData();
  }
};
e.prototype.getUnlockSkillId = function () {
  const t = this;
  const e = $cfg.default.instance.dataSkill.queryOne(function (e) {
    return 0 == e.isInfo && e.unlockVal == t.passStageId;
  });
  if (e) {
    return e.id;
  } else {
    return 0;
  }
};
e.prototype.passStage = function (t, e, n) {
  if (n) {
    this.updatePassStageId();
    if (this.startPassStageId != this.passStageId) {
      ((this.selectedStageId = Math.min(
        this.passStageId + 1,
        this.maxStageId,
      )),
        (this.isUnlockNewStage = !0),
        (this.unlockSkillId = this.getUnlockSkillId()));
    } else {
      if (t == this.passStageId + 1) {
        if (this.getStageSurvivalCount(t) == this.startStagePeople) {
          this.selectedStageId = Math.min(
            this.passStageId + 1,
            this.maxStageId,
          );
        } else {
          this.selectedStageId = Math.min(
            this.passStageId + 2,
            this.maxStageId,
          );
        }
      } else {
        this.selectedStageId = Math.min(
          this.passStageId + 1,
          this.maxStageId,
        );
      }
    }
  }
  this.updateExploreValue(t, e, !1);
  const i = $localDataProxy.localDataProxy.getDailyRefreshValue(
    $gameEnum.Game.EDailyRefreshDataKey.WIN_SUB_HEIGHT_RATE,
  );
  $localDataProxy.localDataProxy.setDailyRefreshValue(
    $gameEnum.Game.EDailyRefreshDataKey.WIN_SUB_HEIGHT_RATE,
    i + $levelBattleData.levelBattleData.cfgStage.getWin,
  );
  $localDataProxy.localDataProxy.saveData();
};
e.prototype.updatePassStageId = function () {
  const t = this._data.localData.passStageId + 1;
  const e = t + 1;
  if (!(e > this.maxStageId)) {
    const n = $cfg.default.instance.dataStage.getById(e);
    if (
      n &&
      this._data.localData.stageInfos[t].survivalKeys.length >= n.need
    ) {
      this._data.localData.passStageId = t;
      $playerActionMgr.PlayerActionMgr.instance.triggerAction(
        $taskEnum.EPlayerActionType.ARRIVE_LEVEL,
      );
      const i = $cfg.default.instance.dataCons.getById(15).val;
      if (Number(i) - 1 == t) {
        $playerDataProxy.playerDataProxy.skinRed = !0;
        $playerDataProxy.playerDataProxy.updateSkinRedPoint();
      }
      $playerDataProxy.playerDataProxy.updateShopRedPoint();
    }
  }
};
e.prototype.getStageSurvivalCount = function (t) {
  return this._data.localData.stageInfos[t].survivalKeys.length;
};
e.prototype.enterStage = function (t) {
  if (0 == t) {
    this._data.localData.stageInfos[t].survivalKeys = [];
    $itemDataProxy.itemDataProxy.setItemValue($itemEnum.E_ItemId.SURVIVOR, 0);
    this._data.localData.day = 365;
  }
  this._data.localData.day--;
  $localDataProxy.localDataProxy.saveData();
};
e.prototype.initData = function () {
  const t = this;
  if (
    2 != $userCenterMgr.UserCenterMgr.instance.zbState &&
    3 != $userCenterMgr.UserCenterMgr.instance.zbState
  ) {
    //
  } else {
    this._data.localData.passStageId = this.maxStageId;
  }
  this.selectedStageId = this.passStageId + 1;
  if (this.selectedStageId > this.maxStageId) {
    this.selectedStageId = this.maxStageId;
  }
  $cfg.default.instance.dataStage.sheet().forEach(function (e) {
    if (t._data.localData.stageInfos[e.id]) {
      //
    } else {
      t._data.localData.stageInfos[e.id] = {
        survivalKeys: [],
        boxState: [],
        exploreValue: 0,
      };
    }
  });
};
Object.defineProperty(e.prototype, "maxStageId", {
  get: function () {
    return $cfg.default.instance.dataStage.sheet().length - 1;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "passStageId", {
  get: function () {
    return this._data.localData.passStageId;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "stageData", {
  get: function () {
    return this._data.localData;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "day", {
  get: function () {
    return this._data.localData.day;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.selectedStageId = 1;
  e.startStagePeople = 0;
  e.startPassStageId = 0;
  e.isUnlockNewStage = !1;
  e.unlockSkillId = 0;
  e.isBackBattleFail = !1;
  return e;
}
const v = e;
exports.StageDataProxy = v;
exports.stageDataProxy = new v(g);
