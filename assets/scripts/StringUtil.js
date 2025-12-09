exports.StringBuffer = exports.StringUtil = void 0;
(function (t) {
    function e(t) {
        return null == t || "" === t;
    }

    function n() {
        for (var t = [], n = 0; n < arguments.length; n++) {
            t[n] = arguments[n];
        }
        if (null == t || 0 == t.length) {
            return !0;
        }
        for (var i in t)
            if (e(i)) {
                return !0;
            }
        return !1;
    }
    t.formatDescStr = function (t, e, n, i) {
        if (void 0 === i) {
            i = /\[(.*?)\]/g;
        }
        return t.replace(i, function (t, i) {
            var o = !1;
            var r = i;
            if (i.includes("%")) {
                o = !0;
                r = i.slice(0, i.length - 1);
            }
            if (e.hasOwnProperty(r)) {
                var a = e[r];
                if (o) {
                    return (
                        "string" == typeof a && (a = a.split("|").map(Number)[n - 1]),
                        (a *= 100),
                        (a = Math.round(100 * a) / 100) % 1 == 0 ? Math.floor(a) + "%" : a + "%"
                    );
                } else {
                    return "string" == typeof a && (a = a.split("|").map(Number)[n - 1]), a;
                }
            }
            return t;
        });
    };
    t.transRichText = function (t, e) {
        if (void 0 === e) {
            e = "#69FF3A";
        }
        return (
            "<outline color=black width=1>" +
            t.replace(/(\d+%)|(\d+\u79d2)|(\d+)/g, function (t) {
                return "<color=" + e + ">" + t + "</color>";
            }) +
            "</color>"
        );
    };
    t.isEmpty = e;
    t.isNotEmpty = function (t) {
        return !e(t);
    };
    t.isAnyEmpty = n;
    t.isNoneEmpty = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
        return !n.apply(void 0, t);
    };
    t.versionCompare = function (t, e) {
        for (var n = t.split("."), i = e.split("."), o = 0; o < n.length; o++) {
            if (null == i[o]) {
                return 1;
            }
            if (n[o] != i[o]) {
                return Number(n[o]) - Number(i[o]);
            }
        }
        return 0;
    };
    t.copyObj = function t(e) {
        var n;
        for (var i in ((n = "[object Array]" === Object.prototype.toString.call(e) ? [] : {}), e))
            null == e[i] ? (n[i] = e[i]) : "object" == typeof e[i] ? (n[i] = t(e[i])) : (n[i] = e[i]);
        return n;
    };
    t.strLenLimit = function (t, e, n) {
        if (void 0 === e) {
            e = 8;
        }
        if (void 0 === n) {
            n = "...";
        }
        var i = t;
        if (t.length > e) {
            i = t.substring(0, e);
            i += n;
        }
        return i;
    };
})(exports.StringUtil || (exports.StringUtil = {}));
var i = (function () {
    function t() {
        this._strings = new Array();
    }
    t.prototype.append = function (t) {
        this._strings.push(t);
    };
    t.prototype.toString = function () {
        return this._strings.join("");
    };
    return t;
})();
exports.StringBuffer = i;
