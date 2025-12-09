import $cfg from './Cfg';
import $globalEnum from './GlobalEnum';
import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $frameEnum from './FrameEnum';
import $appProxy from './AppProxy';
import $util from './Util';
import $globalPopupMgr from './GlobalPopupMgr';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $localDataProxy from './LocalDataProxy';
import $playerDataProxy from './PlayerDataProxy';
import $gameEnum from './GameEnum';
import $enterBossView from './EnterBossView';
import $battleCamera from './BattleCamera';
import $battleMgr from './BattleMgr';
import $bulletBase from './BulletBase';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
import $spAnimCtrl from './SpAnimCtrl';
import $eCopterBoom from './ECopterBoom';
import $effectMgr from './EffectMgr';
import $spAnimEffect from './SpAnimEffect';
import $actorEnum from './ActorEnum';
import $battleEnum from './BattleEnum';
import $enemyRefreshMgr from './EnemyRefreshMgr';
import $levelBase from './LevelBase';
import $actorMgr from './ActorMgr';
import $unitMgr from './UnitMgr';
import $levelBattleData from './LevelBattleData';
import $guideArrow from './GuideArrow';
import $battleSceneBase from './BattleSceneBase';
let i;
const L = cc._decorator;
const j = L.ccclass;
const U = L.property;
e.prototype.lookAtBoss = function (t) {
  const e = this;
  this.pause();
  this.cameraCtrl.lookAtPos(
    t,
    1,
    function () {
      e.cameraCtrl.tweenChangeRatio(1.4, 0.5, function () {
        $eventManager.EventManager.instance.emit($enterBossView.EEnterBossViewEvent.SHOW);
        $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SHOW_BOSS_HP);
        e.level.scheduleOnce(function () {
          e.cameraCtrl.tweenChangeRatio(1.2, 0.2, function () {
            const t = $actorMgr.default.instance.getActor(e.playerId);
            e.cameraCtrl.lookAtPos(
              t.node.convertToWorldSpaceAR(cc.v2(0, 150)),
              1,
              function () {
                e.resume();
                e.cameraCtrl.setLookAtState(!1);
              },
              !0,
            );
          });
        }, 2);
      });
    },
    !1,
  );
};
e.prototype.onGuideChange = function (t) {
  const e = this;
  if (t == $guideDataProxy.EGuideStepId.G_9) {
    const n = this._level.node.convertToWorldSpaceAR(this._level.playerExitPos);
    const i = $actorMgr.default.instance.getActor(this.playerId);
    this.pause();
    if (i) {
      i.lockTouchMove = !0;
      i.clearMove();
    }
    this._cameraCtrl.lookAtPos(
      n,
      2,
      function () {
        const t = null;
        const n = i.node.convertToWorldSpaceAR(cc.v2(0, 150));
        $battleMgr.default.instance.createOtherNode(
          'GuideArrow',
          function (n) {
            t = n;
            n.setPosition(e._level.playerExitPos.add(cc.v2(0, 100)));
            n.getComponent($guideArrow.default).show('抵达此处撤离');
          },
          e.lowEffectParent,
        );
        e.scheduleOnce(function () {
          e._cameraCtrl.lookAtPos(
            n,
            2,
            function () {
              if (t) {
                t.getComponent($guideArrow.default).hide();
              }
              i.lockTouchMove = !1;
              e.resume();
            },
            !0,
          );
        }, 2);
      },
      !1,
    );
  }
};
e.prototype.onActorDeadRemove = function (t) {
  if (t.actorType == $actorEnum.EActorType.BOSS && t.isRealBoss) {
    this.exitBossWave();
  }
};
e.prototype.onEventWaveEnemyFinish = function () {
  this._waveTime = Number($cfg.default.instance.dataCons.getById(152).val);
};
e.prototype.scheduleWin = function () {
  this.pause(!0);
  this.win();
  const t = $actorMgr.default.instance.getActor(this._playerId);
  t.head.hide();
  const e = t.dirX;
  const n = t.node
    .getChildByName('Body')
    .getChildByName('SpAnim')
    .getComponent($spAnimCtrl.default);
  const i = t.node.getPosition().add(cc.v2(100 * e, 50));
  t.exitInvincible();
  $effectMgr.default.instance.createEffect({
    parent: this._lowEffectParent,
    prefabName: 'ETransfer',
    initPos: i,
    effectClass: $spAnimEffect.default,
    onCreated: function (o) {
      t.resume();
      o.node.scaleX = Math.abs(o.node.scaleX) * e;
      o.playDefaultAnim(
        'start',
        1,
        !1,
        function () {
          o.playDefaultAnim('stand', 1, !0);
          n.playAnim('run', 1, !0);
          cc.tween(t.node)
            .to(0.4, {
              x: i.x,
            })
            .call(function () {
              n.playAnim('bide', 1, !0);
            })
            .to(0.1, {
              opacity: 0,
            })
            .call(function () {
              o.playDefaultAnim('over', 1, !1, function () {
                $globalPopupMgr.default.instance.showLevelWin(!1);
              });
            })
            .start();
        },
        !1,
      );
    },
  });
};
e.prototype.rescue = function () {
  const t = this;
  this._isRescue = !0;
  this.pause(!0);
  if (
    0 == $levelBattleData.levelBattleData.cfgStage.id &&
    $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_13
  ) {
    $eventManager.EventManager.instance.emit(
      $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
      $guideDataProxy.EGuideStepId.G_13,
    );
  }
  this.win();
  const e = $actorMgr.default.instance.getActor(this._playerId);
  e.exitInvincible();
  e.changeState($actorEnum.EActorStateType.IDLE);
  const n = e.node.x - 700;
  const i = (e.node.x + 700 - n) / 9;
  this._bulletParent.children.forEach(function (t) {
    const e = t.getComponent($bulletBase.default);
    if (e) {
      e.remove();
    }
  });
  for (
    const o = function (o) {
        const a = n + o * i;
        const s = cc.v2(a, e.node.y + 10);
        $util.default.delay(
          0.2 * o,
          function () {
            $effectMgr.default.instance.createEffect({
              parent: t._effectParent,
              prefabName: 'ECopterBoom',
              initPos: s,
              effectClass: $eCopterBoom.default,
              onCreated: function (n) {
                n.play(function () {
                  if (9 == o) {
                    const n = e.node.getPosition();
                    n.x -= 50;
                    $effectMgr.default.instance.createEffect({
                      parent: t._lowEffectParent,
                      prefabName: 'ECopter',
                      initPos: n,
                      effectClass: $spAnimEffect.default,
                      onCreated: function (t) {
                        t.node.zIndex = cc.macro.MIN_ZINDEX;
                        $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_Helicopter');
                        t.playDefaultAnim(
                          'touch down',
                          1,
                          !1,
                          function () {
                            $globalPopupMgr.default.instance.showLevelWin(!0);
                          },
                          !1,
                        );
                      },
                    });
                  }
                });
              },
            });
          },
          r,
        );
      },
      r = this,
      a = 0;
    a < 10;
    a++
  ) {
    o(a);
  }
};
e.prototype.waitRescue = function () {
  this._isWaitRescue = !0;
  $eventManager.EventManager.instance.emit(
    $appProxy.AppEvent.BGM_CHANGED,
    $globalEnum.Global.EBgmType.GAME_RESCUE,
  );
  $enemyRefreshMgr.EnemyRefreshMgr.instance.enterWaitRescueRefreshData();
  this._rescueWaitTime = this._cfg.endTime;
  $eventManager.EventManager.instance.emit(
    $battleEnum.EBattleEvent.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM,
  );
};
e.prototype.exitBossWave = function () {
  this._isTriggerBoss = !1;
  $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM);
};
e.prototype.triggerBoss = function () {
  if (0 != $levelBattleData.levelBattleData.data.stageBossCfg.id) {
    this._isTriggerBoss = !0;
    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.TRIGGER_BOSS_INFORM);
  }
};
e.prototype.createBoss = function () {
  const t = $levelBattleData.levelBattleData.data.stageBossCfg;
  if (0 != t.id) {
    $enemyRefreshMgr.EnemyRefreshMgr.instance.createBoss(t.id, t.lv);
  }
};
e.prototype.gmEnterBossWave = function () {
  $levelBattleData.levelBattleData.gm_enterWave(10);
  const t = $levelBattleData.levelBattleData.curWaveInfo;
  const e = $cfg.default.instance.dataWave.getById(t.waveId);
  this._waveTimer = e.totalTime;
  this._waveTime = this._waveTimer;
  $enemyRefreshMgr.EnemyRefreshMgr.instance.updateWaveRefreshData(t.waveId, t.enemyLv);
  $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI, !1);
  this.resume();
  if (1 != e.spe || this._isTriggerBoss) {
    //
  } else {
    this.triggerBoss();
  }
};
e.prototype.enterNextWave = function () {
  $levelBattleData.levelBattleData.enterNextWave();
  const t = $levelBattleData.levelBattleData.curWaveInfo;
  if (0 != t.waveId) {
    const e = $cfg.default.instance.dataWave.getById(t.waveId);
    this._waveTimer = e.totalTime;
    this._waveTime = this._waveTimer;
    $enemyRefreshMgr.EnemyRefreshMgr.instance.updateWaveRefreshData(t.waveId, t.enemyLv);
    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI, !1);
    const n = $levelBattleData.levelBattleData.data.stageBossCfg;
    if (1 != e.spe || this._isTriggerBoss || 621 == n.id) {
      //
    } else {
      this.triggerBoss();
    }
  }
};
e.prototype.onClear = function () {
  t.prototype.onClear.call(this);
  $unitMgr.UnitMgr.instance.clear();
};
e.prototype.onUpdate = function (e) {
  t.prototype.onUpdate.call(this, e);
  if (this._gameReadyTime > 0) {
    this._gameReadyTime -= e;
    return void (this._gameReadyTime < 0 && (this._gameReadyTime = 0));
  }
  if (this._isWaitRescue && !this._isRescue) {
    this._rescueWaitTime -= e;
    if (this._rescueWaitTime <= 0) {
      this.rescue();
    }
  }
  if (this._isWaitRescue || 0 == this._cfg.id) {
    //
  } else {
    this._waveTime -= e;
    if (this._waveTime <= 0) {
      this.enterNextWave();
    }
  }
  $enemyRefreshMgr.EnemyRefreshMgr.instance.update(e);
};
e.prototype.getCreateActorId = function () {
  return this._createActorId++;
};
e.prototype.createPlayer = function () {
  const t = this;
  this._playerId = this.getCreateActorId();
  $actorMgr.default.instance.createActor({
    id: this._playerId,
    cfgId: 1,
    camp: $actorEnum.ETeamType.PLAYER,
    parent: this.actorParent,
    prefabName: 'Player',
    actorClass: $actorMgr.default.instance.getActorClassName(1, $actorEnum.ETeamType.PLAYER),
    initPos: this._level.playerCreatePos,
    initParam: {
      initHpRate: 0 == $levelBattleData.levelBattleData.cfgStage.id ? 0.5 : 1,
    },
    onCreated: function (e) {
      t._cameraCtrl.setFollowTarget(e.node, cc.v2(0, 150));
      $eventManager.EventManager.instance.emit(
        $battleEnum.EBattleEvent.GAEM_START_INFORM,
        function () {
          if (0 != t._cfg.id) {
            $eventManager.EventManager.instance.emit(
              $battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI,
              !0,
            );
          }
          t.resume();
          if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
            $localDataProxy.localDataProxy.setDailyRefreshValue(
              $gameEnum.Game.EDailyRefreshDataKey.SHOW_GENTLE_TIPS,
              1,
            );
            $globalPopupMgr.default.instance.showGentleTipsPopup(function () {
              $globalPopupMgr.default.instance.showTips('【探索一下古宅吧】', 1);
              t.scheduleOnce(function () {
                $globalPopupMgr.default.instance.showTips('【去左边看看】');
              }, 2);
              $eventManager.EventManager.instance.emit(
                $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                $guideDataProxy.EGuideStepId.G_1,
              );
            });
          }
        },
      );
    },
  });
  this._cameraCtrl.initData(
    this._level.node.convertToWorldSpaceAR(this._level.playerCreatePos).add(cc.v2(0, 150)),
  );
};
e.prototype.createLevel = function () {
  const t = $levelBattleData.levelBattleData.cfgStage.pic1;
  if (this.getAsset(t, cc.Prefab)) {
    const e = cc.instantiate(this.getAsset(t, cc.Prefab));
    this.nLevelLayout.addChild(e);
    e.active = !0;
    this._level = e.getComponent($levelBase.default);
    this._bgTopParent = this._level.nBgTop;
    this._actorParent = this._level.nActors;
    this._unitParent = this._level.nUnits;
    this._lowEffectParent = this._level.nBottom;
    this._actorTopParent = this._level.nActorTops;
    this._level.init(this.getAsset(t, cc.JsonAsset));
  }
  this._cameraCtrl = cc.director
    .getScene()
    .getChildByName('Canvas')
    .getComponent($battleCamera.default);
  this._cameraCtrl.setVisibleRegion(this._level.node);
};
e.prototype.onInit = function () {
  this._createActorId = 0;
  this._isWaitRescue = !1;
  this._isRescue = !1;
  if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
    this._gameReadyTime = 0;
  } else {
    this._gameReadyTime = this._cfg.waitFirst;
  }
  $unitMgr.UnitMgr.instance.init();
  $enemyRefreshMgr.EnemyRefreshMgr.instance.init();
  $gridAreaDivisionMgr.default.instance.init(5e3, 5e3);
  this.createLevel();
  this.createPlayer();
  this.createBoss();
  return t.prototype.onInit.call(this);
};
e.prototype.getLoadPrefabResOption = function () {
  const t = [];
  const e = $levelBattleData.levelBattleData.cfgStage.pic1;
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'prefabs/room/units/Door',
    type: cc.Prefab,
    isPrefabAddNodePool: !0,
  });
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'prefabs/room/units/Ladder',
    type: cc.Prefab,
    isPrefabAddNodePool: !0,
  });
  const n = $cfg.default.instance.dataSkin.getById($playerDataProxy.playerDataProxy.skinId);
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'spines/player/' + n.skin + '/' + n.skin,
    type: sp.SkeletonData,
    isPrefabAddNodePool: !1,
  });
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'prefabs/level/' + e,
    type: cc.Prefab,
    isPrefabAddNodePool: !1,
  });
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'config/' + e,
    type: cc.JsonAsset,
    isPrefabAddNodePool: !1,
  });
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'prefabs/battle/other/PlayerHead',
    type: cc.Prefab,
    isPrefabAddNodePool: !0,
  });
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'prefabs/room/units/SearchPoint',
    type: cc.Prefab,
    isPrefabAddNodePool: !0,
  });
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'prefabs/battle/other/GuideArrow',
    type: cc.Prefab,
  });
  t.push({
    bundleName: $frameEnum.Frame.EBundleName.GAME,
    path: 'prefabs/battle/effect/EEnemyFlag',
    type: cc.Prefab,
  });
  return t;
};
e.prototype.unregisterEvent = function () {
  t.prototype.unregisterEvent.call(this);
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.WAVE_REFRESH_ENEMY_FINISH,
    this.onEventWaveEnemyFinish,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.TRIGGER_BOSS,
    this.triggerBoss,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.LOOKAT_BOSS,
    this.lookAtBoss,
    this,
  );
  if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
    $eventManager.EventManager.instance.off(
      $guideMgr.EGuideEvent.GUIDE_CHANGE,
      this.onGuideChange,
      this,
    );
  }
};
e.prototype.registerEvent = function () {
  t.prototype.registerEvent.call(this);
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.WAVE_REFRESH_ENEMY_FINISH,
    this.onEventWaveEnemyFinish,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.TRIGGER_BOSS,
    this.triggerBoss,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.LOOKAT_BOSS,
    this.lookAtBoss,
    this,
  );
  if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
    $eventManager.EventManager.instance.on(
      $guideMgr.EGuideEvent.GUIDE_CHANGE,
      this.onGuideChange,
      this,
    );
  }
};
e.prototype.initCfg = function () {
  this._cfg = $cfg.default.instance.dataStage.getById($levelBattleData.levelBattleData.stageId);
};
e.prototype.onLoad = function () {
  this._stageType = $battleEnum.EBattleSceneType.LEVEL;
  t.prototype.onLoad.call(this);
};
Object.defineProperty(e.prototype, 'isTriggerBoss', {
  get: function () {
    return this._isTriggerBoss;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'gameReadyTime', {
  get: function () {
    return this._gameReadyTime;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'isRescue', {
  get: function () {
    return this._isRescue;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'rescueWaitTime', {
  get: function () {
    return this._rescueWaitTime;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'isWaitRescue', {
  get: function () {
    return this._isWaitRescue;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'curWaveTimer', {
  get: function () {
    return this._waveTimer;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'curWaveTime', {
  get: function () {
    return this._waveTime;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'level', {
  get: function () {
    return this._level;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nLevelLayout = null;
  e._level = null;
  e._createActorId = 0;
  e._gameReadyTime = 0;
  e._waveTime = 0;
  e._waveTimer = 0;
  e._isWaitRescue = !1;
  e._rescueWaitTime = 0;
  e._isRescue = !1;
  e._isTriggerBoss = !1;
  return e;
}
export default F;
