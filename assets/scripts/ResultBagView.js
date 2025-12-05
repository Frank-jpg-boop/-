var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $bagConst = require("./BagConst");
var $resultBagEquipItem = require("./ResultBagEquipItem");
var $levelWinPopup = require("./LevelWinPopup");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nGrids = null;
        e.nItem = null;
        e._gridMap = new Map();
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t, e) {
        var n = this;
        this._gridMap.clear();
        this._gridMap.set("0&0", this.nGrids.children[0]);
        for (var i = $bagConst.BAG_ROW * $bagConst.BAG_COL, o = 1; o < i; ++o) {
            var r = cc.instantiate(this.nGrids.children[0]);
            this.nGrids.addChild(r);
            this._gridMap.set(Math.floor(o / $bagConst.BAG_COL) + "&" + (o % $bagConst.BAG_COL), r);
        }
        this.nGrids.getComponent(cc.Layout).updateLayout();
        var f = 0;
        var d = t.length;
        t.forEach(function (t, i) {
            var o = $cfg.default.instance.dataReward.getById(t.rewardId);
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/bag/Bag_Item_" + o.boxSet,
                type: cc.Prefab
            })
                .then(function (o) {
                    var r = cc.instantiate(o);
                    r.parent = n.nItem;
                    var a = r.addComponent($resultBagEquipItem.default);
                    a.init(i, t.rewardId, t.rowCol);
                    a.setPosByGrid(n._gridMap.get(t.rowCol).getPosition());
                    if (e) {
                        a.playShowAnim(0.4 * i, function () {
                            ++f;
                            n.setGirdsHight(a.occupyRowCols, a.cfgEquip.rare);
                            if (f == d) {
                                n.bagItemSwitchReward();
                            }
                        });
                    } else {
                        n.setGirdsHight(a.occupyRowCols, a.cfgEquip.rare);
                    }
                })
                .catch(function () {
                    if (++f == d) {
                        n.bagItemSwitchReward();
                    }
                });
        });
        if (0 == t.length) {
            $eventManager.EventManager.instance.emit($levelWinPopup.ELevelWinPopupEvent.ON_REWARD_SWITCH_COMPLETED);
        }
    };
    e.prototype.bagItemSwitchReward = function () {
        var t = this;
        var e = 0;
        var n = this.nItem.childrenCount;
        this.nItem.children.forEach(function (i, o) {
            var r = i.getComponent($resultBagEquipItem.default);
            r.playSwitchRewardAnim(
                0.2 * o,
                function () {
                    t.setGirdsHight(r.occupyRowCols, 0);
                },
                function () {
                    if (++e == n) {
                        $eventManager.EventManager.instance.emit(
                            $levelWinPopup.ELevelWinPopupEvent.ON_REWARD_SWITCH_COMPLETED
                        );
                    }
                }
            );
        });
    };
    e.prototype.setGirdsHight = function (t, e) {
        if (void 0 === e) {
            e = 0;
        }
    };
    __decorate([m(cc.Node)], e.prototype, "nGrids", void 0);
    __decorate([m(cc.Node)], e.prototype, "nItem", void 0);
    return __decorate([d], e);
})(cc.Component);
exports.default = y;
