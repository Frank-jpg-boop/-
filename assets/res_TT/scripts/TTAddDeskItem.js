import $eventManager from '../../scripts/EventManager';
import $frameEnum from '../../scripts/FrameEnum';
import $popupManager from '../../scripts/PopupManager';
import $animUtils from '../../scripts/AnimUtils';
import $gameEnum from '../../scripts/GameEnum';
import $localDataProxy from '../../scripts/LocalDataProxy';
let n;
exports.ETTAddDeskItemEvent = void 0;
let i;
const f = cc._decorator;
const m = f.ccclass;
const y = f.property;
(i = exports.ETTAddDeskItemEvent || (exports.ETTAddDeskItemEvent = {})).UPDATE_REDPOINT = "updateRedPoint";
const v = (function (e) {
    function t() {
        const t = (null !== e && e.apply(this, arguments)) || this;
        t.nRedPoint = null;
        return t;
    }
    t.prototype.onLoad = function () {
        this.node.active = (yzll.gameConfig.isGM && cc.sys.isBrowser) || cc.sys.platform == cc.sys.BYTEDANCE_GAME;
        $eventManager.EventManager.instance.on(i.UPDATE_REDPOINT, this.updatRedPoint, this);
    };
    t.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(i.UPDATE_REDPOINT, this.updatRedPoint, this);
    };
    t.prototype.start = function () {
        this.updatRedPoint();
    };
    t.prototype.updatRedPoint = function () {
        const e =
            0 ==
            $localDataProxy.localDataProxy.getDailyRefreshValue($gameEnum.Game.EDailyRefreshDataKey.ADD_DESK_REWARD);
        this.nRedPoint.active = e;
        if (e) {
            $animUtils.AnimUtil.breathAnim(this.nRedPoint);
        }
    };
    t.prototype.onClickThis = function () {
        $popupManager.PopupManager.instance.show({
            bundleName: $frameEnum.Frame.EBundleName.RES_TT,
            path: "popups/TTAddDeskPopup",
            keep: !0
        });
    };
})(cc.Component);
exports.default = v;
