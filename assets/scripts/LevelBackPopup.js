import $popupBase from './PopupBase';
import $globalPopupMgr from './GlobalPopupMgr';
import $battleMgr from './BattleMgr';
import $actorMgr from './ActorMgr';
import $levelBattleData from './LevelBattleData';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f = p.property;
e.prototype.onClickBtnOk = function () {
  const t = $battleMgr.default.instance.getCurScene();
  if (t) {
    const e = $actorMgr.default.instance.getActor(t.playerId);
    if (!e || e.isDead()) {
      return void $globalPopupMgr.default.instance.showTips('玩家已死亡，无法撤离');
    }
    this.removeUI();
    $battleMgr.default.instance.getCurScene().scheduleWin();
  }
};
e.prototype.onClickBtnCancel = function () {
  $battleMgr.default.instance.getCurScene().resume();
  this.removeUI();
};
e.prototype.onHide = function () {
  const t = cc.director
    .getScene()
    .getChildByName('Canvas')
    .getChildByName('PhotoGameCamera')
    .getComponent(cc.Camera);
  t.targetTexture = null;
  t.node.active = !1;
};
e.prototype.init = function () {
  if (0 == $levelBattleData.levelBattleData.rescue) {
    this.lDesc.string = '天台中没有幸存者';
  } else {
    this.lDesc.string =
      '天台还有' + $levelBattleData.levelBattleData.rescue + '名幸存者等你！\n是否独自撤离?';
  }
  const t = $battleMgr.default.instance.getCurScene();
  const e = cc.director
    .getScene()
    .getChildByName('Canvas')
    .getChildByName('PhotoGameCamera')
    .getComponent(cc.Camera);
  e.zoomRatio = 8;
  const n = t.level.playerExitPos;
  n.y += 50;
  e.node.setPosition(n);
  const i = new cc.RenderTexture();
  i.initWithSize(
    this.sp.node.width,
    this.sp.node.height,
    cc.RenderTexture.DepthStencilFormat.RB_FMT_S8,
  );
  const o = new cc.SpriteFrame(i);
  this.sp.spriteFrame = o;
  e.targetTexture = i;
  e.node.active = !0;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.sp = null;
  e.lDesc = null;
  return e;
}
export default d;
