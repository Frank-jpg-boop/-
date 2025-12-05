var i;
var $battleMgr = require("./BattleMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $spAnimCtrl = require("./SpAnimCtrl");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $actorMgr = require("./ActorMgr");
var $enemyItemBase = require("./EnemyItemBase");
var m = cc._decorator;
var y = m.ccclass;
var _ =
    (m.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._nIcon = null;
            e._spAnimCtrl = null;
            e._atkCollider = null;
            e._atkCollisionIds = [];
            return e;
        }
        __extends(e, t);
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._nIcon = this.node.getChildByName("Body").getChildByName("Icon");
            this._spAnimCtrl = this.node
                .getChildByName("Body")
                .getChildByName("Anim")
                .getComponent($spAnimCtrl.default);
            this._atkCollider = cc
                .find(
                    "Body/Anim/ATTACHED_NODE_TREE/ATTACHED_NODE:root/ATTACHED_NODE:xiangshui/ATTACHED_NODE:atk/Collider",
                    this.node
                )
                .getComponent($simplyCircleCollider.default);
            this._nIcon.active = !0;
            this._spAnimCtrl.clearAnim();
            this._spAnimCtrl.node.active = !1;
        };
        e.prototype.playShowAnim = function () {
            var t = this;
            this.node.opacity = 255;
            var e = this._initParam.moveTargetPos;
            var n = this.node.getPosition();
            var i = e.sub(n);
            var o = i.normalize();
            var r = (180 * cc.Vec2.RIGHT_R.signAngle(o)) / Math.PI;
            this.node.getChildByName("Body").angle = r + 90;
            var a = i.magSqr() / 64e4;
            return new Promise(function (n) {
                cc.tween(t.node)
                    .to(a, {
                        x: e.x,
                        y: e.y
                    })
                    .call(function () {
                        n();
                    })
                    .start();
            });
        };
        e.prototype.onInit = function () {
            t.prototype.onInit.call(this);
            this._atkCollisionIds = [];
            this._nIcon.active = !1;
            this._spAnimCtrl.node.active = !0;
            this._spAnimCtrl.playAnim("atk", 1, !0);
        };
        e.prototype.initAttribute = function () {
            t.prototype.initAttribute.call(this);
            this._actorAttribute.init($attrEnum.E_AttrType);
            this._actorAttribute.getNumeric($attrEnum.E_AttrType.ATK).setFixBase(this._initParam.atk);
            this._actorAttribute.getNumeric($attrEnum.E_AttrType.HP).setFixBase(this._initParam.maxHp);
        };
        e.prototype.getHurt = function () {
            var t = this.getAttribute($attrEnum.E_AttrType.ATK).value;
            var e = Math.random() < this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value;
            if (e) {
                t *= this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value;
            }
            return {
                damage: t,
                isCrit: e,
                attacker: this,
                hurtSource: $battleEnum.EHurtSourceType.COMMON_ATTACK
            };
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            if ($battleMgr.default.instance.isSceneOut(this.node.getPosition())) {
                this.changeState($actorEnum.EActorStateType.DEAD);
            } else {
                this.checkHurt();
            }
        };
        e.prototype.checkHurt = function () {
            var t = this;
            if (this.isDead()) {
                //
            } else {
                $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER).forEach(function (e) {
                    var n = t._atkCollisionIds.indexOf(e.unitId);
                    if (e.isDead()) {
                        if (-1 != n) {
                            t._atkCollisionIds.splice(n, 1);
                        }
                    } else {
                        if (
                            $simplyCollisionDetector.default.isCollisionRectToCircle(
                                e.hurtColliderRect,
                                t._atkCollider.circle
                            )
                        ) {
                            -1 == n && (e.beHurt(t.getHurt()), t._atkCollisionIds.push(e.unitId));
                        } else {
                            -1 != n && t._atkCollisionIds.splice(n, 1);
                        }
                    }
                });
            }
        };
        return __decorate([y], e);
    })($enemyItemBase.default));
exports.default = _;
