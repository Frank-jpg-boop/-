var i;
var $eventManager = require("./EventManager");
var $levelBattleData = require("./LevelBattleData");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lValue = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(
            $levelBattleData.ELevelBattleDataEvent.GOLD_CHANGE,
            this.updateItem,
            this
        );
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(
            $levelBattleData.ELevelBattleDataEvent.GOLD_CHANGE,
            this.updateItem,
            this
        );
    };
    e.prototype.updateItem = function () {
        this.lValue.string = $levelBattleData.levelBattleData.gold.toString();
    };
    __decorate([u(cc.Label)], e.prototype, "lValue", void 0);
    return __decorate([l], e);
})(cc.Component);
exports.default = p;
