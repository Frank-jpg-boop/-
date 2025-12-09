var i;
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $levelBattleData = require("./LevelBattleData");
var $effectBase = require("./EffectBase");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spIcon = null;
        e._owner = null;
        e._offsetPos = cc.v2(-100, 150);
        return e;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        t.prototype.onInit.call(this);
        $eventManager.EventManager.instance.on(
            $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
            this.onEventEnemyLevelUpdate,
            this
        );
    };
    e.prototype.play = function (t) {
        this._owner = t;
        var e = cc.v2(this._owner.node.x + this._offsetPos.x, this._owner.node.y + this._offsetPos.y);
        this.node.setPosition(e);
        this.updateIcon();
    };
    e.prototype.onUpdate = function () {
        if (this._owner) {
            var t = cc.v2(this._owner.node.x + this._offsetPos.x, this._owner.node.y + this._offsetPos.y);
            this.node.setPosition(t);
        }
    };
    e.prototype.updateIcon = function () {
        var t = $levelBattleData.levelBattleData.moonLvIndex;
        $resLoader.ResLoader.setSpritFrame(
            this.spIcon,
            $frameEnum.Frame.EBundleName.GAME,
            "textures/scene/common/moon_" + t
        );
    };
    e.prototype.onEventEnemyLevelUpdate = function () {
        this.updateIcon();
    };
    e.prototype.onRemove = function () {
        t.prototype.onRemove.call(this);
        $eventManager.EventManager.instance.off(
            $levelBattleData.ELevelBattleDataEvent.ENEMY_LEVEL_UPDATE,
            this.onEventEnemyLevelUpdate,
            this
        );
    };
    __decorate([f(cc.Sprite)], e.prototype, "spIcon", void 0);
    return __decorate([h], e);
})($effectBase.default);
exports.default = d;
