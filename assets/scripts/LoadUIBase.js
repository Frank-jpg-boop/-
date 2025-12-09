import $componentBase from './ComponentBase';
import $eventManager from './EventManager';
import $appProxy from './AppProxy';
import $resLoader from './ResLoader';
import $appBase from './AppBase';
import $sceneManager from './SceneManager';
import $frameEnum from './FrameEnum';
import $localDataProxy from './LocalDataProxy';
import $popupManager from './PopupManager';
let i;
exports.LoadUIBase = void 0;
const _ = cc._decorator;
const g = _.ccclass;
const v = _.property;
e.prototype.onClickBtnRepair = function () {
  this.nBtnRepair.active = !1;
  $localDataProxy.localDataProxy.clearData();
  $popupManager.PopupManager.instance.removeAll(
    $popupManager.PopupCacheMode.CACHE,
  );
  if (
    cc.sys.platform == cc.sys.WECHAT_GAME ||
    cc.sys.platform == cc.sys.BYTEDANCE_GAME
  ) {
    mm.platform.restartMiniProgramSync();
  } else {
    $sceneManager.SceneManager.instance.runScene("load", "", null, !1);
  }
};
e.prototype.loadComplete = function () {};
e.prototype.setProgress = function (t, e, n) {
  if (void 0 === n) {
    n = !1;
  }
  if (null != this.progressLabel && null != t) {
    this._msg = t;
    this._msgTag = !0;
  }
  if (n || e > this._progress) {
    this._progress = e;
    this._progressTag = !0;
  }
};
e.prototype.nextScene = function () {
  let t;
  const e = this;
  if (null === (t = this.progressLabel) || void 0 === t ? void 0 : t.node) {
    this.progressLabel.node.active = !1;
  }
  $sceneManager.SceneManager.instance.runScene(
    this.nextSceneName,
    this.nextSceneBundle,
    function () {
      $eventManager.EventManager.instance.emit($appProxy.AppEvent.ENTER_GAME);
      e.loadComplete();
    },
  );
};
e.prototype.loadConfig = function () {};
e.prototype.loadLoading = function () {};
e.prototype.update = function (t) {
  let e;
  let n;
  let i;
  let o;
  let r;
  if (this._isNet && this._progress < this._maxProgress) {
    this._progress = Number((this._progress + 0.5 * t).toFixed(2));
    this._progressTag = !0;
  }
  if (
    (null ===
      (n =
        null === (e = this.spProgress) || void 0 === e ? void 0 : e.node) ||
    void 0 === n
      ? void 0
      : n.active) &&
    this._progressTag
  ) {
    this.spProgress.fillRange = this._progress;
  }
  if (
    (null ===
      (o =
        null === (i = this.progressLabel) || void 0 === i
          ? void 0
          : i.node) || void 0 === o
      ? void 0
      : o.active) &&
    this._msgTag
  ) {
    this.progressLabel.string = this._msg;
  }
  if (
    (null === (r = this.progressBlock) || void 0 === r ? void 0 : r.active) &&
    this._progressTag
  ) {
    this.progressBlock.x =
      this.spProgress.fillRange * this.spProgress.node.width -
      this.spProgress.node.width / 2;
  }
  this._loadTime += t;
  if (this._loadTime >= 15 && !this.nBtnRepair.active) {
    this.nBtnRepair.active = !0;
  }
};
e.prototype.loadBundle = function () {};
e.prototype.initView = function () {
  this.nLoadInfo.active = !0;
  this.versionLabel.string = "v" + yzll.gameConfig.v;
};
e.prototype.loadGame = function () {};
e.prototype.start = function () {
  t.prototype.start.call(this);
  this.loadGame();
};
e.prototype.onDestroy = function () {
  t.prototype.onDestroy.call(this);
};
e.prototype.onLoad = function () {
  this.nBtnRepair.active = !1;
  t.prototype.onLoad.call(this);
};
Object.defineProperty(e.prototype, "progress", {
  get: function () {
    return this._progress;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.versionLabel = null;
  e.spProgress = null;
  e.progressLabel = null;
  e.progressBlock = null;
  e.nLoadInfo = null;
  e.nBtnRepair = null;
  e.nextSceneBundle = "";
  e.nextSceneName = "";
  e._isNet = !1;
  e._maxProgress = 0;
  e._progress = 0;
  e._progressTag = !1;
  e._msg = "";
  e._msgTag = !1;
  e.bundles = [];
  e.dirs = [];
  e._loadTime = 0;
  return e;
}
exports.LoadUIBase = b;
