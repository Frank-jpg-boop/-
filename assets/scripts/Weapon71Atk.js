var i;
var $battleMgr = require("./BattleMgr");
var $effectMgr = require("./EffectMgr");
var $spAnimEffect = require("./SpAnimEffect");
var $weapon71Hurt = require("./Weapon71Hurt");
var u = cc._decorator;
var p = u.ccclass;
var h =
    (u.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.play = function (t, e) {
            this.playOnceAllAnim(function () {
                if (e) {
                    e();
                }
            });
            var n = $battleMgr.default.instance.getCurScene();
            $effectMgr.default.instance.createEffect({
                parent: n.lowEffectParent,
                prefabName: "Weapon71Hurt",
                initPos: this.node.getPosition(),
                effectClass: $weapon71Hurt.default,
                onCreated: function (e) {
                    e.play(t);
                }
            });
        };
        return __decorate([p], e);
    })($spAnimEffect.default));
exports.default = h;
