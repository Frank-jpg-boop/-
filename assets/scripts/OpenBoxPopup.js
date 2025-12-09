var i;
var $popupBase = require("./PopupBase");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mBoxSp = null;
        e._callbackFunc = null;
        e._skinId = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        var e = this;
        this._callbackFunc = t.callback;
        this._skinId = t.skinId;
        this.mBoxSp.setCompleteListener(function () {
            if (e._callbackFunc) {
                e._callbackFunc();
            }
            e.removeUI();
        });
    };
    e.prototype.onShow = function () {
        this.mBoxSp.setSkin("skin" + this._skinId);
        this.mBoxSp.setAnimation(0, "animation", !1);
    };
    __decorate([l(sp.Skeleton)], e.prototype, "mBoxSp", void 0);
    return __decorate([c], e);
})($popupBase.PopupBase);
exports.default = u;
