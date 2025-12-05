var i;
exports.Skill_51 = void 0;
var $audioUtil = require("./AudioUtil");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $bullet51 = require("./Bullet51");
var $bulletMgr = require("./BulletMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $effectMgr = require("./EffectMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $weapon51 = require("./Weapon51");
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._attackCD = 0;
        e._dt = 0;
        e._attackTarget = null;
        e._weapon = null;
        e._weaponOffsetPos = cc.v2(0, 0);
        e._weaponCentrePos = cc.v2(0, 40);
        e._weaponRadio = 60;
        e._weaponOffsetInitPos = cc.v2(40, 0);
        e._weaponTargetOffsetPos = cc.v2(0, 0);
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
        this.duration = this._durationTimer;
        this.createWeapon();
    };
    e.prototype.createWeapon = function () {
        var t = this;
        this._weaponOffsetInitPos.x = Math.abs(this._weaponOffsetInitPos.x) * this._owner.dirX;
        this._weaponOffsetPos = this._weaponOffsetInitPos.clone();
        this._weaponTargetOffsetPos = this._weaponOffsetPos.clone();
        $effectMgr.default.instance.createEffect({
            parent: this._owner.node,
            prefabName: "Weapon51",
            effectClass: $weapon51.default,
            initPos: this._weaponCentrePos.add(this._weaponOffsetPos),
            onCreated: function (e) {
                t._weapon = e;
                t._weapon.reset(t._owner.dirX);
            }
        });
    };
    e.prototype.resetWeapon = function () {
        this._weaponOffsetInitPos.x = Math.abs(this._weaponOffsetInitPos.x) * this._owner.dirX;
        this._weaponTargetOffsetPos = this._weaponOffsetInitPos.clone();
        this._weapon.reset(this._owner.dirX);
    };
    e.prototype.onUpdate = function (t) {
        var e = this;
        if (this._weapon) {
            this._weaponOffsetPos = this._weaponOffsetPos.lerp(this._weaponTargetOffsetPos, 0.3);
            this._weapon.node.setPosition(this._weaponCentrePos.add(this._weaponOffsetPos));
            this._dt = t;
            if (this.skillCD > 0) {
                this.skillCD -= t;
                if (this.skillCD <= 0) {
                    this.skillCD = 0;
                    this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
                    this.duration = this._durationTimer;
                    this._attackCD =
                        this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value *
                        this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value;
                }
                this.resetWeapon();
                return void this._weapon.updateProgressCd((this.skillCDTimer - this.skillCD) / this.skillCDTimer);
            }
            if (!this._weapon.isShooting) {
                if (this._cfg.isStay > 0) {
                    if (this._owner.curState != $actorEnum.EActorStateType.IDLE) {
                        this._waitCD = 0;
                        return void this.resetWeapon();
                    }
                    this._waitCD += t;
                    if (this._waitCD < this._cfg.isStay) {
                        return;
                    }
                }
                if (this._attackCD > 0) {
                    this._attackCD -= t;
                    return void (this._attackCD < 0 && (this._attackCD = 0));
                }
                if (this.duration > 0) {
                    this._attackTarget = this.searchTarget();
                    if (!this._attackTarget) {
                        return void this.resetWeapon();
                    }
                    this.shootBullet(function () {
                        e.duration--;
                        if (e.duration <= 0) {
                            e.enterCD();
                            e.resetWeapon();
                            e._weapon.updateProgressCd(1);
                        }
                    });
                }
            }
        }
    };
    e.prototype.enterCD = function () {
        this._skillCDTimer = Math.max(this.getAttribute($attrEnum.E_SkillAttrType.SKILL_CD).value, 0.1);
        this.skillCD = this._skillCDTimer;
    };
    e.prototype.searchTarget = function () {
        for (
            var t = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value,
                e = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(this._owner.node.getPosition(), t),
                n = [],
                i = 0,
                o = e;
            i < o.length;
            i++
        ) {
            var r = o[i];
            var a = $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(r, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .filter(function (t) {
                    return !n.includes(t);
                });
            if (a) {
                n.push.apply(n, a);
            }
        }
        for (var s = null, c = Number.MAX_VALUE, l = this._owner.node.position, p = 0, h = n; p < h.length; p++) {
            var d = h[p];
            if (d.canBeSearch()) {
                var m = cc.Vec3.squaredDistance(l, d.node.position);
                if (m < c || !s) {
                    c = m;
                    s = d;
                }
            }
        }
        return s;
    };
    e.prototype.shootBullet = function (t) {
        var e = this;
        var n =
            this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value *
            this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value;
        var i = $battleMgr.default.instance.getCurScene();
        var o = this._owner.node.getPosition().add(this._weaponCentrePos);
        var u = this._attackTarget.node.getPosition().add(this._weaponCentrePos);
        var p = null;
        if (this._attackTarget.moveDir) {
            p = this._attackTarget.moveDir.clone();
        } else {
            p = null;
        }
        if (p) {
            var h = this._attackTarget.getAttribute($attrEnum.E_AttrType.SPEED).value;
            u.addSelf(p.mul(h * this._dt));
        }
        var d = u.sub(o).normalize();
        this._weaponTargetOffsetPos = d.mul(this._weaponRadio);
        var m = (180 * cc.Vec2.RIGHT_R.signAngle(d)) / Math.PI;
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_SanDanQiang");
        this._weapon.playShootAnim(
            function () {
                for (
                    var t = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value,
                        n =
                            (180 * Math.atan2(200, e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value)) /
                            Math.PI /
                            t,
                        o = e._weapon.shootPos,
                        r = t >> 1,
                        s = function (t) {
                            var s = m + n * (t - r);
                            var u = cc.v2(Math.cos((s * Math.PI) / 180), Math.sin((s * Math.PI) / 180));
                            var p = $randomUtil.RandomUtil.randomInt(
                                50,
                                e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value
                            );
                            var h = o.add(u.mul(p));
                            $bulletMgr.default.instance.createBullet({
                                parent: i.bulletParent,
                                prefabName: "Bullet51",
                                initPos: o,
                                iconPath: "",
                                bulletClass: $bullet51.default,
                                onCreated: function (t) {
                                    t.shoot(e._owner, h, e);
                                }
                            });
                        },
                        u = 0;
                    u < t;
                    ++u
                ) {
                    s(u);
                }
            },
            n,
            d,
            function (n) {
                e._attackCD = n;
                if (t) {
                    t();
                }
            }
        );
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_51 = m;
