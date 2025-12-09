import $cfg from './Cfg';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $actorEnum from './ActorEnum';
import $battleEnum from './BattleEnum';
import $levelBattleData from './LevelBattleData';
let i;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
e.prototype.hideBossHp = function () {
  const t = this;
  this.anim.once(
    cc.Animation.EventType.FINISHED,
    function () {
      t.node.active = !1;
    },
    this,
  );
  this.anim.play("BossHpHide", 0);
};
e.prototype.onEventBossEnd = function () {
  this.hideBossHp();
};
e.prototype.onEventBossHpChange = function (t, e) {
  const n = this;
  this.updateLineHp(e);
  const i = this.findLineIndex(t);
  if (-1 != i) {
    this.nHpView.children.forEach(function (e, o) {
      let r;
      const a = e.children[0].getChildByName("Bar").getComponent(cc.Sprite);
      if (
        a.fillRange !=
        (r =
          o == i
            ? (t - n._hpLineDatas[o].min) /
              (n._hpLineDatas[o].max - n._hpLineDatas[o].min)
            : o > i
              ? 1
              : 0)
      ) {
        cc.Tween.stopAllByTarget(a);
        cc.tween(a)
          .to(0.2, {
            fillRange: r,
          })
          .start();
      }
    });
  }
};
e.prototype.findLineIndex = function (t) {
  for (const e = 0; e < this._hpLineDatas.length; e++) {
    const n = this._hpLineDatas[e];
    if (n.min <= t && t <= n.max) {
      return e;
    }
  }
  return -1;
};
e.prototype.updateLineHp = function (t) {
  this._hpLineDatas = [];
  for (const e = 1; e >= 0; e--) {
    const n = Math.floor((1 * t) / 2);
    if (0 == e) {
      this._hpLineDatas.push({
        min: 0,
        max: t,
      });
    } else {
      this._hpLineDatas.push({
        min: t - n,
        max: t,
      });
    }
    t -= n;
  }
};
e.prototype.onEventEnterBoss = function () {
  const t = this;
  this.node.active = !0;
  this.anim.once(
    cc.Animation.EventType.FINISHED,
    function () {
      t.anim.play("BossHpLoop");
    },
    this,
  );
  this.anim.play("BossHpShow", 0);
};
e.prototype.initView = function () {
  const t = $levelBattleData.levelBattleData.data.stageBossCfg;
  if (0 != t.id) {
    const e = $cfg.default.instance.dataEnemy.getById(t.id);
    this.lName.string = e.name;
    $resLoader.ResLoader.setSpritFrame(
      this.spIcon,
      $frameEnum.Frame.EBundleName.GAME,
      "textures/enemy_head/" + e.bossFace,
    );
    this.nHpView.children.forEach(function (t) {
      t.children[0].getChildByName("Bar").getComponent(cc.Sprite).fillRange =
        1;
    });
    this.node.active = !1;
  } else {
    this.node.active = !1;
  }
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.SHOW_BOSS_HP,
    this.onEventEnterBoss,
    this,
  );
  $eventManager.EventManager.instance.off(
    $actorEnum.EActorEvent.BOSS_HP_CHANGE,
    this.onEventBossHpChange,
    this,
  );
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
    this.onEventBossEnd,
    this,
  );
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.SHOW_BOSS_HP,
    this.onEventEnterBoss,
    this,
  );
  $eventManager.EventManager.instance.on(
    $actorEnum.EActorEvent.BOSS_HP_CHANGE,
    this.onEventBossHpChange,
    this,
  );
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
    this.onEventBossEnd,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spIcon = null;
  e.nHpView = null;
  e.anim = null;
  e.lName = null;
  e._hpLineDatas = [];
  return e;
}
exports.default = y;
