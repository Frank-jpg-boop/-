var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $nodeUtil = require("./NodeUtil");
var $bagConst = require("./BagConst");
var $levelWinPopup = require("./LevelWinPopup");
var $bagConversionItem = require("./BagConversionItem");
var d = cc._decorator;
var m = d.ccclass;
var y =
    (d.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._cfgEquip = null;
            e._equipId = 0;
            e._rowCol = "";
            e._occupyRowCols = [];
            e._formGrids = null;
            e._nAnchor = null;
            e._bagConversionItem = null;
            e._index = -1;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "occupyRowCols", {
            get: function () {
                return this._occupyRowCols.slice();
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "cfgEquip", {
            get: function () {
                return this._cfgEquip;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            this._nAnchor = this.node.getChildByName("Grids").getChildByName("Anchor");
        };
        e.prototype.init = function (t, e, n) {
            var i = this;
            this._equipId = e;
            this._rowCol = n;
            this._index = t;
            this._cfgEquip = $cfg.default.instance.dataReward.getById(this._equipId);
            this._formGrids = $bagConst.BAG_EQUIP_FORM[this._cfgEquip.boxSet].grids.slice();
            var o = this._rowCol.split("&").map(Number);
            this._occupyRowCols = [];
            for (var r = 0; r < this._formGrids.length; r++) {
                var s = this._formGrids[r];
                this._occupyRowCols.push(o[0] + s[0] + "&" + (o[1] + s[1]));
            }
            this.node.getChildByName("Grids").children.forEach(function (t) {
                $resLoader.ResLoader.setSpritFrame(
                    t.getChildByName("Icon").getComponent(cc.Sprite),
                    $frameEnum.Frame.EBundleName.RES,
                    "textures/atlas/item_scene/bag_quality_" + i._cfgEquip.rare
                );
            });
            $resLoader.ResLoader.setSpritFrame(
                this.node.getChildByName("Icon").getComponent(cc.Sprite),
                $frameEnum.Frame.EBundleName.GAME,
                "textures/icon_bag/" + this.cfgEquip.boxObj
            );
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/bag/BagConversionItem",
                type: cc.Prefab
            })
                .then(function (t) {
                    var e = cc.instantiate(t);
                    i.node.addChild(e);
                    i._bagConversionItem = e.getComponent($bagConversionItem.default);
                    i._bagConversionItem.updateView(i._cfgEquip.type, i._cfgEquip.changeID);
                    i._bagConversionItem.show();
                })
                .catch(function () {});
        };
        e.prototype.playShowAnim = function (t, e) {
            this.node.scale = 0;
            cc.tween(this.node)
                .delay(t)
                .to(
                    0.4,
                    {
                        scale: 1
                    },
                    {
                        easing: "backOut"
                    }
                )
                .call(function () {
                    if (e) {
                        e();
                    }
                })
                .start();
        };
        e.prototype.playSwitchRewardAnim = function (t, e, n) {
            var i = this;
            cc.tween(this.node)
                .delay(t)
                .call(function () {
                    i.hideConversionItem();
                })
                .to(0.2, {
                    scale: 0
                })
                .call(function () {
                    $eventManager.EventManager.instance.emit(
                        $levelWinPopup.ELevelWinPopupEvent.SWITCH_BAG_ITEM_REWARD,
                        i._index,
                        i._cfgEquip.id,
                        i.node.convertToWorldSpaceAR(cc.v2()),
                        n
                    );
                    if (e) {
                        e();
                    }
                })
                .start();
        };
        e.prototype.setPosByGrid = function (t) {
            var e = $nodeUtil.default.nodeParentChangeLocalPos(this._nAnchor, this.node);
            var n = t.sub(e);
            this.node.setPosition(n);
        };
        e.prototype.showConversionItem = function () {
            if (this._bagConversionItem) {
                this._bagConversionItem.show();
            }
        };
        e.prototype.hideConversionItem = function () {
            if (this._bagConversionItem) {
                this._bagConversionItem.hide();
            }
        };
        return __decorate([m], e);
    })(cc.Component));
exports.default = y;
