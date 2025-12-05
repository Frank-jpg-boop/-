var i;
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $bulletMgr = require("./BulletMgr");
var $commonEnemyBullet = require("./CommonEnemyBullet");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $effectMgr = require("./EffectMgr");
var $spAnimEffect = require("./SpAnimEffect");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $door = require("./Door");
var $unitMgr = require("./UnitMgr");
var $actorBase = require("./ActorBase");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $boss_421_Atk = require("./Boss_421_Atk");
var P = cc._decorator;
var A = P.ccclass;
var w =
    (P.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.attackMovePos = null;
            e._isShowBossTag = !1;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "spAnimCtrl", {
            get: function () {
                return this._spCtrl;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.initType = function () {
            this._actorType = $actorEnum.EActorType.BOSS;
        };
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.ATTACK, new $boss_421_Atk.Boss_421_Atk(this));
        };
        e.prototype.canReleaseSkillTarget = function (e) {
            if (t.prototype.canAttackTarget.call(this, e)) {
                var n = $battleMgr.default.instance.getCurScene();
                this.updatePathData();
                if (e.pathPos.x == this.pathPos.x) {
                    var i = cc.v2(0, e.pathPos.y > this.pathPos.y ? 1 : -1);
                    var o = null;
                    if ("" != this._pathPointId) {
                        o = n.level.path.getPoint(this._pathPointId).getDirLine(i);
                    } else {
                        if ("" != this._pathLineId) {
                            o = this._pathLineId;
                        }
                    }
                    if (!o) {
                        return !1;
                    }
                    if ((s = n.level.path.getLine(o)).dir.equals(i)) {
                        //
                    } else {
                        s = n.level.path.getLine(s.reverseLineId);
                    }
                    if (!s) {
                        return !1;
                    }
                    var r = s.dir;
                    var a = this.pathPos.add(r.mul(3e3));
                    if (s.isPosInLineSegment(a)) {
                        //
                    } else {
                        a = s.endPos;
                    }
                    this.attackMovePos = a;
                    return !0;
                }
                if (e.pathPos.y == this.pathPos.y) {
                    var s;
                    i = cc.v2(e.pathPos.x > this.pathPos.x ? 1 : -1, 0);
                    o = null;
                    if ("" != this._pathPointId) {
                        o = n.level.path.getPoint(this._pathPointId).getDirLine(i);
                    } else {
                        if ("" != this._pathLineId) {
                            o = this._pathLineId;
                        }
                    }
                    if (!o) {
                        return !1;
                    }
                    if ((s = n.level.path.getLine(o)).dir.equals(i)) {
                        //
                    } else {
                        s = n.level.path.getLine(s.reverseLineId);
                    }
                    if (!s) {
                        return !1;
                    }
                    r = s.dir;
                    var l = this.pathPos.add(r.mul(3e3));
                    for (a = l.clone(); s && !s.isPosInLineSegment(l); ) {
                        if (null == (o = s.endPoint.getDirLine(r))) {
                            a = s.endPos;
                            break;
                        }
                        s = n.level.path.getLine(o);
                    }
                    var u = this.findMoveDoor(this.pathPos.x, a.x, this.pathPos.y, r.x);
                    if (u) {
                        a.x = u.node.x;
                    }
                    if (a.x >= n.level.node.width / 2) {
                        a.x = n.level.node.width / 2;
                    }
                    if (a.x <= -n.level.node.width / 2) {
                        a.x = -n.level.node.width / 2;
                    }
                    this.attackMovePos = a;
                    return !0;
                }
                return !1;
            }
            return !1;
        };
        e.prototype.enterAttackCd = function () {
            this._attackCD = this._cfg.arkWait;
        };
        e.prototype.findMoveDoor = function (t, e, n, i) {
            for (
                var o = 0, r = $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.DOOR);
                o < r.length;
                o++
            ) {
                var a = r[o];
                if (a.state == $door.EDoorState.CLOSE && Math.abs(a.node.y - n) < 20) {
                    if (i > 0 && a.node.x >= t && a.node.x <= e) {
                        return a;
                    }
                    if (i < 0 && a.node.x <= t && a.node.x >= e) {
                        return a;
                    }
                }
            }
            return null;
        };
        e.prototype.onUpdate = function (e) {
            t.prototype.onUpdate.call(this, e);
            if (!this._isShowBossTag && this._isTrigger) {
                var n = this.node.convertToWorldSpaceAR(cc.v2());
                if ($battleMgr.default.instance.isScreenOut(n, 60, 100)) {
                    //
                } else {
                    this._isShowBossTag = !0;
                    this.changeState($actorEnum.EActorStateType.IDLE);
                    this.enterAttackCd();
                    $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.LOOKAT_BOSS, n);
                }
            }
        };
        e.prototype.attackHit = function (t) {
            for (var e = this, n = [], i = 1; i < arguments.length; i++) {
                n[i - 1] = arguments[i];
            }
            if (t && t.isValid) {
                var o = t.getComponent($door.default);
                if (o && o.state != $door.EDoorState.DESTROY) {
                    o.beHurt(this.getAttribute($attrEnum.E_AttrType.ATK).value);
                } else {
                    var r = t.getComponent($actorBase.default);
                    if (r) {
                        for (
                            var a = r.getBeHurtPos(),
                                p = Number(this._cfg.val3),
                                d = function () {
                                    var t = a.clone();
                                    t.x += $randomUtil.RandomUtil.randomInt(-100, 100);
                                    $bulletMgr.default.instance.createBullet({
                                        parent: $battleMgr.default.instance.getCurScene().bulletParent,
                                        prefabName: "CommonEnemyBullet",
                                        initPos: y.shootPos,
                                        iconPath:
                                            "textures/bullet/BOSS421_zidan" + $randomUtil.RandomUtil.randomInt(1, 4),
                                        bulletClass: $commonEnemyBullet.default,
                                        onCreated: function (n) {
                                            n.shoot(e, t, {
                                                bulletType: 3,
                                                bezierHeight: $randomUtil.RandomUtil.randomInt(200, 300),
                                                time: 0.5,
                                                onRemove: function (t) {
                                                    if ("" != e._cfg.hitAni) {
                                                        var n = $battleMgr.default.instance.getCurScene();
                                                        $effectMgr.default.instance.createEffect({
                                                            parent: n.effectParent,
                                                            prefabName: e._cfg.hitAni,
                                                            initPos: t,
                                                            effectClass: $spAnimEffect.default,
                                                            onCreated: function (t) {
                                                                t.playOnceAllAnim();
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                },
                                y = this,
                                g = 0;
                            g < p;
                            ++g
                        ) {
                            d();
                        }
                    }
                }
            }
        };
        e.prototype.onBossTrigger = function () {
            var e = $battleMgr.default.instance.getCurScene().level.getRoomById(451);
            if (e) {
                var n = cc.v2(e.node.x + e.node.width / 2, e.getGroundY());
                n.x += $randomUtil.RandomUtil.randomInt(-200, 200);
                this.updateRoomId(451);
                this.setPos(n);
                this.enterAttackCd();
                t.prototype.onBossTrigger.call(this);
            }
        };
        e.prototype.searchTarget = function () {
            for (
                var t = $actorMgr.default.instance.queryActorByCamp($actorEnum.ETeamType.PLAYER),
                    e = this.node.getPosition(),
                    n = $battleMgr.default.instance.getCurScene(),
                    i = Number.MAX_VALUE,
                    o = null,
                    r = 0;
                r < t.length;
                r++
            ) {
                var a = t[r];
                var s = n.level.getRoomById(a.roomId);
                if (!s) {
                    return null;
                }
                var l = n.level.getRoomById(this.roomId);
                if (!l) {
                    return null;
                }
                if (!a.isDead() && a.canBeSearch() && s.layer == l.layer) {
                    var u = cc.Vec2.squaredDistance(a.node.getPosition(), e);
                    if (null == o || u < i) {
                        i = u;
                        o = a;
                    }
                }
            }
            return o;
        };
        return __decorate([A], e);
    })($enemyBase.default));
exports.default = w;
