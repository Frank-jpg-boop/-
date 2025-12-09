var i;
var $popupBase = require("./PopupBase");
var $animUtils = require("./AnimUtils");
var $adMgr = require("./AdMgr");
var $battleMgr = require("./BattleMgr");
var $levelBattleData = require("./LevelBattleData");
var $skillMgr = require("./SkillMgr");
var $skillItem = require("./SkillItem");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nSkillView = null;
        e.nBtnView = null;
        e.nNull = null;
        e.nBtnRefresh = null;
        e.nIcon = null;
        e._skills = [];
        e._battlePlayState = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this._battlePlayState = t.battlePlayState;
        $battleMgr.default.instance.getCurScene().pause();
        this.nBtnView.active = !1;
    };
    e.prototype.onShow = function () {
        $animUtils.AnimUtil.rotateAnim(this.nIcon, 180);
        this.refreshSkill();
    };
    e.prototype.onHide = function () {
        if (this._battlePlayState) {
            $battleMgr.default.instance.getCurScene().resume();
        }
    };
    e.prototype.updateBtnView = function () {
        var t =
            $levelBattleData.levelBattleData.cfgStage.TimeRandom -
            $levelBattleData.levelBattleData.data.skillRefreshCount;
        this.nBtnRefresh.active = t > 0;
        if (this.nBtnRefresh.active) {
            this.nBtnRefresh.getChildByName("Count").getComponent(cc.Label).string = "剩余次数：" + t;
        }
    };
    e.prototype.refreshSkill = function () {
        var t = this;
        this.nBtnView.active = !1;
        this._skills = $skillMgr.SkillMgr.instance.refreshSkillIds();
        this.nNull.active = 0 == this._skills.length;
        for (var e = this._skills.length - this.nSkillView.childrenCount; e > 0; ) {
            this.nSkillView.addChild(cc.instantiate(this.nSkillView.children[0]));
            e--;
        }
        var n = this._skills.length - 1;
        this.nSkillView.children.forEach(function (e, i) {
            e.scale = 0;
            e.active = i < t._skills.length;
            if (e.active) {
                e.getComponent($skillItem.default).updateData(
                    t._skills[i],
                    function (e) {
                        t.nBtnView.active = !1;
                        var n = t._skills.length - 1;
                        t.nSkillView.children.forEach(function (i) {
                            if (i.active) {
                                i.getComponent($skillItem.default).closeAnim(e == i, function () {
                                    if (--n < 0) {
                                        t.removeUI();
                                    }
                                });
                            }
                        });
                    },
                    function () {
                        if (--n < 0) {
                            t.nSkillView.children.forEach(function (t) {
                                t.getComponent(cc.Button).interactable = !0;
                            });
                            t.nBtnView.active = !0;
                            t.updateBtnView();
                        }
                    }
                );
            }
        });
    };
    e.prototype.onClickRefresh = function () {
        var t = this;
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: "AD_Random2",
            eventData: {
                userA: "" + $levelBattleData.levelBattleData.cfgStage.id
            },
            success: function () {
                $levelBattleData.levelBattleData.data.skillRefreshCount++;
                t.updateBtnView();
                t.refreshSkill();
            },
            fail: function () {},
            error: function (t) {
                cc.log(t);
            }
        });
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    __decorate([m(cc.Node)], e.prototype, "nSkillView", void 0);
    __decorate([m(cc.Node)], e.prototype, "nBtnView", void 0);
    __decorate([m(cc.Node)], e.prototype, "nNull", void 0);
    __decorate([m(cc.Node)], e.prototype, "nBtnRefresh", void 0);
    __decorate([m(cc.Node)], e.prototype, "nIcon", void 0);
    return __decorate([d], e);
})($popupBase.PopupBase);
exports.default = y;
