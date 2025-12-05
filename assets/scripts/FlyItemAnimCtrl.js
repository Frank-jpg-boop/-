var i;
exports.EFlyItemAnimEvent = void 0;
var a;
var $cfg = require("./Cfg");
var $itemDataProxy = require("./ItemDataProxy");
var $eventManager = require("./EventManager");
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $animUtils = require("./AnimUtils");
var $nodeUtil = require("./NodeUtil");
var m = cc._decorator;
var y = m.ccclass;
var _ = m.property;
!(function (t) {
    t.FLY_ITEM_ANIM = "EFlyItemAnimEvent.fly_item_anim";
})((a = exports.EFlyItemAnimEvent || (exports.EFlyItemAnimEvent = {})));
var g = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.pFlyItem = null;
        e._layerMap = null;
        e._targetWorldPosMap = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(a.FLY_ITEM_ANIM, this.flyItemAnim, this);
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(a.FLY_ITEM_ANIM, this.flyItemAnim, this);
    };
    e.prototype.init = function (t, e) {
        this._layerMap = t;
        this._targetWorldPosMap = e;
    };
    e.prototype.flyItemAnim = function (t) {
        if (this.node.activeInHierarchy) {
            var e = this._layerMap.get(t.layerType);
            if (e) {
                var n = this._targetWorldPosMap.get(t.itemId);
                if (n) {
                    for (
                        var i = $nodeUtil.default.nodeLocalPos(e, t.startWorldPos),
                            o = $nodeUtil.default.nodeLocalPos(e, n),
                            r = [],
                            a = function () {
                                var n = $nodePoolManager.default.instance.getNode(l.pFlyItem);
                                if (2 == $cfg.default.instance.dataItem.getById(t.itemId).type) {
                                    n.scale = 0.7;
                                } else {
                                    n.scale = 1;
                                }
                                e.addChild(n, t.isTop ? cc.macro.MAX_ZINDEX : void 0);
                                $resLoader.ResLoader.loadAsset({
                                    bundleName: $frameEnum.Frame.EBundleName.RES,
                                    path: $itemDataProxy.itemDataProxy.getItemIconPath(t.itemId),
                                    type: cc.SpriteFrame
                                })
                                    .then(function (t) {
                                        n.getChildByName("Icon").getComponent(cc.Sprite).spriteFrame = t;
                                    })
                                    .catch(function () {});
                                n.setPosition($nodeUtil.default.nodeLocalPos(e, t.startWorldPos));
                                r.push(n);
                            },
                            l = this,
                            m = 0;
                        m < t.itemNum;
                        ++m
                    ) {
                        a();
                    }
                    $animUtils.AnimUtil.flyItemAnim(r, 35, i, o, 20, function () {
                        r.forEach(function (t) {
                            $nodePoolManager.default.instance.putNode(t);
                        });
                        if (t.onComplete) {
                            t.onComplete();
                        }
                    });
                }
            }
        }
    };
    __decorate([_(cc.Prefab)], e.prototype, "pFlyItem", void 0);
    return __decorate([y], e);
})(cc.Component);
exports.default = g;
