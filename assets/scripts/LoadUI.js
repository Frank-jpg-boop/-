import $cfg from './Cfg';
import $sqlUtil from './SqlUtil';
import $frameEnum from './FrameEnum';
import $loadUIBase from './LoadUIBase';
import $redPointMgr from './RedPointMgr';
import $dataMgr from './DataMgr';
import $guideMgr from './GuideMgr';
import $userCenterMgr from './UserCenterMgr';
import $guideDataProxy from './GuideDataProxy';
import $stageDataProxy from './StageDataProxy';
import $userDataProxy from './UserDataProxy';
import $zBActiveView from './ZBActiveView';
let i;
exports.LoadUI = void 0;
const b = cc._decorator;
const E = b.ccclass;
const S = b.property;
e.prototype.checkZBActive = function (t) {};
e.prototype.login = function (t) {};
e.prototype.loadComplete = function () {};
e.prototype.onChannelLogin = function () {};
e.prototype.loadUserData = function () {};
e.prototype.loadConfigRes = function () {};
e.prototype.onLoadDealChannel = function () {};
e.prototype.onDestroy = function () {
  t.prototype.onDestroy.call(this);
};
e.prototype.onLoad = function () {
  this.zbActiveView.node.active = !1;
  t.prototype.onLoad.call(this);
  this.bundles.push(
    $frameEnum.Frame.EBundleName.RES_TT,
    $frameEnum.Frame.EBundleName.CONFIG,
    $frameEnum.Frame.EBundleName.RES,
    $frameEnum.Frame.EBundleName.GAME,
    $frameEnum.Frame.EBundleName.HOME,
  );
  this.onLoadDealChannel();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.zbActiveView = null;
  return e;
}
exports.LoadUI = P;
