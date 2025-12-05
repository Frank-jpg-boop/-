var i;
exports.EEnterBossViewEvent = void 0;
var a;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $spAnimCtrl = require("./SpAnimCtrl");
var $levelBattleData = require("./LevelBattleData");
var f = cc._decorator;
var d = f.ccclass;
var m = f.property;
!(function (t) {
    t.SHOW = "EEnterBossViewEvent.show";
})((a = exports.EEnterBossViewEvent || (exports.EEnterBossViewEvent = {})));
var y = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spAnimBg = null;
        e.spAnimBoss = null;
        e.spIcon = null;
        e.lBossDesc = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this.node.active = !1;
        $eventManager.EventManager.instance.on(a.SHOW, this.onEventTriggerBossInform, this);
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(a.SHOW, this.onEventTriggerBossInform, this);
    };
    e.prototype.onEventTriggerBossInform = function () {
        this.playAnim();
    };
    e.prototype.playAnim = function (t) {
        var e = this;
        if (void 0 === t) {
            t = null;
        }
        var n = $levelBattleData.levelBattleData.data.stageBossCfg;
        var i = $cfg.default.instance.dataEnemy.getById(n.id);
        if (i) {
            $resLoader.ResLoader.setSpritFrame(
                this.spIcon,
                $frameEnum.Frame.EBundleName.GAME,
                "textures/enemy_pic/" + i.bossFace
            );
            this.lBossDesc.string = i.info;
            this.node.active = !0;
            this.spAnimBg.node.active = !0;
            this.spAnimBoss.node.active = !0;
            var o = Math.max(
                this.spAnimBg.spAnim.findAnimation("BG").duration,
                this.spAnimBoss.spAnim.findAnimation("wenzi").duration
            );
            this.spAnimBg.clearAnim();
            this.spAnimBoss.clearAnim();
            this.spAnimBg.playAnim("BG", 0.6, !1);
            this.spAnimBoss.playAnim("wenzi", 0.6, !1);
            this.scheduleOnce(function () {
                e.node.active = !1;
                if (t) {
                    t();
                }
            }, o / 0.6);
        } else {
            this.node.active = !1;
        }
    };
    __decorate([m($spAnimCtrl.default)], e.prototype, "spAnimBg", void 0);
    __decorate([m($spAnimCtrl.default)], e.prototype, "spAnimBoss", void 0);
    __decorate([m(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([m(cc.Label)], e.prototype, "lBossDesc", void 0);
    return __decorate([d], e);
})(cc.Component);
exports.default = y;
