import $cfg from './Cfg';
import $audioUtil from './AudioUtil';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $spAnimCtrl from './SpAnimCtrl';
import $skillMgr from './SkillMgr';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.onClickThis = function () {
  $skillMgr.SkillMgr.instance.selectSkillEx(this._exSkillId);
  if (this._onClickComplete) {
    this._onClickComplete(this.node);
  }
};
e.prototype.closeAnim = function (t, e) {
  this.node.getComponent(cc.Button).interactable = !1;
  if (t) {
    if (e) {
      e();
    }
  } else {
    cc.tween(this.node)
      .to(0.25, {
        scale: 0.5,
        opacity: 0,
      })
      .call(function () {
        if (e) {
          e();
        }
      })
      .start();
  }
};
e.prototype.openAnim = function (t) {
  const e = this.node.getSiblingIndex();
  cc.tween(this.node)
    .delay(0.15 * e)
    .call(function () {
      $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_ChooseSkills');
    })
    .to(0.3, {
      x: 0,
    })
    .call(function () {
      if (t) {
        t();
      }
    })
    .start();
};
e.prototype.updateData = function (t, e, n) {
  const i = this;
  this._exSkillId = t;
  this._onClickComplete = e;
  this._cfgEx = $cfg.default.instance.dataChoose.getById(t);
  const o = $cfg.default.instance.dataSkill.getById(this._cfgEx.withSkill);
  $resLoader.ResLoader.setSpritFrame(
    this.spIcon,
    $frameEnum.Frame.EBundleName.GAME,
    'textures/skill/' + o.icon,
  );
  $resLoader.ResLoader.setSpritFrame(
    this.spQuality,
    $frameEnum.Frame.EBundleName.GAME,
    'textures/quality/quality_skill_ex_' + this._cfgEx.rare,
  );
  for (let r, s = [], u = /\|([^|]+)\|/g; null != (r = u.exec(this._cfgEx.info)); ) {
    s.push(r[1]);
  }
  const p = this._cfgEx.info;
  s.forEach(function (t) {
    const e = t.replace('%', '');
    p = p.replace(
      '|' + t + '|',
      t.includes('%') ? 100 * Number(i._cfgEx[e]) + '%' : '' + i._cfgEx[e],
    );
  });
  this.spAnimHeight.node.active = this._cfgEx.rare > 2;
  if (this.spAnimHeight.node.active) {
    this.spAnimHeight.playAnim(3 == this._cfgEx.rare ? 'loop_Purple' : 'loop_red', 1, !0);
  }
  this.lDesc.string = p;
  this.node.getComponent(cc.Button).interactable = !1;
  this.openAnim(n);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spQuality = null;
  e.spIcon = null;
  e.lDesc = null;
  e.spAnimHeight = null;
  e._exSkillId = 0;
  e._onClickComplete = null;
  e._cfgEx = null;
  return e;
}
export default m;
