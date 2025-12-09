import $cfg from '../../scripts/Cfg';
import $eventManager from '../../scripts/EventManager';
import $mathUtil from '../../scripts/MathUtil';
import $popupBase from '../../scripts/PopupBase';
import $gameEnum from '../../scripts/GameEnum';
import $itemDataProxy from '../../scripts/ItemDataProxy';
import $localDataProxy from '../../scripts/LocalDataProxy';
import $tTAddDeskItem from './TTAddDeskItem';
let n;
const m = cc._decorator;
const y = m.ccclass;
const v = m.property;
const E = (function (e) {
    function t() {
        const t = (null !== e && e.apply(this, arguments)) || this;
        t.lReward = null;
        t.nComplete = null;
        t.nGoto = null;
        t.lName = null;
        return t;
    }
    t.prototype.init = function () {
        const e =
            1 ==
            $localDataProxy.localDataProxy.getDailyRefreshValue($gameEnum.Game.EDailyRefreshDataKey.ADD_DESK_REWARD);
        this.nComplete.active = e;
        this.nGoto.active = !e;
        this.lName.string = yzll.gameConfig.gameName;
        const t = $cfg.default.instance.dataCons.getById(17).val.split("_").map(Number);
        const o = (t[0], t[1]);
        this.lReward.string = "x" + $mathUtil.MathUtil.formatValue(o);
    };
    t.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    t.prototype.onClickBtnGoto = function () {
        mm.platform.addDesk();
        const e = $cfg.default.instance.dataCons.getById(17).val.split("_").map(Number);
        const t = [
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
})($popupBase.PopupBase);
exports.default = E;
