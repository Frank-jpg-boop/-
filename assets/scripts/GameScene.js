import $globalEnum from './GlobalEnum';
import $taskEnum from './TaskEnum';
import $eventManager from './EventManager';
import $appProxy from './AppProxy';
import $sceneBase from './SceneBase';
import $playerActionMgr from './PlayerActionMgr';
import $reportMgr from './ReportMgr';
import $stageDataProxy from './StageDataProxy';
import $gameEnum from './GameEnum';
let i;
exports.GameScene = void 0;
const _ = cc._decorator;
const g = _.ccclass;
const v = _.property;
e.prototype.switchSceneUI = function (t) {
  if (this._curNode) {
    this._curNode.destroy();
    this._curNode = null;
  }
  this._curGameSceneType = t;
  if (t === $gameEnum.Game.EGameSceneUIType.BATTLE_UI) {
    const e = cc.instantiate(this.pGameUI);
    this.node.addChild(e);
    this._curNode = e;
  }
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $gameEnum.Game.EGameEvent.SCENE_UI_SWITCH,
    this.switchSceneUI,
    this,
  );
  t.prototype.onDestroy.call(this);
};
e.prototype.initScene = function () {};
e.prototype.onLoad = function () {
  t.prototype.onLoad.call(this);
  cc.director.getScene().name = "game";
  this.initScene();
  $eventManager.EventManager.instance.on(
    $gameEnum.Game.EGameEvent.SCENE_UI_SWITCH,
    this.switchSceneUI,
    this,
  );
  $eventManager.EventManager.instance.emit(
    $appProxy.AppEvent.BGM_CHANGED,
    $globalEnum.Global.EBgmType.GAME,
  );
};
Object.defineProperty(e.prototype, "curUINode", {
  get: function () {
    return this._curNode;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.pGameUI = null;
  e._curNode = null;
  e._curGameSceneType = $gameEnum.Game.EGameSceneUIType.MAIN_UI;
  return e;
}
exports.GameScene = b;
