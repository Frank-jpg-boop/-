var i;
var $audioUtil = require("./AudioUtil");
var $battleMgr = require("./BattleMgr");
var $bullet41 = require("./Bullet41");
var $bulletMgr = require("./BulletMgr");
var $effectBase = require("./EffectBase");
var $attrEnum = require("./AttrEnum");
var h = cc._decorator;
var f = h.ccclass;
var d = h.property;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nShootPos = null;
        e._owner = null;
        e._ownerSkill = null;
        e._bullets = [];
        e._isShow = !1;
        return e;
    }
    __extends(e, t);
    Object.defineProperty(e.prototype, "ownerSkill", {
        get: function () {
            return this._ownerSkill;
        },
        enumerable: !1,
        configurable: !0
    });
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this.node.angle = 0;
    };
    e.prototype.show = function (t, e, n) {
        var i = this;
        this._isShow = !1;
        this._owner = e;
        this._ownerSkill = n;
        this.node.opacity = 0;
        this.node.scale = 0;
        $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_HaoTianJingStart");
        cc.tween(this.node)
            .to(
                0.4,
                {
                    opacity: 255,
                    scale: 1,
                    x: t.x,
                    y: t.y
                },
                {
                    easing: "backOut"
                }
            )
            .call(function () {
                for (
                    var t = i._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value + 1, e = 0;
                    e < t;
                    e++
                ) {
                    i.addBullet();
                }
                $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_HaoTianJingAtk", 4, !0);
                i._isShow = !0;
            })
            .start();
    };
    e.prototype.reset = function () {
        $audioUtil.AudioUtil.stopEffect("lmtw_yx_HaoTianJingAtk");
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node)
            .to(0.1, {
                angle: 0
            })
            .start();
    };
    e.prototype.addBullet = function () {
        var t = this;
        var e = $battleMgr.default.instance.getCurScene();
        $bulletMgr.default.instance.createBullet({
            parent: e.bulletParent,
            prefabName: "Bullet41",
            initPos: cc.v2(),
            iconPath: "",
            bulletClass: $bullet41.default,
            onCreated: function (e) {
                e.shoot(t._owner, t, t._bullets.length > 0 ? t._bullets[t._bullets.length - 1] : null);
                t._bullets.push(e);
            }
        });
    };
    e.prototype.onRemove = function () {
        var e = this;
        $audioUtil.AudioUtil.stopEffect("lmtw_yx_HaoTianJingAtk");
        $audioUtil.AudioUtil.playLimitEffect("sounds/lmtw_yx_HaoTianJingOver");
        this._bullets.forEach(function (t) {
            t.remove();
        });
        this._bullets = [];
        this.fideOut(function () {
            t.prototype.onRemove.call(e);
        });
    };
    __decorate([d(cc.Node)], e.prototype, "nShootPos", void 0);
    return __decorate([f], e);
})($effectBase.default);
exports.default = m;
