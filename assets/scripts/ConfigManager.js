import $frameEnum from './FrameEnum';
import $csvHelper from './CsvHelper';
export const ConfigManager = void 0;
t._instance = null;
t.prototype.strToArray = function (t, e) {
  if (void 0 === e) {
    e = '|';
  }
  return 'string' != typeof t
    ? [t]
    : t.split(e).map(function (t) {
        if (isNaN(Number(t))) {
          return t;
        } else {
          return Number(t);
        }
      });
};
t.prototype.queryOne = function (t, e) {
  const n = this.dict.get(t.prototype.JN);
  if (!n) {
    throw new Error('argument is wrong,or Method load not called,tb=' + t.prototype.JN);
  }
  for (let i, o = n.values(); !(i = o.next()).done; ) {
    const r = i.value;
    if (e(r)) {
      return r;
    }
  }
  return null;
};
t.prototype.queryAll = function (t, e, n) {
  const i = this.dict.get(t.prototype.JN);
  if (!i) {
    throw new Error('argument is wrong,or Method loadAll not called,tb=' + t.prototype.JN);
  }
  for (let o, r = new Array(), a = i.values(); !(o = a.next()).done; ) {
    const s = o.value;
    if (e(s) && (r.push(s), n && r.length >= n)) {
      break;
    }
  }
  return r;
};
t.prototype.sheet = function (t) {
  const e = this.dict.get(t.prototype.JN);
  if (!e) {
    throw new Error('argument is wrong,or Method loadAll not called,tb=' + t.prototype.JN);
  }
  return Array.from(e.values());
};
t.prototype.get = function (t, e) {
  const n = this.dict.get(t.prototype.JN);
  if (!n) {
    throw new Error('argument is wrong,or Method load not called,tb=' + t.prototype.JN);
  }
  if (!n.has(e)) {
    const i = this.itemIdDict.get(t.prototype.JN);
    if (i && i.has(e)) {
      return i.get(e);
    }
  }
  return n.get(e);
};
t.prototype.load = function (t, e) {
  const n = this;
  if (!(t.length <= 0)) {
    const r = new $csvHelper.default();
    r.loadCsv(
      t[0],
      function (i) {
        const o = new Map();
        const a = new Map();
        for (let s in i) {
          const c = i[s];
          for (let l in c)
            if (isNaN(c[l])) {
              //
            } else {
              c[l] = Number(c[l]);
            }
          if (isNaN(c.id)) {
            //
          } else {
            o.set(c.id, c);
          }
          if (c.itemID || c.itemId) {
            a.set(c.itemID || c.itemId, c);
          }
        }
        n.dict.set(t[0], o);
        n.itemIdDict.set(t[0], a);
        t.shift();
        r = null;
        if (t.length > 0) {
          n.load(t, e);
        } else {
          if (e) {
            e();
          }
        }
      },
      $frameEnum.Frame.EBundleName.CONFIG,
    );
  }
};
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this.dict = new Map();
  this.itemIdDict = new Map();
}
const r = t;
export const ConfigManager = r;
