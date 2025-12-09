import $globalEnum from './GlobalEnum';
import $proxyBase from './ProxyBase';
import $eventManager from './EventManager';
import $sqlUtil from './SqlUtil';
let i;
export const EUserDataEvent = {
  UPDATE_HEAD_PATH: 'update_head_path',
};
const u = function (t) {
  if (void 0 === t) {
    t = '';
  }
  this.uid = '';
  this.nickName = '我';
  this.headPath = '';
  this.uid = t;
};
export const UserData = u;;
e.prototype.activeZBGame = function () {
  $sqlUtil.SqlUtil.setLocalUserData(
    $globalEnum.Global.ELocalDataKey.ZB_ACTIVE_GAME + this._data.uid,
    1,
  );
};
e.prototype.checkActive = function () {
  return (
    !yzll.gameConfig.isZB ||
    1 ==
      $sqlUtil.SqlUtil.getLocalUserData(
        $globalEnum.Global.ELocalDataKey.ZB_ACTIVE_GAME + this._data.uid,
      )
  );
};
e.prototype.setUid = function (t) {
  this._data.uid = t;
  $sqlUtil.SqlUtil.setLocalUserData(this.uidKey, t);
};
e.prototype.setHeadPath = function (t) {
  this._data.headPath = t;
  $eventManager.EventManager.instance.emit(r.UPDATE_HEAD_PATH);
};
e.prototype.setNickName = function (t) {
  this._data.nickName = t;
};
e.prototype.initData = function () {};
Object.defineProperty(e.prototype, 'data', {
  get: function () {
    return this._data;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'codeKey', {
  get: function () {
    return $globalEnum.Global.ELocalDataKey.USER_CODE + '_' + yzll.gameConfig.name;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, 'uidKey', {
  get: function () {
    return $globalEnum.Global.ELocalDataKey.USER_UID + '_' + yzll.gameConfig.name;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const p = e;
export const UserDataProxy = p;;
export const userDataProxy = new p(u);;
