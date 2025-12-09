var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $nodeUtil = require("./NodeUtil");
var $commonRedPoint = require("./CommonRedPoint");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $itemDataProxy = require("./ItemDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var g = cc._decorator;
var v = g.ccclass;
var b = g.property;
var E = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mPossessItems = null;
        e.mLockItems = null;
        e._possessArtifacts = [];
        e._lockArtifacts = [];
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(
            $playerDataProxy.EPlayDataEvent.UPDATE_ARTIFACT_LEVEL,
            this.updateArtifactLevel,
            this
        );
        $eventManager.EventManager.instance.on($playerDataProxy.EPlayDataEvent.GM_PASS_STAGE, this.gmPassStage, this);
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(
            $playerDataProxy.EPlayDataEvent.UPDATE_ARTIFACT_LEVEL,
            this.updateArtifactLevel,
            this
        );
        $eventManager.EventManager.instance.off($playerDataProxy.EPlayDataEvent.GM_PASS_STAGE, this.gmPassStage, this);
    };
    e.prototype.onEnable = function () {
        this.initArtifactData();
        this.initArtifactItem();
    };
    e.prototype.onDisable = function () {
        $stageDataProxy.stageDataProxy.unlockSkillId = 0;
    };
    e.prototype.gmPassStage = function () {
        if (this.node.active) {
            this.initArtifactData();
            this.initArtifactItem();
        }
    };
    e.prototype.updateArtifactLevel = function () {
        for (var t = this.mPossessItems.children, e = 0; e < t.length; ++e) {
            var n = this._possessArtifacts[e];
            this.setArtifactItem(t[e], n);
        }
    };
    e.prototype.initArtifactItem = function () {
        var t = this.mPossessItems.children[0];
        t.active = !1;
        for (var e = 0; e < this._possessArtifacts.length; ++e) {
            var n = this._possessArtifacts[e];
            if ((o = this.mPossessItems.children[e])) {
                //
            } else {
                o = cc.instantiate(t);
                this.mPossessItems.addChild(o);
            }
            o.active = !0;
            this.setArtifactItem(o, n);
            $nodeUtil.default.addButtonListener(o, "ArtifactView", "onArtifactItemClick", this.node, {
                item: o,
                artifactData: n
            });
        }
        var i = this.mLockItems.children[0];
        i.active = !1;
        for (e = 0; e < this._lockArtifacts.length; ++e) {
            var o;
            n = this._lockArtifacts[e];
            if ((o = this.mLockItems.children[e])) {
                //
            } else {
                o = cc.instantiate(i);
                this.mLockItems.addChild(o);
            }
            o.active = !0;
            this.setArtifactItem(o, n);
            o.getChildByName("lockMask").getChildByName("tips").getComponent(cc.Label).string =
                "第" + (n.unlockVal + 1) + "章解锁";
        }
    };
    e.prototype.setArtifactItem = function (t, e) {
        t.name = "item" + e.id;
        var n = t.getChildByName("greadBg");
        var i = t.getChildByName("name");
        var o = t.getChildByName("icon");
        var r = t.getChildByName("bar");
        var a = t.getChildByName("num");
        i.getComponent(cc.Label).string = e.name;
        $resLoader.ResLoader.loadAsset({
            path: "textures/skill/" + e.icon,
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.GAME
        })
            .then(function (t) {
                o.getComponent(cc.Sprite).spriteFrame = t;
            })
            .catch(function (t) {
                console.log("error:", t);
            });
        $resLoader.ResLoader.loadAsset({
            path: "textures/artifact/pic_faqi_gread_" + e.rare,
            type: cc.SpriteFrame,
            bundleName: $frameEnum.Frame.EBundleName.HOME
        })
            .then(function (t) {
                n.getComponent(cc.Sprite).spriteFrame = t;
            })
            .catch(function (t) {
                console.log("error:", t);
            });
        var s = t.getChildByName("lv");
        if (s) {
            var u = t.getChildByName("CommonRedPoint").getComponent($commonRedPoint.default);
            var h = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeedNum(e.id);
            var f = e.dmg.split("|").map(Number);
            var d = $playerDataProxy.playerDataProxy.getArtifactLv(e.id);
            t.getChildByName("New")
                .getComponent($commonRedPoint.default)
                .setRedPointState(
                    0 != $stageDataProxy.stageDataProxy.unlockSkillId &&
                        $stageDataProxy.stageDataProxy.unlockSkillId == e.id
                );
            if (d < f.length) {
                s.getComponent(cc.Label).string = "Lv." + d;
                var g = $playerDataProxy.playerDataProxy.getArtifactUpGreadNeeItemId(e.id);
                var v = $itemDataProxy.itemDataProxy.getItemValue(g);
                r.getComponent(cc.Sprite).fillRange = v / h;
                a.getComponent(cc.Label).string = v + "/" + h;
                u.setRedPointState(v >= h);
            } else {
                s.getComponent(cc.Label).string = "Lv.Max";
                r.getComponent(cc.Sprite).fillRange = 1;
                a.getComponent(cc.Label).string = "Max";
                u.setRedPointState(!1);
            }
        }
    };
    e.prototype.initArtifactData = function () {
        this._possessArtifacts = [];
        this._lockArtifacts = [];
        var t = $cfg.default.instance.dataSkill.sheet();
        var e = $stageDataProxy.stageDataProxy.passStageId;
        for (var n in t) {
            var i = t[n];
            if ("" != i.icon) {
                if (0 == i.unlockType || (1 == i.unlockType && e >= i.unlockVal)) {
                    this._possessArtifacts.push(i);
                } else {
                    this._lockArtifacts.push(i);
                }
            }
        }
        this._lockArtifacts.sort(function (t, e) {
            return t.unlockVal - e.unlockVal;
        });
    };
    e.prototype.onArtifactItemClick = function (t, e) {
        if (
            $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_24 &&
            11 == e.artifactData.id
        ) {
            $eventManager.EventManager.instance.emit(
                $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                $guideDataProxy.EGuideStepId.G_24
            );
        }
        $stageDataProxy.stageDataProxy.unlockSkillId = 0;
        this.setArtifactItem(e.item, e.artifactData);
        $globalPopupMgr.default.instance.showArtifactDetailsPopup(e.artifactData);
    };
    __decorate([b(cc.Node)], e.prototype, "mPossessItems", void 0);
    __decorate([b(cc.Node)], e.prototype, "mLockItems", void 0);
    return __decorate([v], e);
})(cc.Component);
exports.default = E;
