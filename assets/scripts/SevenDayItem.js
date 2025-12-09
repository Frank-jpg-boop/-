var i;
var $cfg = require("./Cfg");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $animUtils = require("./AnimUtils");
var $util = require("./Util");
var $signDataProxy = require("./SignDataProxy");
var h = cc._decorator;
var f = h.ccclass;
var d = h.property;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lDay = null;
        e.lDesc = null;
        e.spIcon = null;
        e.lRewardCount = null;
        e.nHeightLight = null;
        e.nComplete = null;
        e._cfgSign = null;
        return e;
    }
    __extends(e, t);
    e.prototype.initView = function (t) {
        this._cfgSign = $cfg.default.instance.dataSign.getById(t);
        this.lDay.string = "第" + $util.default.numToString(t) + "天";
        var e = this._cfgSign.reward.split("_").map(Number);
        var n = e[0];
        var i = e[1];
        var o = $cfg.default.instance.dataItem.getById(n);
        $resLoader.ResLoader.setSpritFrame(
            this.spIcon,
            $frameEnum.Frame.EBundleName.RES,
            "textures/atlas/item/" + o.icon
        );
        this.lRewardCount.string = "x" + i;
    };
    e.prototype.updateView = function (t) {
        var e = $signDataProxy.signDataProxy.curSevenSignDay == this._cfgSign.id && t;
        if (e) {
            $animUtils.AnimUtil.breathAnim(this.node, 1.03);
        } else {
            cc.Tween.stopAllByTarget(this.node);
            this.node.scale = 1;
        }
        this.lDesc.node.active = $signDataProxy.signDataProxy.curSevenSignDay <= this._cfgSign.id || e;
        if (this.lDesc.node.active) {
            if (e) {
                this.lDesc.string = "可领取";
            } else {
                this.lDesc.string = "未达成";
            }
            if (e) {
                this.lDesc.node.color = new cc.Color().fromHEX("#F7DB4B");
            } else {
                this.lDesc.node.color = cc.Color.WHITE;
            }
        }
        this.nComplete.active = $signDataProxy.signDataProxy.curSevenSignDay > this._cfgSign.id;
        this.nHeightLight.active = e;
    };
    __decorate([d(cc.Label)], e.prototype, "lDay", void 0);
    __decorate([d(cc.Label)], e.prototype, "lDesc", void 0);
    __decorate([d(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([d(cc.Label)], e.prototype, "lRewardCount", void 0);
    __decorate([d(cc.Node)], e.prototype, "nHeightLight", void 0);
    __decorate([d(cc.Node)], e.prototype, "nComplete", void 0);
    return __decorate([f], e);
})(cc.Component);
exports.default = m;
