exports.AttrMgr = void 0;
var $cfg = require("./Cfg");
var $attrEnum = require("./AttrEnum");
var $playerDataProxy = require("./PlayerDataProxy");
var a = (function () {
    function t() {}
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
    t.prototype.getPlayerAttrMap = function () {
        var t = new Map();
        $cfg.default.instance.dataAtt.sheet().forEach(function (e) {
            t.set(e.id, e.val);
        });
        var e = function (e, n, i) {
            if (t.has(e)) {
                var o = t.get(e);
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
            var n = $cfg.default.instance.dataBuild.queryOne(function (e) {
                return e.loc == t.loc && e.lv == t.lv;
            });
            var o = n.ImpVal3.split("|").map(Number);
            var r = Number(n.ImpVal);
            o.forEach(function (t) {
                if (0 != t) {
                    e(t, r, 4 == n.loc);
                }
            });
        });
        $cfg.default.instance.dataSkin.sheet().forEach(function (t) {
            if ("" != t.unlockReward && $playerDataProxy.playerDataProxy.isUnlockSkin(t.id)) {
                var n = t.unlockReward.split("_").map(Number);
                var i = n[0];
                var o = n[1];
                e(i, o, !1);
            }
        });
        return t;
    };
    t.prototype.getPlayerAttrValue = function (t) {
        return this.getPlayerAttrMap().get(t) || 0;
    };
    t.prototype.getShopRightPrice = function (t) {
        var e = this.getPlayerAttrValue($attrEnum.E_AttrType.SHOP_RATE);
        return Math.floor(t * (1 - e));
    };
    t._instance = null;
    return t;
})();
exports.AttrMgr = a;
