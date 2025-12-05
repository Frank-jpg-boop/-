var i;
exports.Skill_11 = void 0;
var $audioUtil = require("./AudioUtil");
var $battleMgr = require("./BattleMgr");
var $bullet11 = require("./Bullet11");
var $bulletMgr = require("./BulletMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $effectMgr = require("./EffectMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $weapon11 = require("./Weapon11");
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._attackCD = 0;
        e._critAdd = 0;
        e._hurtAdd = 0;
        e._dt = 0;
        e._attackTarget = null;
        e._weapon = null;
        e._weaponOffsetPos = cc.v2(0, 0);
        e._weaponCentrePos = cc.v2(0, 40);
        e._weaponRadio = 50;
        e._weaponOffsetInitPos = cc.v2(35, 0);
        e._weaponTargetOffsetPos = cc.v2(0, 0);
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
        this.duration = this._durationTimer;
        this._critAdd = 0;
        this._hurtAdd = 0;
        this.createWeapon();
    };
    e.prototype.createWeapon = function () {
        var t = this;
        this._weaponOffsetInitPos.x = Math.abs(this._weaponOffsetInitPos.x) * this._owner.dirX;
        this._weaponOffsetPos = this._weaponOffsetInitPos.clone();
        this._weaponTargetOffsetPos = this._weaponOffsetPos.clone();
        $effectMgr.default.instance.createEffect({
            parent: this._owner.node,
            prefabName: "Weapon11",
            effectClass: $weapon11.default,
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
            this._weaponOffsetPos.lerp(this._weaponTargetOffsetPos, 0.25, this._weaponOffsetPos);
            this._weapon.node.x = this._weaponCentrePos.x + this._weaponOffsetPos.x;
            this._weapon.node.y = this._weaponCentrePos.y + this._weaponOffsetPos.y;
            this._dt = t;
            if (this.skillCD > 0) {
                this.skillCD -= t;
                if (this.skillCD <= 0) {
                    this.skillCD = 0;
                    this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
                    this.duration = this._durationTimer;
                    this._attackCD =
                        this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value *
                        this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
                    this._critAdd = 0;
                    this._hurtAdd = 0;
                }
                this.resetWeapon();
                var n = (this.skillCDTimer - this.skillCD) / this.skillCDTimer;
                this._weapon.updateProgressCd(n);
            } else {
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
                if (!this._weapon.isShooting && this.duration > 0) {
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
            var t = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(
                    this._owner.node.getPosition(),
                    this._cfg.edge
                ),
                e = [],
                n = 0,
                i = t;
            n < i.length;
            n++
        ) {
            var o = i[n];
            $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(o, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .forEach(function (t) {
                    if (e.includes(t)) {
                        //
                    } else {
                        e.push(t);
                    }
                });
        }
        for (var r = null, a = Number.MAX_VALUE, s = this._owner.node.position, c = 0, u = e; c < u.length; c++) {
            var p = u[c];
            if (p.canBeSearch()) {
                var h = cc.Vec3.squaredDistance(s, p.node.position);
                if (h < a || !r) {
                    a = h;
                    r = p;
                }
            }
        }
        return r;
    };
    e.prototype.shootBullet = function (t) {
        this._critAdd += this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value;
        this._hurtAdd += this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_8).value;
        if (
            1 == this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value &&
            this.duration <= this._durationTimer - 5
        ) {
            this.shootSurroundBullet(t);
        } else {
            this.shootCommonBullet(t);
        }
    };
    e.prototype.shootCommonBullet = function (t) {
        var e = this;
        var n =
            this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value *
            this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
        var i = this._owner.node.getPosition().add(this._weaponCentrePos);
        var o = null;
        if (this._attackTarget.rightHeight > this._weaponCentrePos.y) {
            o = this._attackTarget.node.getPosition().add(this._weaponCentrePos);
        } else {
            o = this._attackTarget.getBeHurtPos();
        }
        var l = null;
        if (this._attackTarget.moveDir) {
            l = this._attackTarget.moveDir.clone();
        } else {
            l = null;
        }
        if (l) {
            var u = this._attackTarget.getAttribute($attrEnum.E_AttrType.SPEED).value;
            o.addSelf(l.mul(u * this._dt * 10));
        }
        var p = o.sub(i).normalize();
        this._weaponTargetOffsetPos = p.mul(this._weaponRadio);
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShouQiang");
        this._weapon.playShootAnim(
            function () {
                for (
                    var t = $battleMgr.default.instance.getCurScene(),
                        n = cc.v2(-p.y, p.x),
                        i = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value,
                        o = i >> 1,
                        r = e._weapon.shootPos,
                        l = e.getHurtOption(),
                        u = function (i) {
                            var a = n.mul(15 * (i - o));
                            var u = r.add(a);
                            var h = u.add(p.mul(e._cfg.edge));
                            $bulletMgr.default.instance.createBullet({
                                parent: t.bulletParent,
                                prefabName: "Bullet11",
                                initPos: u,
                                iconPath: "",
                                bulletClass: $bullet11.default,
                                onCreated: function (t) {
                                    t.shoot(e._owner, h, e, l);
                                }
                            });
                        },
                        f = 0;
                    f < i;
                    ++f
                ) {
                    u(f);
                }
            },
            n,
            p,
            function (n) {
                e._attackCD = n;
                if (t) {
                    t();
                }
            }
        );
    };
    e.prototype.shootSurroundBullet = function (t) {
        var e = this;
        var n =
            this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value *
            this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value;
        var i = this._owner.node.getPosition().add(this._weaponCentrePos);
        var o = this._attackTarget.getBeHurtPos().sub(i).normalize();
        this._weaponTargetOffsetPos = o.mul(this._weaponRadio);
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShouQiang");
        this._weapon.playShootAnim(
            function () {
                for (
                    var t = e._owner.node.getPosition().add(cc.v2(0, 50)),
                        n = $battleMgr.default.instance.getCurScene(),
                        i = e.getHurtOption(),
                        o = 0;
                    o < 12;
                    ++o
                ) {
                    for (
                        var r = cc.v2(Math.cos((30 * o * Math.PI) / 180), Math.sin((30 * o * Math.PI) / 180)),
                            l = r.mul(50),
                            u = t.add(l),
                            p = t.add(r.mul(e._cfg.edge)),
                            f = cc.v2(-r.y, r.x),
                            d = e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value,
                            m = d >> 1,
                            y = function (t) {
                                var o = f.mul(15 * (t - m));
                                var r = u.add(o);
                                var a = p.add(o);
                                $bulletMgr.default.instance.createBullet({
                                    parent: n.bulletParent,
                                    prefabName: "Bullet11",
                                    initPos: r,
                                    iconPath: "",
                                    bulletClass: $bullet11.default,
                                    onCreated: function (t) {
                                        t.shoot(e._owner, a, e, i);
                                    }
                                });
                            },
                            _ = 0;
                        _ < d;
                        ++_
                    ) {
                        y(_);
                    }
                }
            },
            n,
            o,
            function (n) {
                e._attackCD = n;
                if (t) {
                    t();
                }
            }
        );
    };
    e.prototype.getHurtOption = function () {
        var e = t.prototype.getHurtOption.call(this);
        e.critRate += this._critAdd;
        e.critHurt += this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value;
        e.rate += this._hurtAdd;
        return e;
    };
    e.prototype.onRemove = function () {
        this._weapon.remove();
        this._weapon = null;
        t.prototype.onRemove.call(this);
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_11 = d;
