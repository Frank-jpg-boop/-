var $priorityQueue = require("./PriorityQueue");
var $removeDeepFromMap = require("./removeDeepFromMap");
var $toDeepMap = require("./toDeepMap");
var $validateDeep = require("./validateDeep");
var a = (function () {
    function t(t) {
        if (t instanceof Map) {
            $validateDeep(t);
            this.graph = t;
        } else {
            if (t) {
                this.graph = $toDeepMap(t);
            } else {
                this.graph = new Map();
            }
        }
    }
    var e = t.prototype;
    e.addNode = function (t, e) {
        var n;
        if (e instanceof Map) {
            $validateDeep(e);
            n = e;
        } else {
            n = $toDeepMap(e);
        }
        this.graph.set(t, n);
        return this;
    };
    e.addVertex = function (t, e) {
        return this.addNode(t, e);
    };
    e.removeNode = function (t) {
        this.graph = $removeDeepFromMap(this.graph, t);
        return this;
    };
    e.path = function (t, e, i) {
        var o = this;
        if (void 0 === i) {
            i = {};
        }
        if (!this.graph.size) {
            if (i.cost) {
                return {
                    path: null,
                    cost: 0
                };
            } else {
                return null;
            }
        }
        var r = new Set();
        var a = new $priorityQueue();
        var s = new Map();
        var c = [];
        var l = 0;
        var u = [];
        if (i.avoid) {
            u = [].concat(i.avoid);
        }
        if (u.includes(t)) {
            throw new Error("Starting node (" + t + ") cannot be avoided");
        }
        if (u.includes(e)) {
            throw new Error("Ending node (" + e + ") cannot be avoided");
        }
        a.set(t, 0);
        for (
            var p = function () {
                var t = a.next();
                if (t.key === e) {
                    l = t.priority;
                    for (var n = t.key; s.has(n); ) {
                        c.push(n);
                        n = s.get(n);
                    }
                    return "break";
                }
                r.add(t.key);
                (o.graph.get(t.key) || new Map()).forEach(function (e, n) {
                    if (r.has(n) || u.includes(n)) {
                        return null;
                    }
                    if (!a.has(n)) {
                        s.set(n, t.key);
                        return a.set(n, t.priority + e);
                    }
                    var i = a.get(n).priority;
                    var o = t.priority + e;
                    if (o < i) {
                        return s.set(n, t.key), a.set(n, o);
                    } else {
                        return null;
                    }
                });
            };
            !a.isEmpty() && "break" !== p();

        ) {}
        if (c.length) {
            return (
                i.trim ? c.shift() : (c = c.concat([t])),
                i.reverse || (c = c.reverse()),
                i.cost
                    ? {
                          path: c,
                          cost: l
                      }
                    : c
            );
        } else {
            if (i.cost) {
                return {
                    path: null,
                    cost: 0
                };
            } else {
                return null;
            }
        }
    };
    e.shortestPath = function () {
        return this.path.apply(this, arguments);
    };
    return t;
})();
module.exports = a;
