import $cfg from './Cfg';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $battleEnum from './BattleEnum';
import $levelBattleData from './LevelBattleData';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.onEventBossKill = function () {
  const t = this;
  if (this.node.active) {
    this.anim.once(
      cc.Animation.EventType.FINISHED,
      function () {
        t.nView.active = !1;
      },
      this,
    );
    this.nView.active = !0;
    this.anim.play();
  }
};
e.prototype.initView = function () {
  const t = $levelBattleData.levelBattleData.data.stageBossCfg;
  if (0 != t.id) {
    const e = $cfg.default.instance.dataEnemy.getById(t.id);
    this.nView.opacity = 0;
    this.nView.active = !1;
    $resLoader.ResLoader.setSpritFrame(
      this.spIcon,
      $frameEnum.Frame.EBundleName.GAME,
      'textures/enemy_icon/' + e.bossFace,
    );
  } else {
    this.node.active = !1;
  }
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
    this.onEventBossKill,
    this,
  );
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
    this.onEventBossKill,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nView = null;
  e.spIcon = null;
  e.anim = null;
  return e;
}
export default m;
