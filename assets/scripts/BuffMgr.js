var $buffEnum = require("./BuffEnum");
var $dizziness = require("./Dizziness");
var $easyHurt = require("./EasyHurt");
var $fire = require("./Fire");
var $frozen = require("./Frozen");
var $palsy = require("./Palsy");
var $poison = require("./Poison");
var $slowDown = require("./SlowDown");
var $speedUp = require("./SpeedUp");
var h = (function () {
    function t() {}
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.createBuff = function (t) {
        var e = null;
        switch (t.buffType) {
            case $buffEnum.EBuffType.EASY_HURT:
                e = new $easyHurt.EasyHurt();
                break;
            case $buffEnum.EBuffType.DIZZINESS:
                e = new $dizziness.Dizziness();
                break;
            case $buffEnum.EBuffType.PALSY:
                e = new $palsy.Palsy();
                break;
            case $buffEnum.EBuffType.FIRE:
                e = new $fire.Fire();
                break;
            case $buffEnum.EBuffType.SLOW_DOWN:
                e = new $slowDown.SlowDown();
                break;
            case $buffEnum.EBuffType.FROZEN:
                e = new $frozen.Frozen();
                break;
            case $buffEnum.EBuffType.POISON:
                e = new $poison.Poison();
                break;
            case $buffEnum.EBuffType.SPEED_UP:
                e = new $speedUp.SpeedUp();
                break;
            default:
                console.error("BuffMgr --> buffType error buffType = " + t.buffType);
                return null;
        }
        e.init(t);
        return e;
    };
    t._instance = null;
    return t;
})();
exports.default = h;
