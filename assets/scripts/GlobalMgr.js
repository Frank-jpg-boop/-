import $globalEnum from './GlobalEnum';
import $audioUtil from './AudioUtil';
import $eventManager from './EventManager';
import $appProxy from './AppProxy';
import $guideMgr from './GuideMgr';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f =
  (p.property,
  (function (t) {
    function e() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    let n;
    n = e;
    Object.defineProperty(e, 'instance', {
      get: function () {
        return n._instance;
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.onLoad = function () {
      n._instance = this;
      cc.game.addPersistRootNode(this.node);
      this.registerEvents();
    };
    e.prototype.registerEvents = function () {
      $eventManager.EventManager.instance.on(
        $appProxy.AppEvent.AUDIO_CLICK,
        this.playBtnAudio,
        this,
      );
      $eventManager.EventManager.instance.on($appProxy.AppEvent.BGM_CHANGED, this.playBgm, this);
    };
    e.prototype.onDestroy = function () {
      $eventManager.EventManager.instance.off(
        $appProxy.AppEvent.AUDIO_CLICK,
        this.playBtnAudio,
        this,
      );
      $eventManager.EventManager.instance.off($appProxy.AppEvent.BGM_CHANGED, this.playBgm, this);
    };
    e.prototype.playBtnAudio = function () {
      $audioUtil.AudioUtil.playEffect('sounds/lmtw_yx_Click');
    };
    e.prototype.playBgm = function (t) {
      switch (t) {
        case $globalEnum.Global.EBgmType.HOME:
          $audioUtil.AudioUtil.playMusic('sounds/lmtw_yx_PeripheryBgm');
          break;
        case $globalEnum.Global.EBgmType.GAME:
          $audioUtil.AudioUtil.playMusic('sounds/lmtw_yx_IngameBgm');
          break;
        case $globalEnum.Global.EBgmType.GAME_RESCUE:
          $audioUtil.AudioUtil.playMusic('sounds/lmtw_yx_EscapeBgm');
      }
    };
    e.prototype.update = function (t) {
      $guideMgr.GuideMgr.instance.updateGuide(t);
    };
    e._instance = null;
    return;
  })(cc.Component));
export default f;
