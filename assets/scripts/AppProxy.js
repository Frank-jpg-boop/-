import $proxyBase from './ProxyBase';
let i;
exports.appProxy = exports.BgmTypes = exports.AppEvent = void 0;
exports.AppEvent = {
  POPUP_SHOW: 'APP_POPUP_SHOW',
  POPUP_HIDE: 'APP_POPUP_HIDE',
  ENTER_GAME: 'APP_ENTER_GAME',
  AUDIO_CLICK: 'APP_AUDIO_CLICK',
  BGM_CHANGED: 'BGM_CHANGED',
  BGM_CHANGE_TOP: 'BGM_CHANGE_TOP',
  POPUP_CHANGED: 'APP_POPUP_CHANGED',
  SCENE_CHANGED: 'APP_SCENE_CHANGED',
  FRAGMENT_CHANGED: 'APP_FRAGMENT_CHANGED',
  STYLE: 'APP_STYLE',
  DAY_UPDATE: 'APP_DAY_UPDATE',
  FOLLOW_GAME: 'APP_FOLLOW_GAME',
  ADD_SHORTCUT: 'APP_ADD_SHORTCUT',
  TIME_DOWN_END: 'APP_TIME_DOWN_END',
  GAME_SHOW: 'APP_GAME_SHOW',
  GAME_HIDE: 'APP_GAME_HIDE'
};
exports.BgmTypes = {
  none: 0,
  close: 1,
  open: 2,
  load: 3,
  main: 4,
  draw: 5,
  copy: 6,
  guildBoss: 7,
  night: 8,
  jjc: 9
};
Object.defineProperty(e.prototype, "autoRef", {
  get: function () {
    return this._data.autoRef;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "buttonSound", {
  get: function () {
    return this._data.buttonSound;
  },
  set: function (t) {
    this._data.buttonSound = t;
  },
  enumerable: !1,
  configurable: !0,
});
e.prototype.setClientVersion = function (t, e) {
  this._data.clientVersion = t;
  this._data.clientCode = e;
};
Object.defineProperty(e.prototype, "clientCode", {
  get: function () {
    return this._data.clientCode;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "clientVersion", {
  get: function () {
    return this._data.clientVersion;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const a = e;
exports.appProxy = new a(function () {
  this.privacyUrl = null;
  this.agreementUrl = null;
  this.clientVersion = null;
  this.clientCode = 0;
  this.autoRef = !0;
  this.buttonSound = null;
});
