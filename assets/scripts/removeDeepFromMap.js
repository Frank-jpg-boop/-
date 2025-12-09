function n(t, e) {
    var n = ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
    if (n) {
        return (n = n.call(t)).next.bind(n);
    }
    if (Array.isArray(t) || (n = i(t)) || (e && t && "number" == typeof t.length)) {
        if (n) {
            t = n;
        }
        var o = 0;
        return function () {
            if (o >= t.length) {
                return {
                    done: !0
                };
            } else {
                return {
                    done: !1,
                    value: t[o++]
                };
            }
        };
    }
    throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function i(t, e) {
    if (t) {
        if ("string" == typeof t) {
            return o(t, e);
        }
        var n = Object.prototype.toString.call(t).slice(8, -1);
        if ("Object" === n && t.constructor) {
            n = t.constructor.name;
        }
        return "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? o(t, e)
            : void 0;
    }
}

function o(t, e) {
    if (null == e || e > t.length) {
        e = t.length;
    }
    for (var n = 0, i = new Array(e); n < e; n++) {
        i[n] = t[n];
    }
    return i;
}
module.exports = function t(e, i) {
    for (var o, r = new Map(), a = n(e); !(o = a()).done; ) {
        var s = o.value;
        var c = s[0];
        var l = s[1];
        if (c !== i && l instanceof Map) {
            r.set(c, t(l, i));
        } else {
            if (c !== i) {
                r.set(c, l);
            }
        }
    }
    return r;
};
