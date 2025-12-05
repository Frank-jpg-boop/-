var i;
var $cfg = require("./Cfg");
var $itemEnum = require("./ItemEnum");
var $eventManager = require("./EventManager");
var $popupBase = require("./PopupBase");
var $util = require("./Util");
var $dataMgr = require("./DataMgr");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $itemDataProxy = require("./ItemDataProxy");
var $playerDataProxy = require("./PlayerDataProxy");
var $stageDataProxy = require("./StageDataProxy");
var y = cc._decorator;
var _ = y.ccclass;
var g = y.property;
var v = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mStageEditBox = null;
        e.mItemEditBox = null;
        e.nButtonNode = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function () {
        this.mItemEditBox.node.active = yzll.gameConfig.isGameTest;
    };
    e.prototype.onBtnItem = function () {
        var t = this.mItemEditBox.string.split("_").map(Number);
        if (t[0] && t[1]) {
            $itemDataProxy.itemDataProxy.updateItemValue(t[0], t[1]);
            $globalPopupMgr.default.instance.showTips("添加成功!");
        } else {
            $globalPopupMgr.default.instance.showTips("参数错误！");
        }
    };
    e.prototype.onBtnStage = function () {
        var t = this.mStageEditBox.string;
        if ("" == t || isNaN(Number(t) - 1)) {
            $globalPopupMgr.default.instance.showTips("请输入要通过的章节");
        } else {
            $stageDataProxy.stageDataProxy.gmPassStage(Number(t) - 1);
            var e = Math.min($stageDataProxy.stageDataProxy.passStageId + 1, $stageDataProxy.stageDataProxy.maxStageId);
            $globalPopupMgr.default.instance.showTips(
                "当前关卡: 第" + $util.default.numToString(e) + "章:" + $cfg.default.instance.dataStage.getById(e).name
            );
            $eventManager.EventManager.instance.emit($playerDataProxy.EPlayDataEvent.GM_PASS_STAGE);
            this.removeUI();
        }
    };
    e.prototype.onBtnClear = function () {
        $dataMgr.DataMgr.instance.resetData();
    };
    e.prototype.onClickBtnPassNext = function () {
        $stageDataProxy.stageDataProxy.gmPassStage($stageDataProxy.stageDataProxy.passStageId + 1);
        var t = Math.min($stageDataProxy.stageDataProxy.passStageId + 1, $stageDataProxy.stageDataProxy.maxStageId);
        $globalPopupMgr.default.instance.showTips(
            "当前关卡: 第" + $util.default.numToString(t) + "章:" + $cfg.default.instance.dataStage.getById(t).name
        );
        $eventManager.EventManager.instance.emit($playerDataProxy.EPlayDataEvent.GM_PASS_STAGE);
    };
    e.prototype.onClickBtnAddGold = function () {
        $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.GOLD, 1e5);
    };
    e.prototype.onClickBtnAddDiamond = function () {
        $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.DIAMOND, 1e4);
    };
    e.prototype.onClickBtnAddSur = function () {
        $itemDataProxy.itemDataProxy.updateItemValue($itemEnum.E_ItemId.SURVIVOR, 5);
    };
    e.prototype.onClickBtnAddChip = function () {
        $cfg.default.instance.dataItem
            .queryAll(function (t) {
                return 2 == t.type;
            })
            .forEach(function (t) {
                $itemDataProxy.itemDataProxy.updateItemValue(t.id, 200);
            });
    };
    __decorate([g(cc.EditBox)], e.prototype, "mStageEditBox", void 0);
    __decorate([g(cc.EditBox)], e.prototype, "mItemEditBox", void 0);
    __decorate([g(cc.Node)], e.prototype, "nButtonNode", void 0);
    return __decorate([_], e);
})($popupBase.PopupBase);
exports.default = v;
