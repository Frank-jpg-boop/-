var i;
var $nodePoolManager = require("./NodePoolManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var l = cc._decorator;
var u = l.ccclass;
var p = l.property;
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spBar = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t, e) {
        if (void 0 === t) {
            t = 1;
        }
        if (void 0 === e) {
            e = !0;
        }
        if (e) {
            $resLoader.ResLoader.setSpritFrame(
                this.spBar,
                $frameEnum.Frame.EBundleName.GAME,
                "textures/quality/quality_progress_" + t
            );
        }
        this.spBar.fillRange = 0;
        this.node.active = !1;
    };
    e.prototype.show = function () {
        this.node.active = !0;
    };
    e.prototype.hide = function () {
        this.node.active = !1;
    };
    e.prototype.updateProgress = function (t) {
        if (t < 0) {
            t = 0;
        }
        if (t > 1) {
            t = 1;
        }
        this.spBar.fillRange = -t;
    };
    e.prototype.remove = function () {
        $nodePoolManager.default.instance.putNode(this.node);
    };
    __decorate([p(cc.Sprite)], e.prototype, "spBar", void 0);
    return __decorate([u], e);
})(cc.Component);
exports.default = h;
