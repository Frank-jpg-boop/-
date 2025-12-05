var i;
var $popupBase = require("./PopupBase");
var $adMgr = require("./AdMgr");
var $battleMgr = require("./BattleMgr");
var $levelBattleData = require("./LevelBattleData");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lName = null;
        e.lDesc = null;
        e._onAdComplete = null;
        e._onAdCancel = null;
        e._adEventId = "";
        e._battlePlayState = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this.lName.string = t.name;
        this.lDesc.string = t.desc;
        this._onAdComplete = t.onAdComplete;
        this._onAdCancel = t.onAdCancel;
        this._adEventId = t.adEventId;
        this._battlePlayState = t.battlePlayState;
    };
    e.prototype.onHide = function () {
        if (this._battlePlayState) {
            $battleMgr.default.instance.getCurScene().resume();
        }
    };
    e.prototype.onClickBtnAd = function () {
        var t = this;
        $adMgr.AdMgr.instance.showVideoAd({
            id: 1,
            eventId: this._adEventId,
            eventData: {
                userA: "" + $levelBattleData.levelBattleData.cfgStage.id
            },
            success: function () {
                if (t._onAdComplete) {
                    t._onAdComplete();
                }
                t.removeUI();
            },
            fail: function () {},
            error: function () {}
        });
    };
    e.prototype.onClickBtnCancel = function () {
        if (this._onAdCancel) {
            this._onAdCancel();
        }
        this.removeUI();
    };
    __decorate([h(cc.Label)], e.prototype, "lName", void 0);
    __decorate([h(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([p], e);
})($popupBase.PopupBase);
exports.default = f;
