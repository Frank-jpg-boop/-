var i;
var $cfg = require("./Cfg");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $popupBase = require("./PopupBase");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spIcon = null;
        e.lName = null;
        e.lDesc = null;
        e._cfgReward = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this._cfgReward = $cfg.default.instance.dataReward.getById(t.rewardId);
        $resLoader.ResLoader.setSpritFrame(
            this.spIcon,
            $frameEnum.Frame.EBundleName.RES,
            "textures/atlas/item_scene/" + this._cfgReward.spr
        );
        this.lName.string = this._cfgReward.name;
        this.lDesc.string = this._cfgReward.info.replace("|val|", this._cfgReward.changeID.toString());
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    __decorate([h(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([h(cc.Label)], e.prototype, "lName", void 0);
    __decorate([h(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([p], e);
})($popupBase.PopupBase);
exports.default = f;
