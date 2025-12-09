var i;
exports.Skill_41 = void 0;
var $cfg = require("./Cfg");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $effectMgr = require("./EffectMgr");
var $attrEnum = require("./AttrEnum");
var $weapon41 = require("./Weapon41");
var h = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e._isReleasing = !1;
        e._weapons = [];
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value;
        this._weapons = [];
    };
    e.prototype.onUpdate = function (t) {
        if (this.skillCD > 0) {
            return (this.skillCD -= t), void (this.skillCD <= 0 && (this.skillCD = 0));
        } else {
            if (this.duration > 0) {
                return (this.duration -= t), void (this.duration <= 0 && ((this.duration = 0), this.removeWeapon()));
            } else {
                return void (this._isReleasing || (this.checkSummon() && this.summonWeapon()));
            }
        }
    };
    e.prototype.removeWeapon = function () {
        this._weapons.forEach(function (t) {
            t.remove();
        });
        this._weapons = [];
        this.enterCD();
        this._isReleasing = !1;
    };
    e.prototype.summonWeapon = function () {
        var t = this;
        this._isReleasing = !0;
        var e = $battleMgr.default.instance.getCurScene();
        var n = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value;
        var i = this._owner.node.getPosition().add(cc.v2(0, 50));
        this._durationTimer = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_2).value + 0.4;
        this.duration = this._durationTimer;
        for (
            var o = function (n) {
                    var o =
                        i.x +
                        (n % 2 == 0 ? -1 : 1) * (15 + 40 * Math.ceil((n + 1) / 2)) +
                        $randomUtil.RandomUtil.randomInt(-10, 10);
                    $effectMgr.default.instance.createEffect({
                        parent: e.bulletParent,
                        prefabName: "Weapon41",
                        initPos: i,
                        effectClass: $weapon41.default,
                        onCreated: function (e) {
                            t._weapons.push(e);
                            e.show(cc.v2(o, i.y + $randomUtil.RandomUtil.randomInt(100, 150)), t._owner, t);
                        }
                    });
                },
                r = 0;
            r < n;
            r++
        ) {
            o(r);
        }
    };
    e.prototype.checkSummon = function () {
        for (
            var t = this,
                e = this._owner.node.getPosition(),
                n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(e, this._cfg.edge),
                i = [],
                o = 0,
                r = n;
            o < r.length;
            o++
        ) {
            var a = r[o];
            var s = $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(a, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .filter(function (t) {
                    return !i.includes(t) && !t.isDead();
                });
            if (s) {
                i.push.apply(i, s);
            }
        }
        return (
            (i = i.filter(function (e) {
                var n = e.node.getPosition();
                var i = cc.Vec2.distance(n, t._owner.node.getPosition());
                return e.canBeSearch() && i <= t._cfg.edge;
            })).length > 0
        );
    };
    e.prototype.onSelectSkillEx = function (e) {
        t.prototype.onSelectSkillEx.call(this, e);
        var n = $cfg.default.instance.dataChoose.getById(e);
        if (11 == n.type && 4 === Number(n.val1)) {
            this._weapons.forEach(function (t) {
                for (var e = 0; e < Number(n.val2); e++) {
                    t.addBullet();
                }
            });
        }
    };
    e.prototype.onRemove = function () {
        this.removeWeapon();
        t.prototype.onRemove.call(this);
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_41 = h;
