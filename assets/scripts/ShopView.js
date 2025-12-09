import $cfg from './Cfg';
import $itemEnum from './ItemEnum';
import $taskEnum from './TaskEnum';
import $eventManager from './EventManager';
import $resLoader from './ResLoader';
import $mathUtil from './MathUtil';
import $timeUtil from './TimeUtil';
import $frameEnum from './FrameEnum';
import $nodeUtil from './NodeUtil';
import $adMgr from './AdMgr';
import $attrMgr from './AttrMgr';
import $globalPopupMgr from './GlobalPopupMgr';
import $playerActionMgr from './PlayerActionMgr';
import $itemDataProxy from './ItemDataProxy';
import $playerDataProxy from './PlayerDataProxy';
let i;
const E = cc._decorator;
const S = E.ccclass;
const P = E.property;
e.prototype.getGoldReward = function (t) {
  const e = t.split("_").map(Number);
  $globalPopupMgr.default.instance.showAwardNotice([
    {
      itemId: e[0],
      itemNum: e[1],
    },
  ]);
};
e.prototype.onBuyGoldItem = function (t, e) {
  const n = this;
  if (1 == e.goldData.buyType) {
    const i = $playerDataProxy.playerDataProxy.goldVideoNum;
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
      },
    });
  } else {
    const o = $itemDataProxy.itemDataProxy.getItemValue(
      $itemEnum.E_ItemId.DIAMOND,
    );
    const r = $attrMgr.AttrMgr.instance.getShopRightPrice(e.goldData.coinSpe);
    if (o < r) {
      return void $globalPopupMgr.default.instance.showTips("钻石不足");
    }
    $itemDataProxy.itemDataProxy.updateItemValue(
      $itemEnum.E_ItemId.DIAMOND,
      -r,
    );
    this.getGoldReward(e.goldData.reward);
  }
};
e.prototype.setGoldItemData = function (t, e) {
  const n = t.getChildByName("num");
  const i = t.getChildByName("BtnBuy");
  n.getComponent(cc.Label).string =
    "x" + $mathUtil.MathUtil.formatValue(e.reward.split("_").map(Number)[1]);
  if (1 == e.buyType) {
    const o = i.getChildByName("layout").getChildByName("num");
    const r = i.getChildByName("layout").getChildByName("videoIcon");
    const a = i.getChildByName("redPoint");
    const c = $playerDataProxy.playerDataProxy.goldVideoNum;
    r.active = c >= e.freeNum;
    o.active = r.active;
    a.active = !r.active;
    if (o.active) {
      const l = e.freeNum + e.buyNum - c;
      o.getComponent(cc.Label).string = "(" + l + ")";
      if (l <= 0) {
        i.getComponent(cc.Button).interactable = !1;
      }
    }
  } else {
    const u = i.getChildByName("layout").getChildByName("num");
    const h = $attrMgr.AttrMgr.instance.getShopRightPrice(e.coinSpe);
    u.getComponent(cc.Label).string = "x" + h;
    const f = $itemDataProxy.itemDataProxy.getItemValue(
      $itemEnum.E_ItemId.DIAMOND,
    );
    if (f >= h) {
      u.color = cc.color(255, 255, 255);
    } else {
      u.color = cc.color(255, 75, 75);
    }
  }
};
e.prototype.initGoldItem = function () {
  for (const t = this.mGoldShopItems.children, e = 0; e < t.length; ++e) {
    const n = t[e];
    const i = $cfg.default.instance.dataShopDaily.getById(e + 11);
    const o = n.getChildByName("BtnBuy");
    this.setGoldItemData(n, i);
    $nodeUtil.default.addButtonListener(
      o,
      "ShopView",
      "onBuyGoldItem",
      this.node,
      {
        item: n,
        idx: e,
        goldData: i,
      },
    );
  }
};
e.prototype.getBoxReward = function (t, e) {
  const n = $playerDataProxy.playerDataProxy.openBoxExp;
  if (t) {
    n += e.bigGainExp;
  } else {
    n += e.gainExp;
  }
  $playerDataProxy.playerDataProxy.openBoxExp = n;
  for (
    const i = (t ? e.bigReward : e.reward).split("|"), o = [], r = 0;
    r < i.length;
    ++r
  ) {
    for (
      const s = i[r].split("_").map(Number),
            l = $cfg.default.instance.dataItem
              .getById(s[0])
              .val.split("|")
              .map(Number),
            u = $playerDataProxy.playerDataProxy.getCanRefreshDscountShop(l),
            p = function () {
              const t = Math.floor(1e4 * Math.random()) % u.length;
              const e = u[t];
              const n = o.findIndex(function (t) {
                return t.itemId == e;
              });
              if (n < 0) {
                o.push({
                  itemId: e,
                  itemNum: 1,
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
  $playerActionMgr.PlayerActionMgr.instance.triggerAction(
    $taskEnum.EPlayerActionType.OPEN_BOX,
  );
  this.setBoxExpBar();
  this.updateBoxView();
};
e.prototype.boxSchedule = function () {
  const t = this.mBoxShopItems.children;
  const e = t[0];
  const n = e.getChildByName("BtnVideo");
  const i = $timeUtil.TimeUtil.getDate();
  const o = $playerDataProxy.playerDataProxy.openBoxTime;
  const r = e.getChildByName("countDown");
  if (o > 0) {
    const a = o - i.getTime();
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
  const s = t[1];
  const c = $timeUtil.TimeUtil.getTomorrowZeroDate().getTime() - i.getTime();
  const l = s.getChildByName("BtnVideo");
  const u = s.getChildByName("countDown");
  if ($playerDataProxy.playerDataProxy.isOpenBigBox) {
    if (c <= 0) {
      (($playerDataProxy.playerDataProxy.isOpenBigBox = !1),
        (l.getComponent(cc.Button).interactable = !0),
        (u.active = !1),
        this.onBtnRefresh());
    } else {
      ((l.getComponent(cc.Button).interactable = !1),
        (u.active = !0),
        (u.getComponent(cc.Label).string =
          $timeUtil.TimeUtil.format_HHMMSS(c)));
    }
  } else {
    l.getComponent(cc.Button).interactable = !0;
    u.active = !1;
  }
  this.mTimeLab.string = $timeUtil.TimeUtil.format_HHMMSS(c);
};
e.prototype.onBoxBtnVideoClick = function (t, e) {
  const n = this;
  $adMgr.AdMgr.instance.showVideoAd({
    id: 1,
    eventId: "AD_FreeBox",
    eventData: {
      userA: "" + (e.idx + 1),
    },
    success: function () {
      if (0 == e.idx) {
        const t = $timeUtil.TimeUtil.getTime() + 36e5 * e.boxData.freeTime;
        $playerDataProxy.playerDataProxy.openBoxTime = t;
        n.boxSchedule();
      } else {
        $playerDataProxy.playerDataProxy.isOpenBigBox = !0;
        n.boxSchedule();
      }
      $globalPopupMgr.default.instance.showOpenBoxPopup(
        e.idx + 1,
        function () {
          n.getBoxReward(0 != e.idx, e.boxData);
        },
      );
    },
    fail: function () {},
    error: function (t) {
      cc.log(t);
    },
  });
};
e.prototype.onBoxBtnBuyClick = function (t, e) {
  const n = this;
  const i = 0;
  if (0 == e.idx) {
    i = Number(e.boxData.cost);
  } else {
    i = Number(e.boxData.bigCost);
  }
  i = $attrMgr.AttrMgr.instance.getShopRightPrice(i);
  if (
    $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND) < i
  ) {
    $globalPopupMgr.default.instance.showTips("钻石不足");
  } else {
    $itemDataProxy.itemDataProxy.updateItemValue(
      $itemEnum.E_ItemId.DIAMOND,
      -i,
    );
    $globalPopupMgr.default.instance.showOpenBoxPopup(e.idx + 1, function () {
      n.getBoxReward(0 != e.idx, e.boxData);
    });
  }
};
e.prototype.setBoxExpBar = function () {
  const t = $playerDataProxy.playerDataProxy.getBoxLevel();
  this.mBoxLvLab.string = "Lv." + t;
  const e = $cfg.default.instance.dataShopBox.getById(t);
  this.mExpBar.fillRange =
    $playerDataProxy.playerDataProxy.openBoxExp / e.exp;
};
e.prototype.updateBoxView = function () {
  const t = $playerDataProxy.playerDataProxy.getBoxLevel();
  const e = $cfg.default.instance.dataShopBox.getById(t);
  if (e) {
    this.setBoxExpBar();
    for (
      const n = this.mBoxShopItems.children,
            i = $itemDataProxy.itemDataProxy.getItemValue(
              $itemEnum.E_ItemId.DIAMOND,
            ),
            o = 0;
      o < n.length;
      ++o
    ) {
      const r = n[o];
      const c = r.getChildByName("BtnBuy");
      const l = c.getChildByName("layout").getChildByName("priceLab");
      const u = r.getChildByName("BtnVideo");
      const p = 0;
      p = Number(0 == o ? e.cost : e.bigCost);
      p = $attrMgr.AttrMgr.instance.getShopRightPrice(p);
      l.getComponent(cc.Label).string = "x" + p;
      if (i >= p) {
        l.color = cc.color(255, 255, 255);
      } else {
        l.color = cc.color(255, 75, 75);
      }
      $nodeUtil.default.addButtonListener(
        c,
        "ShopView",
        "onBoxBtnBuyClick",
        this.node,
        {
          item: r,
          idx: o,
          boxData: e,
        },
      );
      $nodeUtil.default.addButtonListener(
        u,
        "ShopView",
        "onBoxBtnVideoClick",
        this.node,
        {
          item: r,
          idx: o,
          boxData: e,
        },
      );
    }
  } else {
    console.log("出问题了，宝箱等级:", t);
  }
};
e.prototype.initBoxItem = function () {
  const t = $playerDataProxy.playerDataProxy.getBoxLevel();
  const e = $cfg.default.instance.dataShopBox.getById(t);
  if (e) {
    this.setBoxExpBar();
    for (
      const n = this.mBoxShopItems.children,
            i = $itemDataProxy.itemDataProxy.getItemValue(
              $itemEnum.E_ItemId.DIAMOND,
            ),
            o = 0;
      o < n.length;
      ++o
    ) {
      const r = n[o];
      const c = r.getChildByName("BtnBuy");
      const l = c.getChildByName("layout").getChildByName("priceLab");
      const u = r.getChildByName("BtnVideo");
      const p = 0;
      p = Number(0 == o ? e.cost : e.bigCost);
      p = $attrMgr.AttrMgr.instance.getShopRightPrice(p);
      l.getComponent(cc.Label).string = "x" + p;
      if (i >= p) {
        l.color = cc.color(255, 255, 255);
      } else {
        l.color = cc.color(255, 75, 75);
      }
      $nodeUtil.default.addButtonListener(
        c,
        "ShopView",
        "onBoxBtnBuyClick",
        this.node,
        {
          item: r,
          idx: o,
          boxData: e,
        },
      );
      $nodeUtil.default.addButtonListener(
        u,
        "ShopView",
        "onBoxBtnVideoClick",
        this.node,
        {
          item: r,
          idx: o,
          boxData: e,
        },
      );
    }
    this.unschedule(this.boxSchedule);
    this.schedule(this.boxSchedule, 1);
  } else {
    console.log("出问题了，宝箱等级:", t);
  }
};
e.prototype.getDscountReward = function (t) {
  $globalPopupMgr.default.instance.showAwardNotice([
    {
      itemId: t.id,
      itemNum: t.num,
    },
  ]);
};
e.prototype.onDscountShopBtnBuy = function (t, e) {
  if (2 == e.buyType) {
    if (
      $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD) <
      e.priceNum
    ) {
      return void $globalPopupMgr.default.instance.showTips("金币不足");
    }
    $itemDataProxy.itemDataProxy.updateItemValue(
      $itemEnum.E_ItemId.GOLD,
      -e.priceNum,
    );
  } else if (3 == e.buyType) {
    if (
      $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.DIAMOND) <
      e.priceNum
    ) {
      return void $globalPopupMgr.default.instance.showTips("钻石不足");
    }
    $itemDataProxy.itemDataProxy.updateItemValue(
      $itemEnum.E_ItemId.DIAMOND,
      -e.priceNum,
    );
  }
  const n = $playerDataProxy.playerDataProxy.getDscountGoodsBuyNum(
    e.goodsData.cfgId,
  );
  n += 1;
  $playerDataProxy.playerDataProxy.setDscountGoodsBuyNum(
    e.goodsData.cfgId,
    n,
  );
  $globalPopupMgr.default.instance.showAwardNotice([
    {
      itemId: e.goodsData.id,
      itemNum: e.goodsData.num,
    },
  ]);
  this.setDscountShopItem(e.item, e.goodsData);
};
e.prototype.onDscountShopBtnVideo = function (t, e) {
  const n = this;
  const i = $playerDataProxy.playerDataProxy.dscountVideoNum;
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
    },
  });
};
e.prototype.getDscountShopPriceNum = function (t) {
  const e = $cfg.default.instance.dataItem.getById(t.id);
  const n = $cfg.default.instance.dataShopDaily.getById(t.cfgId);
  if (1 != n.buyType) {
    const i = null;
    if (2 == n.buyType) {
      i = e.gold;
    } else {
      i = e.diam;
    }
    const o = Math.floor(i * t.num * (t.dscount / 10));
    o = $attrMgr.AttrMgr.instance.getShopRightPrice(o);
    return Math.floor(o);
  }
  return 9999;
};
e.prototype.setDscountShopItem = function (t, e) {
  const n = $cfg.default.instance.dataShopDaily.getById(e.cfgId);
  const i = t.getChildByName("BtnBuy");
  const o = t.getChildByName("BtnVideo");
  const r = t.getChildByName("videoBg");
  const c = t.getChildByName("buyBg");
  r.active = o.active = 1 == n.buyType;
  c.active = i.active = 1 != n.buyType;
  const l = t.getChildByName("discount");
  l.active = e.dscount < 10;
  const p = $cfg.default.instance.dataItem.getById(e.id);
  if (1 == n.buyType) {
    const h = o.getChildByName("layout").getChildByName("num");
    const m = o.getChildByName("layout").getChildByName("videoIcon");
    const y = o.getChildByName("redPoint");
    const _ = $playerDataProxy.playerDataProxy.dscountVideoNum;
    m.active = _ >= n.freeNum;
    h.active = m.active;
    y.active = !m.active;
    if (h.active) {
      const g = n.freeNum + n.buyNum - _;
      h.getComponent(cc.Label).string = "(" + g + ")";
      if (g <= 0) {
        o.getComponent(cc.Button).interactable = !1;
      } else {
        $nodeUtil.default.addButtonListener(
          o,
          "ShopView",
          "onDscountShopBtnVideo",
          this.node,
          {
            item: t,
            goodsData: e,
          },
        );
      }
    } else {
      $nodeUtil.default.addButtonListener(
        o,
        "ShopView",
        "onDscountShopBtnVideo",
        this.node,
        {
          item: t,
          goodsData: e,
        },
      );
    }
  } else {
    const E = i.getChildByName("layout").getChildByName("icon2");
    const S = i.getChildByName("layout").getChildByName("icon1");
    const P = i.getChildByName("layout").getChildByName("priceLab");
    E.active = 3 == n.buyType;
    S.active = 2 == n.buyType;
    const A = this.getDscountShopPriceNum(e);
    if (l.active) {
      l.getChildByName("discountNum").getComponent(cc.Label).string =
        e.dscount + "折";
    }
    if (
      $playerDataProxy.playerDataProxy.getDscountGoodsBuyNum(e.cfgId) >=
      n.buyNum
    ) {
      i.getComponent(cc.Button).interactable = !1;
      E.active = !1;
      S.active = !1;
      P.getComponent(cc.Label).string = "已售罄";
      P.getComponent(cc.Label).fontSize = 28;
      P.color = cc.color(255, 255, 255);
    } else {
      const w = null;
      if (3 == n.buyType) {
        w = $itemDataProxy.itemDataProxy.getItemValue(
          $itemEnum.E_ItemId.DIAMOND,
        );
      } else {
        w = $itemDataProxy.itemDataProxy.getItemValue(
          $itemEnum.E_ItemId.GOLD,
        );
      }
      if (w >= A) {
        P.color = cc.color(255, 255, 255);
      } else {
        P.color = cc.color(255, 75, 75);
      }
      i.getComponent(cc.Button).interactable = !0;
      P.getComponent(cc.Label).string = "x" + A;
      P.getComponent(cc.Label).fontSize = 34;
      $nodeUtil.default.addButtonListener(
        i,
        "ShopView",
        "onDscountShopBtnBuy",
        this.node,
        {
          item: t,
          goodsData: e,
          priceNum: A,
          buyType: n.buyType,
        },
      );
    }
  }
  const C = t.getChildByName("greadImg");
  const M = t.getChildByName("icon");
  const I = t.getChildByName("num");
  const R = t.getChildByName("name");
  I.getComponent(cc.Label).string = "x" + e.num;
  R.getComponent(cc.Label).string = p.name;
  $resLoader.ResLoader.loadAsset({
    path: "textures/public/pic_wuping_di_" + p.rare,
    type: cc.SpriteFrame,
    bundleName: $frameEnum.Frame.EBundleName.HOME,
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
    bundleName: $frameEnum.Frame.EBundleName.RES,
  })
    .then(function (t) {
      M.getComponent(cc.Sprite).spriteFrame = t;
    })
    .catch(function (t) {
      console.log("error:", t);
    });
};
e.prototype.refreshDscountShopItem = function () {
  for (
    const t = $playerDataProxy.playerDataProxy.dscountGoodsDatas, e = this.mDscountShopItems.children[0], n = 0;
    n < t.length;
    ++n
  ) {
    const i = t[n];
    const o = this.mDscountShopItems.children[n];
    if (o) {
      //
    } else {
      o = cc.instantiate(e);
      this.mDscountShopItems.addChild(o);
    }
    this.setDscountShopItem(o, i);
  }
};
e.prototype.refreshGoodsDatas = function (t) {
  if (void 0 === t) {
    t = !0;
  }
  if (!t && $playerDataProxy.playerDataProxy.dscountGoodsDatas.length > 0) {
    this.refreshDscountShopItem();
  } else {
    let e;
    const n = [];
    const i = $cfg.default.instance.dataShopDaily.sheet();
    const o = [];
    for (let r in i) {
      if ((c = i[r]).id > 6) {
        break;
      }
      if (c.charge < 1) {
        o.push(c.id);
      }
    }
    const s = Math.floor(1e3 * Math.random()) % o.length;
    for (let r in ((e = o[s]), i)) {
      let c;
      if ((c = i[r]).id > 6) {
        break;
      }
      if (1 == c.buyType) {
        const l = c.reward.split("_").map(Number);
        n.push({
          id: l[0],
          num: l[1],
          buyNum: 0,
          dscount: 10,
          cfgId: c.id,
        });
      } else {
        for (const u = c.reward.split("|"), h = [], f = 0; f < u.length; ++f) {
          const d = u[f].split("_");
          h.push(Number(d[0]));
        }
        const m = $mathUtil.MathUtil.weightedRandom(h);
        if (m < 0) {
          m = 0;
        }
        const y = u[m].split("_");
        const _ = y[2].split("&").map(Number);
        const g = _[0];
        if (_[1] != _[0]) {
          g = (Math.floor(1e3 * Math.random()) % (_[1] - _[0])) + _[0];
        }
        const v = 10;
        if (e == c.id) {
          const E = Math.floor(10 * c.charge);
          v = (Math.floor(1e3 * Math.random()) % Math.floor(10 - E)) + E;
        }
        const S = $cfg.default.instance.dataItem
          .getById(Number(y[1]))
          .val.split("|")
          .map(Number);
        const P = $playerDataProxy.playerDataProxy.getCanRefreshDscountShop(S);
        const A = P[Math.floor(1e4 * Math.random()) % P.length];
        n.push({
          id: A,
          num: g,
          buyNum: 0,
          dscount: v,
          cfgId: c.id,
        });
      }
    }
    $playerDataProxy.playerDataProxy.dscountGoodsDatas = n;
    this.refreshDscountShopItem();
  }
};
e.prototype.initDscountShopItem = function () {
  this.refreshGoodsDatas(!1);
};
e.prototype.onBtnDetails = function () {
  $globalPopupMgr.default.instance.showShopBoxLevelDetailsPopup();
};
e.prototype.onBtnRefresh = function () {
  const t = this;
  $adMgr.AdMgr.instance.showVideoAd({
    id: 1,
    eventId: "AD_ShopRefresh",
    success: function () {
      t.refreshGoodsDatas();
    },
    fail: function () {},
    error: function (t) {
      cc.log(t);
    },
  });
};
e.prototype.updateDscountPriceColor = function (t) {
  for (
    const e = this.mDscountShopItems.children, n = $playerDataProxy.playerDataProxy.dscountGoodsDatas, i = t ? 2 : 3, o = 0;
    o < n.length;
    ++o
  ) {
    const r = n[o];
    const c = $cfg.default.instance.dataShopDaily.getById(r.cfgId);
    if (c.buyType == i) {
      const l = e[o]
        .getChildByName("BtnBuy")
        .getChildByName("layout")
        .getChildByName("priceLab");
      if (
        $playerDataProxy.playerDataProxy.getDscountGoodsBuyNum(r.cfgId) >=
        c.buyNum
      ) {
        l.color = cc.color(255, 255, 255);
      } else {
        const u = null;
        if (t) {
          u = $itemDataProxy.itemDataProxy.getItemValue(
            $itemEnum.E_ItemId.GOLD,
          );
        } else {
          u = $itemDataProxy.itemDataProxy.getItemValue(
            $itemEnum.E_ItemId.DIAMOND,
          );
        }
        const p = l.getComponent(cc.Label).string.split("x")[1];
        if (u >= Number(p)) {
          l.color = cc.color(255, 255, 255);
        } else {
          l.color = cc.color(255, 75, 75);
        }
      }
    }
  }
};
e.prototype.updateDiamondNum = function () {
  const t = $playerDataProxy.playerDataProxy.getBoxLevel();
  const e = $cfg.default.instance.dataShopBox.getById(t);
  const n = $itemDataProxy.itemDataProxy.getItemValue(
    $itemEnum.E_ItemId.DIAMOND,
  );
  if (e) {
    for (const i = this.mBoxShopItems.children, o = 0; o < i.length; ++o) {
      const r = i[o]
        .getChildByName("BtnBuy")
        .getChildByName("layout")
        .getChildByName("priceLab");
      const c = Number(0 == o ? e.cost : e.bigCost);
      if (n >= c) {
        r.color = cc.color(255, 255, 255);
      } else {
        r.color = cc.color(255, 75, 75);
      }
    }
  }
  const l = this.mGoldShopItems.children;
  for (o = 1; o < l.length; ++o) {
    const u = l[o];
    const p = $cfg.default.instance.dataShopDaily.getById(o + 11);
    if (n >= p.coinSpe) {
      (r = u
        .getChildByName("BtnBuy")
        .getChildByName("layout")
        .getChildByName("num")).color = cc.color(255, 255, 255);
    } else {
      (r = u
        .getChildByName("BtnBuy")
        .getChildByName("layout")
        .getChildByName("num")).color = cc.color(255, 75, 75);
    }
  }
  this.updateDscountPriceColor(!1);
};
e.prototype.updateBuildlevel = function (t) {
  const e = this;
  if (9 == t) {
    const n = this.mDscountShopItems.children;
    const i = $playerDataProxy.playerDataProxy.dscountGoodsDatas;
    const o = 0;
    n.forEach(function (t) {
      const n = i[o];
      const r = $cfg.default.instance.dataShopDaily.getById(n.cfgId);
      const s = e.getDscountShopPriceNum(n);
      const c = t.getChildByName("BtnBuy");
      c
        .getChildByName("layout")
        .getChildByName("priceLab")
        .getComponent(cc.Label).string = "x" + s;
      $nodeUtil.default.addButtonListener(
        c,
        "ShopView",
        "onDscountShopBtnBuy",
        e.node,
        {
          item: t,
          goodsData: n,
          priceNum: s,
          buyType: r.buyType,
        },
      );
      o++;
    });
    this.updateDscountPriceColor(!0);
    this.updateDscountPriceColor(!1);
  }
};
e.prototype.updateGold = function () {
  this.updateDscountPriceColor(!0);
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(
    $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE +
      $itemEnum.E_ItemId.DIAMOND,
    this.updateDiamondNum,
    this,
  );
  $eventManager.EventManager.instance.off(
    $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.GOLD,
    this.updateGold,
    this,
  );
  $eventManager.EventManager.instance.off(
    $playerDataProxy.EPlayDataEvent.UPDATE_BUILD_LEVEL,
    this.updateBuildlevel,
    this,
  );
};
e.prototype.onEnable = function () {
  this.initGoldItem();
  this.initBoxItem();
  this.initDscountShopItem();
  this.boxSchedule();
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(
    $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE +
      $itemEnum.E_ItemId.DIAMOND,
    this.updateDiamondNum,
    this,
  );
  $eventManager.EventManager.instance.on(
    $itemDataProxy.EItemDataEvent.ITEM_ONCE_UPDATE + $itemEnum.E_ItemId.GOLD,
    this.updateGold,
    this,
  );
  $eventManager.EventManager.instance.on(
    $playerDataProxy.EPlayDataEvent.UPDATE_BUILD_LEVEL,
    this.updateBuildlevel,
    this,
  );
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mDscountShopItems = null;
  e.mBoxShopItems = null;
  e.mGoldShopItems = null;
  e.mTimeLab = null;
  e.mExpBar = null;
  e.mBoxLvLab = null;
  e._canGetDebrisRewards = [];
  return e;
}
exports.default = A;
