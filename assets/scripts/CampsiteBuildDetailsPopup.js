var i;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $mathUtil = require("./MathUtil");
var $frameEnum = require("./FrameEnum");
var $popupBase = require("./PopupBase");
var $nodeUtil = require("./NodeUtil");
var $spAnimCtrl = require("./SpAnimCtrl");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $campsiteView = require("./CampsiteView");
var b = cc._decorator;
var E = b.ccclass;
var S = b.property;
var P = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mName = null;
        e.mRoomImg = null;
        e.mBuildDes = null;
        e.mBtnUpGread = null;
        e.mRewardIcon1 = null;
        e.mRewardIcon2 = null;
        e.mRewardNum1 = null;
        e.mRewardNum2 = null;
        e.nTips = null;
        e._buildData = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        var e = this;
        this._buildData = t.buildData;
        this.mBuildDes.string = this._buildData.info;
        this.mName.string = this._buildData.name;
        $resLoader.ResLoader.loadAsset({
            path: "textures/campsite/pic_yingdi_room" + this._buildData.loc,
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.HOME
        })
            .then(function (t) {
                e.mRoomImg.spriteFrame = t;
            })
            .catch(function (t) {
                console.log("error:", t);
            });
        this.setAttribute();
    };
    e.prototype.setAttribute = function () {
        var t = this;
        var e = this.node.getChildByName("layout").getChildByName("reward2");
        var n = $playerDataProxy.playerDataProxy.getBuildLv(this._buildData.loc);
        this.node.getChildByName("lv").getComponent(cc.Label).string = "Lv." + n;
        var i = $cfg.default.instance.dataBuild.queryOne(function (e) {
            return e.lv == n + 1 && e.loc == t._buildData.loc;
        });
        var o = this.mBtnUpGread.getChildByName("layout");
        var r = o.getChildByName("num");
        var c = this.node.getChildByName("LockTips").getComponent(cc.Label);
        if (i) {
            $resLoader.ResLoader.setSpritFrame(
                o.getChildByName("Icon").getComponent(cc.Sprite),
                $frameEnum.Frame.EBundleName.RES,
                $itemDataProxy.itemDataProxy.getItemIconPath(
                    this._buildData.max > 0 ? $itemEnum.E_ItemId.SURVIVOR : $itemEnum.E_ItemId.GOLD
                )
            );
            r.getComponent(cc.Label).string =
                "x" +
                $mathUtil.MathUtil.formatValue(this._buildData.max > 0 ? this._buildData.max : this._buildData.need);
            var h = null;
            if (this._buildData.max > 0) {
                h = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.SURVIVOR) >= this._buildData.max;
            } else {
                h = $itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD) >= this._buildData.need;
            }
            if (h) {
                r.color = cc.color(255, 255, 255);
            } else {
                r.color = cc.color(255, 75, 75);
            }
            var d = $stageDataProxy.stageDataProxy.passStageId + 1 >= i.unlock;
            c.node.active = !d;
            if (d) {
                $nodeUtil.default.setSpriteNormalMaterial(this.mBtnUpGread);
            } else {
                $nodeUtil.default.setSpriteGrayMaterial(this.mBtnUpGread);
            }
            if (c.node.active) {
                c.string = "第" + i.unlock + "章解锁";
            }
        } else {
            e.active = !1;
            this.node.getChildByName("layout").getChildByName("arrow").active = !1;
            this.mBtnUpGread.getComponent(cc.Button).interactable = !1;
            o.getChildByName("Icon").active = !1;
            r.active = !1;
            o.getChildByName("lab").getComponent(cc.Label).string = "已满级";
            c.node.active = !1;
        }
        this.mRewardIcon1.node.active = !1;
        this.mRewardIcon2.node.active = !1;
        if (1 == this._buildData.ImpType) {
            this.setRewardNumLab(i, "攻击 +");
        } else {
            if (2 == this._buildData.ImpType) {
                this.setRewardIconFrame($itemEnum.E_ItemId.GOLD), this.setRewardNumLab(i, "", "/分钟");
            } else {
                if (3 == this._buildData.ImpType) {
                    this.setRewardNumLab(i, "生命 +");
                } else {
                    if (4 == this._buildData.ImpType) {
                        this.setRewardIconFrame($itemEnum.E_ItemId.DIAMOND), this.setRewardNumLab(i, "", "/小时");
                    } else {
                        5 == this._buildData.ImpType
                            ? (this.setRewardIconFrame(201), this.setRewardNumLab(i, "", "/小时"))
                            : 6 == this._buildData.ImpType
                            ? this.setRewardNumLab(i, "概率 +")
                            : 7 == this._buildData.ImpType
                            ? this.setRewardNumLab(i, "移速 +")
                            : 8 == this._buildData.ImpType
                            ? this.setRewardNumLab(i, "暴击")
                            : 9 == this._buildData.ImpType
                            ? this.setRewardNumLab(i, "价格 -")
                            : 10 == this._buildData.ImpType
                            ? this.setRewardNumLab(i, "奖励 +")
                            : 11 == this._buildData.ImpType && this.setRewardNumLab(i, "提升 +");
                    }
                }
            }
        }
    };
    e.prototype.setRewardNumLab = function (t, e, n) {
        var i;
        var o;
        if (void 0 === e) {
            e = "";
        }
        if (void 0 === n) {
            n = "";
        }
        if (11 == this._buildData.ImpType) {
            i = this._buildData.ImpVal.split("|").map(Number)[0];
        } else {
            i = Number(this._buildData.ImpVal);
        }
        this.mRewardNum1.string =
            e +
            "" +
            (1 == this._buildData.isPer
                ? (100 * i).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + "%"
                : $mathUtil.MathUtil.formatValue(i)) +
            n;
        if (t) {
            if (11 == this._buildData.ImpType) {
                o = t.ImpVal.split("|").map(Number)[0];
            } else {
                o = Number(t.ImpVal);
            }
            this.mRewardNum2.string =
                e +
                "" +
                (1 == t.isPer
                    ? (100 * o).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + "%"
                    : $mathUtil.MathUtil.formatValue(o)) +
                n;
        }
    };
    e.prototype.setRewardIconFrame = function (t) {
        var e = this;
        $resLoader.ResLoader.loadAsset({
            path: $itemDataProxy.itemDataProxy.getItemIconPath(t),
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.RES
        })
            .then(function (n) {
                e.mRewardIcon1.node.active = !0;
                e.mRewardIcon1.spriteFrame = n;
                e.mRewardIcon2.node.active = !0;
                e.mRewardIcon2.spriteFrame = n;
                e.mRewardIcon1.node.scale = $itemDataProxy.itemDataProxy.getItemIconScale(t);
                e.mRewardIcon2.node.scale = $itemDataProxy.itemDataProxy.getItemIconScale(t);
            })
            .catch(function (t) {
                console.log("error:", t);
            });
    };
    e.prototype.playUpAnim = function () {
        var t = this.node.getChildByName("UpLvSpAnim").getComponent($spAnimCtrl.default);
        t.clearAnim();
        t.node.active = !0;
        var e = this.node.getChildByName("AttrSpAnim").getComponent($spAnimCtrl.default);
        t.playAnim("start_shanguang", 1, !1, function () {
            t.node.active = !1;
        });
        e.node.active = !0;
        e.clearAnim();
        e.playAnim("start_jindutiao", 1, !1, function () {
            e.node.active = !1;
        });
    };
    e.prototype.onBtnUpGread = function () {
        var t = this;
        var e = $playerDataProxy.playerDataProxy.getBuildLv(this._buildData.loc);
        var n = $cfg.default.instance.dataBuild.queryOne(function (n) {
            return n.lv == e + 1 && n.loc == t._buildData.loc;
        });
        if (n) {
            if ($stageDataProxy.stageDataProxy.passStageId + 1 >= n.unlock) {
                if ($itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.SURVIVOR) < this._buildData.max) {
                    $globalPopupMgr.default.instance.showTips("幸存者碎片不足");
                } else {
                    if ($itemDataProxy.itemDataProxy.getItemValue($itemEnum.E_ItemId.GOLD) < this._buildData.need) {
                        $globalPopupMgr.default.instance.showTips("金币不足");
                    } else {
                        $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.SURVIVOR, -this._buildData.max),
                            $itemDataProxy.itemDataProxy.updateItemValue(
                                $itemEnum.E_ItemId.GOLD,
                                -this._buildData.need
                            ),
                            (e += 1),
                            $playerDataProxy.playerDataProxy.setBuildLv(this._buildData.loc, e),
                            (this._buildData = $cfg.default.instance.dataBuild.queryOne(function (n) {
                                return n.lv == e && n.loc == t._buildData.loc;
                            })),
                            this.playUpAnim(),
                            this.setAttribute(),
                            $eventManager.EventManager.instance.emit($campsiteView.ECampsiteEvent.UPDATE_ROOM);
                    }
                }
            } else {
                $globalPopupMgr.default.instance.showTips("第" + n.unlock + "章解锁");
            }
        } else {
            $globalPopupMgr.default.instance.showTips("已达最高等级");
        }
    };
    __decorate([S(cc.Label)], e.prototype, "mName", void 0);
    __decorate([S(cc.Sprite)], e.prototype, "mRoomImg", void 0);
    __decorate([S(cc.Label)], e.prototype, "mBuildDes", void 0);
    __decorate([S(cc.Node)], e.prototype, "mBtnUpGread", void 0);
    __decorate([S(cc.Sprite)], e.prototype, "mRewardIcon1", void 0);
    __decorate([S(cc.Sprite)], e.prototype, "mRewardIcon2", void 0);
    __decorate([S(cc.Label)], e.prototype, "mRewardNum1", void 0);
    __decorate([S(cc.Label)], e.prototype, "mRewardNum2", void 0);
    __decorate([S(cc.Node)], e.prototype, "nTips", void 0);
    return __decorate([E], e);
})($popupBase.PopupBase);
exports.default = P;
