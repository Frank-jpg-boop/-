var i;
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $actorEnum = require("./ActorEnum");
var $actorMgr = require("./ActorMgr");
var $enemyBase = require("./EnemyBase");
var $enemy_412_Walk = require("./Enemy_412_Walk");
var h = cc._decorator;
var f = h.ccclass;
var d =
    (h.property,
    (function (t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        __extends(e, t);
        e.prototype.registerState = function () {
            t.prototype.registerState.call(this);
            this._sm.addState($actorEnum.EActorStateType.WALK, new $enemy_412_Walk.Enemy_412_Walk(this));
        };
        e.prototype.initAnim = function () {
            this._atkAnimName = "call";
            return t.prototype.initAnim.call(this);
        };
        e.prototype.canAttackTarget = function (t) {
            if (!t || t.isDead()) {
                return !1;
            }
            var e = cc.Vec2.squaredDistance(t.node.getPosition(), this.node.getPosition());
            var n = Number(this._cfg.val1) * Number(this._cfg.val1);
            var i = Number(this._cfg.val2) * Number(this._cfg.val2);
            return e >= n && e <= i;
        };
        e.prototype.attackHit = function (t) {
            for (var e = [], n = 1; n < arguments.length; n++) {
                e[n - 1] = arguments[n];
            }
            this.summon();
        };
        e.prototype.summon = function () {
            var t = $battleMgr.default.instance.getCurScene();
            if (t) {
                var e = this._cfg.val3.split("|").map(Number);
                var n = e[$randomUtil.RandomUtil.randomInt(0, e.length)];
                var i = this.pathPos;
                this.updatePathData();
                if ("" != this._pathLineId) {
                    var o = t.level.path.getLine(this.pathLineId);
                    if (0 != o.dir.x) {
                        var r = $randomUtil.RandomUtil.randomInt(-50, 50);
                        i.x += r;
                        if (i.x >= o.maxX) {
                            i.x = o.maxX - $randomUtil.RandomUtil.randomInt(0, 50);
                        }
                        if (i.x <= o.minX) {
                            i.x = o.minX + $randomUtil.RandomUtil.randomInt(0, 50);
                        }
                    }
                }
                $actorMgr.default.instance.createActor({
                    id: t.getCreateActorId(),
                    cfgId: n,
                    camp: $actorEnum.ETeamType.ENEMY,
                    parent: t.actorParent,
                    prefabName: "Enemy_" + n,
                    initPos: i,
                    actorClass: $actorMgr.default.instance.getActorClassName(n, $actorEnum.ETeamType.ENEMY),
                    onCreated: null,
                    initParam: {
                        rewardMap: new Map(),
                        lv: this._initParam.lv,
                        showAnim: function (t, e) {
                            t.node.opacity = 0;
                            cc.tween(t.node)
                                .to(
                                    0.3,
                                    {
                                        opacity: 255
                                    },
                                    {
                                        easing: "sineIn"
                                    }
                                )
                                .call(function () {
                                    if (e) {
                                        e();
                                    }
                                })
                                .start();
                        }
                    }
                });
            }
        };
        return __decorate([f], e);
    })($enemyBase.default));
exports.default = d;
