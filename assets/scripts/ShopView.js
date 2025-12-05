var i;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $taskEnum = require("./TaskEnum");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $mathUtil = require("./MathUtil");
var $timeUtil = require("./TimeUtil");
var $frameEnum = require("./FrameEnum");
var $nodeUtil = require("./NodeUtil");
var $adMgr = require("./AdMgr");
var $attrMgr = require("./AttrMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $playerActionMgr = require("./PlayerActionMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var E = cc._decorator;
var S = E.ccclass;
var P = E.property;
var A = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mDscountShopItems = null;
        e.mBoxShopItems = null;
        e.mGoldShopItems = null;
        e.mTimeLab = null;
        e.mExpBar = null;
        e.mBoxLvLab = null;
        e._canGetDebrisRewards = [];
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.DIAMOND,
            this.updateDiamondNum,
            this
        );
        $eventManager.EventManager.instance.on(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.GOLD,
            this.updateGold,
            this
        );
        $eventManager.EventManager.instance.on(
            $playerDataProxy.EPlayDataEvent.UPDATE_BUILD_LEVEL,
            this.updateBuildlevel,
            this
        );
    };
    e.prototype.onEnable = function () {
        this.initGoldItem();
        this.initBoxItem();
        this.initDscountShopItem();
        this.boxSchedule();
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.DIAMOND,
            this.updateDiamondNum,
            this
        );
        $eventManager.EventManager.instance.off(
            $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.GOLD,
            this.updateGold,
            this
        );
        $eventManager.EventManager.instance.off(
            $playerDataProxy.EPlayDataEvent.UPDATE_BUILD_LEVEL,
            this.updateBuildlevel,
            this
        );
    };
    e.prototype.updateGold = function () {
        this.updateDscountPriceColor(!0);
    };
    e.prototype.updateBuildlevel = function (t) {
        var e = this;
        if (9 == t) {
            var n = this.mDscountShopItems.children;
            var i = $playerDataProxy.playerDataProxy.dscountGoodsDatas;
            var o = 0;
            n.forEach(function (t) {
                var n = i[o];
                var r = $cfg.default.instance.dataShopDaily.getById(n.cfgId);
                var s = e.getDscountShopPriceNum(n);
                var c = t.getChildByName("BtnBuy");
                c.getChildByName("layout").getChildByName("priceLab").getComponent(cc.Label).string = "x" + s;
                $nodeUtil.default.addButtonListener(c, "ShopView", "onDscountShopBtnBuy", e.node, {
                    item: t,
                    goodsData: n,
                    priceNum: s,
                    buyType: r.buyType
                });
                o++;
            });
            this.updateDscountPriceColor(!0);
            this.updateDscountPriceColor(!1);
        }
    };
    e.prototype.updateDiamondNum = function () {
        var t = $playerDataProxy.playerDataProxy.getBoxLevel();
        var e = $cfg.default.instance.dataShopBox.getById(t);
        var n = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND);
        if (e) {
            for (var i = this.mBoxShopItems.children, o = 0; o < i.length; ++o) {
                var r = i[o].getChildByName("BtnBuy").getChildByName("layout").getChildByName("priceLab");
                var c = Number(0 == o ? e.cost : e.bigCost);
                if (n >= c) {
                    r.color = cc.color(255, 255, 255);
                } else {
                    r.color = cc.color(255, 75, 75);
                }
            }
        }
        var l = this.mGoldShopItems.children;
        for (o = 1; o < l.length; ++o) {
            var u = l[o];
            var p = $cfg.default.instance.dataShopDaily.getById(o + 11);
            if (n >= p.coinSpe) {
                (r = u.getChildByName("BtnBuy").getChildByName("layout").getChildByName("num")).color = cc.color(
                    255,
                    255,
                    255
                );
            } else {
                (r = u.getChildByName("BtnBuy").getChildByName("layout").getChildByName("num")).color = cc.color(
                    255,
                    75,
                    75
                );
            }
        }
        this.updateDscountPriceColor(!1);
    };
    e.prototype.updateDscountPriceColor = function (t) {
        for (
            var e = this.mDscountShopItems.children,
                n = $playerDataProxy.playerDataProxy.dscountGoodsDatas,
                i = t ? 2 : 3,
                o = 0;
            o < n.length;
            ++o
        ) {
            var r = n[o];
            var c = $cfg.default.instance.dataShopDaily.getById(r.cfgId);
            if (c.buyType == i) {
                var l = e[o].getChildByName("BtnBuy").getChildByName("layout").getChildByName("priceLab");
                if ($playerDataProxy.playerDataProxy.getDscountGoodsBuyNum(r.cfgId) >= c.buyNum) {
                    l.color = cc.color(255, 255, 255);
                } else {
                    var u = null;
                    if (t) {
                        u = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD);
                    } else {
                        u = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND);
                    }
                    var p = l.getComponent(cc.Label).string.split("x")[1];
                    if (u >= Number(p)) {
                        l.color = cc.color(255, 255, 255);
                    } else {
                        l.color = cc.color(255, 75, 75);
                    }
                }
            }
        }
    };
    e.prototype.onBtnRefresh = function () {
        var t = this;
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: "AD_ShopRefresh",
            success: function () {
                t.refreshGoodsDatas();
            },
            fail: function () {},
            error: function (t) {
                cc.log(t);
            }
        });
    };
    e.prototype.onBtnDetails = function () {
        $globalPopupMgr.default.instance.showShopBoxLevelDetailsPopup();
    };
    e.prototype.initDscountShopItem = function () {
        this.refreshGoodsDatas(!1);
    };
    e.prototype.refreshGoodsDatas = function (t) {
        if (void 0 === t) {
            t = !0;
        }
        if (!t && $playerDataProxy.playerDataProxy.dscountGoodsDatas.length > 0) {
            this.refreshDscountShopItem();
        } else {
            var e;
            var n = [];
            var i = $cfg.default.instance.dataShopDaily.sheet();
            var o = [];
            for (var r in i) {
                if ((c = i[r]).id > 6) {
                    break;
                }
                if (c.charge < 1) {
                    o.push(c.id);
                }
            }
            var s = Math.floor(1e3 * Math.random()) % o.length;
            for (var r in ((e = o[s]), i)) {
                var c;
                if ((c = i[r]).id > 6) {
                    break;
                }
                if (1 == c.buyType) {
                    var l = c.reward.split("_").map(Number);
                    n.push({
                        id: l[0],
                        num: l[1],
                        buyNum: 0,
                        dscount: 10,
                        cfgId: c.id
                    });
                } else {
                    for (var u = c.reward.split("|"), h = [], f = 0; f < u.length; ++f) {
                        var d = u[f].split("_");
                        h.push(Number(d[0]));
                    }
                    var m = $mathUtil.MathUtil.weightedRandom(h);
                    if (m < 0) {
                        m = 0;
                    }
                    var y = u[m].split("_");
                    var _ = y[2].split("&").map(Number);
                    var g = _[0];
                    if (_[1] != _[0]) {
                        g = (Math.floor(1e3 * Math.random()) % (_[1] - _[0])) + _[0];
                    }
                    var v = 10;
                    if (e == c.id) {
                        var E = Math.floor(10 * c.charge);
                        v = (Math.floor(1e3 * Math.random()) % Math.floor(10 - E)) + E;
                    }
                    var S = $cfg.default.instance.dataItem.getById(Number(y[1])).val.split("|").map(Number);
                    var P = $playerDataProxy.playerDataProxy.getCanRefreshDscountShop(S);
                    var A = P[Math.floor(1e4 * Math.random()) % P.length];
                    n.push({
                        id: A,
                        num: g,
                        buyNum: 0,
                        dscount: v,
                        cfgId: c.id
                    });
                }
            }
            $playerDataProxy.playerDataProxy.dscountGoodsDatas = n;
            this.refreshDscountShopItem();
        }
    };
    e.prototype.refreshDscountShopItem = function () {
        for (
            var t = $playerDataProxy.playerDataProxy.dscountGoodsDatas, e = this.mDscountShopItems.children[0], n = 0;
            n < t.length;
            ++n
        ) {
            var i = t[n];
            var o = this.mDscountShopItems.children[n];
            if (o) {
                //
            } else {
                o = cc.instantiate(e);
                this.mDscountShopItems.addChild(o);
            }
            this.setDscountShopItem(o, i);
        }
    };
    e.prototype.setDscountShopItem = function (t, e) {
        var n = $cfg.default.instance.dataShopDaily.getById(e.cfgId);
        var i = t.getChildByName("BtnBuy");
        var o = t.getChildByName("BtnVideo");
        var r = t.getChildByName("videoBg");
        var c = t.getChildByName("buyBg");
        r.active = o.active = 1 == n.buyType;
        c.active = i.active = 1 != n.buyType;
        var l = t.getChildByName("discount");
        l.active = e.dscount < 10;
        var p = $cfg.default.instance.dataItem.getById(e.id);
        if (1 == n.buyType) {
            var h = o.getChildByName("layout").getChildByName("num");
            var m = o.getChildByName("layout").getChildByName("videoIcon");
            var y = o.getChildByName("redPoint");
            var _ = $playerDataProxy.playerDataProxy.dscountVideoNum;
            m.active = _ >= n.freeNum;
            h.active = m.active;
            y.active = !m.active;
            if (h.active) {
                var g = n.freeNum + n.buyNum - _;
                h.getComponent(cc.Label).string = "(" + g + ")";
                if (g <= 0) {
                    o.getComponent(cc.Button).interactable = !1;
                } else {
                    $nodeUtil.default.addButtonListener(o, "ShopView", "onDscountShopBtnVideo", this.node, {
                        item: t,
                        goodsData: e
                    });
                }
            } else {
                $nodeUtil.default.addButtonListener(o, "ShopView", "onDscountShopBtnVideo", this.node, {
                    item: t,
                    goodsData: e
                });
            }
        } else {
            var E = i.getChildByName("layout").getChildByName("icon2");
            var S = i.getChildByName("layout").getChildByName("icon1");
            var P = i.getChildByName("layout").getChildByName("priceLab");
            E.active = 3 == n.buyType;
            S.active = 2 == n.buyType;
            var A = this.getDscountShopPriceNum(e);
            if (l.active) {
                l.getChildByName("discountNum").getComponent(cc.Label).string = e.dscount + "折";
            }
            if ($playerDataProxy.playerDataProxy.getDscountGoodsBuyNum(e.cfgId) >= n.buyNum) {
                i.getComponent(cc.Button).interactable = !1;
                E.active = !1;
                S.active = !1;
                P.getComponent(cc.Label).string = "已售罄";
                P.getComponent(cc.Label).fontSize = 28;
                P.color = cc.color(255, 255, 255);
            } else {
                var w = null;
                if (3 == n.buyType) {
                    w = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND);
                } else {
                    w = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD);
                }
                if (w >= A) {
                    P.color = cc.color(255, 255, 255);
                } else {
                    P.color = cc.color(255, 75, 75);
                }
                i.getComponent(cc.Button).interactable = !0;
                P.getComponent(cc.Label).string = "x" + A;
                P.getComponent(cc.Label).fontSize = 34;
                $nodeUtil.default.addButtonListener(i, "ShopView", "onDscountShopBtnBuy", this.node, {
                    item: t,
                    goodsData: e,
                    priceNum: A,
                    buyType: n.buyType
                });
            }
        }
        var C = t.getChildByName("greadImg");
        var M = t.getChildByName("icon");
        var I = t.getChildByName("num");
        var R = t.getChildByName("name");
        I.getComponent(cc.Label).string = "x" + e.num;
        R.getComponent(cc.Label).string = p.name;
        $resLoader.ResLoader.loadAsset({
            path: "textures/public/pic_wuping_di_" + p.rare,
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.HOME
        })
            .then(function (t) {
                C.getComponent(cc.Sprite).spriteFrame = t;
            })
            .catch(function (t) {
                console.log("error:", t);
            });
        $resLoader.ResLoader.loadAsset({
            path: "textures/atlas/item/" + p.icon,
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.RES
        })
            .then(function (t) {
                M.getComponent(cc.Sprite).spriteFrame = t;
            })
            .catch(function (t) {
                console.log("error:", t);
            });
    };
    e.prototype.getDscountShopPriceNum = function (t) {
        var e = $cfg.default.instance.dataItem.getById(t.id);
        var n = $cfg.default.instance.dataShopDaily.getById(t.cfgId);
        if (1 != n.buyType) {
            var i = null;
            if (2 == n.buyType) {
                i = e.gold;
            } else {
                i = e.diam;
            }
            var o = Math.floor(i * t.num * (t.dscount / 10));
            o = $attrMgr.AttrMgr.instance.getShopRightPrice(o);
            return Math.floor(o);
        }
        return 9999;
    };
    e.prototype.onDscountShopBtnVideo = function (t, e) {
        var n = this;
        var i = $playerDataProxy.playerDataProxy.dscountVideoNum;
        if (i <= 0) {
            i += 1;
            $playerDataProxy.playerDataProxy.dscountVideoNum = i;
            $playerDataProxy.playerDataProxy.updateShopRedPoint();
            this.setDscountShopItem(e.item, e.goodsData);
            return void this.getDscountReward(e.goodsData);
        }
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: "AD_FreeDiam",
            success: function () {
                i += 1;
                $playerDataProxy.playerDataProxy.dscountVideoNum = i;
                n.setDscountShopItem(e.item, e.goodsData);
                n.getDscountReward(e.goodsData);
            },
            fail: function () {},
            error: function (t) {
                cc.log(t);
            }
        });
    };
    e.prototype.onDscountShopBtnBuy = function (t, e) {
        if (2 == e.buyType) {
            if ($itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD) < e.priceNum) {
                return void $globalPopupMgr.default.instance.showTips("金币不足");
            }
            $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.GOLD, -e.priceNum);
        } else if (3 == e.buyType) {
            if ($itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND) < e.priceNum) {
                return void $globalPopupMgr.default.instance.showTips("钻石不足");
            }
            $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.DIAMOND, -e.priceNum);
        }
        var n = $playerDataProxy.playerDataProxy.getDscountGoodsBuyNum(e.goodsData.cfgId);
        n += 1;
        $playerDataProxy.playerDataProxy.setDscountGoodsBuyNum(e.goodsData.cfgId, n);
        $globalPopupMgr.default.instance.showAwardNotice([
            {
                itemId: e.goodsData.id,
                itemNum: e.goodsData.num
            }
        ]);
        this.setDscountShopItem(e.item, e.goodsData);
    };
    e.prototype.getDscountReward = function (t) {
        $globalPopupMgr.default.instance.showAwardNotice([
            {
                itemId: t.id,
                itemNum: t.num
            }
        ]);
    };
    e.prototype.initBoxItem = function () {
        var t = $playerDataProxy.playerDataProxy.getBoxLevel();
        var e = $cfg.default.instance.dataShopBox.getById(t);
        if (e) {
            this.setBoxExpBar();
            for (
                var n = this.mBoxShopItems.children,
                    i = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND),
                    o = 0;
                o < n.length;
                ++o
            ) {
                var r = n[o];
                var c = r.getChildByName("BtnBuy");
                var l = c.getChildByName("layout").getChildByName("priceLab");
                var u = r.getChildByName("BtnVideo");
                var p = 0;
                p = Number(0 == o ? e.cost : e.bigCost);
                p = $attrMgr.AttrMgr.instance.getShopRightPrice(p);
                l.getComponent(cc.Label).string = "x" + p;
                if (i >= p) {
                    l.color = cc.color(255, 255, 255);
                } else {
                    l.color = cc.color(255, 75, 75);
                }
                $nodeUtil.default.addButtonListener(c, "ShopView", "onBoxBtnBuyClick", this.node, {
                    item: r,
                    idx: o,
                    boxData: e
                });
                $nodeUtil.default.addButtonListener(u, "ShopView", "onBoxBtnVideoClick", this.node, {
                    item: r,
                    idx: o,
                    boxData: e
                });
            }
            this.unschedule(this.boxSchedule);
            this.schedule(this.boxSchedule, 1);
        } else {
            console.log("出问题了，宝箱等级:", t);
        }
    };
    e.prototype.updateBoxView = function () {
        var t = $playerDataProxy.playerDataProxy.getBoxLevel();
        var e = $cfg.default.instance.dataShopBox.getById(t);
        if (e) {
            this.setBoxExpBar();
            for (
                var n = this.mBoxShopItems.children,
                    i = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND),
                    o = 0;
                o < n.length;
                ++o
            ) {
                var r = n[o];
                var c = r.getChildByName("BtnBuy");
                var l = c.getChildByName("layout").getChildByName("priceLab");
                var u = r.getChildByName("BtnVideo");
                var p = 0;
                p = Number(0 == o ? e.cost : e.bigCost);
                p = $attrMgr.AttrMgr.instance.getShopRightPrice(p);
                l.getComponent(cc.Label).string = "x" + p;
                if (i >= p) {
                    l.color = cc.color(255, 255, 255);
                } else {
                    l.color = cc.color(255, 75, 75);
                }
                $nodeUtil.default.addButtonListener(c, "ShopView", "onBoxBtnBuyClick", this.node, {
                    item: r,
                    idx: o,
                    boxData: e
                });
                $nodeUtil.default.addButtonListener(u, "ShopView", "onBoxBtnVideoClick", this.node, {
                    item: r,
                    idx: o,
                    boxData: e
                });
            }
        } else {
            console.log("出问题了，宝箱等级:", t);
        }
    };
    e.prototype.setBoxExpBar = function () {
        var t = $playerDataProxy.playerDataProxy.getBoxLevel();
        this.mBoxLvLab.string = "Lv." + t;
        var e = $cfg.default.instance.dataShopBox.getById(t);
        this.mExpBar.fillRange = $playerDataProxy.playerDataProxy.openBoxExp / e.exp;
    };
    e.prototype.onBoxBtnBuyClick = function (t, e) {
        var n = this;
        var i = 0;
        if (0 == e.idx) {
            i = Number(e.boxData.cost);
        } else {
            i = Number(e.boxData.bigCost);
        }
        i = $attrMgr.AttrMgr.instance.getShopRightPrice(i);
        if ($itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND) < i) {
            $globalPopupMgr.default.instance.showTips("钻石不足");
        } else {
            $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.DIAMOND, -i);
            $globalPopupMgr.default.instance.showOpenBoxPopup(e.idx + 1, function () {
                n.getBoxReward(0 != e.idx, e.boxData);
            });
        }
    };
    e.prototype.onBoxBtnVideoClick = function (t, e) {
        var n = this;
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: "AD_FreeBox",
            eventData: {
                userA: "" + (e.idx + 1)
            },
            success: function () {
                if (0 == e.idx) {
                    var t = $timeUtil.TimeUtil.getTime() + 36e5 * e.boxData.freeTime;
                    $playerDataProxy.playerDataProxy.openBoxTime = t;
                    n.boxSchedule();
                } else {
                    $playerDataProxy.playerDataProxy.isOpenBigBox = !0;
                    n.boxSchedule();
                }
                $globalPopupMgr.default.instance.showOpenBoxPopup(e.idx + 1, function () {
                    n.getBoxReward(0 != e.idx, e.boxData);
                });
            },
            fail: function () {},
            error: function (t) {
                cc.log(t);
            }
        });
    };
    e.prototype.boxSchedule = function () {
        var t = this.mBoxShopItems.children;
        var e = t[0];
        var n = e.getChildByName("BtnVideo");
        var i = $timeUtil.TimeUtil.getDate();
        var o = $playerDataProxy.playerDataProxy.openBoxTime;
        var r = e.getChildByName("countDown");
        if (o > 0) {
            var a = o - i.getTime();
            if (a <= 0) {
                $playerDataProxy.playerDataProxy.openBoxTime = 0;
                n.getComponent(cc.Button).interactable = !0;
                r.active = !1;
            } else {
                n.getComponent(cc.Button).interactable = !1;
                r.active = !0;
                r.getComponent(cc.Label).string = $timeUtil.TimeUtil.format_HHMMSS(a);
            }
        } else {
            n.getComponent(cc.Button).interactable = !0;
            r.active = !1;
        }
        var s = t[1];
        var c = $timeUtil.TimeUtil.getTomorrowZeroDate().getTime() - i.getTime();
        var l = s.getChildByName("BtnVideo");
        var u = s.getChildByName("countDown");
        if ($playerDataProxy.playerDataProxy.isOpenBigBox) {
            if (c <= 0) {
                ($playerDataProxy.playerDataProxy.isOpenBigBox = !1),
                    (l.getComponent(cc.Button).interactable = !0),
                    (u.active = !1),
                    this.onBtnRefresh();
            } else {
                (l.getComponent(cc.Button).interactable = !1),
                    (u.active = !0),
                    (u.getComponent(cc.Label).string = $timeUtil.TimeUtil.format_HHMMSS(c));
            }
        } else {
            l.getComponent(cc.Button).interactable = !0;
            u.active = !1;
        }
        this.mTimeLab.string = $timeUtil.TimeUtil.format_HHMMSS(c);
    };
    e.prototype.getBoxReward = function (t, e) {
        var n = $playerDataProxy.playerDataProxy.openBoxExp;
        if (t) {
            n += e.bigGainExp;
        } else {
            n += e.gainExp;
        }
        $playerDataProxy.playerDataProxy.openBoxExp = n;
        for (var i = (t ? e.bigReward : e.reward).split("|"), o = [], r = 0; r < i.length; ++r) {
            for (
                var s = i[r].split("_").map(Number),
                    l = $cfg.default.instance.dataItem.getById(s[0]).val.split("|").map(Number),
                    u = $playerDataProxy.playerDataProxy.getCanRefreshDscountShop(l),
                    p = function () {
                        var t = Math.floor(1e4 * Math.random()) % u.length;
                        var e = u[t];
                        var n = o.findIndex(function (t) {
                            return t.itemId == e;
                        });
                        if (n < 0) {
                            o.push({
                                itemId: e,
                                itemNum: 1
                            });
                        } else {
                            o[n].itemNum += 1;
                        }
                    },
                    h = 0;
                h < s[1];
                ++h
            ) {
                p();
            }
        }
        $globalPopupMgr.default.instance.showAwardNotice(o);
        $playerActionMgr.PlayerActionMgr.instance.triggerAction($taskEnum.EPlayerActionType.OPEN_BOX);
        this.setBoxExpBar();
        this.updateBoxView();
    };
    e.prototype.initGoldItem = function () {
        for (var t = this.mGoldShopItems.children, e = 0; e < t.length; ++e) {
            var n = t[e];
            var i = $cfg.default.instance.dataShopDaily.getById(e + 11);
            var o = n.getChildByName("BtnBuy");
            this.setGoldItemData(n, i);
            $nodeUtil.default.addButtonListener(o, "ShopView", "onBuyGoldItem", this.node, {
                item: n,
                idx: e,
                goldData: i
            });
        }
    };
    e.prototype.setGoldItemData = function (t, e) {
        var n = t.getChildByName("num");
        var i = t.getChildByName("BtnBuy");
        n.getComponent(cc.Label).string = "x" + $mathUtil.MathUtil.formatValue(e.reward.split("_").map(Number)[1]);
        if (1 == e.buyType) {
            var o = i.getChildByName("layout").getChildByName("num");
            var r = i.getChildByName("layout").getChildByName("videoIcon");
            var a = i.getChildByName("redPoint");
            var c = $playerDataProxy.playerDataProxy.goldVideoNum;
            r.active = c >= e.freeNum;
            o.active = r.active;
            a.active = !r.active;
            if (o.active) {
                var l = e.freeNum + e.buyNum - c;
                o.getComponent(cc.Label).string = "(" + l + ")";
                if (l <= 0) {
                    i.getComponent(cc.Button).interactable = !1;
                }
            }
        } else {
            var u = i.getChildByName("layout").getChildByName("num");
            var h = $attrMgr.AttrMgr.instance.getShopRightPrice(e.coinSpe);
            u.getComponent(cc.Label).string = "x" + h;
            var f = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND);
            if (f >= h) {
                u.color = cc.color(255, 255, 255);
            } else {
                u.color = cc.color(255, 75, 75);
            }
        }
    };
    e.prototype.onBuyGoldItem = function (t, e) {
        var n = this;
        if (1 == e.goldData.buyType) {
            var i = $playerDataProxy.playerDataProxy.goldVideoNum;
            if (i <= 0) {
                i += 1;
                $playerDataProxy.playerDataProxy.goldVideoNum = i;
                this.setGoldItemData(e.item, e.goldData);
                $playerDataProxy.playerDataProxy.updateShopRedPoint();
                return void this.getGoldReward(e.goldData.reward);
            }
            $adMgr.AdMgr.instance.showVideoAd({
                id: 1,
                eventId: "AD_FreeCoin",
                success: function () {
                    i += 1;
                    $playerDataProxy.playerDataProxy.goldVideoNum = i;
                    n.setGoldItemData(e.item, e.goldData);
                    n.getGoldReward(e.goldData.reward);
                },
                fail: function () {},
                error: function (t) {
                    cc.log(t);
                }
            });
        } else {
            var o = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND);
            var r = $attrMgr.AttrMgr.instance.getShopRightPrice(e.goldData.coinSpe);
            if (o < r) {
                return void $globalPopupMgr.default.instance.showTips("钻石不足");
            }
            $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.DIAMOND, -r);
            this.getGoldReward(e.goldData.reward);
        }
    };
    e.prototype.getGoldReward = function (t) {
        var e = t.split("_").map(Number);
        $globalPopupMgr.default.instance.showAwardNotice([
            {
                itemId: e[0],
                itemNum: e[1]
            }
        ]);
    };
    __decorate([P(cc.Node)], e.prototype, "mDscountShopItems", void 0);
    __decorate([P(cc.Node)], e.prototype, "mBoxShopItems", void 0);
    __decorate([P(cc.Node)], e.prototype, "mGoldShopItems", void 0);
    __decorate([P(cc.Label)], e.prototype, "mTimeLab", void 0);
    __decorate([P(cc.Sprite)], e.prototype, "mExpBar", void 0);
    __decorate([P(cc.Label)], e.prototype, "mBoxLvLab", void 0);
    return __decorate([S], e);
})(cc.Component);
exports.default = A;
