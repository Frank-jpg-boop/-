import $cfg from './Cfg';
import $attrEnum from './AttrEnum';
import $playerDataProxy from './PlayerDataProxy';
exports.AttrMgr = void 0;
t._instance = null;
t.prototype.getShopRightPrice = function (t) {
  const e = this.getPlayerAttrValue($attrEnum.E_AttrType.SHOP_RATE);
  return Math.floor(t * (1 - e));
};
t.prototype.getPlayerAttrValue = function (t) {
  return this.getPlayerAttrMap().get(t) || 0;
};
t.prototype.getPlayerAttrMap = function () {
  const t = new Map();
  $cfg.default.instance.dataAtt.sheet().forEach(function (e) {
    t.set(e.id, e.val);
  });
  const e = function (e, n, i) {
    if (t.has(e)) {
      const o = t.get(e);
      if (i) {
        t.set(e, Math.floor(o * (1 + n)));
      } else {
        t.set(e, o + n);
      }
    } else {
      t.set(e, n);
    }
  };
  $playerDataProxy.playerDataProxy.buildDatas.forEach(function (t) {
    const n = $cfg.default.instance.dataBuild.queryOne(function (e) {
      return e.loc == t.loc && e.lv == t.lv;
    });
    const o = n.ImpVal3.split("|").map(Number);
    const r = Number(n.ImpVal);
    o.forEach(function (t) {
      if (0 != t) {
        e(t, r, 4 == n.loc);
      }
    });
  });
  $cfg.default.instance.dataSkin.sheet().forEach(function (t) {
    if (
      "" != t.unlockReward &&
      $playerDataProxy.playerDataProxy.isUnlockSkin(t.id)
    ) {
      const n = t.unlockReward.split("_").map(Number);
      const i = n[0];
      const o = n[1];
      e(i, o, !1);
    }
  });
  return t;
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const a = t;
exports.AttrMgr = a;
