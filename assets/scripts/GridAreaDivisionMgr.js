let i;
exports.E_AreaColliderType = exports.E_AreaObjectType = void 0;
(function (t) {
  t[(t.DEFAULT = 0)] = "DEFAULT";
  t[(t.PLAYER = 1)] = "PLAYER";
  t[(t.ENEMY = 2)] = "ENEMY";
  t[(t.DOOR = 3)] = "DOOR";
  t[(t.LADDER = 4)] = "LADDER";
  t[(t.GOOD = 5)] = "GOOD";
  t[(t.ROOM_UNLOCK_AREA = 6)] = "ROOM_UNLOCK_AREA";
  t[(t.SEARCH_POINT = 7)] = "SEARCH_POINT";
  t[(t.SURVIVOR = 8)] = "SURVIVOR";
  t[(t.EVACUATION_EXIT = 9)] = "EVACUATION_EXIT";
})((i = exports.E_AreaObjectType || (exports.E_AreaObjectType = {})));
exports.E_AreaColliderType = {
  POINT: 0,
  RECT: 1
};
t.prototype.getRectAreaKeys = function (e) {
  for (const n = [], i = e.x, o = e.xMax; ; i += t.instance.gridSize) {
    if (i > o) {
      i = o;
    }
    for (const r = e.y, a = e.yMax; ; r += t.instance.gridSize) {
      if (r > a) {
        r = a;
      }
      const s = t.instance.getAreaKeyInfo(i, r).key;
      if (n.includes(s)) {
        //
      } else {
        n.push(s);
      }
      if (r >= a) {
        break;
      }
    }
    if (i >= o) {
      break;
    }
  }
  return n;
};
t.prototype.getCiclerAreaKeys = function (e, n) {
  for (const i = [], o = e.x - n, r = e.x + n; ; o += t.instance.gridSize) {
    if (o > r) {
      o = r;
    }
    for (const a = e.y - n, s = e.y + n; ; a += t.instance.gridSize) {
      if (a > s) {
        a = s;
      }
      const c = t.instance.getAreaKeyInfo(o, a).key;
      if (i.includes(c)) {
        //
      } else {
        i.push(c);
      }
      if (a >= s) {
        break;
      }
    }
    if (o >= r) {
      break;
    }
  }
  return i;
};
t.prototype.getAreaObjectList = function (t, e) {
  if (this._gridAreaObject.has(t)) {
    const n = this._gridAreaObject.get(t);
    if (n.has(e)) {
      return n.get(e);
    }
  }
  return [];
};
t.prototype.getAreaKeyInfo = function (t, e) {
  t += this._areaSize / 2;
  e += this._areaSize / 2;
  const n = Math.floor(e / this.gridSize);
  const i = Math.floor(t / this.gridSize);
  return {
    key: n + "|" + i,
    row: n,
    col: i,
  };
};
t.prototype.removeAreaObject = function (t, e) {
  const n = this._gridAreaObject.get(e);
  if (n) {
    const i = n.get(t.areaType);
    if (i) {
      const o = i.indexOf(t);
      if (-1 != o) {
        i.splice(o, 1);
      }
    }
  }
};
t.prototype.insertAreaObject = function (t, e, n) {
  const i = this.getAreaKeyInfo(n.x, n.y).key;
  if (!this._gridAreaObject.has(i)) {
    return "";
  }
  if (i == e) {
    return i;
  }
  const o = this._gridAreaObject.get(i);
  const r = this._gridAreaObject.get(e);
  if (r) {
    const a = r.get(t.areaType);
    if (a) {
      const s = a.indexOf(t);
      if (-1 != s) {
        a.splice(s, 1);
      }
    }
  }
  const c = o.get(t.areaType);
  if (c) {
    c.push(t);
  }
  return i;
};
t.prototype.init = function (t, e) {
  this._gridAreaObject = new Map();
  for (
    const n = Math.ceil(e / this.gridSize), o = Math.ceil(t / this.gridSize), r = -t / 2 + this.gridSize / 2, a = -e / 2 + this.gridSize / 2, s = 0;
    s < n;
    ++s
  ) {
    for (const c = 0; c < o; ++c) {
      const l = this.getAreaKeyInfo(
        r + c * this.gridSize,
        a + s * this.gridSize,
      ).key;
      const u = new Map();
      for (let p in i)
        if (isNaN(Number(p))) {
          //
        } else {
          u.set(Number(p), []);
        }
      this._gridAreaObject.set(l, u);
    }
  }
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (this._instance) {
      //
    } else {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this.gridSize = 100;
  this._areaSize = 5e3;
  this._gridAreaObject = null;
}
const o = t;
exports.default = o;
