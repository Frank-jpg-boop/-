import o from 'crypto';
(function (i) {
  export const CryptoUtil = void 0;
  t.cryptoiv = '0123456789abcdef';
  t.cryptoKey = '0123456789abcdef0123456789abcdef';
  t.Md5key = '';
  t._encrypt = null;
  t.UserCenterKey = 'yuanzililiang';
  t.decrypt = function (t) {
    t = i.from(t);
    const e = o.createDecipheriv('aes-256-cbc', this.cryptoKey, this.cryptoiv);
    const n = e.update(t);
    return i.concat([n, e.final()]);
  };
  t.encrypt = function (t) {
    t = i.from(t);
    const e = o.createCipheriv('aes-256-cbc', this.cryptoKey, this.cryptoiv);
    const n = e.update(t);
    return i.concat([n, e.final()]);
  };
  t.objFormatForJSON = function (t) {
    return JSON.parse(t);
  };
  t.objFormatToJSON = function (t) {
    return JSON.stringify(t);
  };
  t.utf8Parse = function (t) {
    return CryptoJS.enc.Utf8.parse(t);
  };
  t.aesDecrypt = function (t, e, n) {
    const i = null;
    if (n) {
      i = {
        iv: this.utf8Parse(n),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      };
    } else {
      i = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      };
    }
    const o = CryptoJS.AES.decrypt(t, this.utf8Parse(e), i);
    return CryptoJS.enc.Utf8.stringify(o);
  };
  t.aesEncrypt = function (t, e, n) {
    const i = null;
    if (n) {
      i = {
        iv: this.utf8Parse(n),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      };
    } else {
      i = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      };
    }
    return CryptoJS.AES.encrypt(t, this.utf8Parse(e), i).toString();
  };
  t.rsaEncrypt = function (t, e) {
    if (this._encrypt) {
      //
    } else {
      this._encrypt = new JSEncrypt();
      this._encrypt.setPublicKey(e);
    }
    return this._encrypt.encrypt(t);
  };
  function t() {}
  const r = t;
  export const CryptoUtil = r;
}).call(this, require('buffer').Buffer);
