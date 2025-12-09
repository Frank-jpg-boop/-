var i;
var $cfg = require("./Cfg");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $queue = require("./Queue");
var $spAnimCtrl = require("./SpAnimCtrl");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lName = null;
        e.lDesc = null;
        e.spIcon = null;
        e.nBgView = null;
        e.spAnimCtrl = null;
        e._queueReward = new $queue.default();
        e._isPlaying = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.pushReward = function (t) {
        this._queueReward.enqueue(t);
        if (this._isPlaying) {
            //
        } else {
            this.playShowAnim();
        }
    };
    e.prototype.playShowAnim = function () {
        var t = this;
        this.node.x = 210;
        this._isPlaying = !0;
        this.node.active = !0;
        var e = this._queueReward.dequeue();
        var n = $cfg.default.instance.dataReward.getById(e);
        this.lName.string = n.name;
        this.lDesc.string = n.info.replace("|val|", n.changeID.toString());
        $resLoader.ResLoader.setSpritFrame(
            this.spIcon,
            $frameEnum.Frame.EBundleName.RES,
            "textures/atlas/item_scene/" + n.spr
        );
        this.nBgView.children[0].active = 111 != n.type;
        this.nBgView.children[1].active = 111 == n.type;
        cc.tween(this.node)
            .to(
                0.4,
                {
                    x: -210
                },
                {
                    easing: "sineIn"
                }
            )
            .call(function () {
                if (111 == n.type) {
                    t.spAnimCtrl.node.active = !0;
                    t.spAnimCtrl.clearAnim();
                    t.spAnimCtrl.playAnim("appear", 1, !1, function () {
                        t.spAnimCtrl.node.active = !1;
                    });
                }
            })
            .start();
        this.scheduleOnce(function () {
            t.playHideAnim();
        }, 1.5);
    };
    e.prototype.playHideAnim = function () {
        var t = this;
        cc.tween(this.node)
            .to(
                0.3,
                {
                    x: 210
                },
                {
                    easing: "sineOut"
                }
            )
            .delay(0.2)
            .call(function () {
                if (t._queueReward.size() > 0) {
                    t.playShowAnim();
                } else {
                    t._isPlaying = !1;
                    t.node.active = !1;
                }
            })
            .start();
    };
    __decorate([f(cc.Label)], e.prototype, "lName", void 0);
    __decorate([f(cc.Label)], e.prototype, "lDesc", void 0);
    __decorate([f(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([f(cc.Node)], e.prototype, "nBgView", void 0);
    __decorate([f($spAnimCtrl.default)], e.prototype, "spAnimCtrl", void 0);
    return __decorate([h], e);
})(cc.Component);
exports.default = d;
