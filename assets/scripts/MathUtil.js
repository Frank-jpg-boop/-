import $randomUtil from './RandomUtil';
exports.MathUtil = exports.SortAlgorithm = exports.SortOrder = void 0;
let o;
let r;
(function (t) {
  t[(t.ASC = 0)] = "ASC";
  t[(t.DESC = 1)] = "DESC";
})((o = exports.SortOrder || (exports.SortOrder = {})));
(function (t) {
  t[(t.SYSTEM = 0)] = "SYSTEM";
  t[(t.BUBBLE = 1)] = "BUBBLE";
  t[(t.DICHOTOMY = 2)] = "DICHOTOMY";
  t[(t.INSERTION = 3)] = "INSERTION";
})((r = exports.SortAlgorithm || (exports.SortAlgorithm = {})));
t.coinType = [
  "",
  "K",
  "M",
  "B",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "ag",
  "ah",
  "ai",
  "aj",
  "ak",
  "al",
  "am",
  "an",
  "ao",
  "ap",
  "aq",
  "ar",
  "as",
  "at",
  "au",
  "av",
  "aw",
  "ax",
  "ay",
  "az",
];
t.getPerpendicularVector = function (t, e) {
  return cc.v2(-t.y, t.x).add(e);
};
t.vec2Fixed = function (e, n) {
  if (void 0 === n) {
    n = 3;
  }
  e.x = t.toFixed(e.x, n);
  e.y = t.toFixed(e.y, n);
  return e;
};
t.getCirclePoints = function (t, e, n, i) {
  if (void 0 === i) {
    i = 60;
  }
  for (
    const o = [], r = (Math.PI / 180) * Math.round(360 / n), a = 0;
    a < n;
    a++
  ) {
    const s = Math.sin(r * a);
    const c = Math.cos(r * a);
    const l = e.x + t * s;
    const u = e.y + t * c;
    o.unshift(cc.v3(l + Math.random() * i, u + Math.random() * i, 0));
  }
  return o;
};
t.weightedRandom = function (t) {
  if (!t || 0 == t.length) {
    return -1;
  }
  if (1 == t.length) {
    return 0;
  }
  const e = 0;
  t.forEach(function (t) {
    e += t;
  });
  for (
    const n = $randomUtil.RandomUtil.randomInt(0, e), i = 0;
    i < t.length;
    ++i
  ) {
    if (n < t[i]) {
      return i;
    }
    n -= t[i];
  }
  return -1;
};
t.transProbByWeight = function (t, e) {
  return (
    t /
    e.reduce(function (t, e) {
      return t + e;
    }, 0)
  );
};
t.bezierTo = function (e, n, i, o, r, a, s) {
  if (void 0 === s) {
    s = "";
  }
  const c = i.x;
  const l = i.y;
  const u = o.x;
  const p = o.y;
  const h = Object.create(null);
  h.progress = function (e, n, i, o) {
    i.x = t.bezier(e.x, c, u, n.x, o);
    i.y = t.bezier(e.y, l, p, n.y, o);
    if (a) {
      a(i, o);
    }
    return i;
  };
  if ("" != s) {
    h.easing = s;
  }
  return cc.tween(e).to(
    n,
    {
      position: r,
    },
    h,
  );
};
t.bezier = function (t, e, n, i, o) {
  const r = 1 - o;
  return r * (r * (t + (3 * e - t) * o) + 3 * n * o * o) + i * o * o * o;
};
t.lerp = function (t, e, n) {
  return t + (e - t) * n;
};
t.numToChinese = function (t) {
  if (!/^\d*(\.\d*)?$/.test(t)) {
    alert("Number is wrong!");
    return "Number is wrong!";
  }
  for (
    const e = new Array(
              "零",
              "一",
              "二",
              "三",
              "四",
              "五",
              "六",
              "七",
              "八",
              "九",
            ),
          n = new Array("", "十", "百", "千", "万", "亿", "点", ""),
          i = ("" + t).replace(/(^0*)/g, "").split("."),
          o = 0,
          r = "",
          a = i[0].length - 1;
    a >= 0;
    a--
  ) {
    switch (o) {
      case 0:
        r = n[7] + r;
        break;
      case 4:
        if (
          new RegExp("0{4}\\d{" + (i[0].length - a - 1) + "}$").test(i[0])
        ) {
          //
        } else {
          r = n[4] + r;
        }
        break;
      case 8:
        r = n[5] + r;
        n[7] = n[5];
        o = 0;
    }
    if (
      o % 4 == 2 &&
      0 != Number(i[0].charAt(a + 2)) &&
      0 == Number(i[0].charAt(a + 1))
    ) {
      r = e[0] + r;
    }
    if (0 != Number(i[0].charAt(a))) {
      r = e[i[0].charAt(a)] + n[o % 4] + r;
    }
    o++;
  }
  if (i.length > 1) {
    r += n[6];
    for (a = 0; a < i[1].length; a++) {
      r += e[i[1].charAt(a)];
    }
  }
  return r;
};
t.radians2Angle = function (t) {
  return (180 / Math.PI) * t;
};
t.angle2Radians = function (t) {
  return (Math.PI / 180) * t;
};
t.getMinRotate = function (t) {
  if (t >= 360) {
    return ((t -= 360), this.getMinRotate(t));
  } else {
    if (t < 0) {
      return ((t += 360), this.getMinRotate(t));
    } else {
      return t;
    }
  }
};
t.formatNumber = function (t, e) {
  if (void 0 === e) {
    e = 1;
  }
  return t ? (t % 1 == 0 ? t.toFixed(0) : t.toFixed(e)) : "0";
};
t.toCeil = function (t, e) {
  const n = Math.pow(10, e);
  return Math.ceil(t * n) / n;
};
t.toFloor = function (t, e) {
  const n = Math.pow(10, e);
  return Math.floor(t * n) / n;
};
t.toFixed = function (t, e) {
  return Number(t.toFixed(e));
};
t.sort = function (t, e, n, a) {
  if (void 0 === e) {
    e = null;
  }
  if (void 0 === n) {
    n = o.ASC;
  }
  if (void 0 === a) {
    a = r.SYSTEM;
  }
  if (t.length <= 1) {
    return t;
  }
  if (r.SYSTEM === a) {
    return t.sort(function (t, i) {
      const r = null;
      if (t && e) {
        r = t[e];
      } else {
        r = t || 0;
      }
      const a = null;
      if (i && e) {
        a = i[e];
      } else {
        a = i || 0;
      }
      if (o.ASC === n) {
        return r - a;
      } else {
        return a - r;
      }
    });
  }
  if (r.BUBBLE === a) {
    for (const s = (b = t.length), c = 0; c < b; c++) {
      for (
        const l = t[0] && e ? t[0][e] : t[0] || 0, u = !0, p = s - 1, h = 0;
        h < p;
        h++
      ) {
        const f = null;
        if (t[h + 1] && e) {
          f = t[h + 1][e];
        } else {
          f = t[h + 1] || 0;
        }
        if ((o.ASC === n && l > f) || (o.DESC === n && l < f)) {
          const d = t[h];
          t[h] = t[h + 1];
          t[h + 1] = d;
          u = !1;
          s = h + 1;
        } else {
          l = f;
        }
      }
      if (u) {
        break;
      }
    }
    return t;
  }
  if (r.DICHOTOMY === a) {
    const m = t.length >> 1;
    const y = null;
    if (t[m] && e) {
      y = t[m][e];
    } else {
      y = t[m] || 0;
    }
    const _ = [];
    const g = [];
    for (c = 0; c < t.length; c++) {
      if (c !== m) {
        const v = null;
        if (t[c] && e) {
          v = t[c][e];
        } else {
          v = t[c] || 0;
        }
        if (v === y) {
          if (c < m) {
            _.push(t[c]);
          } else {
            g.push(t[c]);
          }
        } else {
          if ((o.ASC === n && v > y) || (o.DESC === n && v < y)) {
            g.push(t[c]);
          } else {
            _.push(t[c]);
          }
        }
      }
    }
    return __spreadArrays(
      this.sort(_, e, n, a),
      [t[m]],
      this.sort(g, e, n, a),
    );
  }
  if (r.INSERTION === a) {
    const b = t.length;
    for (c = 1; c < b; c++) {
      if (t[c] && e) {
        l = t[c][e];
      } else {
        l = t[c] || 0;
      }
      if (o.ASC === n) {
        s = 0;
        for (h = c - 1; h >= 0; h--) {
          if (l >= (f = t[h] && e ? t[h][e] : t[h] || 0)) {
            s = h + 1;
            break;
          }
        }
        d = t[c];
        for (const E = c; E > s; E--) {
          t[E] = t[E - 1];
        }
        t[s] = d;
      } else {
        s = c;
        for (h = 0; h < c; h++) {
          if (l < (f = t[h] && e ? t[h][e] : t[h] || 0)) {
            s = h;
            break;
          }
        }
        d = t[c];
        for (E = c; E > s; E--) {
          t[E] = t[E - 1];
        }
        t[s] = d;
      }
    }
    return t;
  }
  return t;
};
t.toNonExponential = function (t) {
  if (t == 1 / 0) {
    t = 99e306;
  }
  const e = t.toExponential().split("e");
  const n = 0;
  if (e[0].split(".").length > 1) {
    n = e[0].split(".")[1].length;
  }
  if (n) {
    e[0] = e[0].replace(".", "");
  }
  for (const i = Number(e[1].replace("+", "")), o = n; o < i; o++) {
    e[0] += "0";
  }
  return e[0];
};
t.formatValue = function (t, e, n) {
  if (void 0 === e) {
    e = 1;
  }
  if (void 0 === n) {
    n = 3;
  }
  if (isNaN(t)) {
    return "0";
  }
  if ((t = Number(t)) < 1e4) {
    return this.formatNumber(t, e);
  }
  const i = 1;
  const o = t % 1e3;
  if (o < 100 && 0 != o) {
    i = 2;
  }
  const r = (t = Math.floor(t)).toString();
  if (t >= 1e20) {
    r = this.toNonExponential(t);
  }
  for (const a = r.split(""), s = "", c = 0, l = a.length - 1; l >= 0; l--) {
    0 != c && c % n == 0 && (s = "-" + s);
    s = a[l] + s;
    c++;
  }
  if (t >= 1e4) {
    return this.GetCoinStringDot(s, e, i);
  } else {
    return t.toString();
  }
};
t.GetCoinStringDot = function (t, e, n) {
  if (void 0 === n) {
    n = 1;
  }
  const i = "";
  const o = t.split("-");
  const r = o.length;
  const a = (r = r > this.coinType.length ? this.coinType.length : r) - e;
  if (a < 0) {
    a = 0;
  } else {
    a = a;
  }
  for (
    const s = this.coinType[a], c = Math.min(o.length, 2), l = 0;
    l < c;
    l++
  ) {
    const u = Number(o[l]);
    if (
      (0 != u || 0 !== l) &&
      (0 === l && (i += u + (c > 1 ? "." : "")), 1 === l)
    ) {
      const p = "";
      if (1 == n) {
        p = (u / 1e3).toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
      } else {
        if (
          (p = (u / 1e3).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0])
            .length <= 1
        ) {
          p += "0";
        }
      }
      const h = p;
      if (p.includes(".")) {
        h = p.split(".")[1];
      }
      i += h;
    }
  }
  if (i) {
    if (i.includes(".")) {
      const f = i.split(".");
      if (f[0].length >= 3) {
        i = i.substring(0, 3);
      } else {
        if (f[0].length + f[1].length > 3) {
          i = f[0] + "." + f[1].substring(0, 3 - f[0].length);
        }
      }
    }
    i += s;
  } else {
    i += "0";
  }
  return i;
};
t.GetCoinString = function (t, e) {
  const n = "";
  const i = t.split("-");
  const o = i.length;
  const r = (o = o > this.coinType.length ? this.coinType.length : o) - e;
  if (r < 0) {
    r = 0;
  } else {
    r = r;
  }
  for (const a = [], s = o - 1; s >= r; s--) {
    a.push(this.coinType[s]);
  }
  for (s = 0; s < a.length; s++) {
    const c = Number(i[s]);
    if (0 != c) {
      n += c + a[s];
    }
  }
  return n + (n ? "" : "0");
};
function t() {}
const s = t;
exports.MathUtil = s;
