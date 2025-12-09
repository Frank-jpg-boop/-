var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $actorEnum = require("./ActorEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spIcon = null;
        e.nHpView = null;
        e.anim = null;
        e.lName = null;
        e._hpLineDatas = [];
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on($battleEnum.EBattleEvent.SHOW_BOSS_HP, this.onEventEnterBoss, this);
        $eventManager.EventManager.instance.on($actorEnum.EActorEvent.BOSS_HP_CHANGE, this.onEventBossHpChange, this);
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
            this.onEventBossEnd,
            this
        );
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off($battleEnum.EBattleEvent.SHOW_BOSS_HP, this.onEventEnterBoss, this);
        $eventManager.EventManager.instance.off($actorEnum.EActorEvent.BOSS_HP_CHANGE, this.onEventBossHpChange, this);
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
            this.onEventBossEnd,
            this
        );
    };
    e.prototype.initView = function () {
        var t = $levelBattleData.levelBattleData.data.stageBossCfg;
        if (0 != t.id) {
            var e = $cfg.default.instance.dataEnemy.getById(t.id);
            this.lName.string = e.name;
            $resLoader.ResLoader.setSpritFrame(
                this.spIcon,
                $frameEnum.Frame.EBundleName.GAME,
                "textures/enemy_head/" + e.bossFace
            );
            this.nHpView.children.forEach(function (t) {
                t.children[0].getChildByName("Bar").getComponent(cc.Sprite).fillRange = 1;
            });
            this.node.active = !1;
        } else {
            this.node.active = !1;
        }
    };
    e.prototype.onEventEnterBoss = function () {
        var t = this;
        this.node.active = !0;
        this.anim.once(
            cc.Animation.EventType.FINISHED,
            function () {
                t.anim.play("BossHpLoop");
            },
            this
        );
        this.anim.play("BossHpShow", 0);
    };
    e.prototype.updateLineHp = function (t) {
        this._hpLineDatas = [];
        for (var e = 1; e >= 0; e--) {
            var n = Math.floor((1 * t) / 2);
            if (0 == e) {
                this._hpLineDatas.push({
                    min: 0,
                    max: t
                });
            } else {
                this._hpLineDatas.push({
                    min: t - n,
                    max: t
                });
            }
            t -= n;
        }
    };
    e.prototype.findLineIndex = function (t) {
        for (var e = 0; e < this._hpLineDatas.length; e++) {
            var n = this._hpLineDatas[e];
            if (n.min <= t && t <= n.max) {
                return e;
            }
        }
        return -1;
    };
    e.prototype.onEventBossHpChange = function (t, e) {
        var n = this;
        this.updateLineHp(e);
        var i = this.findLineIndex(t);
        if (-1 != i) {
            this.nHpView.children.forEach(function (e, o) {
                var r;
                var a = e.children[0].getChildByName("Bar").getComponent(cc.Sprite);
                if (
                    a.fillRange !=
                    (r =
                        o == i
                            ? (t - n._hpLineDatas[o].min) / (n._hpLineDatas[o].max - n._hpLineDatas[o].min)
                            : o > i
                            ? 1
                            : 0)
                ) {
                    cc.Tween.stopAllByTarget(a);
                    cc.tween(a)
                        .to(0.2, {
                            fillRange: r
                        })
                        .start();
                }
            });
        }
    };
    e.prototype.onEventBossEnd = function () {
        this.hideBossHp();
    };
    e.prototype.hideBossHp = function () {
        var t = this;
        this.anim.once(
            cc.Animation.EventType.FINISHED,
            function () {
                t.node.active = !1;
            },
            this
        );
        this.anim.play("BossHpHide", 0);
    };
    __decorate([m(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([m(cc.Node)], e.prototype, "nHpView", void 0);
    __decorate([m(cc.Animation)], e.prototype, "anim", void 0);
    __decorate([m(cc.Label)], e.prototype, "lName", void 0);
    return __decorate([d], e);
})(cc.Component);
exports.default = y;
