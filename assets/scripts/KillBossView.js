var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $battleEnum = require("./BattleEnum");
var $levelBattleData = require("./LevelBattleData");
var h = cc._decorator;
var f = h.ccclass;
var d = h.property;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nView = null;
        e.spIcon = null;
        e.anim = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
            this.onEventBossKill,
            this
        );
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(
            $battleEnum.EBattleEvent.TRIGGER_BOSS_END_INFORM,
            this.onEventBossKill,
            this
        );
    };
    e.prototype.initView = function () {
        var t = $levelBattleData.levelBattleData.data.stageBossCfg;
        if (0 != t.id) {
            var e = $cfg.default.instance.dataEnemy.getById(t.id);
            this.nView.opacity = 0;
            this.nView.active = !1;
            $resLoader.ResLoader.setSpritFrame(
                this.spIcon,
                $frameEnum.Frame.EBundleName.GAME,
                "textures/enemy_icon/" + e.bossFace
            );
        } else {
            this.node.active = !1;
        }
    };
    e.prototype.onEventBossKill = function () {
        var t = this;
        if (this.node.active) {
            this.anim.once(
                cc.Animation.EventType.FINISHED,
                function () {
                    t.nView.active = !1;
                },
                this
            );
            this.nView.active = !0;
            this.anim.play();
        }
    };
    __decorate([d(cc.Node)], e.prototype, "nView", void 0);
    __decorate([d(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([d(cc.Animation)], e.prototype, "anim", void 0);
    return __decorate([f], e);
})(cc.Component);
exports.default = m;
