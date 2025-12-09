var i;
exports.Boss_621_Walk = void 0;
var $randomUtil = require("./RandomUtil");
var $nodeUtil = require("./NodeUtil");
var $battleMgr = require("./BattleMgr");
var $bulletMgr = require("./BulletMgr");
var $commonEnemyBullet = require("./CommonEnemyBullet");
var $state = require("./State");
var $spAnimCtrl = require("./SpAnimCtrl");
var $effectMgr = require("./EffectMgr");
var $spAnimEffect = require("./SpAnimEffect");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var y = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._targetPos = null;
        n._targetPosRefreshTime = 0;
        n._targetPosRefreshInterval = 5;
        n._isAppear = !1;
        n._appearTime = 0;
        n._appearInterval = 0.5;
        n._isDisAppearing = !1;
        n._stateType = $actorEnum.EActorStateType.WALK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._isAppear = !1;
        this._context.playAnimWalk();
        this.updateTargetPos();
        this.appearCommonAtk();
    };
    e.prototype.updateTargetPos = function () {
        var t = this._context.searchTarget();
        if (t) {
            var e = $randomUtil.RandomUtil.randomInt(this._context.minRange, this._context.maxRange);
            var n =
                ($randomUtil.RandomUtil.randomInt(this._context.rangeAngles[0], this._context.rangeAngles[1]) *
                    Math.PI) /
                180;
            var i = t.node.getPosition();
            this._targetPos = cc.v2(i.x + e * Math.cos(n), i.y + e * Math.sin(n));
            this._targetPosRefreshTime = this._targetPosRefreshInterval;
        }
    };
    e.prototype.update = function (t) {
        var e = this;
        if (this._isAppear) {
            this._appearTime -= t;
            if (this._appearTime <= 0) {
                this._appearTime = this._appearInterval;
                this.shootBullet();
            }
        }
        if (
            !this._isDisAppearing &&
            this._context.isTrigger &&
            ((this._targetPosRefreshTime -= t),
            this._targetPosRefreshTime <= 0 && this.updateTargetPos(),
            this._targetPos)
        ) {
            var n = this._context.node.getPosition();
            if (this._targetPos.fuzzyEquals(n, 5)) {
                var i = this._context.searchTarget();
                if (i && this._context.canAttackTarget(i)) {
                    if (this._context.canAttack()) {
                        return void this.disappearCommonAtk(function () {
                            e._context.changeState($actorEnum.EActorStateType.ATTACK, i.node);
                        });
                    }
                    this._context.setDirX(i.node.x > this._context.node.x);
                }
                return;
            }
            var o = this._targetPos.sub(n);
            var r = o.normalize();
            var a = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
            var s = r.mul(a * t);
            if (s.len() > o.len()) {
                s.x = o.x;
                s.y = o.y;
            }
            this._context.setPos(n.add(s));
            this._context.setDirX(r.x > 0);
        }
    };
    e.prototype.shootBullet = function () {
        var t = this;
        var e = this._context.spAnimCommonAtk.node.getChildByName("FireAnim");
        e.active = !0;
        var n = e.getComponent($spAnimCtrl.default);
        n.clearAnim();
        n.playAnim("skin" + this._context.skinId + "_atk", 1, !1, function () {
            n.node.active = !1;
        });
        for (
            var i = $nodeUtil.default.nodeParentChangeLocalPos(
                    e,
                    $battleMgr.default.instance.getCurScene().bulletParent
                ),
                o = function (e) {
                    var n = (36 * e * Math.PI) / 180;
                    var o = i.add(cc.v2(Math.cos(n), Math.sin(n)).mul(500));
                    $bulletMgr.default.instance.createBullet({
                        parent: $battleMgr.default.instance.getCurScene().bulletParent,
                        prefabName: "CommonEnemyBullet",
                        initPos: i,
                        iconPath: "textures/bullet/BOSS621_zaidan" + r._context.skinId,
                        bulletClass: $commonEnemyBullet.default,
                        onCreated: function (e) {
                            e.shoot(t._context, o, {
                                bulletType: 2,
                                bezierHeight: 0,
                                onRemove: function (e) {
                                    $effectMgr.default.instance.createEffect({
                                        parent: $battleMgr.default.instance.getCurScene().effectParent,
                                        prefabName: "EBoss_621Hurt",
                                        initPos: e,
                                        effectClass: $spAnimEffect.default,
                                        onCreated: function (e) {
                                            e.playDefaultAnim("skin" + t._context.skinId + "_hit", 1, !1);
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
                r = this,
                u = 0;
            u < 10;
            u++
        ) {
            o(u);
        }
    };
    e.prototype.end = function () {
        this._isDisAppearing = !1;
        this._context.spAnimCommonAtk.node.active = !1;
    };
    e.prototype.appearCommonAtk = function () {
        var t = this;
        this._context.spAnimCommonAtk.node.active = !0;
        this._context.spAnimCommonAtk.playAnim("skin" + this._context.skinId + "_appear", 1, !1, function () {
            t._isAppear = !0;
            t._context.spAnimCommonAtk.playAnim("skin" + t._context.skinId + "_stand", 1, !0);
        });
    };
    e.prototype.disappearCommonAtk = function (t) {
        var e = this;
        this._isDisAppearing = !0;
        this._context.spAnimCommonAtk.playAnim("skin" + this._context.skinId + "_disappear", 1, !1, function () {
            e._isAppear = !1;
            e._context.spAnimCommonAtk.node.active = !1;
            e._isDisAppearing = !1;
            if (t) {
                t();
            }
        });
    };
    return e;
})($state.State);
exports.Boss_621_Walk = y;
