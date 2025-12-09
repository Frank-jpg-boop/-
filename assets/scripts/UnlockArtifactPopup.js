import $cfg from './Cfg';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
import $homeEnum from './HomeEnum';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.onClickBtnClose = function () {
  this.removeUI();
};
e.prototype.onHide = function () {
  $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 3);
};
e.prototype.init = function (t) {
  const e = this;
  const n = $cfg.default.instance.dataSkill.getById(t.skillId);
  this.lName.string = n.name;
  this.lDesc.string = n.info;
  $resLoader.ResLoader.setSpritFrame(
    this.spIcon,
    $frameEnum.Frame.EBundleName.GAME,
    'textures/skill/' + n.icon,
  );
  n.showReward.split('|').forEach(function (t, n) {
    const i = t.split('_').map(Number);
    const o = i[0];
    const r = i[1];
    const s = e.nSkillView.children[n];
    if (s) {
      const u = $cfg.default.instance.dataChoose.getById(r);
      $resLoader.ResLoader.setSpritFrame(
        s.getChildByName('Quality').getComponent(cc.Sprite),
        $frameEnum.Frame.EBundleName.RES,
        'textures/atlas/quality/quality_skill_ex_' + u.rare,
      );
      for (; null != (f = h.exec(u.info)); ) {
        p.push(f[1]);
      }
      const d = u.info;
      p.forEach(function (t) {
        const e = t.replace('%', '');
        d = d.replace('|' + t + '|', t.includes('%') ? 100 * Number(u[e]) + '%' : '' + u[e]);
      });
      s.getChildByName('Desc').getComponent(cc.Label).string = d;
      if (0 == o) {
        s.getChildByName('Lock').getChildByName('LockLv').getComponent(cc.Label).string = '';
      } else {
        s.getChildByName('Lock').getChildByName('LockLv').getComponent(cc.Label).string =
          '法器' + o + '级解锁';
      }
    }
  });
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lName = null;
  e.lDesc = null;
  e.spIcon = null;
  e.nSkillView = null;
  return e;
}
export default m;
