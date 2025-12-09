var i;
exports.Skill_111 = void 0;
var $battleMgr = require("./BattleMgr");
var $bullet111 = require("./Bullet111");
var $bulletMgr = require("./BulletMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var p = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.onUpdate = function (t) {
        if (this.skillCD > 0) {
            this.skillCD -= t;
            return void (this.skillCD < 0 && (this.skillCD = 0));
        }
        if (this._cfg.isStay > 0) {
            if (this._owner.curState != $actorEnum.EActorStateType.IDLE) {
                return void (this._waitCD = 0);
            }
            this._waitCD += t;
            if (this._waitCD < this._cfg.isStay) {
                return;
            }
        }
        var e = this.searchTarget();
        if (e.length > 0) {
            this.enterCD();
            for (
                var n = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value, i = 0;
                i < n && !(i >= e.length);
                i++
            ) {
                this.shootBullet(e[i], t);
            }
        }
    };
    e.prototype.shootBullet = function (t, e) {
        var n = this;
        var i = $battleMgr.default.instance.getCurScene();
        var o = this._owner.node.getPosition();
        o.y += 0.5 * this._owner.rightHeight;
        var c = t.getBeHurtPos();
        var l = null;
        if (t.moveDir) {
            l = t.moveDir.clone();
        } else {
            l = null;
        }
        if (l) {
            var p = t.getAttribute($attrEnum.E_AttrType.SPEED).value;
            c.addSelf(l.mul(p * e));
        }
        c.y = i.level.getLayerPosY(i.level.findLayerByPos(c));
        $bulletMgr.default.instance.createBullet({
            parent: i.bulletParent,
            prefabName: "Bullet111",
            initPos: o,
            iconPath: "",
            bulletClass: $bullet111.default,
            onCreated: function (t) {
                t.shoot(n._owner, n, c);
            }
        });
    };
    e.prototype.searchTarget = function () {
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
        l.sort(function () {
            if (Math.random() < 0.5) {
                return -1;
            } else {
                return 1;
            }
        });
        return l.map(function (t) {
            return t.actor;
        });
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_111 = p;
