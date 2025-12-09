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
        e.mRoleName = null;
        e.mRoleSp = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        var e = this;
        var n = t.skinId;
        var i = $cfg.default.instance.dataSkin.getById(n);
        $resLoader.ResLoader.loadAsset({
            path: "spines/player/" + i.skin + "/" + i.skin,
            type: sp.SkeletonData,
            bundleName: $frameEnum.Frame.EBundleName.GAME
        })
            .then(function (t) {
                e.mRoleSp.skeletonData = t;
                e.mRoleSp.setAnimation(0, "bide", !0);
            })
            .catch(function (t) {
                console.log("error:", t);
            });
        this.mRoleName.string = i.name;
        var o = this.node.getChildByName("BtnClose");
        o.active = !1;
        this.scheduleOnce(function () {
            o.active = !0;
            o.scale = 0;
            cc.Tween.stopAllByTarget(o);
            cc.tween(o)
                .to(0.2, {
                    scale: 1.1
                })
                .to(0.1, {
                    scale: 1
                })
                .start();
        }, 0.5);
        this.node.getChildByName("gongxihuode").active = !1;
    };
    e.prototype.onShow = function () {
        var t = this.node.getChildByName("gongxihuode");
        t.active = !0;
        t.getComponent(sp.Skeleton).setAnimation(0, "animation", !1);
    };
    __decorate([h(cc.Label)], e.prototype, "mRoleName", void 0);
    __decorate([h(sp.Skeleton)], e.prototype, "mRoleSp", void 0);
    return __decorate([p], e);
})($popupBase.PopupBase);
exports.default = f;
