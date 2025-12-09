var i;
var $sqlUtil = require("./SqlUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $userCenterMgr = require("./UserCenterMgr");
var $userDataProxy = require("./UserDataProxy");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lUid = null;
        e._code = "";
        return e;
    }
    __extends(e, t);
    e.prototype.initView = function () {
        this._code = $sqlUtil.SqlUtil.getLocalUserData($userDataProxy.userDataProxy.codeKey, "");
        this.lUid.string = "ID: " + this._code;
    };
    e.prototype.onClickBtnCopy = function () {
        mm.platform.copyToClipboard(
            this._code,
            function () {
                $globalPopupMgr.default.instance.showTips("复制成功");
            },
            function () {
                $globalPopupMgr.default.instance.showTips("复制失败");
            }
        );
        $userCenterMgr.UserCenterMgr.instance.zbActiveApply(this._code, this._code);
    };
    __decorate([h(cc.Label)], e.prototype, "lUid", void 0);
    return __decorate([p], e);
})(cc.Component);
exports.default = f;
