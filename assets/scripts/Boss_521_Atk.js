var i;
exports.Boss_521_Atk = void 0;
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $eBoss_521Atk = require("./EBoss_521Atk");
var $effectMgr = require("./EffectMgr");
var $actorEnum = require("./ActorEnum");
var p = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        var t = this;
        this._context.playAnimAttack(
            function () {
                t.createAtkEffect(1);
            },
            function () {
                t._context.playAnimIdle();
            }
        );
    };
    e.prototype.update = function () {};
    e.prototype.createAtkEffect = function (t) {
        var e = this;
        var n = $battleMgr.default.instance.getCurScene();
        var i = n.level.getRoomById(this._context.roomId).layer;
        var o = n.level.getRoomsByLayer(i).filter(function (t) {
            return t.cfg.isBase;
        });
        var s = n.level.getLayerPosY(i);
        if (o.length > 0) {
            var p = [];
            var h = Number.MIN_SAFE_INTEGER;
            var f = Number.MAX_SAFE_INTEGER;
            o.forEach(function (t) {
                h = Math.max(h, t.node.x + t.node.width);
                f = Math.min(f, t.node.x);
            });
            var d = this._context.node.x;
            if (t > 0) {
                for (; d < h; ) {
                    p.push(cc.v2(d, s));
                    d += 60;
                }
            } else {
                for (; d > f; ) {
                    p.push(cc.v2(d, s));
                    d -= 60;
                }
            }
            for (var m = 3; m > 0; ) {
                m--;
                if (p.length > 0) {
                    var y = $randomUtil.RandomUtil.randomInt(0, p.length);
                    p.splice(y, 1);
                }
            }
            var _ = p.length;
            var g = 0;
            p.forEach(function (t) {
                $effectMgr.default.instance.createEffect({
                    parent: n.lowEffectParent,
                    prefabName: "EBoss_521Atk",
                    initPos: t,
                    effectClass: $eBoss_521Atk.default,
                    onCreated: function (t) {
                        t.play(e._context, function () {
                            if (++g >= _) {
                                e._context.changeState($actorEnum.EActorStateType.IDLE);
                            }
                        });
                    }
                });
            });
        }
    };
    e.prototype.end = function () {
        this._context.enterAttackCd();
    };
    return e;
})($state.State);
exports.Boss_521_Atk = p;
