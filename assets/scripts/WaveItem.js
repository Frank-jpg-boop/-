var i;
var $cfg = require("./Cfg");
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $levelBattleData = require("./LevelBattleData");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nBar = null;
        e.nState = null;
        e._width = 0;
        e._wave = 0;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        var t = $randomUtil.RandomUtil.randomInt(100, 500);
        this._width = t - 100;
        this.nBar.children.forEach(function (e, n) {
            if (0 == n) {
                e.width = t;
            } else {
                e.width = t - 100;
            }
            e.x = -(t - 100);
        });
    };
    e.prototype.updateData = function (t) {
        this._wave = t;
        var e = $levelBattleData.levelBattleData.getWaveId(this._wave);
        var n = $cfg.default.instance.dataWave.getById(e).spe > 0;
        var i = this.nState.getChildByName("Boss");
        var o = this.nState.getChildByName("Normal");
        i.active = n;
        o.active = !n;
        if (i.active) {
            i.children[1].active = $levelBattleData.levelBattleData.curWave == this._wave;
        }
        if (o.active) {
            o.children[1].active = $levelBattleData.levelBattleData.curWave == this._wave;
        }
    };
    e.prototype.update = function () {
        var t = $battleMgr.default.instance.getCurScene();
        if (t) {
            this.node.zIndex = this.node.x;
            if (this._wave < $levelBattleData.levelBattleData.curWave) {
                this.updateBar(1);
            } else {
                if (this._wave == $levelBattleData.levelBattleData.curWave) {
                    if (0 == t.curWaveTimer) {
                        this.updateBar(0);
                    } else {
                        this.updateBar((t.curWaveTimer - t.curWaveTime) / t.curWaveTimer);
                    }
                } else {
                    this.updateBar(0);
                }
            }
        }
    };
    e.prototype.updateBar = function (t) {
        this.nBar.getChildByName("Bar").width = this._width + 100 * t;
    };
    __decorate([h(cc.Node)], e.prototype, "nBar", void 0);
    __decorate([h(cc.Node)], e.prototype, "nState", void 0);
    return __decorate([p], e);
})(cc.Component);
exports.default = f;
