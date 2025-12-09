var $redPointPathConfig = require("./RedPointPathConfig");
var o = (function () {
    function t() {
        this._nodeName = "";
        this._redPointNum = 0;
        this.parent = null;
        this.dictChilds = new Map();
        this.numChangeFuncMap = new Map();
    }
    t.prototype.init = function (t) {
        this._nodeName = t;
        this.numChangeFuncMap.clear();
    };
    Object.defineProperty(t.prototype, "nodeName", {
        get: function () {
            return this._nodeName;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "redPointNum", {
        get: function () {
            return this._redPointNum;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.addChild = function (e) {
        if (this.dictChilds.has(e)) {
            return this.dictChilds.get(e);
        }
        var n = new t();
        n._nodeName = e;
        n.parent = this;
        this.dictChilds.set(e, n);
        return n;
    };
    t.prototype.getChild = function (t) {
        if (this.dictChilds.has(t)) {
            return this.dictChilds.get(t);
        } else {
            return null;
        }
    };
    t.prototype.setNumChangeFunc = function (t, e) {
        this.numChangeFuncMap.set(e, t);
        if (t) {
            t.call(e, this);
        }
    };
    t.prototype.delNumChangeFunc = function (t) {
        this.numChangeFuncMap.delete(t);
    };
    t.prototype.setRedPointNum = function (t) {
        var e = this;
        if (e.dictChilds.size > 0) {
            //
        } else {
            if (e._redPointNum != t) {
                e._redPointNum = t;
                e.notyfyRedPointNumChange();
                if (e.parent) {
                    e.parent.changeParentRedPointNum();
                }
            }
        }
    };
    t.prototype.changeParentRedPointNum = function () {
        var t = this;
        if (t._nodeName != $redPointPathConfig.redPointConf[$redPointPathConfig.ERedPointPathName.GAME].path) {
            var e = 0;
            t.dictChilds.forEach(function (t) {
                e += t._redPointNum;
            });
            if (e != t._redPointNum) {
                t._redPointNum = e;
                t.notyfyRedPointNumChange();
                if (t.parent) {
                    t.parent.changeParentRedPointNum();
                }
            }
        }
    };
    t.prototype.notyfyRedPointNumChange = function () {
        var t = this;
        t.numChangeFuncMap.forEach(function (e, n) {
            if (e) {
                e.call(n, t);
            }
        });
    };
    return t;
})();
exports.default = o;
