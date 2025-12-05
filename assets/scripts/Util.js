var i = (function () {
    function t() {}
    t.numToString = function (e) {
        if (t._numToStringMap.has(e)) {
            return t._numToStringMap.get(e);
        } else {
            return "";
        }
    };
    t.getClassName = function (e) {
        if ("function" == typeof e) {
            var n = e.prototype;
            if (n && n.hasOwnProperty("__classname__") && n.__classname__) {
                return n.__classname__;
            }
            var i = "";
            if (e.name) {
                i = e.name;
            }
            if (e.toString) {
                var o;
                var r = e.toString();
                if (
                    (o = "[" === r.charAt(0) ? r.match(/\[\w+\s*(\w+)\]/) : r.match(/function\s*(\w+)/)) &&
                    2 === o.length
                ) {
                    i = o[1];
                }
            }
            if ("Object" !== i) {
                return i;
            } else {
                return "";
            }
        }
        if (e && e.constructor) {
            return t.getClassName(e.constructor);
        } else {
            return "";
        }
    };
    t.delay = function (t, e, n) {
        var i = setTimeout(function () {
            clearTimeout(i);
            if (e) {
                e.call(n);
            }
        }, 1e3 * t);
        return i;
    };
    t.promiseDelay = function (t, e, n) {
        return new Promise(function (i) {
            var o = setTimeout(function () {
                clearTimeout(o);
                if (e) {
                    e.call(n);
                }
                i();
            }, 1e3 * t);
        });
    };
    t.getRandomColor = function () {
        var t = Math.floor(256 * Math.random());
        var e = Math.floor(256 * Math.random());
        var n = Math.floor(256 * Math.random());
        return cc.color(t, e, n);
    };
    t._numToStringMap = new Map([
        [0, "零"],
        [1, "一"],
        [2, "二"],
        [3, "三"],
        [4, "四"],
        [5, "五"],
        [6, "六"],
        [7, "七"],
        [8, "八"],
        [9, "九"],
        [10, "十"],
        [11, "十一"],
        [12, "十二"],
        [13, "十三"],
        [14, "十四"],
        [15, "十五"],
        [16, "十六"],
        [17, "十七"],
        [18, "十八"],
        [19, "十九"],
        [20, "二十"],
        [21, "二十一"],
        [22, "二十二"],
        [23, "二十三"],
        [24, "二十四"],
        [25, "二十五"],
        [26, "二十六"],
        [27, "二十七"],
        [28, "二十八"],
        [29, "二十九"],
        [30, "三十"]
    ]);
    return t;
})();
exports.default = i;
