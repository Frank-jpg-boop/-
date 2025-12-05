var i;
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $battleMgr = require("./BattleMgr");
var $spAnimCtrl = require("./SpAnimCtrl");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var $skillCDItem = require("./SkillCDItem");
var m = cc._decorator;
var y = m.ccclass;
var _ = m.property;
var g = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lStageName = null;
        e.nWaitRescue = null;
        e.nNextWave = null;
        e.nEnemyLvView = null;
        e.nSkillCDView = null;
        e.pSkillCDItem = null;
        e.nSet = null;
        e._rescueWaitTime = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(
            $levelBattleData.ELevelBattleDataEvent.WAVE_CHANGE,
            this.onEventWaveChange,
            this
        );
        $eventManager.EventManager.instance.on(
            $levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE,
            this.onBagItemChange,
            this
        );
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM,
            this.onEventEnterWaitRescue,
            this
        );
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI,
            this.onEventSetNextWaveActive,
            this
        );
        $eventManager.EventManager.instance.on(
            $actorEnum.EPlayerEvent.PLAYER_CREATE_SKILL,
            this.onEventPlayerCreateSkill,
            this
        );
        $eventManager.EventManager.instance.on(
            $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
            this.onEventEnemyLvChange,
            this
        );
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(
            $levelBattleData.ELevelBattleDataEvent.WAVE_CHANGE,
            this.onEventWaveChange,
            this
        );
        $eventManager.EventManager.instance.off(
            $levelBattleData.ELevelBattleDataEvent.BAG_ITEM_CHANGE,
            this.onBagItemChange,
            this
        );
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM,
            this.onEventEnterWaitRescue,
            this
        );
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.SET_NEXT_WAVE_ENEMY_UI,
            this.onEventSetNextWaveActive,
            this
        );
        $eventManager.EventManager.instance.off(
            $actorEnum.EPlayerEvent.PLAYER_CREATE_SKILL,
            this.onEventPlayerCreateSkill,
            this
        );
        $eventManager.EventManager.instance.off(
            $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
            this.onEventEnemyLvChange,
            this
        );
    };
    e.prototype.initView = function () {
        this.lStageName.string = $levelBattleData.levelBattleData.cfgStage.name;
        this.nWaitRescue.active = !1;
        this.nNextWave.active = !1;
        this.updateEnemyLvView();
        if (0 == $levelBattleData.levelBattleData.cfgStage.id) {
            this.lStageName.node.parent.active = !1;
            this.nEnemyLvView.active = !1;
            this.nSet.active = !1;
        }
    };
    e.prototype.updateEnemyLvView = function () {
        var t = $levelBattleData.levelBattleData.moonLvIndex;
        $resLoader.ResLoader.setSpritFrame(
            this.nEnemyLvView.getChildByName("Icon").getComponent(cc.Sprite),
            $frameEnum.Frame.EBundleName.GAME,
            "textures/game/moon_" + t
        );
        var e = this.nEnemyLvView.getChildByName("Lv");
        e.active = 3 != t;
        if (e.active) {
            e.getComponent(cc.Label).string = Math.floor(
                $levelBattleData.levelBattleData.curWaveInfo.enemyLv *
                    $levelBattleData.levelBattleData.stageEnemyLvScale
            ).toString();
        }
        var n = this.nEnemyLvView.getChildByName("LvDesc");
        n.active = 3 != t;
        if (0 == t) {
            n.color = cc.Color.WHITE;
        } else {
            n.color = new cc.Color().fromHEX("#DA7A73");
        }
        this.nEnemyLvView.getChildByName("Full").active = 3 == t;
    };
    e.prototype.update = function () {
        if (this.nNextWave.active) {
            var t = $battleMgr.default.instance.getCurScene();
            if (!t) {
                return;
            }
            var e = null;
            if (t.gameReadyTime > 0) {
                e = t.gameReadyTime;
            } else {
                e = t.curWaveTime;
            }
            this.nNextWave.getChildByName("Time").getComponent(cc.Label).string = Math.ceil(e).toString();
        }
    };
    e.prototype.onBagItemChange = function () {};
    e.prototype.onEventEnemyLvChange = function () {
        this.updateEnemyLvView();
    };
    e.prototype.onEventWaveChange = function () {
        if (1 != $levelBattleData.levelBattleData.curWave) {
            var t = this.nEnemyLvView.getChildByName("UpLvAnim").getComponent($spAnimCtrl.default);
            t.clearAnim();
            t.node.active = !0;
            t.playAnim("hit", 1, !1, function () {
                t.node.active = !1;
            });
        }
        this.updateEnemyLvView();
    };
    e.prototype.onEventEnterWaitRescue = function () {
        this.nWaitRescue.active = !0;
        this.nNextWave.active = !1;
        this.nWaitRescue.getComponent(cc.Animation).play("WaitRescue", 0);
        this.lStageName.string = "楼梯已被摧毁，坚持到最后吧！";
    };
    e.prototype.onEventSetNextWaveActive = function (t) {
        this.nNextWave.active = t;
        if (this.nNextWave.active) {
            var e = $battleMgr.default.instance.getCurScene();
            var n = null;
            if (e.gameReadyTime > 0) {
                n = e.gameReadyTime;
            } else {
                n = e.curWaveTime;
            }
            this.nNextWave.getChildByName("Time").getComponent(cc.Label).string = Math.ceil(n).toString();
        }
    };
    e.prototype.onEventPlayerCreateSkill = function (t, e) {
        var n = cc.instantiate(this.pSkillCDItem);
        this.nSkillCDView.addChild(n);
        var i = n.getComponent($skillCDItem.default);
        i.init(t);
        if (e) {
            e(i);
        }
    };
    __decorate([_(cc.Label)], e.prototype, "lStageName", void 0);
    __decorate([_(cc.Node)], e.prototype, "nWaitRescue", void 0);
    __decorate([_(cc.Node)], e.prototype, "nNextWave", void 0);
    __decorate([_(cc.Node)], e.prototype, "nEnemyLvView", void 0);
    __decorate([_(cc.Node)], e.prototype, "nSkillCDView", void 0);
    __decorate([_(cc.Prefab)], e.prototype, "pSkillCDItem", void 0);
    __decorate([_(cc.Node)], e.prototype, "nSet", void 0);
    return __decorate([y], e);
})(cc.Component);
exports.default = g;
