var $redPointPathConfig = require("./RedPointPathConfig");
var $redPointNode = require("./RedPointNode");
var r = (function () {
    function t() {
        this.rootNode = null;
    }
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
    t.prototype.initRedPointTree = function () {
        for (var t in ((this.rootNode = new $redPointNode.default()),
        this.rootNode.init($redPointPathConfig.redPointConf[$redPointPathConfig.ERedPointPathName.GAME].path),
        $redPointPathConfig.ERedPointPathName)) {
            var e = this.rootNode;
            var n = $redPointPathConfig.redPointConf[Number($redPointPathConfig.ERedPointPathName[t])].path.split(".");
            if (n[0] == $redPointPathConfig.redPointConf[$redPointPathConfig.ERedPointPathName.GAME].path) {
                var r = n.length;
                if (r > 1) {
                    for (var a = 1; a < r; a++) {
                        if (e) {
                            e = e.addChild(n[a]);
                        }
                    }
                }
            }
        }
    };
    t.prototype.findLastRedPoint = function (t) {
        var e = $redPointPathConfig.redPointConf[t].path.split(".");
        if (
            1 == e.length &&
            e[0] != $redPointPathConfig.redPointConf[$redPointPathConfig.ERedPointPathName.GAME].path
        ) {
            console.error("error root node " + e[0]);
            return null;
        }
        for (var n = this.rootNode, o = 1, r = e.length; o < r; o++) {
            n && (n = n.getChild(e[o]));
            if (o == r - 1) {
                return n;
            }
        }
    };
    t.prototype.registerRedPointChange = function (t, e, n) {
        var i = this.findLastRedPoint(t);
        if (i) {
            i.setNumChangeFunc(e, n);
        }
    };
    t.prototype.unRegisterRedPointChange = function (t, e) {
        var n = this.findLastRedPoint(t);
        if (n) {
            n.delNumChangeFunc(e);
        }
    };
    t.prototype.setRedPointNum = function (t, e) {
        var n = this.findLastRedPoint(t);
        if (n) {
            n.setRedPointNum(e);
        }
    };
    t._instance = null;
    return t;
})();
exports.default = r;
