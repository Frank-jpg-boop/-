var n;
var $cfg = require("../../scripts/Cfg");
var $eventManager = require("../../scripts/EventManager");
var $mathUtil = require("../../scripts/MathUtil");
var $popupBase = require("../../scripts/PopupBase");
var $gameEnum = require("../../scripts/GameEnum");
var $itemDataProxy = require("../../scripts/ItemDataProxy");
var $localDataProxy = require("../../scripts/LocalDataProxy");
var $tTAddDeskItem = require("./TTAddDeskItem");
var m = cc._decorator;
var y = m.ccclass;
var v = m.property;
var E = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.lReward = null;
        t.nComplete = null;
        t.nGoto = null;
        t.lName = null;
        return t;
    }
    __extends(t, e);
    t.prototype.init = function () {
        var e =
            1 ==
            $localDataProxy.localDataProxy.getDailyRefreshValue($gameEnum.Game.EDailyRefreshDataKey.ADD_DESK_REWARD);
        this.nComplete.active = e;
        this.nGoto.active = !e;
        this.lName.string = yzll.gameConfig.gameName;
        var t = $cfg.default.instance.dataCons.getById(17).val.split("_").map(Number);
        var o = (t[0], t[1]);
        this.lReward.string = "x" + $mathUtil.MathUtil.formatValue(o);
    };
    t.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    t.prototype.onClickBtnGoto = function () {
        mm.platform.addDesk();
        var e = $cfg.default.instance.dataCons.getById(17).val.split("_").map(Number);
        var t = [
            {
                itemId: e[0],
                itemNum: e[1]
            }
        ];
        $localDataProxy.localDataProxy.setDailyRefreshValue($gameEnum.Game.EDailyRefreshDataKey.ADD_DESK_REWARD, 1);
        $eventManager.EventManager.instance.emit($tTAddDeskItem.ETTAddDeskItemEvent.UPDATE_REDPOINT);
        $eventManager.EventManager.instance.emit($itemDataProxy.EItemDataEvent.ITEM_ADD_COMMMON_UI_NOTICE, t);
        this.removeUI();
    };
    __decorate([v(cc.Label)], t.prototype, "lReward", void 0);
    __decorate([v(cc.Node)], t.prototype, "nComplete", void 0);
    __decorate([v(cc.Node)], t.prototype, "nGoto", void 0);
    __decorate([v(cc.Label)], t.prototype, "lName", void 0);
    return __decorate([y], t);
})($popupBase.PopupBase);
exports.default = E;
