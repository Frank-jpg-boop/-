var i;
var $cfg = require("./Cfg");
var $resLoader = require("./ResLoader");
var $mathUtil = require("./MathUtil");
var $frameEnum = require("./FrameEnum");
var $spAnimCtrl = require("./SpAnimCtrl");
var $itemDataProxy = require("./ItemDataProxy");
var h = cc._decorator;
var f = h.ccclass;
var d = h.property;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nInfo = null;
        e.spIcon = null;
        e.spFrame = null;
        e.lNum = null;
        e.nName = null;
        e.heightSpAnim = null;
        e._cfgItem = null;
        return e;
    }
    __extends(e, t);
    e.prototype.updateData = function (t) {
        this.heightSpAnim.clearAnim();
        this.heightSpAnim.node.active = !1;
        if (!this._cfgItem || this._cfgItem.id != t.itemId) {
            var e = $cfg.default.instance.dataItem.getById(t.itemId);
            if (!e) {
                return;
            }
            this._cfgItem = e;
            if (t.isNotLoadQualityIcon) {
                //
            } else {
                $resLoader.ResLoader.setSpritFrame(
                    this.spFrame,
                    $frameEnum.Frame.EBundleName.RES,
                    "textures/atlas/quality/pic_wuping_di_" + e.rare
                );
            }
            $resLoader.ResLoader.setSpritFrame(
                this.spIcon,
                $itemDataProxy.itemDataProxy.getItemIconBundleName(e.id),
                $itemDataProxy.itemDataProxy.getItemIconPath(e.id)
            );
        }
        this.lNum.node.active = !t.isNotShowNum;
        if (this.lNum.node.active) {
            this.lNum.string = "x" + $mathUtil.MathUtil.formatValue(t.itemNum);
        }
        this.nName.active = t.isShowName;
        if (this.nName.active) {
            this.nName.children[0].getComponent(cc.Label).string = this._cfgItem.name;
        }
        this.spIcon.node.scale = t.iconScale || $itemDataProxy.itemDataProxy.getItemIconScale(this._cfgItem.id);
        this.getComponent(cc.Button).enabled = !0;
    };
    e.prototype.onClickBtnThis = function () {};
    e.prototype.playShowAnim = function () {
        var t = this;
        this.node.active = !0;
        var e = this.getComponent(cc.Button);
        e.enabled = !1;
        this.nInfo.scale = 0;
        cc.Tween.stopAllByTarget(this.nInfo);
        this.nInfo.active = !0;
        return new Promise(function (n) {
            cc.tween(t.nInfo)
                .to(0.1, {
                    scale: 1.2
                })
                .call(function () {
                    n();
                })
                .to(0.2, {
                    scale: 1
                })
                .call(function () {
                    t.heightSpAnim.node.active = !0;
                    t.heightSpAnim.playAnim("animation", 1, !1, function () {
                        t.heightSpAnim.node.active = !1;
                    });
                    e.enabled = !0;
                })
                .start();
        });
    };
    __decorate([d(cc.Node)], e.prototype, "nInfo", void 0);
    __decorate([d(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([d(cc.Sprite)], e.prototype, "spFrame", void 0);
    __decorate([d(cc.Label)], e.prototype, "lNum", void 0);
    __decorate([d(cc.Node)], e.prototype, "nName", void 0);
    __decorate([d($spAnimCtrl.default)], e.prototype, "heightSpAnim", void 0);
    return __decorate([f], e);
})(cc.Component);
exports.default = m;
