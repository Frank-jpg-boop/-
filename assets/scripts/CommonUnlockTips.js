var i;
exports.EUnlockType = void 0;
var a;
var $cfg = require("./Cfg");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $animUtils = require("./AnimUtils");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
!(function (t) {
    t[(t.GOLD = 1)] = "GOLD";
    t[(t.AD = 2)] = "AD";
    t[(t.ITEM = 3)] = "ITEM";
    t[(t.TIPS = 4)] = "TIPS";
})((a = exports.EUnlockType || (exports.EUnlockType = {})));
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nGold = null;
        e.nAd = null;
        e.nItem = null;
        e.nTips = null;
        e._roomId = 0;
        e._onClickAd = null;
        e._onClickItem = null;
        e._isLockClick = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.initTips = function (t, e, n, i, o, r) {
        if (void 0 === r) {
            r = "";
        }
        this._isLockClick = !1;
        this._onClickAd = i;
        this._onClickItem = o;
        this.nGold.active = t == a.GOLD;
        this.nAd.active = t == a.AD;
        this.nItem.active = t == a.ITEM;
        this.nTips.active = t == a.TIPS;
        if (this.nItem.active) {
            var u = $cfg.default.instance.dataReward.getById(n);
            $resLoader.ResLoader.setSpritFrame(
                this.nItem.getChildByName("View").getChildByName("Icon").getComponent(cc.Sprite),
                $frameEnum.Frame.EBundleName.RES,
                "textures/atlas/item_scene/" + u.spr
            );
        }
        if (this.nTips.active) {
            this.nTips.getChildByName("View").getChildByName("Desc").getComponent(cc.Label).string = r;
        }
        this.updateTips(e);
    };
    e.prototype.setLockClick = function (t) {
        this._isLockClick = t;
    };
    e.prototype.showTips = function (t) {
        var e = this;
        if (void 0 === t) {
            t = null;
        }
        this.node.scale = 0;
        cc.tween(this.node)
            .to(
                0.3,
                {
                    scale: 1
                },
                {
                    easing: "backOut"
                }
            )
            .call(function () {
                $animUtils.AnimUtil.swingAnim(e.node, 15, 0, 0.5, 1);
                if (t) {
                    t();
                }
            })
            .start();
    };
    e.prototype.updateTips = function (t) {
        if (this.nGold.active) {
            this.nGold.getChildByName("View").getChildByName("Value").getComponent(cc.Label).string = t.toString();
        }
    };
    e.prototype.hideTips = function (t) {
        var e = this;
        if (void 0 === t) {
            t = !1;
        }
        cc.Tween.stopAllByTarget(this.node);
        this.node.angle = 0;
        cc.tween(this.node)
            .to(0.1, {
                scale: 0
            })
            .call(function () {
                e.node.active = !1;
                if (t) {
                    e.node.destroy();
                }
            })
            .start();
    };
    e.prototype.onClickBtnClickKey = function () {
        if (this._isLockClick) {
            //
        } else {
            if (this._onClickItem) {
                this._onClickItem();
            }
        }
    };
    e.prototype.onClickBtnClickAd = function () {
        if (this._isLockClick) {
            //
        } else {
            if (this._onClickAd) {
                this._onClickAd();
            }
        }
    };
    __decorate([f(cc.Node)], e.prototype, "nGold", void 0);
    __decorate([f(cc.Node)], e.prototype, "nAd", void 0);
    __decorate([f(cc.Node)], e.prototype, "nItem", void 0);
    __decorate([f(cc.Node)], e.prototype, "nTips", void 0);
    return __decorate([h], e);
})(cc.Component);
exports.default = d;
