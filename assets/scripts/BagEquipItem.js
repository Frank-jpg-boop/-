var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $animUtils = require("./AnimUtils");
var $nodeUtil = require("./NodeUtil");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $bagConst = require("./BagConst");
var $bagConversionItem = require("./BagConversionItem");
var y = cc._decorator;
var _ = y.ccclass;
var g =
    (y.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._cfgEquip = null;
            e._equipId = 0;
            e._rowCol = "";
            e._occupyRowCols = [];
            e._formGrids = null;
            e._data = null;
            e._bindUnitId = 0;
            e._canTouch = !1;
            e._nAnchor = null;
            e._bagView = null;
            e._bagConversionItem = null;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "anchorPos", {
            get: function () {
                return this.node.getPosition().add(this._nAnchor.getPosition());
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "rowCol", {
            get: function () {
                return this._rowCol;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "occupyRowCols", {
            get: function () {
                return this._occupyRowCols.slice();
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "rewardId", {
            get: function () {
                return this._equipId;
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
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
            this._nAnchor = this.node.getChildByName("Grids").getChildByName("Anchor");
        };
        e.prototype.onDestroy = function () {
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        };
        e.prototype.init = function (t, e, n, i) {
            var o = this;
            this._equipId = e;
            this._rowCol = n;
            this._bindUnitId = i;
            this._bagView = t;
            this._cfgEquip = $cfg.default.instance.dataReward.getById(e);
            this._formGrids = $bagConst.BAG_EQUIP_FORM[this._cfgEquip.boxSet].grids.slice();
            this._occupyRowCols = [];
            this._canTouch = !0;
            this.node.getChildByName("Grids").children.forEach(function (t) {
                $resLoader.ResLoader.setSpritFrame(
                    t.getChildByName("Icon").getComponent(cc.Sprite),
                    $frameEnum.Frame.EBundleName.RES,
                    "textures/atlas/item_scene/bag_quality_" + o._cfgEquip.rare
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
                    o.node.addChild(e);
                    o._bagConversionItem = e.getComponent($bagConversionItem.default);
                    o._bagConversionItem.updateView(o._cfgEquip.type, o._cfgEquip.changeID);
                    o._bagConversionItem.show();
                })
                .catch(function () {});
        };
        e.prototype.setEquipData = function (t) {
            this._data = t;
        };
        e.prototype.setPosByGrid = function (t, e) {
            var n = this;
            if (void 0 === e) {
                e = !1;
            }
            var i = $nodeUtil.default.nodeParentChangeLocalPos(this._nAnchor, this.node);
            var o = t.sub(i);
            if (e) {
                var r = this.node.getPosition();
                var a = cc.misc.clampf(cc.Vec2.distance(r, o) / 500, 0.05, 0.3);
                this._canTouch = !1;
                cc.tween(this.node)
                    .to(a, {
                        x: o.x,
                        y: o.y
                    })
                    .call(function () {
                        n.node.angle = 0;
                        $animUtils.AnimUtil.shakeAngle(n.node.getChildByName("Icon"), 10);
                        n.setPos(o);
                        n._canTouch = !0;
                    })
                    .start();
            } else {
                this.setPos(o);
            }
        };
        e.prototype.setPos = function (t) {
            this.node.setPosition(t);
            this.updateRowCol();
            this.updateOccupyGrids();
        };
        e.prototype.putupBag = function () {
            var t = this;
            this._bagConversionItem.show();
            this._data.rowCol = this._rowCol;
            if (
                -1 ==
                $levelBattleData.levelBattleData.bagData.bagEquipDatas.findIndex(function (e) {
                    return e.unitId == t._bindUnitId;
                })
            ) {
                $levelBattleData.levelBattleData.bagData.bagEquipDatas.push(this._data);
                $eventManager.EventManager.instance.emit($levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE);
                if (999 == this._cfgEquip.id) {
                    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SURVIVOR_UPDATE_INFORM, !0);
                }
            }
            $eventManager.EventManager.instance.emit(
                $battleEnum.EBattleEvent.REWARD_PUT_IN_BAG_INFORM + this._bindUnitId
            );
            $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.UPDATE_BAG_UI);
        };
        e.prototype.leaveBag = function () {
            var t = this;
            this._data.rowCol = "";
            var e = $levelBattleData.levelBattleData.bagData.bagEquipDatas.findIndex(function (e) {
                return e.unitId == t._bindUnitId;
            });
            if (-1 != e) {
                $levelBattleData.levelBattleData.bagData.bagEquipDatas.splice(e, 1);
                $eventManager.EventManager.instance.emit($levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE);
                if (999 == this._cfgEquip.id) {
                    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.SURVIVOR_UPDATE_INFORM, !1);
                }
            }
            $eventManager.EventManager.instance.emit(
                $battleEnum.EBattleEvent.REWARD_LEAVE_BAG_INFORM + this._bindUnitId
            );
            $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.UPDATE_BAG_UI);
        };
        e.prototype.updateRowCol = function () {
            var t = this.node.convertToWorldSpaceAR(this._nAnchor.getPosition());
            this._rowCol = this._bagView.getRowColByPos(this._bagView.node.convertToNodeSpaceAR(t));
            var e = this._rowCol.split("&").map(Number);
            var n = e[0];
            var i = e[1];
            if (n < 0 || n >= $bagConst.BAG_ROW || i < 0 || i >= $bagConst.BAG_COL) {
                this._rowCol = "";
            }
        };
        e.prototype.updateOccupyGrids = function () {
            this._occupyRowCols = [];
            if ("" != this._rowCol) {
                for (var t = this._rowCol.split("&").map(Number), e = 0; e < this._formGrids.length; e++) {
                    var n = this._formGrids[e];
                    this._occupyRowCols.push(t[0] + n[0] + "&" + (t[1] + n[1]));
                }
            }
        };
        e.prototype.onTouchStart = function () {
            if (this._canTouch) {
                this._bagView.onTouchItemStart(this);
            }
        };
        e.prototype.onTouchMove = function (t) {
            if (this._canTouch) {
                this._bagView.onTouchItemMove(t.getLocation(), t.getStartLocation());
            }
        };
        e.prototype.onTouchEnd = function (t) {
            if (this._canTouch) {
                this._bagView.onTouchItemEnd(t.getLocation(), t.getStartLocation());
                t.stopPropagation();
            }
        };
        e.prototype.showConversionItem = function () {};
        e.prototype.hideConversionItem = function () {};
        return __decorate([_], e);
    })(cc.Component));
exports.default = g;
