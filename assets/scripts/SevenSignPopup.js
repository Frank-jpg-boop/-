var i;
var $popupBase = require("./PopupBase");
var $adMgr = require("./AdMgr");
var $signDataProxy = require("./SignDataProxy");
var $sevenDayItem = require("./SevenDayItem");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nDayView = null;
        e.nButton = null;
        e.nComplete = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function () {
        this.updateDayView(!0);
    };
    e.prototype.updateDayView = function (t) {
        if (void 0 === t) {
            t = !1;
        }
        var e = $signDataProxy.signDataProxy.canSevenSign();
        this.nDayView.children.forEach(function (n, i) {
            var o = n.getComponent($sevenDayItem.default);
            if (t) {
                o.initView(i + 1);
            }
            o.updateView(e);
        });
        this.nButton.active = e;
        this.nComplete.active = !e;
        this.nButton.getChildByName("BtnDoubleSign").active =
            2 != $signDataProxy.signDataProxy.curSevenSignDay && 6 != $signDataProxy.signDataProxy.curSevenSignDay;
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    e.prototype.onClickBtnSign = function () {
        $signDataProxy.signDataProxy.getSevenSignRewarad(!1);
        this.updateDayView();
    };
    e.prototype.onClickBtnDoubleSign = function () {
        var t = this;
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: "AD_SevenSign",
            success: function () {
                $signDataProxy.signDataProxy.getSevenSignRewarad(!0);
                t.updateDayView();
            }
        });
    };
    __decorate([h(cc.Node)], e.prototype, "nDayView", void 0);
    __decorate([h(cc.Node)], e.prototype, "nButton", void 0);
    __decorate([h(cc.Node)], e.prototype, "nComplete", void 0);
    return __decorate([p], e);
})($popupBase.PopupBase);
exports.default = f;
