var n = (function () {
    var t = String.fromCharCode;
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var i = {};

    function o(t, e) {
        if (!i[t]) {
            i[t] = {};
            for (var n = 0; n < t.length; n++) {
                i[t][t.charAt(n)] = n;
            }
        }
        return i[t][e];
    }
    var r = {
        compressToBase64: function (t) {
            if (null == t) {
                return "";
            }
            var n = r._compress(t, 6, function (t) {
                return e.charAt(t);
            });
            switch (n.length % 4) {
                default:
                case 0:
                    return n;
                case 1:
                    return n + "===";
                case 2:
                    return n + "==";
                case 3:
                    return n + "=";
            }
        },
        decompressFromBase64: function (t) {
            if (null == t) {
                return "";
            } else {
                if ("" == t) {
                    return null;
                } else {
                    return r._decompress(t.length, 32, function (n) {
                        return o(e, t.charAt(n));
                    });
                }
            }
        },
        compressToUTF16: function (e) {
            if (null == e) {
                return "";
            } else {
                return (
                    r._compress(e, 15, function (e) {
                        return t(e + 32);
                    }) + " "
                );
            }
        },
        decompressFromUTF16: function (t) {
            if (null == t) {
                return "";
            } else {
                if ("" == t) {
                    return null;
                } else {
                    return r._decompress(t.length, 16384, function (e) {
                        return t.charCodeAt(e) - 32;
                    });
                }
            }
        },
        compressToUint8Array: function (t) {
            for (var e = r.compress(t), n = new Uint8Array(2 * e.length), i = 0, o = e.length; i < o; i++) {
                var a = e.charCodeAt(i);
                n[2 * i] = a >>> 8;
                n[2 * i + 1] = a % 256;
            }
            return n;
        },
        decompressFromUint8Array: function (e) {
            if (null == e) {
                return r.decompress(e);
            }
            for (var n = new Array(e.length / 2), i = 0, o = n.length; i < o; i++) {
                n[i] = 256 * e[2 * i] + e[2 * i + 1];
            }
            var a = [];
            n.forEach(function (e) {
                a.push(t(e));
            });
            return r.decompress(a.join(""));
        },
        compressToEncodedURIComponent: function (t) {
            if (null == t) {
                return "";
            } else {
                return r._compress(t, 6, function (t) {
                    return n.charAt(t);
                });
            }
        },
        decompressFromEncodedURIComponent: function (t) {
            if (null == t) {
                return "";
            } else {
                if ("" == t) {
                    return null;
                } else {
                    return (
                        (t = t.replace(/ /g, "+")),
                        r._decompress(t.length, 32, function (e) {
                            return o(n, t.charAt(e));
                        })
                    );
                }
            }
        },
        compress: function (e) {
            return r._compress(e, 16, function (e) {
                return t(e);
            });
        },
        _compress: function (t, e, n) {
            if (null == t) {
                return "";
            }
            var i;
            var o;
            var r;
            var a = {};
            var s = {};
            var c = "";
            var l = "";
            var u = "";
            var p = 2;
            var h = 3;
            var f = 2;
            var d = [];
            var m = 0;
            var y = 0;
            for (r = 0; r < t.length; r += 1) {
                c = t.charAt(r);
                Object.prototype.hasOwnProperty.call(a, c) || ((a[c] = h++), (s[c] = !0));
                l = u + c;
                if (Object.prototype.hasOwnProperty.call(a, l)) {
                    u = l;
                } else {
                    if (Object.prototype.hasOwnProperty.call(s, u)) {
                        if (u.charCodeAt(0) < 256) {
                            for (i = 0; i < f; i++) {
                                m <<= 1;
                                if (y == e - 1) {
                                    (y = 0), d.push(n(m)), (m = 0);
                                } else {
                                    y++;
                                }
                            }
                            o = u.charCodeAt(0);
                            for (i = 0; i < 8; i++) {
                                m = (m << 1) | (1 & o);
                                if (y == e - 1) {
                                    (y = 0), d.push(n(m)), (m = 0);
                                } else {
                                    y++;
                                }
                                o >>= 1;
                            }
                        } else {
                            o = 1;
                            for (i = 0; i < f; i++) {
                                m = (m << 1) | o;
                                if (y == e - 1) {
                                    (y = 0), d.push(n(m)), (m = 0);
                                } else {
                                    y++;
                                }
                                o = 0;
                            }
                            o = u.charCodeAt(0);
                            for (i = 0; i < 16; i++) {
                                m = (m << 1) | (1 & o);
                                if (y == e - 1) {
                                    (y = 0), d.push(n(m)), (m = 0);
                                } else {
                                    y++;
                                }
                                o >>= 1;
                            }
                        }
                        if (0 == --p) {
                            p = Math.pow(2, f);
                            f++;
                        }
                        delete s[u];
                    } else {
                        o = a[u];
                        for (i = 0; i < f; i++) {
                            m = (m << 1) | (1 & o);
                            if (y == e - 1) {
                                (y = 0), d.push(n(m)), (m = 0);
                            } else {
                                y++;
                            }
                            o >>= 1;
                        }
                    }
                    if (0 == --p) {
                        p = Math.pow(2, f);
                        f++;
                    }
                    a[l] = h++;
                    u = String(c);
                }
            }
            if ("" !== u) {
                if (Object.prototype.hasOwnProperty.call(s, u)) {
                    if (u.charCodeAt(0) < 256) {
                        for (i = 0; i < f; i++) {
                            m <<= 1;
                            if (y == e - 1) {
                                (y = 0), d.push(n(m)), (m = 0);
                            } else {
                                y++;
                            }
                        }
                        o = u.charCodeAt(0);
                        for (i = 0; i < 8; i++) {
                            m = (m << 1) | (1 & o);
                            if (y == e - 1) {
                                (y = 0), d.push(n(m)), (m = 0);
                            } else {
                                y++;
                            }
                            o >>= 1;
                        }
                    } else {
                        o = 1;
                        for (i = 0; i < f; i++) {
                            m = (m << 1) | o;
                            if (y == e - 1) {
                                (y = 0), d.push(n(m)), (m = 0);
                            } else {
                                y++;
                            }
                            o = 0;
                        }
                        o = u.charCodeAt(0);
                        for (i = 0; i < 16; i++) {
                            m = (m << 1) | (1 & o);
                            if (y == e - 1) {
                                (y = 0), d.push(n(m)), (m = 0);
                            } else {
                                y++;
                            }
                            o >>= 1;
                        }
                    }
                    if (0 == --p) {
                        p = Math.pow(2, f);
                        f++;
                    }
                    delete s[u];
                } else {
                    o = a[u];
                    for (i = 0; i < f; i++) {
                        m = (m << 1) | (1 & o);
                        if (y == e - 1) {
                            (y = 0), d.push(n(m)), (m = 0);
                        } else {
                            y++;
                        }
                        o >>= 1;
                    }
                }
                if (0 == --p) {
                    p = Math.pow(2, f);
                    f++;
                }
            }
            o = 2;
            for (i = 0; i < f; i++) {
                m = (m << 1) | (1 & o);
                if (y == e - 1) {
                    (y = 0), d.push(n(m)), (m = 0);
                } else {
                    y++;
                }
                o >>= 1;
            }
            for (;;) {
                m <<= 1;
                if (y == e - 1) {
                    d.push(n(m));
                    break;
                }
                y++;
            }
            return d.join("");
        },
        decompress: function (t) {
            if (null == t) {
                return "";
            } else {
                if ("" == t) {
                    return null;
                } else {
                    return r._decompress(t.length, 32768, function (e) {
                        return t.charCodeAt(e);
                    });
                }
            }
        },
        _decompress: function (e, n, i) {
            var o;
            var r;
            var a;
            var s;
            var c;
            var l;
            var u;
            var p = [];
            var h = 4;
            var f = 4;
            var d = 3;
            var m = "";
            var y = [];
            var _ = {
                val: i(0),
                position: n,
                index: 1
            };
            for (o = 0; o < 3; o += 1) {
                p[o] = o;
            }
            a = 0;
            c = Math.pow(2, 2);
            for (l = 1; l != c; ) {
                s = _.val & _.position;
                _.position >>= 1;
                0 == _.position && ((_.position = n), (_.val = i(_.index++)));
                a |= (s > 0 ? 1 : 0) * l;
                l <<= 1;
            }
            switch (a) {
                case 0:
                    for (a = 0, c = Math.pow(2, 8), l = 1; l != c; ) {
                        s = _.val & _.position;
                        _.position >>= 1;
                        0 == _.position && ((_.position = n), (_.val = i(_.index++)));
                        a |= (s > 0 ? 1 : 0) * l;
                        l <<= 1;
                    }
                    u = t(a);
                    break;
                case 1:
                    for (a = 0, c = Math.pow(2, 16), l = 1; l != c; ) {
                        s = _.val & _.position;
                        _.position >>= 1;
                        0 == _.position && ((_.position = n), (_.val = i(_.index++)));
                        a |= (s > 0 ? 1 : 0) * l;
                        l <<= 1;
                    }
                    u = t(a);
                    break;
                case 2:
                    return "";
            }
            p[3] = u;
            r = u;
            for (y.push(u); ; ) {
                if (_.index > e) {
                    return "";
                }
                a = 0;
                c = Math.pow(2, d);
                for (l = 1; l != c; ) {
                    s = _.val & _.position;
                    _.position >>= 1;
                    0 == _.position && ((_.position = n), (_.val = i(_.index++)));
                    a |= (s > 0 ? 1 : 0) * l;
                    l <<= 1;
                }
                switch ((u = a)) {
                    case 0:
                        for (a = 0, c = Math.pow(2, 8), l = 1; l != c; ) {
                            s = _.val & _.position;
                            _.position >>= 1;
                            0 == _.position && ((_.position = n), (_.val = i(_.index++)));
                            a |= (s > 0 ? 1 : 0) * l;
                            l <<= 1;
                        }
                        p[f++] = t(a);
                        u = f - 1;
                        h--;
                        break;
                    case 1:
                        for (a = 0, c = Math.pow(2, 16), l = 1; l != c; ) {
                            s = _.val & _.position;
                            _.position >>= 1;
                            0 == _.position && ((_.position = n), (_.val = i(_.index++)));
                            a |= (s > 0 ? 1 : 0) * l;
                            l <<= 1;
                        }
                        p[f++] = t(a);
                        u = f - 1;
                        h--;
                        break;
                    case 2:
                        return y.join("");
                }
                if (0 == h) {
                    h = Math.pow(2, d);
                    d++;
                }
                if (p[u]) {
                    m = p[u];
                } else {
                    if (u !== f) {
                        return null;
                    }
                    m = r + r.charAt(0);
                }
                y.push(m);
                p[f++] = r + m.charAt(0);
                r = m;
                if (0 == --h) {
                    h = Math.pow(2, d);
                    d++;
                }
            }
        }
    };
    return r;
})();
"function" == typeof define && define.amd
    ? define(function () {
          return n;
      })
    : void 0 !== module && null != module && (module.exports = n);
