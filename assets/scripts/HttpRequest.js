import $userCenterMgr from './UserCenterMgr';
export const HttpRequest = void 0;
t._inst = null;
t.prototype.decryptStr = function (t, e) {
  if (void 0 === e) {
    e = null;
  }
  if (null == t) {
    return '';
  }
  try {
    e = CryptoJS.MD5(e || this.ddd);
    return CryptoJS.AES.decrypt(t, e, {
      iv: e,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126,
    }).toString(CryptoJS.enc.Utf8);
  } catch (t) {
    cc.log(t);
  }
  return '';
};
t.prototype.encryptStr = function (t, e) {
  if (void 0 === e) {
    e = null;
  }
  if (null == t) {
    return '';
  }
  try {
    const n = CryptoJS.enc.Utf8.parse(t);
    e = CryptoJS.MD5(e || this.ddd);
    return CryptoJS.AES.encrypt(n, e, {
      iv: e,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126,
    }).toString();
  } catch (t) {
    console.log('encryptStr error::', t);
  }
  return '';
};
t.prototype.request = function (t, e, n, a, s) {
  if (void 0 === s) {
    s = null;
  }
};
Object.defineProperty(t, 'inst', {
  get: function () {
    if (this._inst) {
      //
    } else {
      this._inst = new t();
    }
    return this._inst;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this.ddd = 'yuanzililiang';
}
const a = t;
export const HttpRequest = a;
