var i;
var $cfg = require("./Cfg");
var $popupBase = require("./PopupBase");
var $playerDataProxy = require("./PlayerDataProxy");
var l = cc._decorator;
var u = l.ccclass;
var p = l.property;
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mLvLab = null;
        e.mBtnLeft = null;
        e.mBtnRight = null;
        e._boxLevel = 0;
        e._maxLv = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function () {
        this._boxLevel = $playerDataProxy.playerDataProxy.getBoxLevel();
        var t = $cfg.default.instance.dataShopBox.sheet();
        var e = Object.keys(t);
        this._maxLv = t[e[e.length - 1]].level;
        this.updateBoxLv();
    };
    e.prototype.onBtnRight = function () {
        this._boxLevel++;
        this.updateBoxLv();
    };
    e.prototype.onBtnLeft = function () {
        this._boxLevel--;
        this.updateBoxLv();
    };
    e.prototype.updateBoxLv = function () {
        var t = this;
        this.mLvLab.string = "Lv." + this._boxLevel;
        this.mBtnLeft.active = this._boxLevel > 1;
        this.mBtnRight.active = this._boxLevel < this._maxLv;
        for (
            var e = $cfg.default.instance.dataShopBox.queryOne(function (e) {
                    return e.level == t._boxLevel;
                }),
                n = 1;
            n < 3;
            ++n
        ) {
            var i = this.node.getChildByName("boxItem" + n).getChildByName("cards").children;
            i.forEach(function (t) {
                t.active = !1;
            });
            for (var o = (1 == n ? e.reward : e.bigReward).split("|"), r = 0; r < o.length; ++r) {
                var s = o[r].split("_").map(Number);
                var c = i[r];
                c.active = !0;
                c.getChildByName("num").getComponent(cc.Label).string = "" + s[1];
            }
        }
    };
    __decorate([p(cc.Label)], e.prototype, "mLvLab", void 0);
    __decorate([p(cc.Node)], e.prototype, "mBtnLeft", void 0);
    __decorate([p(cc.Node)], e.prototype, "mBtnRight", void 0);
    return __decorate([u], e);
})($popupBase.PopupBase);
exports.default = h;
