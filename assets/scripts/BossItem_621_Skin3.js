var i;
var $mathUtil = require("./MathUtil");
var $battleMgr = require("./BattleMgr");
var $simplyCircleCollider = require("./SimplyCircleCollider");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
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
            e._isBounce = !1;
            e._isDrop = !1;
            e._downSpeed = 200;
            e._bounceSpeed = 200;
            e._bounceMoveDir = cc.v2();
            e._atkCollisionIds = [];
            e._isInScreen = !0;
            e._ballCollider = null;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "isInScreen", {
            get: function () {
                return this._isInScreen;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "ballCollider", {
            get: function () {
                return this._ballCollider;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            this._ballCollider = this.node.getChildByName("BallCollsider").getComponent($simplyCircleCollider.default);
        };
        e.prototype.initAttribute = function () {
            t.prototype.initAttribute.call(this);
            this._actorAttribute.init($attrEnum.E_AttrType);
            this._actorAttribute.getNumeric($attrEnum.E_AttrType.ATK).setFixBase(this._initParam.atk);
            this._actorAttribute.getNumeric($attrEnum.E_AttrType.HP).setFixBase(this._initParam.maxHp);
        };
        e.prototype.onEnable = function () {
            this.node.opacity = 255;
        };
        e.prototype.drop = function () {
            var t = this;
            var e = this._initParam.targetPos;
            var n = this.node.getPosition();
            var i = cc.v2(n.x + 0.6 * (e.x - n.x), n.y + 400);
            this._isInScreen = !0;
            $mathUtil.MathUtil.bezierTo(this.node, 1.2, n, i, e, function (e) {
                var n = e.x - t.node.x;
                var i = e.y - t.node.y;
                var o = cc.v2(n, i).normalizeSelf();
                if (0 == o.x && 0 == o.y) {
                    //
                } else {
                    t._bounceMoveDir = o;
                }
            })
                .call(function () {
                    t._isDrop = !0;
                })
                .start();
        };
        e.prototype.randomBounceMoveDir = function (t) {
            if (void 0 === t) {
                t = null;
            }
            if (1 == t.x) {
                this._bounceMoveDir.x = -Math.abs(this._bounceMoveDir.x);
            } else {
                if (-1 == t.x) {
                    this._bounceMoveDir.x = Math.abs(this._bounceMoveDir.x);
                } else {
                    if (1 == t.y) {
                        this._bounceMoveDir.y = -Math.abs(this._bounceMoveDir.y);
                    } else {
                        -1 == t.y && (this._bounceMoveDir.y = Math.abs(this._bounceMoveDir.y));
                    }
                }
            }
            return this._bounceMoveDir;
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            var n = this.node.convertToWorldSpaceAR(cc.v2());
            var i = $battleMgr.default.instance.getCurScene().gameCamera.getWorldToScreenPoint(n);
            var o = !1;
            var r = !1;
            var c = !1;
            var l = !1;
            var u = null;
            if (i.x < 35) {
                o = !0;
                u = cc.v2(-1, 0);
            } else {
                if (i.x > cc.winSize.width - 35) {
                    (r = !0), (u = cc.v2(1, 0));
                } else {
                    if (i.y < 35) {
                        (c = !0), (u = cc.v2(0, -1));
                    } else {
                        i.y > cc.winSize.height - 35 - 180 && ((l = !0), (u = cc.v2(0, 1)));
                    }
                }
            }
            var p = !(r || o || l || c);
            if (this._isDrop) {
                if (this._isBounce) {
                    if (this._isInScreen != p) {
                        if (p) {
                            //
                        } else {
                            this._bounceMoveDir = this.randomBounceMoveDir(u);
                        }
                        this._isInScreen = p;
                    }
                } else {
                    this._downSpeed = $mathUtil.MathUtil.lerp(this._downSpeed, 600, 0.01);
                    var h = this._bounceMoveDir.mul(this._downSpeed * e);
                    this.node.x += h.x;
                    this.node.y += h.y;
                    if (p) {
                        //
                    } else {
                        this._isBounce = !0;
                        this._bounceMoveDir = this.randomBounceMoveDir(cc.v2(0, -1));
                    }
                }
            } else {
                this._isInScreen = p;
                p ||
                    ((this._isDrop = !0),
                    cc.Tween.stopAllByTarget(this.node),
                    (this._isBounce = !0),
                    (this._bounceMoveDir = this.randomBounceMoveDir(u)));
            }
            if (this._bounceMoveDir) {
                this.node.x += this._bounceMoveDir.x * this._bounceSpeed * e;
                this.node.y += this._bounceMoveDir.y * this._bounceSpeed * e;
            }
            this.updateUnifyPos();
            this.updateAreaKey();
            this.checkHurt();
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
                            $simplyCollisionDetector.default.isCollisionRectToRect(
                                e.hurtColliderRect,
                                t.hurtColliderRect
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
