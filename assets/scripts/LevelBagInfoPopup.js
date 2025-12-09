import $cfg from './Cfg';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
e.prototype.onClickBtnClose = function () {
  this.removeUI();
};
e.prototype.init = function (t) {
  this._cfgReward = $cfg.default.instance.dataReward.getById(t.rewardId);
  $resLoader.ResLoader.setSpritFrame(
    this.spIcon,
    $frameEnum.Frame.EBundleName.RES,
    'textures/atlas/item_scene/' + this._cfgReward.spr,
  );
  this.lName.string = this._cfgReward.name;
  this.lDesc.string = this._cfgReward.info.replace('|val|', this._cfgReward.changeID.toString());
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spIcon = null;
  e.lName = null;
  e.lDesc = null;
  e._cfgReward = null;
  return e;
}
export default f;
