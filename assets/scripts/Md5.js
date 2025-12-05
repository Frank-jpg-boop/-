exports.md5 = void 0;
exports.md5 = function (t) {
    var e = function (t, e) {
        return (t << e) | (t >>> (32 - e));
    };
    var n = function (t, e) {
        var n;
        var i;
        var o;
        var r;
        var a;
        o = 2147483648 & t;
        r = 2147483648 & e;
        a = (1073741823 & t) + (1073741823 & e);
        return (n = 1073741824 & t) & (i = 1073741824 & e)
            ? 2147483648 ^ a ^ o ^ r
            : n | i
            ? 1073741824 & a
                ? 3221225472 ^ a ^ o ^ r
                : 1073741824 ^ a ^ o ^ r
            : a ^ o ^ r;
    };
    var i = function (t, i, o, r, a, s, c) {
        t = n(
            t,
            n(
                n(
                    (function (t, e, n) {
                        return (t & e) | (~t & n);
                    })(i, o, r),
                    a
                ),
                c
            )
        );
        return n(e(t, s), i);
    };
    var o = function (t, i, o, r, a, s, c) {
        t = n(
            t,
            n(
                n(
                    (function (t, e, n) {
                        return (t & n) | (e & ~n);
                    })(i, o, r),
                    a
                ),
                c
            )
        );
        return n(e(t, s), i);
    };
    var r = function (t, i, o, r, a, s, c) {
        t = n(
            t,
            n(
                n(
                    (function (t, e, n) {
                        return t ^ e ^ n;
                    })(i, o, r),
                    a
                ),
                c
            )
        );
        return n(e(t, s), i);
    };
    var a = function (t, i, o, r, a, s, c) {
        t = n(
            t,
            n(
                n(
                    (function (t, e, n) {
                        return e ^ (t | ~n);
                    })(i, o, r),
                    a
                ),
                c
            )
        );
        return n(e(t, s), i);
    };
    var s = function (t) {
        var e;
        var n = "";
        var i = "";
        for (e = 0; e <= 3; e++) {
            n += (i = "0" + ((t >>> (8 * e)) & 255).toString(16)).substr(i.length - 2, 2);
        }
        return n;
    };
    return (function (t) {
        var e;
        var c;
        var l;
        var u;
        var p;
        var h;
        var f;
        var d;
        var m;
        var y = Array();
        t = (function (t) {
            t = t.toString().replace(/\x0d\x0a/g, "\n");
            for (var e = "", n = 0; n < t.length; n++) {
                var i = t.charCodeAt(n);
                if (i < 128) {
                    e += String.fromCharCode(i);
                } else {
                    if (i > 127 && i < 2048) {
                        (e += String.fromCharCode((i >> 6) | 192)), (e += String.fromCharCode((63 & i) | 128));
                    } else {
                        (e += String.fromCharCode((i >> 12) | 224)),
                            (e += String.fromCharCode(((i >> 6) & 63) | 128)),
                            (e += String.fromCharCode((63 & i) | 128));
                    }
                }
            }
            return e;
        })(t);
        y = (function (t) {
            for (
                var e, n = t.length, i = n + 8, o = 16 * ((i - (i % 64)) / 64 + 1), r = Array(o - 1), a = 0, s = 0;
                s < n;

            )
                (a = (s % 4) * 8), (r[(e = (s - (s % 4)) / 4)] = r[e] | (t.charCodeAt(s) << a)), s++;
            a = (s % 4) * 8;
            r[(e = (s - (s % 4)) / 4)] = r[e] | (128 << a);
            r[o - 2] = n << 3;
            r[o - 1] = n >>> 29;
            return r;
        })(t);
        h = 1732584193;
        f = 4023233417;
        d = 2562383102;
        m = 271733878;
        for (e = 0; e < y.length; e += 16) {
            c = h;
            l = f;
            u = d;
            p = m;
            h = i(h, f, d, m, y[e + 0], 7, 3614090360);
            m = i(m, h, f, d, y[e + 1], 12, 3905402710);
            d = i(d, m, h, f, y[e + 2], 17, 606105819);
            f = i(f, d, m, h, y[e + 3], 22, 3250441966);
            h = i(h, f, d, m, y[e + 4], 7, 4118548399);
            m = i(m, h, f, d, y[e + 5], 12, 1200080426);
            d = i(d, m, h, f, y[e + 6], 17, 2821735955);
            f = i(f, d, m, h, y[e + 7], 22, 4249261313);
            h = i(h, f, d, m, y[e + 8], 7, 1770035416);
            m = i(m, h, f, d, y[e + 9], 12, 2336552879);
            d = i(d, m, h, f, y[e + 10], 17, 4294925233);
            f = i(f, d, m, h, y[e + 11], 22, 2304563134);
            h = i(h, f, d, m, y[e + 12], 7, 1804603682);
            m = i(m, h, f, d, y[e + 13], 12, 4254626195);
            d = i(d, m, h, f, y[e + 14], 17, 2792965006);
            f = i(f, d, m, h, y[e + 15], 22, 1236535329);
            h = o(h, f, d, m, y[e + 1], 5, 4129170786);
            m = o(m, h, f, d, y[e + 6], 9, 3225465664);
            d = o(d, m, h, f, y[e + 11], 14, 643717713);
            f = o(f, d, m, h, y[e + 0], 20, 3921069994);
            h = o(h, f, d, m, y[e + 5], 5, 3593408605);
            m = o(m, h, f, d, y[e + 10], 9, 38016083);
            d = o(d, m, h, f, y[e + 15], 14, 3634488961);
            f = o(f, d, m, h, y[e + 4], 20, 3889429448);
            h = o(h, f, d, m, y[e + 9], 5, 568446438);
            m = o(m, h, f, d, y[e + 14], 9, 3275163606);
            d = o(d, m, h, f, y[e + 3], 14, 4107603335);
            f = o(f, d, m, h, y[e + 8], 20, 1163531501);
            h = o(h, f, d, m, y[e + 13], 5, 2850285829);
            m = o(m, h, f, d, y[e + 2], 9, 4243563512);
            d = o(d, m, h, f, y[e + 7], 14, 1735328473);
            f = o(f, d, m, h, y[e + 12], 20, 2368359562);
            h = r(h, f, d, m, y[e + 5], 4, 4294588738);
            m = r(m, h, f, d, y[e + 8], 11, 2272392833);
            d = r(d, m, h, f, y[e + 11], 16, 1839030562);
            f = r(f, d, m, h, y[e + 14], 23, 4259657740);
            h = r(h, f, d, m, y[e + 1], 4, 2763975236);
            m = r(m, h, f, d, y[e + 4], 11, 1272893353);
            d = r(d, m, h, f, y[e + 7], 16, 4139469664);
            f = r(f, d, m, h, y[e + 10], 23, 3200236656);
            h = r(h, f, d, m, y[e + 13], 4, 681279174);
            m = r(m, h, f, d, y[e + 0], 11, 3936430074);
            d = r(d, m, h, f, y[e + 3], 16, 3572445317);
            f = r(f, d, m, h, y[e + 6], 23, 76029189);
            h = r(h, f, d, m, y[e + 9], 4, 3654602809);
            m = r(m, h, f, d, y[e + 12], 11, 3873151461);
            d = r(d, m, h, f, y[e + 15], 16, 530742520);
            f = r(f, d, m, h, y[e + 2], 23, 3299628645);
            h = a(h, f, d, m, y[e + 0], 6, 4096336452);
            m = a(m, h, f, d, y[e + 7], 10, 1126891415);
            d = a(d, m, h, f, y[e + 14], 15, 2878612391);
            f = a(f, d, m, h, y[e + 5], 21, 4237533241);
            h = a(h, f, d, m, y[e + 12], 6, 1700485571);
            m = a(m, h, f, d, y[e + 3], 10, 2399980690);
            d = a(d, m, h, f, y[e + 10], 15, 4293915773);
            f = a(f, d, m, h, y[e + 1], 21, 2240044497);
            h = a(h, f, d, m, y[e + 8], 6, 1873313359);
            m = a(m, h, f, d, y[e + 15], 10, 4264355552);
            d = a(d, m, h, f, y[e + 6], 15, 2734768916);
            f = a(f, d, m, h, y[e + 13], 21, 1309151649);
            h = a(h, f, d, m, y[e + 4], 6, 4149444226);
            m = a(m, h, f, d, y[e + 11], 10, 3174756917);
            d = a(d, m, h, f, y[e + 2], 15, 718787259);
            f = a(f, d, m, h, y[e + 9], 21, 3951481745);
            h = n(h, c);
            f = n(f, l);
            d = n(d, u);
            m = n(m, p);
        }
        return (s(h) + s(f) + s(d) + s(m)).toLowerCase();
    })(t);
};
