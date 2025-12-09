import $cfg from './Cfg';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $animUtils from './AnimUtils';
import $util from './Util';
import $signDataProxy from './SignDataProxy';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.updateView = function (t) {
  const e =
    $signDataProxy.signDataProxy.curSevenSignDay == this._cfgSign.id && t;
  if (e) {
    $animUtils.AnimUtil.breathAnim(this.node, 1.03);
  } else {
    cc.Tween.stopAllByTarget(this.node);
    this.node.scale = 1;
  }
  this.lDesc.node.active =
    $signDataProxy.signDataProxy.curSevenSignDay <= this._cfgSign.id || e;
  if (this.lDesc.node.active) {
    if (e) {
      this.lDesc.string = "可领取";
    } else {
      this.lDesc.string = "未达成";
    }
    if (e) {
      this.lDesc.node.color = new cc.Color().fromHEX("#F7DB4B");
    } else {
      this.lDesc.node.color = cc.Color.WHITE;
    }
  }
  this.nComplete.active =
    $signDataProxy.signDataProxy.curSevenSignDay > this._cfgSign.id;
  this.nHeightLight.active = e;
};
e.prototype.initView = function (t) {
  this._cfgSign = $cfg.default.instance.dataSign.getById(t);
  this.lDay.string = "第" + $util.default.numToString(t) + "天";
  const e = this._cfgSign.reward.split("_").map(Number);
  const n = e[0];
  const i = e[1];
  const o = $cfg.default.instance.dataItem.getById(n);
  $resLoader.ResLoader.setSpritFrame(
    this.spIcon,
    $frameEnum.Frame.EBundleName.RES,
    "textures/atlas/item/" + o.icon,
  );
  this.lRewardCount.string = "x" + i;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lDay = null;
  e.lDesc = null;
  e.spIcon = null;
  e.lRewardCount = null;
  e.nHeightLight = null;
  e.nComplete = null;
  e._cfgSign = null;
  return e;
}
exports.default = m;
