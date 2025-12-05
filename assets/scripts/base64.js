(function (t, i) {
    (function (t, i) {
        var o;
        var r;
        if ("object" == typeof exports && void 0 !== module) {
            module.exports = i();
        } else {
            if ("function" == typeof define && define.amd) {
                define(i);
            } else {
                (o = t.Base64),
                    ((r = i()).noConflict = function () {
                        t.Base64 = o;
                        return r;
                    }),
                    t.Meteor && (Base64 = r),
                    (t.Base64 = r);
            }
        }
    })(
        "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : void 0,
        function () {
            var t;
            var e = "function" == typeof i;
            var n = null;
            if ("function" == typeof TextDecoder) {
                n = new TextDecoder();
            } else {
                n = void 0;
            }
            var o = null;
            if ("function" == typeof TextEncoder) {
                o = new TextEncoder();
            } else {
                o = void 0;
            }
            var r = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
            var a =
                ((t = {}),
                r.forEach(function (e, n) {
                    return (t[e] = n);
                }),
                t);
            var s = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
            var c = String.fromCharCode.bind(String);
            var l = null;
            if ("function" == typeof Uint8Array.from) {
                l = Uint8Array.from.bind(Uint8Array);
            } else {
                l = function (t) {
                    return new Uint8Array(Array.prototype.slice.call(t, 0));
                };
            }
            var u = function (t) {
                return t.replace(/=/g, "").replace(/[+\/]/g, function (t) {
                    if ("+" == t) {
                        return "-";
                    } else {
                        return "_";
                    }
                });
            };
            var p = function (t) {
                return t.replace(/[^A-Za-z0-9\+\/]/g, "");
            };
            var h = function (t) {
                for (var e, n, i, o, a = "", s = t.length % 3, c = 0; c < t.length; ) {
                    if (
                        (n = t.charCodeAt(c++)) > 255 ||
                        (i = t.charCodeAt(c++)) > 255 ||
                        (o = t.charCodeAt(c++)) > 255
                    ) {
                        throw new TypeError("invalid character found");
                    }
                    a +=
                        r[((e = (n << 16) | (i << 8) | o) >> 18) & 63] +
                        r[(e >> 12) & 63] +
                        r[(e >> 6) & 63] +
                        r[63 & e];
                }
                if (s) {
                    return a.slice(0, s - 3) + "===".substring(s);
                } else {
                    return a;
                }
            };
            var f = null;
            if ("function" == typeof btoa) {
                f = function (t) {
                    return btoa(t);
                };
            } else {
                if (e) {
                    f = function (t) {
                        return i.from(t, "binary").toString("base64");
                    };
                } else {
                    f = h;
                }
            }
            var d = null;
            if (e) {
                d = function (t) {
                    return i.from(t).toString("base64");
                };
            } else {
                d = function (t) {
                    for (var e = [], n = 0, i = t.length; n < i; n += 4096) {
                        e.push(c.apply(null, t.subarray(n, n + 4096)));
                    }
                    return f(e.join(""));
                };
            }
            var m = function (t, e) {
                if (void 0 === e) {
                    e = !1;
                }
                return e ? u(d(t)) : d(t);
            };
            var y = function (t) {
                if (t.length < 2) {
                    if ((e = t.charCodeAt(0)) < 128) {
                        return t;
                    } else {
                        if (e < 2048) {
                            return c(192 | (e >>> 6)) + c(128 | (63 & e));
                        } else {
                            return c(224 | ((e >>> 12) & 15)) + c(128 | ((e >>> 6) & 63)) + c(128 | (63 & e));
                        }
                    }
                }
                var e = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
                return (
                    c(240 | ((e >>> 18) & 7)) +
                    c(128 | ((e >>> 12) & 63)) +
                    c(128 | ((e >>> 6) & 63)) +
                    c(128 | (63 & e))
                );
            };
            var _ = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
            var g = function (t) {
                return t.replace(_, y);
            };
            var v = null;
            if (e) {
                v = function (t) {
                    return i.from(t, "utf8").toString("base64");
                };
            } else {
                if (o) {
                    v = function (t) {
                        return d(o.encode(t));
                    };
                } else {
                    v = function (t) {
                        return f(g(t));
                    };
                }
            }
            var b = function (t, e) {
                if (void 0 === e) {
                    e = !1;
                }
                return e ? u(v(t)) : v(t);
            };
            var E = function (t) {
                return b(t, !0);
            };
            var S = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
            var P = function (t) {
                switch (t.length) {
                    case 4:
                        var e =
                            (((7 & t.charCodeAt(0)) << 18) |
                                ((63 & t.charCodeAt(1)) << 12) |
                                ((63 & t.charCodeAt(2)) << 6) |
                                (63 & t.charCodeAt(3))) -
                            65536;
                        return c(55296 + (e >>> 10)) + c(56320 + (1023 & e));
                    case 3:
                        return c(
                            ((15 & t.charCodeAt(0)) << 12) | ((63 & t.charCodeAt(1)) << 6) | (63 & t.charCodeAt(2))
                        );
                    default:
                        return c(((31 & t.charCodeAt(0)) << 6) | (63 & t.charCodeAt(1)));
                }
            };
            var A = function (t) {
                return t.replace(S, P);
            };
            var w = function (t) {
                t = t.replace(/\s+/g, "");
                if (!s.test(t)) {
                    throw new TypeError("malformed base64.");
                }
                t += "==".slice(2 - (3 & t.length));
                for (var e, n, i, o = "", r = 0; r < t.length; ) {
                    e =
                        (a[t.charAt(r++)] << 18) |
                        (a[t.charAt(r++)] << 12) |
                        ((n = a[t.charAt(r++)]) << 6) |
                        (i = a[t.charAt(r++)]);
                    if (64 === n) {
                        o += c((e >> 16) & 255);
                    } else {
                        if (64 === i) {
                            o += c((e >> 16) & 255, (e >> 8) & 255);
                        } else {
                            o += c((e >> 16) & 255, (e >> 8) & 255, 255 & e);
                        }
                    }
                }
                return o;
            };
            var C = null;
            if ("function" == typeof atob) {
                C = function (t) {
                    return atob(p(t));
                };
            } else {
                if (e) {
                    C = function (t) {
                        return i.from(t, "base64").toString("binary");
                    };
                } else {
                    C = w;
                }
            }
            var M = null;
            if (e) {
                M = function (t) {
                    return l(i.from(t, "base64"));
                };
            } else {
                M = function (t) {
                    return l(
                        C(t)
                            .split("")
                            .map(function (t) {
                                return t.charCodeAt(0);
                            })
                    );
                };
            }
            var I = function (t) {
                return M(D(t));
            };
            var R = null;
            if (e) {
                R = function (t) {
                    return i.from(t, "base64").toString("utf8");
                };
            } else {
                if (n) {
                    R = function (t) {
                        return n.decode(M(t));
                    };
                } else {
                    R = function (t) {
                        return A(C(t));
                    };
                }
            }
            var D = function (t) {
                return p(
                    t.replace(/[-_]/g, function (t) {
                        if ("-" == t) {
                            return "+";
                        } else {
                            return "/";
                        }
                    })
                );
            };
            var T = function (t) {
                return R(D(t));
            };
            var B = function (t) {
                return {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                };
            };
            var O = function () {
                var t = function (t, e) {
                    return Object.defineProperty(String.prototype, t, B(e));
                };
                t("fromBase64", function () {
                    return T(this);
                });
                t("toBase64", function (t) {
                    return b(this, t);
                });
                t("toBase64URI", function () {
                    return b(this, !0);
                });
                t("toBase64URL", function () {
                    return b(this, !0);
                });
                t("toUint8Array", function () {
                    return I(this);
                });
            };
            var x = function () {
                var t = function (t, e) {
                    return Object.defineProperty(Uint8Array.prototype, t, B(e));
                };
                t("toBase64", function (t) {
                    return m(this, t);
                });
                t("toBase64URI", function () {
                    return m(this, !0);
                });
                t("toBase64URL", function () {
                    return m(this, !0);
                });
            };
            var k = {
                version: "3.7.7",
                VERSION: "3.7.7",
                atob: C,
                atobPolyfill: w,
                btoa: f,
                btoaPolyfill: h,
                fromBase64: T,
                toBase64: b,
                encode: b,
                encodeURI: E,
                encodeURL: E,
                utob: g,
                btou: A,
                decode: T,
                isValid: function (t) {
                    if ("string" != typeof t) {
                        return !1;
                    }
                    var e = t.replace(/\s+/g, "").replace(/={0,2}$/, "");
                    return !/[^\s0-9a-zA-Z\+/]/.test(e) || !/[^\s0-9a-zA-Z\-_]/.test(e);
                },
                fromUint8Array: m,
                toUint8Array: I,
                extendString: O,
                extendUint8Array: x,
                extendBuiltins: function () {
                    O();
                    x();
                },
                Base64: {}
            };
            Object.keys(k).forEach(function (t) {
                return (k.Base64[t] = k[t]);
            });
            return k;
        }
    );
}).call(
    this,
    "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
        ? window
        : {},
    require("buffer").Buffer
);
