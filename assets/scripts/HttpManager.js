var i;
exports.HttpManager = exports.NET_ERROR_CODE = void 0;
(function (t) {
    t[(t.NONE = 0)] = "NONE";
    t[(t.TIME_OUT = 1)] = "TIME_OUT";
    t[(t.ERROR = 2)] = "ERROR";
})((i = exports.NET_ERROR_CODE || (exports.NET_ERROR_CODE = {})));
var a = (function () {
    function t() {
        this._account = "";
        this._serverInfo = null;
        this.timeOut = 5e3;
    }
    Object.defineProperty(t.prototype, "account", {
        get: function () {
            return this._account;
        },
        set: function (t) {
            this._account = t;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.getUrl = function () {
        return "";
    };
    t.prototype.doHttpAsynGet = function (t) {
        var e = this;
        return new Promise(function (n, a) {
            return __awaiter(e, void 0, void 0, function () {
                var e;
                var o;
                return __generator(this, function () {
                    (e = new XMLHttpRequest()).onreadystatechange = function () {
                        var t = e;
                        if (4 == t.readyState && t.status >= 200 && t.status < 400 && 200 == t.status) {
                            var i = JSON.parse(t.response);
                            n(i);
                        }
                    };
                    e.ontimeout = function (t) {
                        a({
                            code: i.TIME_OUT,
                            msg: t
                        });
                    };
                    e.onerror = function (t) {
                        a({
                            code: i.ERROR,
                            msg: t
                        });
                    };
                    o = this.getUrl() + t;
                    e.open("GET", o);
                    e.setRequestHeader("X-TOKEN", this.account);
                    e.send();
                    return [2];
                });
            });
        });
    };
    t.prototype.doHttpAsynPost = function (t, e, n) {
        var a = this;
        if (void 0 === n) {
            n = "";
        }
        return new Promise(function (s, c) {
            return __awaiter(a, void 0, void 0, function () {
                var o;
                var a;
                return __generator(this, function () {
                    (o = new XMLHttpRequest()).onload = function () {
                        if (200 == o.status) {
                            var t = o.response;
                            s(t);
                        }
                    };
                    o.ontimeout = function (t) {
                        c({
                            code: i.TIME_OUT,
                            msg: t
                        });
                    };
                    o.onerror = function (t) {
                        c({
                            code: i.ERROR,
                            msg: t
                        });
                    };
                    a = t;
                    o.open("POST", a);
                    o.responseType = "json";
                    o.setRequestHeader("Content-Type", "application/json");
                    o.setRequestHeader("X-TOKEN", n);
                    o.send(e);
                    return [2];
                });
            });
        });
    };
    t.prototype.doHttpAsynPostNotToken = function (t, e) {
        var n = this;
        return new Promise(function (a, s) {
            return __awaiter(n, void 0, void 0, function () {
                var n;
                var o;
                return __generator(this, function () {
                    (n = new XMLHttpRequest()).onload = function () {
                        if (200 == n.status) {
                            var t = n.response;
                            a(t);
                        }
                    };
                    n.timeout = this.timeOut;
                    n.ontimeout = function (t) {
                        s({
                            code: i.TIME_OUT,
                            msg: t
                        });
                    };
                    n.onerror = function (t) {
                        s({
                            code: i.ERROR,
                            msg: t
                        });
                    };
                    o = t;
                    n.open("POST", o);
                    n.responseType = "json";
                    n.setRequestHeader("Content-Type", "application/json");
                    n.send(e);
                    return [2];
                });
            });
        });
    };
    t._instance = null;
    return t;
})();
exports.HttpManager = a;
