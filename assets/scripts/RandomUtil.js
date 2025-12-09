exports.RandomUtil = void 0;
(function (t) {
    var e = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ];

    function n(t, e) {
        if (null == e) {
            e = t;
            t = 0;
        }
        if (null == e) {
            e = 1;
        }
        return t + Math.random() * (e - t);
    }

    function i(t, e) {
        return Math.floor(n(t, e));
    }
    t.random = n;
    t.randomInt = i;
    t.randomWord = function (t, n) {
        if (void 0 === n) {
            n = !1;
        }
        for (var o = "", r = 0; r < t; r++) {
            if (n && 0 === r) {
                o += e[10 + i(e.length - 10)];
            } else {
                o += e[i(e.length)];
            }
        }
        return o;
    };
    t.randomArray = function (t) {
        for (var e = 0, i = 0; i < t.length; i++) {
            e += t[i];
        }
        var o = n(e);
        var r = 0;
        for (i = 0; i < t.length; i++) {
            if (o < (r += t[i])) {
                return i;
            }
        }
        return -1;
    };
})(exports.RandomUtil || (exports.RandomUtil = {}));
