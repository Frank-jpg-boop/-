var i;
var $cfg = require("./Cfg");
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $mathUtil = require("./MathUtil");
var $randomUtil = require("./RandomUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $guideMgr = require("./GuideMgr");
var $guideDataProxy = require("./GuideDataProxy");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyRectCollider = require("./SimplyRectCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $spAnimCtrl = require("./SpAnimCtrl");
var $levelBattleData = require("./LevelBattleData");
var $progressWaitItem = require("./ProgressWaitItem");
var $unitMgr = require("./UnitMgr");
var $levelObjectBase = require("./LevelObjectBase");
var A = cc._decorator;
var w = A.ccclass;
var C = A.property;
var M = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.selfCollider = null;
        e.nWaitRescue = null;
        e.nRescue = null;
        e.rescueSpAnimCtrl = null;
        e.lName = null;
        e.nName = null;
        e._waitTime = 0;
        e._waitTimer = 0;
        e._progress = null;
        e._isRescue = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "isRescue", {
        get: function () {
            return this._isRescue;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(e.prototype, "key", {
        get: function () {
            return this._initParam.key;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onInit = function () {
        var t = this;
        this.updateRoomId(this._initParam.roomId);
        this._waitTime = 0;
        this._waitTimer = $cfg.default.instance.dataReward.getById(999).checkTime;
        $battleMgr.default.instance.createOtherNode("ProgressWaitItem", function (e) {
            t._progress = e.getComponent($progressWaitItem.default);
            if (t._isRemove) {
                t._progress.remove();
                return void (t._progress = null);
            }
            t._progress.init();
            t._progress.node.x = t.node.x;
            t._progress.node.y = t.node.y + 100;
        });
        this.nName.parent = this.nWaitRescue.getChildByName("View");
        this.nName.setSiblingIndex(0);
        var e = $cfg.default.instance.dataSurvivor.getById(Number(this.key));
        this.lName.string = e.name;
        this._isRescue = !1;
        this.nRescue.active = !1;
        this.nWaitRescue.active = !0;
        this.rescueSpAnimCtrl.init();
    };
    e.prototype.rescueSurvival = function (t) {
        var e = this;
        this.node.y = t;
        this.node.x += $randomUtil.RandomUtil.randomInt(-100, 100);
        $levelBattleData.levelBattleData.addRescue(1);
        this._isRescue = !0;
        this.nRescue.active = !0;
        this.nName.parent = this.nRescue;
        this.nName.setSiblingIndex(0);
        this.nWaitRescue.active = !1;
        this.rescueSpAnimCtrl.playAnim("bide", 1, !0);
        this.nRescue.getChildByName("RescueDialog").active = !0;
        var n = null;
        if (this.node.x > 0) {
            n = -1;
        } else {
            n = 1;
        }
        var i = this.node.x + 500 * n;
        var o = $battleMgr.default.instance.getCurScene().level;
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_BeRescued");
        if (
            0 == $levelBattleData.levelBattleData.cfgStage.id &&
            $guideMgr.GuideMgr.instance.cfgGuideStepId == $guideDataProxy.EGuideStepId.G_10
        ) {
            $eventManager.EventManager.instance.emit(
                $guideMgr.EGuideEvent.COMPLETE_GUIDE_STEP,
                $guideDataProxy.EGuideStepId.G_10
            );
            $globalPopupMgr.default.instance.showTips("【她在天台等你，快前往天台撤离点吧】");
        }
        cc.tween(this.node)
            .delay(2)
            .call(function () {
                e.rescueSpAnimCtrl.playAnim("run", 1, !0);
            })
            .parallel(
                cc.tween().to(
                    3,
                    {
                        x: i
                    },
                    {
                        easing: "sineIn"
                    }
                ),
                cc.tween().delay(2).to(1, {
                    opacity: 0
                })
            )
            .call(function () {
                var t = o.playerExitPos;
                t.y = o.findExitRoom().getGroundY();
                t.x += $randomUtil.RandomUtil.randomInt(-100, 100);
                e.node.setPosition(t);
                e.node.opacity = 255;
                e.rescueSpAnimCtrl.playAnim("bide", 1, !0);
                e.nRescue.getChildByName("RescueDialog").active = !1;
            })
            .start();
    };
    e.prototype.dropReward = function (t) {
        var e = this;
        var n = $cfg.default.instance.dataCons.getById(151).val;
        var i = [];
        if ("" != n) {
            n.split("|").forEach(function (t) {
                var e = t.split("_");
                var n = e[0];
                var o = e[1].split("&").map(Number);
                var r = o[0];
                var a = o[1];
                i.push({
                    prob: Number(n),
                    rewardId: r,
                    num: a
                });
            });
        }
        if (0 != i.length) {
            var o = i.map(function (t) {
                return t.prob;
            });
            var r = $mathUtil.MathUtil.weightedRandom(o);
            var s = i[r].rewardId;
            var c = i[r].num;
            var p = $battleMgr.default.instance.getCurScene();
            var h = this.node.getPosition();
            var f = $randomUtil.RandomUtil.randomInt(-100, 100);
            $unitMgr.UnitMgr.instance.createUnit({
                areaObjType: $gridAreaDivisionMgr.E_AreaObjectType.GOOD,
                areaColliderType: $gridAreaDivisionMgr.E_AreaColliderType.RECT,
                parent: p.unitParent,
                prefabName: "SceneGood",
                unitClass: "SceneGood",
                initPos: h,
                initParam: {
                    rewardId: s,
                    rewardNum: c
                },
                onCreated: function (n) {
                    n.updateRoomId(e.roomId);
                    n.drop(t, f, 0.3, 40, 0.2);
                }
            });
        }
    };
    e.prototype.checkPlayerCollision = function (t, e) {
        return (
            !this._isRescue &&
            $simplyCollisionDetector.default.isCollisionPointToRect(
                new $simplyVec2.default(e.x, e.y),
                this.selfCollider.rect
            )
        );
    };
    e.prototype.onPlayerCollisionEnter = function () {
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_SavePeople");
    };
    e.prototype.onPlayerCollisionStay = function (t, e) {
        if (this._waitTime < this._waitTimer) {
            this._waitTime += e;
            this._progress &&
                ((this._progress.node.x = t.node.x),
                (this._progress.node.y = t.node.y + 180),
                this._progress.show(),
                this._progress.updateProgress(this._waitTime / this._waitTimer));
        } else {
            if (this._progress) {
                this._progress.hide();
            }
            var n = $battleMgr.default.instance.getCurScene().level.getRoomById(this.roomId).getGroundY();
            this.dropReward(n);
            this.rescueSurvival(n);
        }
    };
    e.prototype.onPlayerCollisionExit = function () {
        $audioUtil.AudioUtil.stopEffect("lmtw_yx_SavePeople");
        this._waitTime = 0;
        if (this._progress) {
            this._progress.hide();
        }
    };
    e.prototype.onRemove = function () {
        if (this._progress) {
            this._progress.remove();
            this._progress = null;
        }
        t.prototype.onRemove.call(this);
    };
    __decorate([C($simplyRectCollider.default)], e.prototype, "selfCollider", void 0);
    __decorate([C(cc.Node)], e.prototype, "nWaitRescue", void 0);
    __decorate([C(cc.Node)], e.prototype, "nRescue", void 0);
    __decorate([C($spAnimCtrl.default)], e.prototype, "rescueSpAnimCtrl", void 0);
    __decorate([C(cc.Label)], e.prototype, "lName", void 0);
    __decorate([C(cc.Node)], e.prototype, "nName", void 0);
    return __decorate([w], e);
})($levelObjectBase.default);
exports.default = M;
