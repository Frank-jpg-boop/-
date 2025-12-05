var $eventManager = require("./EventManager");
var $battleEnum = require("./BattleEnum");
var $buffMgr = require("./BuffMgr");
var a = (function () {
    function t() {
        this.buffMap = new Map();
    }
    t.prototype.has = function (t) {
        return this.buffMap.has(t);
    };
    t.prototype.get = function (t) {
        if (this.buffMap.has(t)) {
            return this.buffMap.get(t);
        } else {
            return null;
        }
    };
    t.prototype.add = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) {
            e[n - 1] = arguments[n];
        }
        var a = null;
        if (this.buffMap.has(t.buffId)) {
            (a = this.buffMap.get(t.buffId)).again.apply(a, e);
        } else {
            a = $buffMgr.default.instance.createBuff(t);
            this.buffMap.set(t.buffId, a);
            $eventManager.EventManager.instance.emit($battleEnum.EBattleEvent.ADD_BUFF_EFFECT, t, a, e);
            a.trigger.apply(a, e);
        }
        return a;
    };
    t.prototype.remove = function (t) {
        if (this.buffMap.has(t)) {
            this.buffMap.get(t).remove();
        }
    };
    t.prototype.clear = function (t) {
        if (void 0 === t) {
            t = !0;
        }
        this.buffMap.forEach(function (e) {
            e.remove(t);
        });
        this.buffMap.clear();
    };
    t.prototype.removeAllDebuff = function () {
        this.buffMap.forEach(function (t) {
            if (t.isDebuff) {
                t.remove();
            }
        });
    };
    t.prototype.update = function (t) {
        this.buffMap.forEach(function (e) {
            e.update(t);
        });
    };
    t.prototype.reset = function () {
        this.buffMap.clear();
    };
    t.prototype.deleteBuffMap = function (t) {
        if (this.buffMap.has(t)) {
            this.buffMap.delete(t);
        }
    };
    return t;
})();
exports.default = a;
