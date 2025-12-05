exports.HttpRequest = void 0;
var $userCenterMgr = require("./UserCenterMgr");
var a = (function () {
    function t() {
        this.ddd = "yuanzililiang";
    }
    Object.defineProperty(t, "inst", {
        get: function () {
            if (this._inst) {
                //
            } else {
                this._inst = new t();
            }
            return this._inst;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.request = function (t, e, n, a, s) {
        if (void 0 === s) {
            s = null;
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function () {
                return [
                    2,
                    new Promise(function (i, o) {
                        var c = new XMLHttpRequest();
                        c.timeout = 5e3;
                        c.ontimeout = function () {
                            console.error("timeout");
                            o("timeout");
                        };
                        c.onabort = function () {
                            console.error("user abort");
                            o("user abort");
                        };
                        c.onerror = function (t) {
                            console.error("onerror", t);
                            o("network error");
                        };
                        c.onreadystatechange = function () {
                            if (4 == c.readyState) {
                                if (c.status >= 200 && c.status < 400) {
                                    var t = c.response;
                                    if (1001 == t.code) {
                                        $userCenterMgr.UserCenterMgr.instance.clearToken();
                                    }
                                    i(t);
                                } else {
                                    console.log(c.status);
                                    o("error:" + c.status);
                                }
                            }
                        };
                        c.responseType = "json";
                        var l = a + e;
                        if ("GET" == t) {
                            c.open("GET", l, !0);
                            c.send();
                        } else {
                            if ("POST" == t) {
                                c.open("POST", l, !0);
                                c.setRequestHeader("Content-Type", "application/json");
                                c.setRequestHeader("Access-Control-Allow-Origin", "*");
                                c.setRequestHeader("APPID", yzll.gameConfig.appid);
                                if ("" != $userCenterMgr.UserCenterMgr.instance.token) {
                                    c.setRequestHeader("X-TOKEN", $userCenterMgr.UserCenterMgr.instance.token);
                                }
                                if (s) {
                                    c.setRequestHeader(s.key, s.value);
                                }
                                c.send(n);
                            }
                        }
                    })
                ];
            });
        });
    };
    t.prototype.encryptStr = function (t, e) {
        if (void 0 === e) {
            e = null;
        }
        if (null == t) {
            return "";
        }
        try {
            var n = CryptoJS.enc.Utf8.parse(t);
            e = CryptoJS.MD5(e || this.ddd);
            return CryptoJS.AES.encrypt(n, e, {
                iv: e,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Iso10126
            }).toString();
        } catch (t) {
            console.log("encryptStr error::", t);
        }
        return "";
    };
    t.prototype.decryptStr = function (t, e) {
        if (void 0 === e) {
            e = null;
        }
        if (null == t) {
            return "";
        }
        try {
            e = CryptoJS.MD5(e || this.ddd);
            return CryptoJS.AES.decrypt(t, e, {
                iv: e,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Iso10126
            }).toString(CryptoJS.enc.Utf8);
        } catch (t) {
            cc.log(t);
        }
        return "";
    };
    t._inst = null;
    return t;
})();
exports.HttpRequest = a;
