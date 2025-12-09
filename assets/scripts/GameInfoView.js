import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $battleMgr from './BattleMgr';
import $spAnimCtrl from './SpAnimCtrl';
import $actorEnum from './ActorEnum';
import $battleEnum from './BattleEnum';
import $levelBattleData from './LevelBattleData';
import $skillCDItem from './SkillCDItem';
let i;
const m = cc._decorator;
const y = m.ccclass;
const _ = m.property;
e.prototype.onEventPlayerCreateSkill = function (t, e) {
  const n = cc.instantiate(this.pSkillCDItem);
  this.nSkillCDView.addChild(n);
  const i = n.getComponent($skillCDItem.default);
  i.init(t);
  if (e) {
    e(i);
  }
};
e.prototype.onEventSetNextWaveActive = function (t) {
  this.nNextWave.active = t;
  if (this.nNextWave.active) {
    const e = $battleMgr.default.instance.getCurScene();
    const n = null;
    if (e.gameReadyTime > 0) {
      n = e.gameReadyTime;
    } else {
      n = e.curWaveTime;
    }
    this.nNextWave.getChildByName('Time').getComponent(cc.Label).string = Math.ceil(n).toString();
  }
};
e.prototype.onEventEnterWaitRescue = function () {
  this.nWaitRescue.active = !0;
  this.nNextWave.active = !1;
  this.nWaitRescue.getComponent(cc.Animation).play('WaitRescue', 0);
  this.lStageName.string = '楼梯已被摧毁，坚持到最后吧！';
};
e.prototype.onEventWaveChange = function () {
  if (1 != $levelBattleData.levelBattleData.curWave) {
    const t = this.nEnemyLvView.getChildByName('UpLvAnim').getComponent($spAnimCtrl.default);
    t.clearAnim();
    t.node.active = !0;
    t.playAnim('hit', 1, !1, function () {
      t.node.active = !1;
    });
  }
  this.updateEnemyLvView();
};
e.prototype.onEventEnemyLvChange = function () {
  this.updateEnemyLvView();
};
e.prototype.onBagItemChange = function () {};
e.prototype.update = function () {
  if (this.nNextWave.active) {
    const t = $battleMgr.default.instance.getCurScene();
    if (!t) {
      return;
    }
    const e = null;
    if (t.gameReadyTime > 0) {
      e = t.gameReadyTime;
    } else {
      e = t.curWaveTime;
    }
    this.nNextWave.getChildByName('Time').getComponent(cc.Label).string = Math.ceil(e).toString();
  }
};
e.prototype.updateEnemyLvView = function () {
  const t = $levelBattleData.levelBattleData.moonLvIndex;
  $resLoader.ResLoader.setSpritFrame(
    this.nEnemyLvView.getChildByName('Icon').getComponent(cc.Sprite),
    $frameEnum.Frame.EBundleName.GAME,
    'textures/game/moon_' + t,
  );
  const e = this.nEnemyLvView.getChildByName('Lv');
  e.active = 3 != t;
  if (e.active) {
    e.getComponent(cc.Label).string = Math.floor(
      $levelBattleData.levelBattleData.curWaveInfo.enemyLv *
        $levelBattleData.levelBattleData.stageEnemyLvScale,
    ).toString();
  }
  const n = this.nEnemyLvView.getChildByName('LvDesc');
  n.active = 3 != t;
  if (0 == t) {
    n.color = cc.Color.WHITE;
  } else {
    n.color = new cc.Color().fromHEX('#DA7A73');
  }
  this.nEnemyLvView.getChildByName('Full').active = 3 == t;
};
e.prototype.initView = function () {
  this.lStageName.string = $levelBattleData.levelBattleData.cfgStage.name;
  this.nWaitRescue.active = !1;
  this.nNextWave.active = !1;
  this.updateEnemyLvView();
  if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
    this.lStageName.node.parent.active = !1;
    this.nEnemyLvView.active = !1;
    this.nSet.active = !1;
  }
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $levelBattleData.ELevelBattleDataEvent.WAVE_CHANGE,
    this.onEventWaveChange,
    this,
  );
  $eventManager.EventManager.instance.off(
    $levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE,
    this.onBagItemChange,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM,
    this.onEventEnterWaitRescue,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI,
    this.onEventSetNextWaveActive,
    this,
  );
  $eventManager.EventManager.instance.off(
    $actorEnum.EPlayerEvent.PLAYER_CREATE_SKILL,
    this.onEventPlayerCreateSkill,
    this,
  );
  $eventManager.EventManager.instance.off(
    $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
    this.onEventEnemyLvChange,
    this,
  );
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $levelBattleData.ELevelBattleDataEvent.WAVE_CHANGE,
    this.onEventWaveChange,
    this,
  );
  $eventManager.EventManager.instance.on(
    $levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE,
    this.onBagItemChange,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM,
    this.onEventEnterWaitRescue,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI,
    this.onEventSetNextWaveActive,
    this,
  );
  $eventManager.EventManager.instance.on(
    $actorEnum.EPlayerEvent.PLAYER_CREATE_SKILL,
    this.onEventPlayerCreateSkill,
    this,
  );
  $eventManager.EventManager.instance.on(
    $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
    this.onEventEnemyLvChange,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lStageName = null;
  e.nWaitRescue = null;
  e.nNextWave = null;
  e.nEnemyLvView = null;
  e.nSkillCDView = null;
  e.pSkillCDItem = null;
  e.nSet = null;
  e._rescueWaitTime = 0;
  return e;
}
export default g;
