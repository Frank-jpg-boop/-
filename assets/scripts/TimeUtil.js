exports.TimeUtil =
    exports.DAY_TIMESTAMPS =
    exports.HOUR_TIMESTAMPS =
    exports.MINUTE_TIMESTAMPS =
    exports.SECOND_TIMESTAMPS =
        void 0;
exports.SECOND_TIMESTAMPS = 1e3;
exports.MINUTE_TIMESTAMPS = 60 * exports.SECOND_TIMESTAMPS;
exports.HOUR_TIMESTAMPS = 60 * exports.MINUTE_TIMESTAMPS;
exports.DAY_TIMESTAMPS = 24 * exports.HOUR_TIMESTAMPS;
var i = (function () {
    function t() {}
    Object.defineProperty(t, "useLocalDate", {
        set: function (t) {
            this._useLocalDate = t;
        },
        enumerable: !1,
        configurable: !0
    });
    t.updateServerTime = function (t) {
        if (this._useLocalDate) {
            //
        } else {
            this._diff = t - new Date().getTime();
            if (t || 0 !== this._updateTime) {
                this._updateTime = t;
            } else {
                this._updateTime = new Date().getTime();
            }
        }
    };
    t.getTime = function () {
        if (this._useLocalDate || 0 === this._updateTime) {
            return new Date().getTime();
        } else {
            return new Date().getTime() + this._diff;
        }
    };
    t.getDate = function () {
        if (this._useLocalDate) {
            return new Date();
        } else {
            return new Date(this.getTime());
        }
    };
    t.getDayStartTime = function (t) {
        return new Date(t).setHours(0, 0, 0, 0);
    };
    t.getDayEndTime = function (t) {
        return new Date(t).setHours(23, 59, 59, 999);
    };
    t.getWeekEndTime = function (t) {
        var e = new Date(t).getDay();
        return this.getDayEndTime(t) + (0 === e ? 0 : (7 - e) * exports.DAY_TIMESTAMPS);
    };
    t.getMonthEndTime = function (t) {
        var e = new Date(t);
        if (11 === e.getMonth()) {
            e.setFullYear(e.getFullYear() + 1, 0, 0);
        } else {
            e.setMonth(e.getMonth() + 1, 0);
        }
        return e.setHours(23, 59, 59, 999);
    };
    t.isSameDay = function (t, e) {
        return this.getDayStartTime(t) === this.getDayStartTime(e);
    };
    t.getDiffDayNum = function (t, e) {
        var i = this.getDayStartTime(t);
        var o = this.getDayStartTime(e);
        return Math.ceil(Math.abs(i - o) / exports.DAY_TIMESTAMPS);
    };
    t.format = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) {
            e[n - 1] = arguments[n];
        }

        function i(t, e) {
            for (var n = "", i = 0; i < e; i++) {
                n += t;
            }
            return n;
        }
        for (var o = 1; o < arguments.length; o++) {
            var r = "";
            var a = !1;
            var s = " ";
            var c = 256;
            var l = (t = t.replace(/%%/g, "%$")).match(/%(?!\$)-?0?[0-9]*\.?[0-9]*[adfgs]/);
            if (!l || !(l = l[0])) {
                break;
            }
            if ("-" == (l = l.substr(1)).charAt(0)) {
                a = !0;
                l = l.substr(1);
            }
            if ("0" == l.charAt(0)) {
                s = "0";
                l = l.substr(1);
            }
            var u = l.split(/[\.adfgs]/);
            if (u.length > 2) {
                c = parseInt(u[0]);
                parseInt(u[1]);
            } else {
                if (u.length > 1) {
                    c = parseInt(u[0]);
                }
            }
            var p = function (t) {
                if (t.length > c) {
                    if (a) {
                        t = t.substr(0, c);
                    } else {
                        t = t.substr(-c);
                    }
                } else {
                    if (a) {
                        t += i(s, c - t.length);
                    } else {
                        t = i(s, c - t.length) + t;
                    }
                }
                return t;
            };
            switch (l.charAt(l.length - 1)) {
                case "d":
                case "f":
                    r = p(parseInt(arguments[o]) + "");
                    break;
                case "s":
                    r = arguments[o] ? p(arguments[o].toString()) : "";
            }
            t = t.replace(/%(?!\$)-?0?[0-9]*\.?[0-9]*[adfgs]/, r);
        }
        return t.replace(/%\$/g, "%");
    };
    t.formatMillisecond = function (t, e) {
        var n = Math.floor(t / 864e5);
        t -= 864e5 * n;
        var i = Math.floor(t / 36e5);
        t -= 36e5 * i;
        var o = Math.floor(t / 6e4);
        t -= 6e4 * o;
        var r = Math.floor(t / 1e3);
        return (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/%%/g, "%$")).replace(/%d/g, n)).replace(
            /%0h/g,
            this.format("%02d", i)
        )).replace(/%h/g, i)).replace(/%0m/g, this.format("%02d", o))).replace(/%m/g, o)).replace(
            /%0s/g,
            this.format("%02d", r)
        )).replace(/%s/g, r)).replace(/%\$/g, "%");
    };
    t.format_HHMMSS = function (t) {
        var e = Math.floor(t / 1e3);
        return (
            (Array(2).join("0") + Math.floor(e / 3600)).slice(-2) +
            ":" +
            (Array(2).join("0") + Math.floor((e % 3600) / 60)).slice(-2) +
            ":" +
            (Array(2).join("0") + (Math.floor(e) % 60)).slice(-2)
        );
    };
    t.format_HHMM = function (t) {
        var e = Math.floor(t / 1e3);
        return (
            (Array(2).join("0") + Math.floor(e / 3600)).slice(-2) +
            ":" +
            (Array(2).join("0") + Math.floor((e % 3600) / 60)).slice(-2)
        );
    };
    t.format_MMSS = function (t) {
        var e = Math.floor(t / 1e3);
        return (
            (Array(2).join("0") + Math.floor(e / 60)).slice(-2) +
            ":" +
            (Array(2).join("0") + (Math.floor(e) % 60)).slice(-2)
        );
    };
    t.getTomorrowZeroDate = function () {
        var t = new Date(this.getTime());
        t.setDate(t.getDate() + 1);
        t.setHours(0);
        t.setMinutes(0);
        t.setSeconds(0);
        return t;
    };
    t.getNextMonthZeroDate = function () {
        var t = new Date(this.getTime());
        t.setMonth(t.getMonth() + 1);
        t.setDate(1);
        t.setHours(0);
        t.setMinutes(0);
        t.setSeconds(0);
        return t;
    };
    t.getNextMondayDate = function () {
        var t = new Date();
        t.setHours(0);
        t.setMinutes(0);
        t.setSeconds(0);
        var e = (t.getDay() || 7) - 7;
        return new Date(t.getTime() - 864e5 * (e - 1));
    };
    t._diff = 0;
    t._updateTime = 0;
    t._useLocalDate = !1;
    return t;
})();
exports.TimeUtil = i;
