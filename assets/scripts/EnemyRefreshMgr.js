import $cfg from './Cfg';
import $eventManager from './EventManager';
import $randomUtil from './RandomUtil';
import $util from './Util';
import $globalPopupMgr from './GlobalPopupMgr';
import $guideMgr from './GuideMgr';
import $guideDataProxy from './GuideDataProxy';
import $itemDataProxy from './ItemDataProxy';
import $gameUI from './GameUI';
import $battleMgr from './BattleMgr';
import $effectMgr from './EffectMgr';
import $eRefreshEnemyTips from './ERefreshEnemyTips';
import $actorEnum from './ActorEnum';
import $battleEnum from './BattleEnum';
import $levelBattleData from './LevelBattleData';
import $actorMgr from './ActorMgr';
import $enemyBase from './EnemyBase';
import $enemyRefreshPoint from './EnemyRefreshPoint';
exports.EnemyRefreshMgr = void 0;
t.prototype.createBoss = function (t, e) {
  const n = $battleMgr.default.instance.getCurScene();
  if (n) {
    const o = $cfg.default.instance.dataEnemy.getById(t);
    $actorMgr.default.instance.createActor({
      id: n.getCreateActorId(),
      cfgId: t,
      camp: $actorEnum.ETeamType.ENEMY,
      parent: 2 == o.moveType ? n.effectParent : n.actorParent,
      prefabName: "Boss_" + t,
      initPos: cc.v2(-9999, -9999),
      actorClass: $actorMgr.default.instance.getActorClassName(
        t,
        $actorEnum.ETeamType.ENEMY,
      ),
      onCreated: null,
      initParam: {
        rewardMap: new Map(),
        lv: e,
      },
    });
  }
};
t.prototype.createEnemy = function (t, e, n, o, r) {
  if (void 0 === r) {
    r = !1;
  }
  if (this._isGmCreateOnce) {
    if (this._isCreated) {
      return;
    }
    this._isCreated = !0;
  }
  if (0 != t.enemyId) {
    const a = $battleMgr.default.instance.getCurScene();
    if (a) {
      const s = $actorMgr.default.instance.getActor(a.playerId);
      if (s) {
        s.node.getPosition().add(cc.v2(0, 40));
        $effectMgr.default.instance.createEffect({
          parent: a.uiNode.getComponent($gameUI.default).nGameUILayer,
          prefabName: "ERefreshEnemyTips",
          initPos: cc.v2(),
          effectClass: $eRefreshEnemyTips.default,
          onCreated: function (t) {
            t.play(s, e.add(cc.v2(0, 40)));
          },
        });
      }
      const c = $cfg.default.instance.dataEnemy.getById(t.enemyId);
      $actorMgr.default.instance.createActor({
        id: a.getCreateActorId(),
        cfgId: t.enemyId,
        camp: $actorEnum.ETeamType.ENEMY,
        parent: 2 == c.moveType ? a.effectParent : a.actorParent,
        prefabName: "Enemy_" + t.enemyId,
        initPos: e,
        actorClass: $actorMgr.default.instance.getActorClassName(
          t.enemyId,
          $actorEnum.ETeamType.ENEMY,
        ),
        onCreated: null,
        initParam: {
          rewardMap: n,
          lv: t.enemyLv,
          isWaveRefresh: !r,
          waitRescueFlag: o,
          isGuideEnemy: r,
        },
      });
    }
  } else {
    console.error("配置错误,出现了错误怪物id" + t.enemyId);
  }
};
t.prototype.allotPos = function (t, e) {
  if (void 0 === t) {
    t = !1;
  }
  if (void 0 === e) {
    e = 0;
  }
  if (0 == this._refreshPoints.length) {
    return null;
  }
  if (t) {
    const n = $cfg.default.instance.dataStage
      .getById($levelBattleData.levelBattleData.stageId)
      .endRefresh.split("|")
      .map(Number);
    const o = this._refreshPoints.filter(function (t) {
      return n.includes(t.refreshId);
    });
    if (!(e > 0)) {
      return o[$randomUtil.RandomUtil.randomInt(0, o.length)].pos;
    }
    const a = $actorMgr.default.instance.getActor(
      $battleMgr.default.instance.getCurScene().playerId,
    );
    if (a) {
      const s = a.pathPos.clone();
      const c = s.clone();
      const l = 0 == $randomUtil.RandomUtil.randomInt(0, 2);
      c.x = s.x + (l ? -e : e);
      const u = $battleMgr.default.instance
        .getCurScene()
        .level.path.findPathLineByPos(c);
      if ("" != u) {
        return c;
      } else {
        return (
          (c.x = s.x + (l ? e : -e)),
          "" !=
          (u = $battleMgr.default.instance
            .getCurScene()
            .level.path.findPathLineByPos(c))
            ? c
            : o[$randomUtil.RandomUtil.randomInt(0, o.length)].pos
        );
      }
    }
  }
  const p = $randomUtil.RandomUtil.randomInt(0, this._refreshPoints.length);
  return this._refreshPoints[p].pos;
};
t.prototype.allotReward = function (t) {
  if (void 0 === t) {
    t = !1;
  }
  const e = new Map();
  if (t) {
    return e;
  }
  if (this._curWaveResidueRewardNum > 0) {
    for (
      const n = Math.floor(
                this._curWaveResidueRewardNum / this._curWaveResidueCreateEnemyNum,
              ),
            i = $randomUtil.RandomUtil.randomInt(Math.max(0, n - 2), n + 3),
            o = 0;
      o < i && 0 != this._curWaveRewardAllots.length;
      ++o
    ) {
      const a =
        this._curWaveRewardAllots[
          $randomUtil.RandomUtil.randomInt(
            0,
            this._curWaveRewardAllots.length,
          )
        ];
      const s = e.get(a.rewardId) || 0;
      e.set(a.rewardId, s + 1);
      a.num--;
      if (a.num <= 0) {
        this._curWaveRewardAllots.splice(
          this._curWaveRewardAllots.indexOf(a),
          1,
        );
      }
    }
    this._curWaveResidueRewardNum -= i;
  }
  if (this._curWaveProbRewardAllots.length > 0) {
    for (o = 0; o < this._curWaveProbRewardAllots.length; ++o) {
      if (
        $randomUtil.RandomUtil.randomInt(0, 100) <
        this._curWaveProbRewardAllots[o].prob
      ) {
        a = this._curWaveProbRewardAllots[o];
        s = e.get(a.rewardId) || 0;
        e.set(a.rewardId, s + 1);
        a.num--;
        if (a.num <= 0) {
          this._curWaveProbRewardAllots.splice(o, 1);
          o--;
        }
      }
    }
  }
  return e;
};
t.prototype.update = function (t) {
  if (this._isEnterWaitRescue) {
    this._waitRescueTime += t;
  }
  for (const e = 0; e < this._curWaveRefreshEnemyDatas.length; ++e) {
    (n = this._curWaveRefreshEnemyDatas[e]).cd -= t;
    n.cd <= 0 &&
      ((n.cd = n.interval),
      this.createEnemy(n.createData, this.allotPos(), this.allotReward(), 0),
      this._curWaveResidueCreateEnemyNum--,
      n.num--,
      n.num <= 0 && (this._curWaveRefreshEnemyDatas.splice(e, 1), e--));
  }
  for (e = 0; e < this._waitRescueRefreshDatas.length; ++e) {
    let n;
    if (
      (n = this._waitRescueRefreshDatas[e]).startTime &&
      this._waitRescueTime < n.startTime
    ) {
      //
    } else {
      n.cd -= t;
      if (n.cd <= 0) {
        n.cd = n.interval;
        n.createData.enemyLv = this.getWaitRescueEnemyLv();
        this.createEnemy(
          n.createData,
          this.allotPos(!0, n.range),
          this.allotReward(!0),
          n.range > 0 ? 2 : 1,
        );
        n.num--;
        if (n.num <= 0) {
          this._waitRescueRefreshDatas.splice(e, 1);
          e--;
        }
      }
    }
  }
  if (this._guideRefreshEnemyData) {
    this._guideRefreshEnemyData.cd -= t;
    if (this._guideRefreshEnemyData.cd <= 0) {
      this._guideRefreshEnemyData.cd = this._guideRefreshEnemyData.interval;
      this.createEnemy(
        this._guideRefreshEnemyData.createData,
        this._refreshPoints[0].pos,
        new Map([[1, 2]]),
        0,
        !0,
      );
      this._guideRefreshEnemyData.num--;
      if (this._guideRefreshEnemyData.num <= 0) {
        this._guideRefreshEnemyData = null;
      }
    }
  }
};
t.prototype.enterWaitRescueRefreshData = function () {
  const t = this;
  this._isEnterWaitRescue = !0;
  this._curWaveRefreshEnemyDatas = [];
  this._curWaveResidueCreateEnemyNum = 0;
  this._curWaveResidueEnemyNum = 0;
  this._waitRescueTime = 0;
  this._waitRescueRefreshDatas = [];
  const e = $cfg.default.instance.dataStage.getById(
    $levelBattleData.levelBattleData.stageId,
  );
  e.endWave.split("|").forEach(function (n) {
    const i = n.split("_").map(Number);
    const o = i[0];
    const r = i[1];
    const a = {
      num: r,
      interval: e.endTime / r,
      cd: 0,
      createData: {
        enemyId: o,
        enemyLv: 0,
      },
    };
    t._waitRescueRefreshDatas.push(a);
  });
  if ("" != e.endWave2) {
    const n = e.endWave2.split("|");
    const o = n[0];
    const r = n[1].split("_").map(Number);
    const a = r[0];
    const s = r[1];
    const c = r[2];
    const l = s - a;
    const u = 0;
    o.split("&").forEach(function (t) {
      const e = t.split("_").map(Number);
      const n = (e[0], e[1]);
      u += n;
    });
    o.split("&").forEach(function (e) {
      const n = e.split("_").map(Number);
      const i = n[0];
      const o = {
        num: n[1],
        interval: l / u,
        startTime: a,
        cd: 0,
        createData: {
          enemyId: i,
          enemyLv: 0,
        },
        range: c,
      };
      t._waitRescueRefreshDatas.push(o);
    });
  }
};
t.prototype.getWaitRescueEnemyLv = function () {
  const t = $cfg.default.instance.dataStage
    .getById($levelBattleData.levelBattleData.stageId)
    .endLv.split("|")
    .map(Number);
  const e = t[0];
  const n = t[1];
  const o = t[2];
  if (this._waitRescueTime <= 20) {
    return e;
  } else {
    if (this._waitRescueTime <= 40) {
      return n;
    } else {
      return o;
    }
  }
};
t.prototype.updateWaveRefreshData = function (t, e) {
  const n = this;
  this._curWaveResidueCreateEnemyNum = 0;
  this._curWaveRefreshEnemyDatas = [];
  const o = $cfg.default.instance.dataWave.getById(t);
  const r = null;
  if (1 == $levelBattleData.levelBattleData.cfgStage.turn) {
    r = o.valTurn1;
  } else {
    r = o.val;
  }
  if ("" != r) {
    r.split("|").forEach(function (t) {
      const i = t.split("_").map(Number);
      const r = i[0];
      const a = i[1];
      const s = {
        num: a,
        interval: o.time / a,
        cd: 0,
        createData: {
          enemyId: r,
          enemyLv: Math.floor(
            e * $levelBattleData.levelBattleData.stageEnemyLvScale,
          ),
        },
      };
      n._curWaveResidueCreateEnemyNum += a;
      n._curWaveRefreshEnemyDatas.push(s);
    });
  }
  this._curWaveResidueRewardNum = 0;
  this._curWaveRewardAllots = [];
  o.reward1.split("|").forEach(function (t) {
    const e = t.split("_").map(Number);
    const i = e[0];
    const o = e[1];
    if ($itemDataProxy.itemDataProxy.checkCanDropReward(i)) {
      const r = {
        rewardId: i,
        num: o,
      };
      n._curWaveResidueRewardNum += o;
      n._curWaveRewardAllots.push(r);
    }
  });
  this._curWaveProbRewardAllots = [];
  o.reward2.split("|").forEach(function (t) {
    const e = t.split("_").map(Number);
    const i = e[0];
    const o = e[1];
    if ($itemDataProxy.itemDataProxy.checkCanDropReward(i)) {
      const r = {
        rewardId: i,
        num: 1,
        prob: Math.floor(100 * o),
      };
      n._curWaveProbRewardAllots.push(r);
    }
  });
  this._curWaveResidueEnemyNum += this._curWaveResidueCreateEnemyNum;
};
t.prototype.randomRefreshPoint = function () {
  const t = $randomUtil.RandomUtil.randomInt(0, this._refreshPoints.length);
  return this._refreshPoints[t];
};
t.prototype.addRefreshPoint = function (t) {
  const e = new $enemyRefreshPoint.EnemyRefreshPoint(t);
  this._refreshPoints.push(e);
};
t.prototype.onGuideChange = function (t) {
  const e = this;
  if (t == $guideDataProxy.EGuideStepId.G_6) {
    const n = $battleMgr.default.instance.getCurScene();
    const i = this.randomRefreshPoint();
    const r = $actorMgr.default.instance.getActor(n.playerId);
    r.clearMove();
    n.cameraCtrl.lookAtPos(
      n.actorParent.convertToWorldSpaceAR(i.pos),
      2,
      function () {
        $globalPopupMgr.default.instance.showTips("【怪物出现了】");
        e._guideRefreshEnemyData = {
          interval: 1,
          cd: 0,
          num: 7,
          createData: {
            enemyId: 101,
            enemyLv: 1,
          },
        };
        $util.default.delay(4, function () {
          n.cameraCtrl.lookAtPos(
            r.node.convertToWorldSpaceAR(cc.v2(0, 150)),
            1,
            function () {
              r.lockTouchMove = !1;
              $eventManager.EventManager.instance.emit(
                $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                $guideDataProxy.EGuideStepId.G_6,
              );
            },
            !0,
          );
        });
      },
      !1,
    );
  }
};
t.prototype.onEventActorDeadRemove = function (t) {
  if (
    t.actorType == $actorEnum.EActorType.ENEMY &&
    !this._isEnterWaitRescue &&
    t instanceof $enemyBase.default
  ) {
    if (!t.isWaveRefresh) {
      return;
    }
    this._curWaveResidueEnemyNum--;
    if (this._curWaveResidueEnemyNum <= 0) {
      $eventManager.EventManager.instance.emit(
        $battleEnum.EBattleEvent.WAVE_REFRESH_ENEMY_FINISH,
      );
      $eventManager.EventManager.instance.emit(
        $battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI,
        !0,
      );
    }
  }
};
t.prototype.clear = function () {
  this._guideRefreshEnemyData = null;
  this._refreshPoints = [];
  this._curWaveRefreshEnemyDatas = [];
  this._curWaveProbRewardAllots = [];
  this._waitRescueRefreshDatas = [];
  $eventManager.EventManager.instance.off(
    $actorEnum.EActorEvent.ACTOR_DEAD_REMOVE,
    this.onEventActorDeadRemove,
    this,
  );
  $eventManager.EventManager.instance.off(
    $guideMgr.EGuideEvent.GUIDE_CHANGE,
    this.onGuideChange,
    this,
  );
};
t.prototype.init = function () {
  this._guideRefreshEnemyData = null;
  this._isCreated = !1;
  this._curWaveResidueCreateEnemyNum = 0;
  this._isEnterWaitRescue = !1;
  this._refreshPoints = [];
  this._curWaveRefreshEnemyDatas = [];
  this._curWaveProbRewardAllots = [];
  this._waitRescueRefreshDatas = [];
  $eventManager.EventManager.instance.on(
    $actorEnum.EActorEvent.ACTOR_DEAD_REMOVE,
    this.onEventActorDeadRemove,
    this,
  );
  $eventManager.EventManager.instance.on(
    $guideMgr.EGuideEvent.GUIDE_CHANGE,
    this.onGuideChange,
    this,
  );
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (this._instance) {
      //
    } else {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._refreshPoints = new Array();
  this._curWaveRefreshEnemyDatas = null;
  this._curWaveResidueCreateEnemyNum = 0;
  this._curWaveResidueEnemyNum = 0;
  this._curWaveRewardAllots = null;
  this._curWaveResidueRewardNum = 0;
  this._curWaveProbRewardAllots = null;
  this._waitRescueRefreshDatas = null;
  this._waitRescueTime = 0;
  this._isEnterWaitRescue = !1;
  this._isGmCreateOnce = !1;
  this._isCreated = !1;
  this._guideRefreshEnemyData = null;
}
const E = t;
exports.EnemyRefreshMgr = E;
