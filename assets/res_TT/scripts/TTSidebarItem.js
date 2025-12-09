var n;
exports.ETTSidebarItemEvent = void 0;
var i;
var $eventManager = require("../../scripts/EventManager");
var $frameEnum = require("../../scripts/FrameEnum");
var $popupManager = require("../../scripts/PopupManager");
var $animUtils = require("../../scripts/AnimUtils");
var $gameEnum = require("../../scripts/GameEnum");
var $localDataProxy = require("../../scripts/LocalDataProxy");
var f = cc._decorator;
var m = f.ccclass;
var y = f.property;
(i = exports.ETTSidebarItemEvent || (exports.ETTSidebarItemEvent = {})).UPDATE_REDPOINT =
    "ETTSidebarItemEvent.UPDATE_REDPOINT";
var v = (function (e) {
    function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        t.nRedPoint = null;
        return t;
    }
    __extends(t, e);
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
        var e =
            0 ==
            $localDataProxy.localDataProxy.getDailyRefreshValue($gameEnum.Game.EDailyRefreshDataKey.TT_SIDEBAR_REWARD);
        this.nRedPoint.active = e;
        if (e) {
            $animUtils.AnimUtil.breathAnim(this.nRedPoint);
        }
    };
    t.prototype.onClickThis = function () {
        $popupManager.PopupManager.instance.show({
            bundleName: $frameEnum.Frame.EBundleName.RES_TT,
            path: "popups/TTSidebarPopup",
            keep: !0
        });
    };
    __decorate([y(cc.Node)], t.prototype, "nRedPoint", void 0);
    return __decorate([m], t);
})(cc.Component);
exports.default = v;
