var i;
var $cfg = require("./Cfg");
var $popupBase = require("./PopupBase");
var $popupManager = require("./PopupManager");
var $battleMgr = require("./BattleMgr");
var $levelBattleData = require("./LevelBattleData");
var $skillMgr = require("./SkillMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $stageDataProxy = require("./StageDataProxy");
var d = cc._decorator;
var m = d.ccclass;
var y = d.property;
var _ = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nGameTestButton = null;
        e.nGMButton = null;
        e.nGameTestSwitch = null;
        e.nGMSwitch = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function () {
        this.nGameTestButton.active = yzll.gameConfig.isGameTest;
        this.nGMButton.active = yzll.gameConfig.isGM;
        this.nGameTestSwitch.active = yzll.gameConfig.isGameTest;
        this.nGMSwitch.active = yzll.gameConfig.isGM;
        this.updateSwitchView();
    };
    e.prototype.updateSwitchView = function () {
        this.nGameTestSwitch.children[0].getComponent(cc.Toggle).isChecked =
            $battleMgr.default.instance.gm_PlayerInvincible;
        this.nGMSwitch.children[0].getComponent(cc.Toggle).isChecked =
            $battleMgr.default.instance.gm_InfiniteResurrection;
        this.nGMSwitch.children[1].getComponent(cc.Toggle).isChecked = $battleMgr.default.instance.gm_InfiniteRandom;
        this.nGMSwitch.children[2].getComponent(cc.Toggle).isChecked = $battleMgr.default.instance.gm_InfiniteCandy;
    };
    e.prototype.onToggleChangePlayer = function (t) {
        $battleMgr.default.instance.gm_PlayerInvincible = t.isChecked;
    };
    e.prototype.onToggleChangeGM0 = function (t) {
        $battleMgr.default.instance.gm_InfiniteResurrection = t.isChecked;
    };
    e.prototype.onToggleChangeGM1 = function (t) {
        $battleMgr.default.instance.gm_InfiniteRandom = t.isChecked;
    };
    e.prototype.onToggleChangeGM2 = function (t) {
        $battleMgr.default.instance.gm_InfiniteCandy = t.isChecked;
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    e.prototype.onClickBtnEnterBossWave = function () {
        $popupManager.PopupManager.instance.removeAll();
        $battleMgr.default.instance.getCurScene().gmEnterBossWave();
    };
    e.prototype.onClickBtnRefreshEnemy = function () {
        $globalPopupMgr.default.instance.showGMInput(
            "添加怪物",
            [
                {
                    title: "房间ID:"
                },
                {
                    title: "怪物ID:"
                }
            ],
            function (t) {
                var e = t[0];
                if ("" == e || isNaN(Number(e)) || isNaN(Number(t[1]))) {
                    $globalPopupMgr.default.instance.showTips("请正确的输入");
                } else {
                    var n = Number(e);
                    var i = Number(t[1]);
                    var o = $battleMgr.default.instance.getCurScene().level.getRoomById(n);
                    if (o) {
                        if ($cfg.default.instance.dataEnemy.getById(i)) {
                            var r = $levelBattleData.levelBattleData.curWaveInfo;
                            o.gmCreateEnemy(i, 1, r.enemyLv);
                        } else {
                            $globalPopupMgr.default.instance.showTips("怪物不存在");
                        }
                    } else {
                        $globalPopupMgr.default.instance.showTips("房间不存在");
                    }
                }
            }
        );
    };
    e.prototype.onClickBtnAddWeapon = function () {
        $globalPopupMgr.default.instance.showGMInput(
            "添加武器",
            [
                {
                    title: "武器ID："
                }
            ],
            function (t) {
                var e = t[0];
                if ("" != e && !isNaN(Number(e)) && $cfg.default.instance.dataSkill.getById(Number(e))) {
                    var n = Number(e);
                    $levelBattleData.levelBattleData.addSkill(n);
                } else {
                    $globalPopupMgr.default.instance.showTips("请输入正确的武器id");
                }
            }
        );
    };
    e.prototype.onClickBtnRemoveWeapon = function () {
        $globalPopupMgr.default.instance.showGMInput(
            "移除武器",
            [
                {
                    title: "武器ID："
                }
            ],
            function (t) {
                var e = t[0];
                if ("" != e && !isNaN(Number(e)) && $cfg.default.instance.dataSkill.getById(Number(e))) {
                    var n = Number(e);
                    $levelBattleData.levelBattleData.removeSkill(n);
                } else {
                    $globalPopupMgr.default.instance.showTips("请输入正确的武器id");
                }
            }
        );
    };
    e.prototype.onClickBtnAddSkillEx = function () {
        $globalPopupMgr.default.instance.showGMInput(
            "添加强化技能",
            [
                {
                    title: "技能ID："
                }
            ],
            function (t) {
                var e = t[0];
                if ("" != e && !isNaN(Number(e)) && $cfg.default.instance.dataChoose.getById(Number(e))) {
                    var n = Number(e);
                    if ($skillMgr.SkillMgr.instance.checkSkillEx(n)) {
                        $skillMgr.SkillMgr.instance.selectSkillEx(n);
                    } else {
                        $globalPopupMgr.default.instance.showTips("该技能暂不能被选择");
                    }
                } else {
                    $globalPopupMgr.default.instance.showTips("请输入正确的技能id");
                }
            }
        );
    };
    e.prototype.onClickBtnEnterStage = function () {
        $globalPopupMgr.default.instance.showGMInput(
            "进入指定关卡",
            [
                {
                    title: "关卡ID："
                }
            ],
            function (t) {
                var e = t[0];
                if ("" != e && !isNaN(Number(e)) && $cfg.default.instance.dataStage.getById(Number(e))) {
                    var n = Number(e);
                    $stageDataProxy.stageDataProxy.selectedStageId = n;
                    $battleMgr.default.instance.restartLevelScene();
                } else {
                    $globalPopupMgr.default.instance.showTips("请输入正确的关卡id");
                }
            }
        );
    };
    e.prototype.onClickBtnAddCoin = function () {
        $levelBattleData.levelBattleData.updateGold(1e3);
    };
    __decorate([y(cc.Node)], e.prototype, "nGameTestButton", void 0);
    __decorate([y(cc.Node)], e.prototype, "nGMButton", void 0);
    __decorate([y(cc.Node)], e.prototype, "nGameTestSwitch", void 0);
    __decorate([y(cc.Node)], e.prototype, "nGMSwitch", void 0);
    return __decorate([m], e);
})($popupBase.PopupBase);
exports.default = _;
