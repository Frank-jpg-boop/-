import $globalEnum from './GlobalEnum';
import $proxyBase from './ProxyBase';
import $basicsProxy from './BasicsProxy';
import $localDataProxy from './LocalDataProxy';
let i;
export const userSetDataProxy = (exports.UserSetDataProxy = exports.UserSetData = void 0);
const l = function () {
  this.isVibration = !0;
  this.musicVolume = 1;
  this.effectVolume = 1;
};
export const UserSetData = l;
e.prototype.saveData = function () {
  $localDataProxy.localDataProxy.writeLocalCustomData(
    $globalEnum.Global.ELocalCustomDataKey.USER_SET,
    this._data,
  );
};
e.prototype.setVibration = function (t) {
  this._data.isVibration = t;
  this.saveData();
};
e.prototype.setEffectVolume = function (t) {
  this._data.effectVolume = t;
  this.saveData();
};
e.prototype.setMusicVolume = function (t) {
  this._data.musicVolume = t;
  this.saveData();
};
e.prototype.initData = function () {
  $basicsProxy.basicsProxy.bgmVolume = this._data.musicVolume;
  $basicsProxy.basicsProxy.effectVolume = this._data.effectVolume;
};
Object.defineProperty(e.prototype, 'isVibration', {
  get: function () {
    return this._data.isVibration;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const u = e;
export const UserSetDataProxy = u;
export const userSetDataProxy = new u(l);
