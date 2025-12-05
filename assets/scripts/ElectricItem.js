var i;
var $appBase = require("./AppBase");
var $eventManager = require("./EventManager");
var $frameEnum = require("./FrameEnum");
var $popupManager = require("./PopupManager");
var $animUtils = require("./AnimUtils");
var $nodeUtil = require("./NodeUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $battleMgr = require("./BattleMgr");
var $spAnimCtrl = require("./SpAnimCtrl");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var v = cc._decorator;
var b = v.ccclass;
var E = v.property;
var S = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nElectric = null;
        e.stateAnim = null;
        e.addElectricAnim = null;
        e._isFailPopup = !1;
        e._initPos = null;
        e._initParent = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(
            $levelBattleData.ELevelBattleDataEvent.ELECTRIC_CHANGE,
            this.updateItem,
            this
        );
        $eventManager.EventManager.instance.on($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onEventGuideChange, this);
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(
            $levelBattleData.ELevelBattleDataEvent.ELECTRIC_CHANGE,
            this.updateItem,
            this
        );
        $eventManager.EventManager.instance.off($guideMgr.EGuideEvent.GUIDE_CHANGE, this.onEventGuideChange, this);
    };
    e.prototype.init = function (t) {
        if (void 0 === t) {
            t = !1;
        }
        this._isFailPopup = t;
        this._initParent = this.node.parent;
        this.updateItem($levelBattleData.levelBattleData.electric, 0);
    };
    e.prototype.onStart = function () {
        if ($guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_41) {
            this.node.getComponent(cc.Button).interactable = !1;
            this._initPos = this.node.getPosition();
            this.stateAnim.node.active = !0;
            $animUtils.AnimUtil.breathAnim(this.node);
            var t = $nodeUtil.default.nodeParentChangeLocalPos(this.node, $appBase.topNode);
            this.node.parent = $appBase.topNode;
            this.node.setPosition(t);
            this.stateAnim.playAnim("stand2_2", 1, !0);
        }
    };
    e.prototype.updateItem = function (t, e) {
        var n = this;
        var i = $levelBattleData.levelBattleData.electric;
        this.nElectric.children.forEach(function (t, e) {
            t.children[0].active = e >= i;
            t.children[1].active = e < i;
        });
        var o = i >= $levelBattleData.levelBattleData.electricPowerCount;
        if (e > 0) {
            this.addElectricAnim.node.active = !0;
            this.addElectricAnim.clearAnim();
            this.addElectricAnim.playAnim(o ? "activate2" : "activate1", 1, !1, function () {
                n.addElectricAnim.node.active = !1;
                if (o) {
                    if (n.stateAnim.node.active) {
                        //
                    } else {
                        n.stateAnim.node.active = !0;
                        n.stateAnim.clearAnim();
                        n.stateAnim.playAnim(o ? "stand2_1" : "1stand1_1", 1, !1, function () {
                            n.stateAnim.playAnim(o ? "stand2_2" : "1stand1_2", 1, !0);
                        });
                    }
                }
            });
        }
        if (0 == e && o) {
            this.stateAnim.node.active = !0;
            this.stateAnim.clearAnim();
            this.stateAnim.playAnim(o ? "stand2_1" : "1stand1_1", 1, !1, function () {
                n.stateAnim.playAnim(o ? "stand2_2" : "1stand1_2", 1, !0);
            });
        }
        this.node.getChildByName("Icon").active = o;
        this.node.getChildByName("IconGray").active = !o;
    };
    e.prototype.onClickBtnThis = function () {
        if ($levelBattleData.levelBattleData.electric < $levelBattleData.levelBattleData.electricPowerCount) {
            $globalPopupMgr.default.instance.showTips("电量不足，继续去收集电池吧");
        } else if (0 != $levelBattleData.levelBattleData.cfgStage.id) {
            if (this._isFailPopup) {
                $popupManager.PopupManager.instance.remove("LevelFailPopup");
                $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.REVIVE_PLAYER, !0);
                return void $battleMgr.default.instance.getCurScene().scheduleWin();
            }
            $battleMgr.default.instance.getCurScene().pause();
            $popupManager.PopupManager.instance.show({
                bundleName: $frameEnum.Frame.EBundleName.GAME,
                path: "popups/LevelBackPopup",
                keep: !0
            });
        } else {
            $battleMgr.default.instance.getCurScene().scheduleWin();
        }
    };
    e.prototype.onEventGuideChange = function (t, e) {
        if (e == $guideDataProxy.EGuideStepId.G_41) {
            cc.Tween.stopAllByTarget(this.node);
            this.node.scale = 1;
            this.stateAnim.node.active = !1;
            var n = $nodeUtil.default.nodeParentChangeLocalPos(this.node, this._initParent);
            this.node.parent = this._initParent;
            this.node.setPosition(n);
            this.node.getComponent(cc.Button).interactable = !0;
        }
    };
    __decorate([E(cc.Node)], e.prototype, "nElectric", void 0);
    __decorate([E($spAnimCtrl.default)], e.prototype, "stateAnim", void 0);
    __decorate([E($spAnimCtrl.default)], e.prototype, "addElectricAnim", void 0);
    return __decorate([b], e);
})(cc.Component);
exports.default = S;
