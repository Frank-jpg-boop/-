var i;
var $cfg = require("./Cfg");
var $list = require("./List");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $popupBase = require("./PopupBase");
var $animUtils = require("./AnimUtils");
var $nodeUtil = require("./NodeUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var $survivePeopleDialogueItem = require("./SurvivePeopleDialogueItem");
var $survivePeopleItem = require("./SurvivePeopleItem");
var v = cc._decorator;
var b = v.ccclass;
var E = v.property;
var S = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mMyList = null;
        e.mStageName = null;
        e.mRichText = null;
        e.mBar = null;
        e.mRewardTips = null;
        e.mRewardInfo = null;
        e.mHideRewardInfo = null;
        e.mBtnBox = null;
        e.mItemContent = null;
        e.mSurvivePeopleDialogueItemPb = null;
        e._stageId = 0;
        e._startStage = 0;
        e._survivePeopleDatas = [];
        e._isCanReceiveBox = !1;
        e._dialogueItem = null;
        e._isShowReward = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this._stageId = t.stageId;
        this._isShowReward = t.isShowReward;
        this.initSelectBtn();
        this.setSelectBtnIsShowRedPoint();
        this.mHideRewardInfo.on(cc.Node.EventType.TOUCH_START, this.touchBegin, this);
        this.mHideRewardInfo.active = !1;
        this.onScrollView();
        this.schedule(this.showPeopleDialogue, 10);
    };
    e.prototype.showPeopleDialogue = function () {
        var t;
        var e = this;
        this.removeDialogueItem();
        for (var n = this.mItemContent.children, i = [], o = 0; o < n.length; ++o) {
            var r = n[o];
            var s =
                (null === (t = r.getComponent($survivePeopleItem.default)) || void 0 === t ? void 0 : t.peopleId) || 0;
            if ($playerDataProxy.playerDataProxy.getPeopleRewardIsReceive(this._stageId, s)) {
                i.push({
                    item: r,
                    peopleId: s
                });
            }
        }
        if (i.length > 0) {
            var c = Math.floor(1e3 * Math.random()) % i.length;
            this._dialogueItem = cc.instantiate(this.mSurvivePeopleDialogueItemPb);
            this.node.addChild(this._dialogueItem);
            var l = $nodeUtil.default.nodeParentChangeLocalPos(i[c].item, this.node);
            this._dialogueItem.position = cc.v3(
                l.x + 0.1 * this._dialogueItem.width,
                l.y + 0.3 * this._dialogueItem.height
            );
            var u = $cfg.default.instance.dataSurvivor.getById(i[c].peopleId);
            if (u) {
                this._dialogueItem.getComponent($survivePeopleDialogueItem.default).setDialogueMsg(u.info1);
            }
            this.scheduleOnce(function () {
                e.removeDialogueItem();
            }, 3);
        }
    };
    e.prototype.removeDialogueItem = function () {
        if (this._dialogueItem && this._dialogueItem.isValid) {
            this._dialogueItem.destroy();
            this._dialogueItem.removeFromParent();
            this._dialogueItem = null;
        }
    };
    e.prototype.initSelectBtn = function () {
        var t = $cfg.default.instance.dataStage.sheet();
        var e = Object.keys(t);
        var n = t[e[e.length - 1]].id;
        var i = this.node.getChildByName("selectBtns");
        if (1 == this._stageId) {
            this._startStage = 1;
        } else {
            if (this._stageId == n) {
                this._startStage = n - 2;
            } else {
                this._startStage = this._stageId - 1;
            }
        }
        for (var o = $stageDataProxy.stageDataProxy.passStageId, r = 1; r <= 3; ++r) {
            var s = i.getChildByName("btn" + r);
            s.active = !0;
            var c = s.getChildByName("selectBtn" + r);
            var l = c.getChildByName("selectBg");
            var u = c.getChildByName("lab");
            var p = this._startStage + (r - 1);
            l.active = p == this._stageId;
            if (p <= o + 1) {
                u.getComponent(cc.Label).string = "第" + p + "章";
                c.getComponent(cc.Button).interactable = !0;
            } else {
                u.getComponent(cc.Label).string = "未解锁";
                c.getComponent(cc.Button).interactable = !1;
            }
        }
    };
    e.prototype.touchBegin = function () {
        this.mHideRewardInfo.active = !1;
        this.mRewardInfo.active = !1;
    };
    e.prototype.onShow = function () {
        this.initSurvivePeople();
        if (this._isShowReward) {
            var t = $cfg.default.instance.dataStage.getById(this._stageId);
            this.showRewardInfo(t.allSur, this.mBtnBox);
        }
    };
    e.prototype.setSelectBtnIsShowRedPoint = function () {
        for (var t = this.node.getChildByName("selectBtns"), e = 1; e <= 3; ++e) {
            var n = t.getChildByName("btn" + e);
            if (n.active) {
                var i = n.getChildByName("selectBtn" + e).getChildByName("redDot");
                var o = this._startStage + (e - 1);
                i.active = $playerDataProxy.playerDataProxy.getStageSurviveIsCanReward(o);
            }
        }
    };
    e.prototype.initSurvivePeople = function () {
        var t = $stageDataProxy.stageDataProxy.getStageSurvivalCount(this._stageId);
        this.mRichText.string =
            "<outline color=#000000 width=3><color=#FFFFFF>已救出</color><color=#00FF00>" +
            t +
            "</color><color=#FFFFFF>人</color></outline>";
        var e = $cfg.default.instance.dataStage.getById(this._stageId);
        var n = e.survivor.split("|").map(function (t) {
            return Number(t) + e.checkSur;
        });
        this._survivePeopleDatas = [];
        for (var i = 0; i < n.length; ++i) {
            var o = $cfg.default.instance.dataSurvivor.getById(n[i]);
            this._survivePeopleDatas.push(o);
        }
        var r = this._survivePeopleDatas.length;
        this.mMyList.numItems = r;
        this.mBar.fillRange = t / r;
        this.mStageName.string = e.name;
        this.updateSurviveList();
        this.setBtnBoxState();
    };
    e.prototype.updateSurviveList = function () {
        var t = this;
        this._survivePeopleDatas.sort(function (e, n) {
            var i = 0;
            if ($playerDataProxy.playerDataProxy.getPeopleRewardIsReceive(t._stageId, e.id)) {
                i = 1;
            }
            if (1 != i && $stageDataProxy.stageDataProxy.isRescueSurvival(t._stageId, e.id)) {
                i = 2;
            }
            var o = 0;
            if ($playerDataProxy.playerDataProxy.getPeopleRewardIsReceive(t._stageId, n.id)) {
                o = 1;
            }
            if (1 != o && $stageDataProxy.stageDataProxy.isRescueSurvival(t._stageId, n.id)) {
                o = 2;
            }
            return o - i;
        });
        this.mMyList.scrollTo(0, 0.2);
        this.mMyList.updateAll();
    };
    e.prototype.setBtnBoxState = function () {
        var t = $stageDataProxy.stageDataProxy.getStageSurvivalCount(this._stageId);
        var e = this._survivePeopleDatas.length;
        var n = this.mBtnBox.getChildByName("redDot");
        if (t >= e) {
            if ($playerDataProxy.playerDataProxy.getSurviveBoxIsReceive(this._stageId)) {
                cc.Tween.stopAllByTarget(this.mBtnBox),
                    (this.mBtnBox.angle = 0),
                    (this._isCanReceiveBox = !1),
                    (n.active = !1),
                    $nodeUtil.default.setSpriteGrayMaterial(this.mBtnBox);
            } else {
                (this._isCanReceiveBox = !0),
                    cc.Tween.stopAllByTarget(this.mBtnBox),
                    $animUtils.AnimUtil.shakeAngle(this.mBtnBox, 10, 0.5, !0),
                    (n.active = !0),
                    $nodeUtil.default.setSpriteNormalMaterial(this.mBtnBox);
            }
        } else {
            n.active = !1;
            cc.Tween.stopAllByTarget(this.mBtnBox);
            this.mBtnBox.angle = 0;
            this._isCanReceiveBox = !1;
            $nodeUtil.default.setSpriteNormalMaterial(this.mBtnBox);
        }
    };
    e.prototype.onUpdateItem = function (t, e) {
        var n = this._survivePeopleDatas[e];
        var i = t.getChildByName("name");
        var o = t.getChildByName("BtnReceive");
        var r = t.getChildByName("unlockMask");
        var a = r.getChildByName("baoxiang");
        var s = o.getChildByName("receiveBox");
        i.getComponent(cc.Label).string = n.name;
        t.getComponent($survivePeopleItem.default).peopleId = n.id;
        if ($playerDataProxy.playerDataProxy.getPeopleRewardIsReceive(this._stageId, n.id)) {
            r.active = !1;
            o.active = !1;
            $nodeUtil.default.addButtonListener(t, "SurviveListPopup", "onPeopleItemMsgClick", this.node, {
                msg: null,
                peopleData: n
            });
        } else {
            r.active = !$stageDataProxy.stageDataProxy.isRescueSurvival(this._stageId, n.id);
            o.active = $stageDataProxy.stageDataProxy.isRescueSurvival(this._stageId, n.id);
        }
        if (r.active) {
            $nodeUtil.default.addButtonListener(a, "SurviveListPopup", "onShowPeopleItemRewards", this.node, {
                msg: a,
                peopleData: n
            });
        }
        if (o.active) {
            $nodeUtil.default.addButtonListener(o, "SurviveListPopup", "onReceivePeopleItemClick", this.node, {
                item: t,
                msg: null,
                peopleData: n
            });
            cc.Tween.stopAllByTarget(s);
            var c = cc
                .tween(s)
                .to(0.3, {
                    scale: 1.2
                })
                .to(0.3, {
                    scale: 1
                });
            cc.tween(s).repeatForever(c).start();
        } else {
            cc.Tween.stopAllByTarget(s);
        }
    };
    e.prototype.onReceivePeopleItemClick = function (t, e) {
        var n = this;
        $globalPopupMgr.default.instance.showOpenBoxPopup(1, function () {
            var t = $playerDataProxy.playerDataProxy.getBoxReward(e.peopleData.reward);
            $globalPopupMgr.default.instance.showAwardNotice(t);
            n.updateSurviveList();
        });
        $playerDataProxy.playerDataProxy.receivePeopleRewardId(this._stageId, e.peopleData.id);
        var i = e.item.getChildByName("unlockMask");
        var o = e.item.getChildByName("BtnReceive");
        i.active = !1;
        o.active = !1;
        $nodeUtil.default.addButtonListener(e.item, "SurviveListPopup", "onPeopleItemMsgClick", this.node, {
            msg: e.msg,
            peopleData: e.peopleData
        });
        this.setSelectBtnIsShowRedPoint();
    };
    e.prototype.onPeopleItemMsgClick = function (t, e) {
        $globalPopupMgr.default.instance.showSurvivePeopleDetailsPopup(e.peopleData);
    };
    e.prototype.onShowPeopleItemRewards = function (t, e) {
        this.showRewardInfo(e.peopleData.reward, e.msg);
    };
    e.prototype.onSelectBtnClick = function (t, e) {
        var n = $cfg.default.instance.dataStage.sheet();
        var i = Object.keys(n);
        var o = n[i[i.length - 1]].id;
        var r = Number(e);
        if (1 == r) {
            this._stageId--;
            this._stageId < 1 && (this._stageId = 1);
        } else {
            if (3 == r) {
                this._stageId++, this._stageId > o && (this._stageId = o);
            } else {
                if (1 == this._stageId) {
                    this._stageId++;
                } else {
                    this._stageId == o && this._stageId--;
                }
            }
        }
        this.initSelectBtn();
        this.initSurvivePeople();
        this.removeDialogueItem();
        this.setSelectBtnIsShowRedPoint();
    };
    e.prototype.onBtnBox = function () {
        var t = this;
        if (this._isCanReceiveBox) {
            $globalPopupMgr.default.instance.showOpenBoxPopup(1, function () {
                var e = $cfg.default.instance.dataStage.getById(t._stageId);
                var n = $playerDataProxy.playerDataProxy.getBoxReward(e.allSur);
                $globalPopupMgr.default.instance.showAwardNotice(n);
            });
            $playerDataProxy.playerDataProxy.receiveSurviveBox(this._stageId);
            this.setSelectBtnIsShowRedPoint();
            this.setBtnBoxState();
        } else {
            var e = $cfg.default.instance.dataStage.getById(this._stageId);
            this.showRewardInfo(e.allSur, this.mBtnBox);
        }
    };
    e.prototype.showRewardInfo = function (t, e) {
        var n = this.mRewardInfo.getChildByName("items");
        n.children.forEach(function (t) {
            t.active = !1;
        });
        var i = n.getChildByName("rewardItem");
        var o = this.getBoxRewardData(t);
        this.mRewardInfo.active = o.length > 0;
        this.mHideRewardInfo.active = this.mRewardInfo.active;
        var r = $nodeUtil.default.nodeParentChangeLocalPos(e, this.mRewardInfo.parent);
        this.mRewardInfo.x = r.x;
        var s = r.y + e.height * e.scaleY + 30;
        this.mRewardInfo.y = s;
        for (
            var u = function (t) {
                    var e = n.children[t];
                    if (e) {
                        //
                    } else {
                        e = cc.instantiate(i);
                        n.addChild(e);
                    }
                    e.active = !0;
                    var r = e.getChildByName("greadImg");
                    var s = e.getChildByName("icon");
                    var u = e.getChildByName("num");
                    var p = o[t];
                    var h = $cfg.default.instance.dataItem.getById(p.itemId);
                    $resLoader.ResLoader.loadAsset({
                        path: "textures/public/pic_wuping_di_" + h.rare,
                        type: cc.SpriteFrame,
                        bundleName: $frameEnum.Frame.EBundleName.HOME
                    })
                        .then(function (t) {
                            r.getComponent(cc.Sprite).spriteFrame = t;
                        })
                        .catch(function (t) {
                            console.log("error:", t);
                        });
                    $resLoader.ResLoader.loadAsset({
                        path: $itemDataProxy.itemDataProxy.getItemIconPath(h.id),
                        type: cc.SpriteFrame,
                        bundleName: $frameEnum.Frame.EBundleName.RES
                    })
                        .then(function (t) {
                            s.getComponent(cc.Sprite).spriteFrame = t;
                        })
                        .catch(function (t) {
                            console.log("error:", t);
                        });
                    u.getComponent(cc.Label).string = "x" + p.itemNum;
                },
                p = 0;
            p < o.length;
            ++p
        ) {
            u(p);
        }
    };
    e.prototype.getBoxRewardData = function (t) {
        for (var e = t.split("_"), n = [], i = 0; i < e.length; ++i) {
            var o = e[i].split("&");
            n.push({
                itemId: Number(o[0]),
                itemNum: Number(o[1])
            });
        }
        return n;
    };
    e.prototype.onScrollView = function () {
        var t = this.mItemContent.children;
        t[t.length - 1].getComponent($survivePeopleItem.default).peopleId;
        this.mRewardTips.active = !1;
        this.removeDialogueItem();
    };
    __decorate([E($list.default)], e.prototype, "mMyList", void 0);
    __decorate([E(cc.Label)], e.prototype, "mStageName", void 0);
    __decorate([E(cc.RichText)], e.prototype, "mRichText", void 0);
    __decorate([E(cc.Sprite)], e.prototype, "mBar", void 0);
    __decorate([E(cc.Node)], e.prototype, "mRewardTips", void 0);
    __decorate([E(cc.Node)], e.prototype, "mRewardInfo", void 0);
    __decorate([E(cc.Node)], e.prototype, "mHideRewardInfo", void 0);
    __decorate([E(cc.Node)], e.prototype, "mBtnBox", void 0);
    __decorate([E(cc.Node)], e.prototype, "mItemContent", void 0);
    __decorate([E(cc.Prefab)], e.prototype, "mSurvivePeopleDialogueItemPb", void 0);
    return __decorate([b], e);
})($popupBase.PopupBase);
exports.default = S;
