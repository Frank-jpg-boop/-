var i;
var $audioUtil = require("./AudioUtil");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $effectMgr = require("./EffectMgr");
var $weapon111Hurt = require("./Weapon111Hurt");
var $bulletBase = require("./BulletBase");
var h = cc._decorator;
var f = h.ccclass;
var d =
    (h.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._ownerSkill = null;
            return e;
        }
        __extends(e, t);
        e.prototype.onShoot = function (t, e) {
            var n = this;
            this._ownerSkill = t;
            var i = this.node.getPosition();
            var o = e.clone();
            var r = cc.v2(i.x + 0.4 * (o.x - i.x), i.y + $randomUtil.RandomUtil.randomInt(180, 250));
            this.bezierTo(i, r, o, 0.4, !0, function () {
                n.blast();
            });
        };
        e.prototype.blast = function () {
            var t = this;
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShenBei");
            var e = $battleMgr.default.instance.getCurScene();
            $effectMgr.default.instance.createEffect({
                parent: e.lowEffectParent,
                prefabName: "Weapon111Hurt",
                initPos: this.node.getPosition(),
                effectClass: $weapon111Hurt.default,
                onCreated: function (e) {
                    e.play(t._ownerSkill);
                }
            });
        };
        return __decorate([f], e);
    })($bulletBase.default));
exports.default = d;
