var i;
exports.Skill_81 = void 0;
var $eventManager = require("./EventManager");
var $battleMgr = require("./BattleMgr");
var $effectMgr = require("./EffectMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $weapon81 = require("./Weapon81");
var $weapon81Line = require("./Weapon81Line");
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._weapons = [];
        e._lineMap = new Map();
        e._weaponCreateId = 0;
        e._passDoorCd = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this._weapons = [];
        this._lineMap = new Map();
        this.skillCD = this.skillCDTimer;
        $eventManager.EventManager.instance.on($actorEnum.EPlayerEvent.PLAYER_MOVE, this.onPlayerMove, this);
        $eventManager.EventManager.instance.on($actorEnum.EPlayerEvent.PLAYER_PASS_DOOR, this.onPlayerPassDoor, this);
    };
    e.prototype.onUpdate = function (t) {
        if (this.skillCD <= 0) {
            this.summonWeapon();
        }
        if (this._passDoorCd > 0) {
            this._passDoorCd -= t;
            if (this._passDoorCd <= 0) {
                this._passDoorCd = 0;
            }
        }
    };
    e.prototype.summonWeapon = function () {
        var t = this;
        this.enterCD();
        var e = cc.v2(30 * -this._owner.dirX, 0.7 * this._owner.rightHeight);
        var n = this._owner.node.getPosition().add(e);
        var i = $battleMgr.default.instance.getCurScene();
        $effectMgr.default.instance.createEffect({
            parent: i.effectParent,
            prefabName: "Weapon81",
            initPos: n,
            effectClass: $weapon81.default,
            onCreated: function (e) {
                e.node.zIndex = cc.macro.MAX_ZINDEX;
                t._weapons.push(e);
                e.play(t, t._weaponCreateId++);
                t.checkLine(e, !1);
            }
        });
    };
    e.prototype.checkLine = function (t, e) {
        var n = this;
        if (e) {
            Array.from(this._lineMap.keys())
                .filter(function (e) {
                    return -1 != e.indexOf("" + t.weaponId);
                })
                .forEach(function (t) {
                    var e = n._lineMap.get(t);
                    if (e) {
                        e.remove();
                        n._lineMap.delete(t);
                    }
                });
        } else {
            var i = t.node.getPosition();
            var o = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value;
            var r = $battleMgr.default.instance.getCurScene();
            this._weapons.forEach(function (e) {
                if (e != t) {
                    var a = e.node.getPosition();
                    var c = cc.Vec2.squaredDistance(i, a);
                    var l = cc.v2((i.x + a.x) / 2, (i.y + a.y) / 2);
                    if (c <= o * o) {
                        var u = t.weaponId + "_" + e.weaponId;
                        if (n._lineMap.has(u)) {
                            //
                        } else {
                            $effectMgr.default.instance.createEffect({
                                parent: r.effectParent,
                                prefabName: "Weapon81Line",
                                initPos: l,
                                effectClass: $weapon81Line.default,
                                onCreated: function (t) {
                                    n._lineMap.set(u, t);
                                    t.createLine(i, a, n);
                                }
                            });
                        }
                    }
                }
            });
        }
    };
    e.prototype.getLineHurtOption = function () {
        return {
            attacker: this._owner,
            baseValue: this._owner.getAttribute($attrEnum.E_AttrType.ATK).value,
            rate:
                this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_3).value *
                this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value,
            critRate: this._owner.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value,
            critHurt: this._owner.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value,
            extraDamage: this._extraDamage,
            hurtSourceType: $battleEnum.EHurtSourceType.SKILL_HURT,
            option: {
                skillId: this._cfg.id
            }
        };
    };
    e.prototype.removeWeapon = function (t) {
        var e = this._weapons.indexOf(t);
        if (e >= 0) {
            this._weapons.splice(e, 1);
        }
        this.checkLine(t, !0);
    };
    e.prototype.onPlayerMove = function (t) {
        this.skillCD -= t;
    };
    e.prototype.onPlayerPassDoor = function (t) {
        var e = this;
        var n = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value;
        if (!(this._passDoorCd > 0 || n <= 0)) {
            this._passDoorCd = n;
            var i = t.node.getPosition();
            i.x -= 60;
            i.y = this._owner.node.y;
            for (var o = 0; o < 2; ++o) {
                var r = cc.v2(120 * (o % 2 == 0 ? -1 : 1), 0.7 * this._owner.rightHeight);
                var c = i.add(r);
                var u = $battleMgr.default.instance.getCurScene();
                $effectMgr.default.instance.createEffect({
                    parent: u.effectParent,
                    prefabName: "Weapon81",
                    initPos: c,
                    effectClass: $weapon81.default,
                    onCreated: function (t) {
                        t.node.zIndex = cc.macro.MAX_ZINDEX;
                        e._weapons.push(t);
                        t.play(e, e._weaponCreateId++);
                        e.checkLine(t, !1);
                    }
                });
            }
        }
    };
    e.prototype.onRemove = function () {
        $eventManager.EventManager.instance.off($actorEnum.EPlayerEvent.PLAYER_MOVE, this.onPlayerMove, this);
        $eventManager.EventManager.instance.off($actorEnum.EPlayerEvent.PLAYER_PASS_DOOR, this.onPlayerPassDoor, this);
        this._weapons.slice().forEach(function (t) {
            t.remove();
        });
        this._weapons = [];
        this._lineMap.forEach(function (t) {
            t.remove();
        });
        this._lineMap.clear();
        t.prototype.onRemove.call(this);
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_81 = f;
