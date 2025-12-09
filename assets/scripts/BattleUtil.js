exports.BattleUtil = void 0;
var i = (function () {
    function t() {}
    t.lerp = function (t, e, n) {
        return t + (e - t) * n;
    };
    t.randomRangeInt = function (t, e) {
        e = 0 | +e;
        return (t = 0 | +t) + Math.floor(Math.random() * (e - t));
    };
    t.randomRangeFloat = function (t, e) {
        return Math.random() * (e - t) + t;
    };
    t.getPerpendicularVector = function (t, e) {
        return cc.v2(-t.y, t.x).add(e);
    };
    return t;
})();
exports.BattleUtil = i;
