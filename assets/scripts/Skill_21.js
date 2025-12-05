var i;
exports.Skill_21 = void 0;
var $cfg = require("./Cfg");
var $battleMgr = require("./BattleMgr");
var $bullet21 = require("./Bullet21");
var $bulletMgr = require("./BulletMgr");
var $attrEnum = require("./AttrEnum");
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._bullets = [];
        e._addRotationSpeedBuffVal = 0;
        e._addRotationSpeedBuffTime = 0;
        e._curBulletCount = 0;
        e._radius = 50;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this._addRotationSpeedBuffVal = 0;
        this._addRotationSpeedBuffTime = 0;
        this._bullets = [];
        var e = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
        this._curBulletCount = e;
        for (var n = 0; n < e; n++) {
            this.addBullet();
        }
    };
    e.prototype.onUpdate = function (t) {
        if (this._addRotationSpeedBuffTime > 0) {
            this._addRotationSpeedBuffTime -= t;
            if (this._addRotationSpeedBuffTime < 0) {
                this._addRotationSpeedBuffVal = 0;
                this._addRotationSpeedBuffTime = 0;
            }
        }
        var e =
            (360 / (this.getAttribute($attrEnum.E_SkillAttrType.SKILL_CD).value / t)) *
            (1 + this._addRotationSpeedBuffVal / 100);
        this._bullets.forEach(function (n) {
            n.updateRotation(e, t);
        });
    };
    e.prototype.addBullet = function () {
        var t = this;
        var e = $battleMgr.default.instance.getCurScene();
        $bulletMgr.default.instance.createBullet({
            parent: e.lowEffectParent,
            prefabName: "Bullet21",
            bulletClass: $bullet21.default,
            iconPath: "",
            initPos: this._owner.node.getPosition().add(cc.v2(this._radius, 50)),
            onCreated: function (e) {
                e.shoot(t._owner, t, t._radius);
                var n = 360 / (t._bullets.length + 1);
                t._bullets.forEach(function (t, e) {
                    t.setAngle((e + 1) * n);
                });
                t._bullets.push(e);
            }
        });
    };
    e.prototype.addRotationSpeedBuff = function () {
        this._addRotationSpeedBuffTime = 3;
        this._addRotationSpeedBuffVal = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value;
    };
    e.prototype.getHurtOption = function () {
        var e = t.prototype.getHurtOption.call(this);
        e.critRate += this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
        return e;
    };
    e.prototype.onSelectSkillEx = function (t) {
        var e = $cfg.default.instance.dataChoose.getById(t);
        if (11 == e.type) {
            switch (Number(e.val1)) {
                case 1:
                    var n = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value,
                        i = n - this._curBulletCount;
                    this._curBulletCount = n;
                    for (var o = 0; o < i; o++) {
                        this.addBullet();
                    }
                    break;
                case 2:
                    this._bullets.forEach(function (t) {
                        t.updateSize();
                    });
            }
        }
    };
    e.prototype.onRemove = function () {
        this._bullets.forEach(function (t) {
            t.remove();
        });
        this._bullets = [];
        t.prototype.onRemove.call(this);
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_21 = u;
