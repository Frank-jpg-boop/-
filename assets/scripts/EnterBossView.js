import $cfg from './Cfg';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $spAnimCtrl from './SpAnimCtrl';
import $levelBattleData from './LevelBattleData';
let i;
exports.EEnterBossViewEvent = void 0;
let a;
const f = cc._decorator;
const d = f.ccclass;
const m = f.property;
!(function (t) {
  t.SHOW = "EEnterBossViewEvent.show";
})((a = exports.EEnterBossViewEvent || (exports.EEnterBossViewEvent = {})));
e.prototype.playAnim = function (t) {
  const e = this;
  if (void 0 === t) {
    t = null;
  }
  const n = $levelBattleData.levelBattleData.data.stageBossCfg;
  const i = $cfg.default.instance.dataEnemy.getById(n.id);
  if (i) {
    $resLoader.ResLoader.setSpritFrame(
      this.spIcon,
      $frameEnum.Frame.EBundleName.GAME,
      "textures/enemy_pic/" + i.bossFace,
    );
    this.lBossDesc.string = i.info;
    this.node.active = !0;
    this.spAnimBg.node.active = !0;
    this.spAnimBoss.node.active = !0;
    const o = Math.max(
      this.spAnimBg.spAnim.findAnimation("BG").duration,
      this.spAnimBoss.spAnim.findAnimation("wenzi").duration,
    );
    this.spAnimBg.clearAnim();
    this.spAnimBoss.clearAnim();
    this.spAnimBg.playAnim("BG", 0.6, !1);
    this.spAnimBoss.playAnim("wenzi", 0.6, !1);
    this.scheduleOnce(function () {
      e.node.active = !1;
      if (t) {
        t();
      }
    }, o / 0.6);
  } else {
    this.node.active = !1;
  }
};
e.prototype.onEventTriggerBossInform = function () {
  this.playAnim();
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    a.SHOW,
    this.onEventTriggerBossInform,
    this,
  );
};
e.prototype.onLoad = function () {
  this.node.active = !1;
  $eventManager.EventManager.instance.on(
    a.SHOW,
    this.onEventTriggerBossInform,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spAnimBg = null;
  e.spAnimBoss = null;
  e.spIcon = null;
  e.lBossDesc = null;
  return e;
}
exports.default = y;
