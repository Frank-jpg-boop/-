var i;
var $battleHurtFormulaMgr = require("./BattleHurtFormulaMgr");
var $battleMgr = require("./BattleMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $effectMgr = require("./EffectMgr");
var $spAnimEffect = require("./SpAnimEffect");
var $attrEnum = require("./AttrEnum");
var $buffEnum = require("./BuffEnum");
var $enemyBase = require("./EnemyBase");
var $bulletBase = require("./BulletBase");
var _ = cc._decorator;
var g = _.ccclass;
var v =
    (_.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._ownerSkill = null;
            e._collisionIds = [];
            return e;
        }
        __extends(e, t);
        e.prototype.onShoot = function (t, e) {
            var n = this;
            this._ownerSkill = e;
            this._collisionIds = [];
            var i = this.node.getPosition();
            var o = t.sub(i).len() / 500;
            this.tweenTo(
                i,
                t,
                o,
                !0,
                function () {
                    if (n._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_5).value > 0) {
                        n.blast();
                    }
                },
                "sineOut"
            );
        };
        e.prototype.onUpdate = function () {
            this.checkCollision();
        };
        e.prototype.checkCollision = function () {
            for (
                var t = this.node.getPosition(),
                    e = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(t.x, t.y),
                    n = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                        e.key,
                        $gridAreaDivisionMgr.E_AreaObjectType.ENEMY
                    ),
                    i = this.node.convertToWorldSpaceAR(cc.v2()),
                    o = 0;
                o < n.length;
                o++
            ) {
                var r = n[o];
                if (
                    r.canBeHurt() &&
                    !r.isDead() &&
                    !this._collisionIds.includes(r.unitId) &&
                    $simplyCollisionDetector.default.isCollisionPointToRect(
                        new $simplyVec2.default(i.x, i.y),
                        r.hurtColliderRect
                    )
                ) {
                    var s = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getHurtOption(), r);
                    r.beHurt(s);
                    if (
                        r instanceof $enemyBase.default &&
                        Math.random() < this._ownerSkill.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_4).value
                    ) {
                        r.buff.add({
                            buffId: $buffEnum.EBuffId.DIZZINESS,
                            buffType: $buffEnum.EBuffType.DIZZINESS,
                            parentActor: r,
                            agentActor: this._ownerSkill.owner,
                            isDebuff: !0,
                            isSuperposition: !1,
                            duration: 1,
                            onRemove: null
                        });
                    }
                    this._collisionIds.push(r.unitId);
                }
            }
        };
        e.prototype.blast = function () {
            var t = this;
            var e = $battleMgr.default.instance.getCurScene();
            var n = this.node.getPosition();
            $effectMgr.default.instance.createEffect({
                parent: e.effectParent,
                prefabName: "Weapon51Boom",
                effectClass: $spAnimEffect.default,
                initPos: n,
                onCreated: function (e) {
                    e.scheduleOnce(function () {
                        t.checkBlastHurt(n, 40);
                    }, 0.1);
                    e.playDefaultAnim("baozha", 1, !1, null);
                }
            });
        };
        e.prototype.checkBlastHurt = function (t, e) {
            for (
                var n = $gridAreaDivisionMgr.default.instance.getCiclerAreaKeys(t, e), i = [], o = 0, r = n;
                o < r.length;
                o++
            ) {
                var s = r[o];
                var l = $gridAreaDivisionMgr.default.instance
                    .getAreaObjectList(s, $gridAreaDivisionMgr.E_AreaObjectType.ENEMY)
                    .filter(function (t) {
                        return !i.includes(t);
                    });
                if (l) {
                    i.push.apply(i, l);
                }
            }
            for (var u = 0, p = i; u < p.length; u++) {
                var h = p[u];
                if (!h.isDead() && cc.Vec2.squaredDistance(t, h.node.getPosition()) <= e * e) {
                    var f = $battleHurtFormulaMgr.default.instance.skillHurt(this._ownerSkill.getHurtOption(), h);
                    h.beHurt(f);
                }
            }
        };
        return __decorate([g], e);
    })($bulletBase.default));
exports.default = v;
