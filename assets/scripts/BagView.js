var i;
var $cfg = require("./Cfg");
var $draggableLayout = require("./DraggableLayout");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $nodeUtil = require("./NodeUtil");
var $adMgr = require("./AdMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $playerDataProxy = require("./PlayerDataProxy");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $battleEnum = require("./BattleEnum");
var $actorMgr = require("./ActorMgr");
var $unitMgr = require("./UnitMgr");
var $levelBattleData = require("./LevelBattleData");
var $bagConst = require("./BagConst");
var $bagEquipItem = require("./BagEquipItem");
var $bagGridItem = require("./BagGridItem");
var A = cc._decorator;
var w = A.ccclass;
var C = A.property;
var M = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nGrids = null;
        e.nEquips = null;
        e.nPrepares = null;
        e.nPrepareLayout = null;
        e.nLock = null;
        e.nDraw = null;
        e._gridMap = new Map();
        e._curWaitUnlockGridPoss = [];
        e._selectEquipNode = null;
        e._selectEquipMoveResult = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {};
    e.prototype.onDestroy = function () {};
    e.prototype.init = function () {
        this.initGrid();
        this.initEquip();
    };
    e.prototype.initGrid = function () {
        var t = this;
        this._gridMap.clear();
        this._gridMap.set("0&0", this.nGrids.children[0]);
        for (var e = $bagConst.BAG_ROW * $bagConst.BAG_COL, n = 1; n < e; ++n) {
            var i = cc.instantiate(this.nGrids.children[0]);
            this.nGrids.addChild(i);
            this._gridMap.set(Math.floor(n / $bagConst.BAG_COL) + "&" + (n % $bagConst.BAG_COL), i);
        }
        this.nGrids.getComponent(cc.Layout).updateLayout();
        this._curWaitUnlockGridPoss = [];
        if (!$levelBattleData.levelBattleData.bagData.isUnlock) {
            var o = $bagConst.BAG_LOCK_GRID[1].grids.slice();
            $playerDataProxy.playerDataProxy.bagAddGridPoss.forEach(function (t) {
                o.splice(o.indexOf(t), 1);
            });
            o.forEach(function (e) {
                var n = t._gridMap.get(e).getComponent($bagGridItem.default);
                n.setValid(!1);
                n.setState($bagGridItem.EBagEquipItemState.WAIT_UNLOCK);
            });
            this._curWaitUnlockGridPoss = o;
        }
        this.updateLockGrid();
    };
    e.prototype.initEquip = function () {
        var t = this;
        $levelBattleData.levelBattleData.bagData.bagEquipDatas.forEach(function (e) {
            var n = $cfg.default.instance.dataReward.getById(e.rewardId);
            $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "prefabs/bag/Bag_Item_" + n.boxSet,
                type: cc.Prefab
            }).then(function (n) {
                var i = cc.instantiate(n);
                t.nEquips.addChild(i);
                var o = t._gridMap.get(e.rowCol);
                var r = $nodeUtil.default.nodeParentChangeLocalPos(o, t.nEquips);
                var a = i.addComponent($bagEquipItem.default);
                a.init(t, e.rewardId, e.rowCol, e.unitId);
                a.setEquipData(e);
                a.setPosByGrid(r);
                a.occupyRowCols.forEach(function (e) {
                    t._gridMap.get(e).getComponent($bagGridItem.default).setQuality(a.cfgEquip.rare);
                });
            });
        });
        var e = $actorMgr.default.instance.getActor($battleMgr.default.instance.getCurScene().playerId);
        $unitMgr.UnitMgr.instance
            .queryUnit($gridAreaDivisionMgr.E_AreaObjectType.GOOD)
            .filter(function (t) {
                return t.roomId == e.roomId && t.isBagItem && !t.isPickup;
            })
            .forEach(function (e) {
                var n = $cfg.default.instance.dataReward.getById(e.rewardId);
                $resLoader.ResLoader.loadAsset({
                    bundleName: $frameEnum.Frame.EBundleName.GAME,
                    path: "prefabs/bag/Bag_Item_" + n.boxSet,
                    type: cc.Prefab
                }).then(function (n) {
                    var i = cc.instantiate(n);
                    t.nPrepareLayout.addChild(i);
                    var o = i.addComponent($bagEquipItem.default);
                    o.init(t, e.rewardId, "", e.unitId);
                    o.setEquipData({
                        rewardId: e.rewardId,
                        rowCol: "",
                        unitId: e.unitId,
                        param: e.param
                    });
                    t.nPrepareLayout.getComponent($draggableLayout.default).updateLayout();
                });
            });
    };
    e.prototype.updateLockGrid = function () {
        this.nLock.active = !$levelBattleData.levelBattleData.bagData.isUnlock;
        var t = "解锁全部格子";
        if ($playerDataProxy.playerDataProxy.canExBag) {
            t += "，并且初始格子永久增加1";
        }
        this.nLock.getChildByName("Lock").getChildByName("Tips").getComponent(cc.Label).string = t;
    };
    e.prototype.setGirdsHight = function (t, e) {
        this._gridMap.forEach(function (n, i) {
            var o = n.getComponent($bagGridItem.default);
            if (t && t.indexOf(i) >= 0) {
                o.setHeightQualityActive(!0, e);
            } else {
                o.resetQuality();
            }
        });
    };
    e.prototype.updateSelectEquipMove = function () {
        var t = this;
        var e = this._selectEquipNode.getComponent($bagEquipItem.default);
        var n = e.occupyRowCols;
        var i = !0;
        if (n.length <= 0) {
            i = !1;
        } else {
            n.forEach(function (e) {
                if (i) {
                    if (t.isValidGrid(e)) {
                        //
                    } else {
                        i = !1;
                    }
                }
            });
        }
        if (i) {
            this.setGirdsHight(n, e.cfgEquip.rare);
        } else {
            this.setGirdsHight();
        }
        this._selectEquipMoveResult = i;
    };
    e.prototype.unlockGrid = function () {
        var t = this;
        this._curWaitUnlockGridPoss.forEach(function (e) {
            var n = t._gridMap.get(e).getComponent($bagGridItem.default);
            n.setValid(!0);
            n.setState($bagGridItem.EBagEquipItemState.UNLOCK);
        });
        $levelBattleData.levelBattleData.bagData.isUnlock = !0;
        if ($playerDataProxy.playerDataProxy.canExBag) {
            $playerDataProxy.playerDataProxy.pushBagAddGridPos(this._curWaitUnlockGridPoss[0]);
        }
        this._curWaitUnlockGridPoss = [];
        this.updateLockGrid();
        $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.UPDATE_BAG_UI);
    };
    e.prototype.onClickBtnExGrid = function () {
        var t = this;
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: "AD_OpenBag",
            eventData: {
                userA: "" + $levelBattleData.levelBattleData.cfgStage.id
            },
            success: function () {
                t.unlockGrid();
            },
            fail: function () {},
            error: function (t) {
                cc.log(t);
            }
        });
    };
    e.prototype.onTouchItemStart = function (t) {
        this._selectEquipNode = t.node;
    };
    e.prototype.onTouchItemMove = function (t, e) {
        var n = this;
        if (this._selectEquipNode && !(t.sub(e).mag() < 10)) {
            if (this._selectEquipNode.parent != this.nDraw) {
                var i = this._selectEquipNode.getComponent($bagEquipItem.default);
                var o = $nodeUtil.default.nodeParentChangeLocalPos(this._selectEquipNode, this.nDraw);
                this._selectEquipNode.parent = this.nDraw;
                var r = i.occupyRowCols;
                this._selectEquipNode.getComponent($bagEquipItem.default).setPos(o);
                var a = i.occupyRowCols;
                r.forEach(function (t) {
                    n._gridMap.get(t).getComponent($bagGridItem.default).setQuality(0, !a.includes(t));
                });
                this.nPrepareLayout.getComponent($draggableLayout.default).updateLayout(0.2);
                this._selectEquipNode.getComponent($bagEquipItem.default).hideConversionItem();
            }
            var c = this.nDraw.convertToNodeSpaceAR(t);
            this._selectEquipNode.getComponent($bagEquipItem.default).setPos(c);
            this.updateSelectEquipMove();
        }
    };
    e.prototype.onTouchItemEnd = function (t, e) {
        var n = this;
        if (this._selectEquipNode) {
            if (t.sub(e).mag() < 10 && this._selectEquipNode.parent != this.nDraw) {
                $globalPopupMgr.default.instance.showLevelBagInfo(
                    this._selectEquipNode.getComponent($bagEquipItem.default).cfgEquip.id
                );
                return void (this._selectEquipNode = null);
            }
            if (this._selectEquipNode.parent != this.nDraw) {
                return void (this._selectEquipNode = null);
            }
            if (!this._selectEquipMoveResult) {
                this.backPrepare(this._selectEquipNode);
                return void (this._selectEquipNode = null);
            }
            var i = [];
            this._selectEquipNode.getComponent($bagEquipItem.default).occupyRowCols.forEach(function (t) {
                var e = n.getGridEquip(t);
                if (e && !i.includes(e)) {
                    i.push(e);
                }
            });
            if (i.length > 0) {
                for (var o = 0; o < i.length; ++o) {
                    var r = i[o];
                    this.backPrepare(r);
                }
                this.downEquip(this._selectEquipNode);
            } else {
                this.downEquip(this._selectEquipNode);
            }
            this.setGirdsHight();
            this._selectEquipNode = null;
        }
    };
    e.prototype.backPrepare = function (t) {
        var e = this;
        t.getComponent($bagEquipItem.default).occupyRowCols.forEach(function (t) {
            if (e._gridMap.has(t)) {
                e._gridMap.get(t).getComponent($bagGridItem.default).setQuality(0);
            }
        });
        var n = $nodeUtil.default.nodeParentChangeLocalPos(t, this.nDraw);
        t.parent = this.nDraw;
        t.setPosition(n);
        t.getComponent($bagEquipItem.default).hideConversionItem();
        this.nPrepareLayout.getComponent($draggableLayout.default).addNode(t, function () {
            var e = t.getComponent($bagEquipItem.default);
            e.setPos(t.getPosition());
            e.leaveBag();
        });
    };
    e.prototype.downEquip = function (t) {
        var e = this;
        var n = $nodeUtil.default.nodeParentChangeLocalPos(t, this.nEquips);
        t.parent = this.nEquips;
        t.setPosition(n);
        var i = t.getComponent($bagEquipItem.default);
        i.showConversionItem();
        var o = this.getPosByRowCol(i.rowCol);
        i.setPosByGrid(o, !0);
        i.occupyRowCols.forEach(function (t) {
            e._gridMap.get(t).getComponent($bagGridItem.default).setQuality(i.cfgEquip.rare);
        });
        i.putupBag();
    };
    e.prototype.isValidGrid = function (t) {
        return this._gridMap.has(t) && this._gridMap.get(t).getComponent($bagGridItem.default).bIsValid;
    };
    e.prototype.getGrid = function (t) {
        if (this.isValidGrid(t)) {
            return this._gridMap.get(t);
        } else {
            return null;
        }
    };
    e.prototype.getGridEquip = function (t) {
        for (var e = this.nEquips.children, n = 0; n < e.length; ++n) {
            var i = e[n];
            if (i.getComponent($bagEquipItem.default).occupyRowCols.indexOf(t) >= 0) {
                return i;
            }
        }
        return null;
    };
    e.prototype.getRowColByPos = function (t) {
        var e = this.node.convertToWorldSpaceAR(t);
        var n = this.nGrids.convertToNodeSpaceAR(e);
        var i = cc.v2(n.x + this.nGrids.width / 2, -n.y);
        return Math.floor(i.y / $bagConst.GRID_SZIE.y) + "&" + Math.floor(i.x / $bagConst.GRID_SZIE.x);
    };
    e.prototype.getPosByRowCol = function (t) {
        var e = t.split("&").map(Number);
        var n = e[0];
        var i = e[1];
        return this.nGrids.children[n * $bagConst.BAG_COL + i].getPosition();
    };
    __decorate([C(cc.Node)], e.prototype, "nGrids", void 0);
    __decorate([C(cc.Node)], e.prototype, "nEquips", void 0);
    __decorate([C(cc.Node)], e.prototype, "nPrepares", void 0);
    __decorate([C(cc.Node)], e.prototype, "nPrepareLayout", void 0);
    __decorate([C(cc.Node)], e.prototype, "nLock", void 0);
    __decorate([C(cc.Node)], e.prototype, "nDraw", void 0);
    return __decorate([w], e);
})(cc.Component);
exports.default = M;
