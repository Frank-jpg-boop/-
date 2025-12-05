var i;
var $popupBase = require("./PopupBase");
var $animUtils = require("./AnimUtils");
var $adMgr = require("./AdMgr");
var $battleMgr = require("./BattleMgr");
var $levelBattleData = require("./LevelBattleData");
var $skillMgr = require("./SkillMgr");
var $skillExItem = require("./SkillExItem");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nSkillExView = null;
        e.nBtnView = null;
        e.nBtnAll = null;
        e.nBtnRefresh = null;
        e.nNull = null;
        e.skillIconFrames = [];
        e.spIcon = null;
        e.nRibbon = null;
        e._skillExs = [];
        e._golden = 0;
        e._battlePlayState = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this._golden = t.golden;
        this._battlePlayState = t.battlePlayState;
        $battleMgr.default.instance.getCurScene().pause();
        this.spIcon.spriteFrame = this.skillIconFrames[t.iconType];
        this.nBtnView.active = !1;
        this.nRibbon.active = 2 == t.iconType;
    };
    e.prototype.onShow = function () {
        $animUtils.AnimUtil.floatAnim(this.spIcon.node, 0.5, 5);
        this.refreshSkillEx(this._golden);
    };
    e.prototype.onHide = function () {
        if (this._battlePlayState) {
            $battleMgr.default.instance.getCurScene().resume();
        }
    };
    e.prototype.updateBtnView = function () {
        var t =
            $levelBattleData.levelBattleData.cfgStage.TimeRandom -
            $levelBattleData.levelBattleData.data.skillExRefreshCount;
        var e =
            $levelBattleData.levelBattleData.cfgStage.TimeAll -
            $levelBattleData.levelBattleData.data.skillExAllSelectCount;
        this.nBtnAll.active = e > 0;
        if (this.nBtnAll.active) {
            this.nBtnAll.getChildByName("Count").getComponent(cc.Label).string = "剩余次数：" + e;
        }
        this.nBtnRefresh.active = t > 0;
        if (this.nBtnRefresh.active) {
            this.nBtnRefresh.getChildByName("Count").getComponent(cc.Label).string = "剩余次数：" + t;
        }
    };
    e.prototype.refreshSkillEx = function (t) {
        var e = this;
        this.nBtnView.active = !1;
        this._skillExs = $skillMgr.SkillMgr.instance.refreshSkillExIds(t);
        this.nNull.active = 0 == this._skillExs.length;
        for (var n = this._skillExs.length - this.nSkillExView.childrenCount; n > 0; ) {
            this.nSkillExView.addChild(cc.instantiate(this.nSkillExView.children[0]));
            n--;
        }
        var i = this._skillExs.length - 1;
        this.nSkillExView.children.forEach(function (t, n) {
            t.x = -1500;
            t.active = n < e._skillExs.length;
            if (t.active) {
                t.getComponent($skillExItem.default).updateData(
                    e._skillExs[n],
                    function (t) {
                        e.nBtnView.active = !1;
                        var n = e._skillExs.length - 1;
                        e.nSkillExView.children.forEach(function (i) {
                            if (i.active) {
                                i.getComponent($skillExItem.default).closeAnim(t == i, function () {
                                    if (--n < 0) {
                                        e.removeUI();
                                    }
                                });
                            }
                        });
                    },
                    function () {
                        if (--i < 0) {
                            e.nSkillExView.children.forEach(function (t) {
                                t.getComponent(cc.Button).interactable = !0;
                            });
                            e.nBtnView.active = !0;
                            e.updateBtnView();
                        }
                    }
                );
            }
        });
    };
    e.prototype.onClickAllSelect = function () {
        var t = this;
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: "AD_All",
            eventData: {
                userA: "" + $levelBattleData.levelBattleData.cfgStage.id
            },
            success: function () {
                $levelBattleData.levelBattleData.data.skillExAllSelectCount++;
                t.removeUI();
                t._skillExs.forEach(function (t) {
                    $skillMgr.SkillMgr.instance.selectSkillEx(t);
                });
            },
            fail: function () {},
            error: function (t) {
                cc.log(t);
            }
        });
    };
    e.prototype.onClickRefresh = function () {
        var t = this;
        if ($battleMgr.default.instance.gm_InfiniteRandom) {
            this.refreshSkillEx(this._golden);
        } else {
            $adMgr.AdMgr.instance.showVideoAd({
                id: 1,
                eventId: "AD_Random1",
                eventData: {
                    userA: "" + $levelBattleData.levelBattleData.cfgStage.id
                },
                success: function () {
                    $levelBattleData.levelBattleData.data.skillExRefreshCount++;
                    t.updateBtnView();
                    t.refreshSkillEx(t._golden);
                },
                fail: function () {},
                error: function (t) {
                    cc.log(t);
                }
            });
        }
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    __decorate([m(cc.Node)], e.prototype, "nSkillExView", void 0);
    __decorate([m(cc.Node)], e.prototype, "nBtnView", void 0);
    __decorate([m(cc.Node)], e.prototype, "nBtnAll", void 0);
    __decorate([m(cc.Node)], e.prototype, "nBtnRefresh", void 0);
    __decorate([m(cc.Node)], e.prototype, "nNull", void 0);
    __decorate([m([cc.SpriteFrame])], e.prototype, "skillIconFrames", void 0);
    __decorate([m(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([m(cc.Node)], e.prototype, "nRibbon", void 0);
    return __decorate([d], e);
})($popupBase.PopupBase);
exports.default = y;
