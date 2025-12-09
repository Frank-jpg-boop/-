var i;
var $audioUtil = require("./AudioUtil");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $effectMgr = require("./EffectMgr");
var $attrEnum = require("./AttrEnum");
var $weapon101Boom = require("./Weapon101Boom");
var $bulletBase = require("./BulletBase");
var f = cc._decorator;
var d = f.ccclass;
var m =
    (f.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._ownerSkill = null;
            e._bounceCount = 0;
            e._maxBounceCount = 0;
            return e;
        }
        __extends(e, t);
        e.prototype.onShoot = function (t, e) {
            this._ownerSkill = t;
            this._maxBounceCount = this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
            this._bounceCount = this._maxBounceCount;
            this.bounce(e);
        };
        e.prototype.bounce = function (t) {
            var e = this;
            var n = this.node.getPosition();
            var i = t.clone();
            var o = this._maxBounceCount - this._bounceCount;
            var r = cc.v2(
                n.x + 0.6 * (i.x - n.x),
                n.y + $randomUtil.RandomUtil.randomInt(150, 200) * Math.max(0.2, 1 - 0.2 * o)
            );
            this.bezierTo(
                n,
                r,
                i,
                Math.max(0.1, 0.5 * (1 - 0.2 * o)),
                !1,
                function () {
                    e._bounceCount--;
                    if (e._bounceCount > 0) {
                        t.x += (t.x > n.x ? 1 : -1) * Math.max(0.3, 1 - 0.2 * o) * 100;
                        e.bounce(t);
                    }
                    e.blast(0 == e._bounceCount);
                },
                "",
                null,
                1 == this._bounceCount
            );
        };
        e.prototype.blast = function (t) {
            var e = this;
            $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_MuDiaoXiang");
            var n = $battleMgr.default.instance.getCurScene();
            $effectMgr.default.instance.createEffect({
                parent: n.effectParent,
                prefabName: "Weapon101Boom",
                initPos: this.node.getPosition(),
                effectClass: $weapon101Boom.default,
                onCreated: function (n) {
                    n.play(e._ownerSkill, t);
                }
            });
        };
        return __decorate([d], e);
    })($bulletBase.default));
exports.default = m;
