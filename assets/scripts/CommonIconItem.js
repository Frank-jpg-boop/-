import $cfg from './Cfg';
import $resLoader from './ResLoader';
import $mathUtil from './MathUtil';
import $frameEnum from './FrameEnum';
import $spAnimCtrl from './SpAnimCtrl';
import $itemDataProxy from './ItemDataProxy';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.playShowAnim = function () {
  const t = this;
  this.node.active = !0;
  const e = this.getComponent(cc.Button);
  e.enabled = !1;
  this.nInfo.scale = 0;
  cc.Tween.stopAllByTarget(this.nInfo);
  this.nInfo.active = !0;
  return new Promise(function (n) {
    cc.tween(t.nInfo)
      .to(0.1, {
        scale: 1.2,
      })
      .call(function () {
        n();
      })
      .to(0.2, {
        scale: 1,
      })
      .call(function () {
        t.heightSpAnim.node.active = !0;
        t.heightSpAnim.playAnim("animation", 1, !1, function () {
          t.heightSpAnim.node.active = !1;
        });
        e.enabled = !0;
      })
      .start();
  });
};
e.prototype.onClickBtnThis = function () {};
e.prototype.updateData = function (t) {
  this.heightSpAnim.clearAnim();
  this.heightSpAnim.node.active = !1;
  if (!this._cfgItem || this._cfgItem.id != t.itemId) {
    const e = $cfg.default.instance.dataItem.getById(t.itemId);
    if (!e) {
      return;
    }
    this._cfgItem = e;
    if (t.isNotLoadQualityIcon) {
      //
    } else {
      $resLoader.ResLoader.setSpritFrame(
        this.spFrame,
        $frameEnum.Frame.EBundleName.RES,
        "textures/atlas/quality/pic_wuping_di_" + e.rare,
      );
    }
    $resLoader.ResLoader.setSpritFrame(
      this.spIcon,
      $itemDataProxy.itemDataProxy.getItemIconBundleName(e.id),
      $itemDataProxy.itemDataProxy.getItemIconPath(e.id),
    );
  }
  this.lNum.node.active = !t.isNotShowNum;
  if (this.lNum.node.active) {
    this.lNum.string = "x" + $mathUtil.MathUtil.formatValue(t.itemNum);
  }
  this.nName.active = t.isShowName;
  if (this.nName.active) {
    this.nName.children[0].getComponent(cc.Label).string = this._cfgItem.name;
  }
  this.spIcon.node.scale =
    t.iconScale ||
    $itemDataProxy.itemDataProxy.getItemIconScale(this._cfgItem.id);
  this.getComponent(cc.Button).enabled = !0;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nInfo = null;
  e.spIcon = null;
  e.spFrame = null;
  e.lNum = null;
  e.nName = null;
  e.heightSpAnim = null;
  e._cfgItem = null;
  return e;
}
exports.default = m;
