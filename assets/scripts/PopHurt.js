var i;
var $nodePoolManager = require("./NodePoolManager");
var $mathUtil = require("./MathUtil");
var $battleMgr = require("./BattleMgr");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lHurt = null;
        e.lCirt = null;
        e.nPop = null;
        e.popId = "";
        e.isNeedCrush = !1;
        e.isBattleRemove = !1;
        e.time = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.popup = function (t, e, n, i) {
        this.isBattleRemove = !1;
        this.time = 0;
        this.popId = i;
        this.nPop.y = 0;
        this.nPop.scale = 1;
        this.nPop.opacity = 255;
        if (n == $battleEnum.EBattlePopHurtType.CRIT) {
            this.lCirt.node.active = !0;
            this.lHurt.node.active = !1;
            this.lCirt.string = $mathUtil.MathUtil.formatValue(e);
            this.crush();
            this.isNeedCrush = !0;
        } else if (n == $battleEnum.EBattlePopHurtType.COMMON) {
            this.lCirt.node.active = !1;
            this.lHurt.node.active = !0;
            if (t == $actorEnum.EActorType.ENEMY) {
                this.lHurt.node.color = cc.Color.RED;
            } else {
                this.lHurt.node.color = cc.Color.WHITE;
            }
            var o = $mathUtil.MathUtil.formatValue(e);
            if (this.lHurt.node.active) {
                this.lHurt.string = o;
            }
            this.crush();
            this.isNeedCrush = !0;
        } else {
            if (n == $battleEnum.EBattlePopHurtType.RECOVER) {
                this.lCirt.node.active = !1;
                this.lHurt.node.active = !0;
                this.lHurt.node.color = cc.Color.GREEN;
                this.lHurt.string = "+" + $mathUtil.MathUtil.formatValue(e);
            } else {
                this.lCirt.node.active = !1;
                this.lHurt.node.active = !0;
            }
        }
        this.playAnim(n);
    };
    e.prototype.crush = function () {
        for (
            var t = $battleMgr.default.instance.getCurScene().getPopHurts(this.popId), e = 0, n = t.length - 1;
            e < n;
            ++e
        ) {
            t[e].node.y += 20;
        }
    };
    e.prototype.update = function (t) {
        if (!this.isBattleRemove && this.isNeedCrush) {
            this.time += t;
            if (this.time > 1) {
                this.isBattleRemove = !0;
                $battleMgr.default.instance.getCurScene().removePopHurt(this.popId, this);
            }
        }
    };
    e.prototype.playAnim = function (t) {
        var e = this;
        if (t != $battleEnum.EBattlePopHurtType.COMMON) {
            if (t != $battleEnum.EBattlePopHurtType.CRIT) {
                (t != $battleEnum.EBattlePopHurtType.RECOVER && t != $battleEnum.EBattlePopHurtType.EVASION) ||
                    cc
                        .tween(this.nPop)
                        .by(0.4, {
                            y: 60
                        })
                        .call(function () {
                            e.remove();
                        })
                        .start();
            } else {
                cc.tween(this.nPop)
                    .to(
                        0.1,
                        {
                            scale: 1.6
                        },
                        {
                            easing: "backOut"
                        }
                    )
                    .to(0.05, {
                        scale: 1
                    })
                    .delay(0.05)
                    .to(0.2, {
                        y: 20
                    })
                    .parallel(
                        cc.tween().by(0.4, {
                            y: 20
                        }),
                        cc.tween().to(0.3, {
                            opacity: 0
                        })
                    )
                    .call(function () {
                        e.remove();
                    })
                    .start();
            }
        } else {
            cc.tween(this.nPop)
                .to(
                    0.1,
                    {
                        scale: 1.4
                    },
                    {
                        easing: "backOut"
                    }
                )
                .to(0.05, {
                    scale: 1
                })
                .delay(0.05)
                .to(0.2, {
                    y: 20
                })
                .parallel(
                    cc.tween().by(0.4, {
                        y: 20
                    }),
                    cc.tween().to(0.3, {
                        opacity: 0
                    })
                )
                .call(function () {
                    e.remove();
                })
                .start();
        }
    };
    e.prototype.remove = function () {
        cc.Tween.stopAllByTarget(this.nPop);
        if (this.isNeedCrush && !this.isBattleRemove) {
            var t = $battleMgr.default.instance.getCurScene();
            if (t) {
                t.removePopHurt(this.popId, this);
            }
        }
        $nodePoolManager.default.instance.putNode(this.node, !0);
    };
    e.prototype.onDestroy = function () {
        cc.Tween.stopAllByTarget(this.nPop);
    };
    __decorate([f(cc.Label)], e.prototype, "lHurt", void 0);
    __decorate([f(cc.Label)], e.prototype, "lCirt", void 0);
    __decorate([f(cc.Node)], e.prototype, "nPop", void 0);
    return __decorate([h], e);
})(cc.Component);
exports.default = d;
