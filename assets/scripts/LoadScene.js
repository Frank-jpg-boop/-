import $appBase from './AppBase';
import $popupManager from './PopupManager';
import $engineExUtils from './EngineExUtils';
import $sceneBase from './SceneBase';
import $resLoader from './ResLoader';
import $blockInputManager from './BlockInputManager';
import $audioManager from './AudioManager';
import $commonUtil from './CommonUtil';
import $eventManager from './EventManager';
import $appProxy from './AppProxy';
import $frameEnum from './FrameEnum';
import $audioUtil from './AudioUtil';
let i;
export const LoadScene = void 0;
const b = cc._decorator;
const E = b.ccclass;
const S = b.property;
cc.internal.inputManager._maxTouches = 1;
e.prototype.compatibilityTT = function () {
  tt.navigateToScene({
    scene: 'sidebar',
    success: function () {
      console.log('navigate to scene success');
    },
    fail: function (t) {
      console.log('navigate to scene fail: ', t);
    },
  });
};
e.prototype.checkDuration = function () {
  if (new Date().getTime() >= 1722649525031) {
    cc.game.end();
  }
};
e.prototype.showLoadUI = function () {};
e.prototype.onDestroy = function () {};
e.prototype.start = function () {
  t.prototype.start.call(this);
  $appBase.AppBase.init();
  $popupManager.PopupManager.instance.init();
  $blockInputManager.BlockInputManager.instance.init();
  this.showLoadUI();
  if (this.loadBgm) {
    $audioManager.AudioManager.instance.playBgm(this.loadBgm, !0);
  }
  $audioUtil.AudioUtil.init();
};
e.prototype.onLoad = function () {
  cc.director.getScene().name = 'load';
  $eventManager.EventManager.instance.clear();
  $resLoader.ResLoader.preload({
    paths: 'prefabs/LoadUI',
    type: cc.Prefab,
    bundleName: $frameEnum.Frame.EBundleName.LOAD,
  });
  t.prototype.onLoad.call(this);
  $engineExUtils.EngineExUtils.all();
  const e = new Date();
  $commonUtil.CommonUtil.print('nowData-----:', e.getTime());
  $audioManager.AudioManager.instance.stopBgm();
  $eventManager.EventManager.instance.emit($appProxy.AppEvent.BGM_CHANGED, $appProxy.BgmTypes.load);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.loadBgm = null;
  e.cacheNum = 0;
  e.md5 = !0;
  return e;
}
export const LoadScene = P;
