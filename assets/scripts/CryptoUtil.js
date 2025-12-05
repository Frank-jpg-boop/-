(function (i) {
    exports.CryptoUtil = void 0;
    var o = require("crypto");
    var r = (function () {
        function t() {}
        t.rsaEncrypt = function (t, e) {
            if (this._encrypt) {
                //
            } else {
                this._encrypt = new JSEncrypt();
                this._encrypt.setPublicKey(e);
            }
            return this._encrypt.encrypt(t);
        };
        t.aesEncrypt = function (t, e, n) {
            var i = null;
            if (n) {
                i = {
                    iv: this.utf8Parse(n),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                };
            } else {
                i = {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                };
            }
            return CryptoJS.AES.encrypt(t, this.utf8Parse(e), i).toString();
        };
        t.aesDecrypt = function (t, e, n) {
            var i = null;
            if (n) {
                i = {
                    iv: this.utf8Parse(n),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                };
            } else {
                i = {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                };
            }
            var o = CryptoJS.AES.decrypt(t, this.utf8Parse(e), i);
            return CryptoJS.enc.Utf8.stringify(o);
        };
        t.utf8Parse = function (t) {
            return CryptoJS.enc.Utf8.parse(t);
        };
        t.objFormatToJSON = function (t) {
            return JSON.stringify(t);
        };
        t.objFormatForJSON = function (t) {
            return JSON.parse(t);
        };
        t.encrypt = function (t) {
            t = i.from(t);
            var e = o.createCipheriv("aes-256-cbc", this.cryptoKey, this.cryptoiv);
            var n = e.update(t);
            return i.concat([n, e.final()]);
        };
        t.decrypt = function (t) {
            t = i.from(t);
            var e = o.createDecipheriv("aes-256-cbc", this.cryptoKey, this.cryptoiv);
            var n = e.update(t);
            return i.concat([n, e.final()]);
        };
        t.UserCenterKey = "yuanzililiang";
        t._encrypt = null;
        t.Md5key = "";
        t.cryptoKey = "0123456789abcdef0123456789abcdef";
        t.cryptoiv = "0123456789abcdef";
        return t;
    })();
    exports.CryptoUtil = r;
}).call(this, require("buffer").Buffer);
