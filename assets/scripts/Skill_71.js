var i;
exports.Skill_71 = void 0;
var $audioUtil = require("./AudioUtil");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $effectMgr = require("./EffectMgr");
var $attrEnum = require("./AttrEnum");
var $weapon71Atk = require("./Weapon71Atk");
var p = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.onUpdate = function (t) {
        if (this.skillCD > 0) {
            this.skillCD -= t;
            return void (this.skillCD <= 0 && (this.skillCD = 0));
        }
        var e = this.searchTargets();
        if (e.length > 0) {
            this.enterCD();
            this.attack(e);
        }
    };
    e.prototype.attack = function (t) {
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ShiZiJia");
        for (var e = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value, n = 0; n < e; n++) {
            var i = null;
            if (n >= t.length) {
                i = null;
            } else {
                i = t[n];
            }
            if (!i) {
                return;
            }
            var o = i.node.getPosition();
            this.playAttack(o);
        }
    };
    e.prototype.playAttack = function (t) {
        var e = this;
        var n = $battleMgr.default.instance.getCurScene();
        $effectMgr.default.instance.createEffect({
            parent: n.actorTopParent,
            prefabName: "Weapon71Atk",
            initPos: t,
            effectClass: $weapon71Atk.default,
            onCreated: function (n) {
                n.play(e, function () {
                    if (Math.random() < e.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_6).value) {
                        e.playAttack(t);
                    }
                });
            }
        });
    };
    e.prototype.searchTargets = function () {
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
            var c = $gridAreaDivisionMgr.default.instance
                .getAreaObjectList(a, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                .filter(function (t) {
                    return !i.includes(t) && !t.isDead();
                });
            if (c) {
                i.push.apply(i, c);
            }
        }
        var l = [];
        i.forEach(function (e) {
            if (e.canBeSearch()) {
                var n = e.node.getPosition();
                var i = cc.Vec2.squaredDistance(n, t._owner.node.getPosition());
                if (i < t._cfg.edge * t._cfg.edge) {
                    l.push({
                        actor: e,
                        sqrDis: i
                    });
                }
            }
        });
        l.sort(function (t, e) {
            return t.sqrDis - e.sqrDis;
        });
        return l.map(function (t) {
            return t.actor;
        });
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_71 = p;
