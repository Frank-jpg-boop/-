exports.KdTree = void 0;
var $common = require("./Common");
var $simulator = require("./Simulator");
var r = (function () {
    function t(t, e) {
        this.a = t;
        this.b = e;
    }
    t.prototype.lessThan = function (t) {
        return this.a < t.a || (!(t.a < this.a) && this.b < t.b);
    };
    t.prototype.lessEqualThan = function (t) {
        return (this.a == t.a && this.b == t.b) || this.lessThan(t);
    };
    t.prototype.bigThan = function (t) {
        return !this.lessEqualThan(t);
    };
    t.prototype.bigEqualThan = function (t) {
        return !this.lessThan(t);
    };
    return t;
})();
var a = function () {};
var s = function () {};
var c = (function () {
    function t() {
        this.MAX_LEAF_SIZE = 10;
        this.agents = null;
        this.agentTree = [];
        this.obstacleTree = null;
    }
    t.prototype.buildAgentTree = function (t) {
        if (!this.agents || this.agents.length != t) {
            this.agents = new Array(t);
            for (var e = 0; e < this.agents.length; e++) {
                this.agents[e] = $simulator.Simulator.instance.getAgent(e);
            }
            this.agentTree = new Array(2 * this.agents.length);
            for (e = 0; e < this.agentTree.length; e++) {
                this.agentTree[e] = new a();
            }
        }
        if (0 != this.agents.length) {
            this.buildAgentTreeRecursive(0, this.agents.length, 0);
        }
    };
    t.prototype.buildObstacleTree = function () {
        this.obstacleTree = new s();
        for (var t = new Array($simulator.Simulator.instance.obstacles.length), e = 0; e < t.length; e++) {
            t[e] = $simulator.Simulator.instance.obstacles[e];
        }
        this.obstacleTree = this.buildObstacleTreeRecursive(t);
    };
    t.prototype.computeAgentNeighbors = function (t, e) {
        return this.queryAgentTreeRecursive(t, e, 0);
    };
    t.prototype.computeObstacleNeighbors = function (t, e) {
        this.queryObstacleTreeRecursive(t, e, this.obstacleTree);
    };
    t.prototype.queryVisibility = function (t, e, n) {
        return this.queryVisibilityRecursive(t, e, n, this.obstacleTree);
    };
    t.prototype.buildAgentTreeRecursive = function (t, e, n) {
        this.agentTree[n].begin = t;
        this.agentTree[n].end = e;
        this.agentTree[n].minX = this.agentTree[n].maxX = this.agents[t].position_.x;
        this.agentTree[n].minY = this.agentTree[n].maxY = this.agents[t].position_.y;
        for (var i = t + 1; i < e; ++i) {
            this.agentTree[n].maxX = Math.max(this.agentTree[n].maxX, this.agents[i].position_.x);
            this.agentTree[n].minX = Math.min(this.agentTree[n].minX, this.agents[i].position_.x);
            this.agentTree[n].maxY = Math.max(this.agentTree[n].maxY, this.agents[i].position_.y);
            this.agentTree[n].minY = Math.min(this.agentTree[n].minY, this.agents[i].position_.y);
        }
        if (e - t > this.MAX_LEAF_SIZE) {
            for (
                var o =
                        this.agentTree[n].maxX - this.agentTree[n].minX >
                        this.agentTree[n].maxY - this.agentTree[n].minY,
                    r =
                        0.5 *
                        (o
                            ? this.agentTree[n].maxX + this.agentTree[n].minX
                            : this.agentTree[n].maxY + this.agentTree[n].minY),
                    a = t,
                    s = e;
                a < s;

            ) {
                for (; a < s && (o ? this.agents[a].position_.x : this.agents[a].position_.y) < r; ) {
                    ++a;
                }
                for (; s > a && (o ? this.agents[s - 1].position_.x : this.agents[s - 1].position_.y) >= r; ) {
                    --s;
                }
                if (a < s) {
                    var c = this.agents[a];
                    this.agents[a] = this.agents[s - 1];
                    this.agents[s - 1] = c;
                    ++a;
                    --s;
                }
            }
            var l = a - t;
            if (0 == l) {
                ++l;
                ++a;
                ++s;
            }
            this.agentTree[n].left = n + 1;
            this.agentTree[n].right = n + 2 * l;
            this.buildAgentTreeRecursive(t, a, this.agentTree[n].left);
            this.buildAgentTreeRecursive(a, e, this.agentTree[n].right);
        }
    };
    t.prototype.buildObstacleTreeRecursive = function (t) {
        if (0 == t.length) {
            return null;
        }
        for (var e = new s(), n = 0, a = t.length, c = a, l = 0; l < t.length; ++l) {
            for (var u = 0, p = 0, h = (A = t[l]).next, f = 0; f < t.length; f++) {
                if (l != f) {
                    var d = (M = t[f]).next;
                    var m = $common.RVOMath.leftOf(A.point, h.point, M.point);
                    var y = $common.RVOMath.leftOf(A.point, h.point, d.point);
                    if (m >= -$common.RVOMath.RVO_EPSILON && y >= -$common.RVOMath.RVO_EPSILON) {
                        ++u;
                    } else {
                        (m <= $common.RVOMath.RVO_EPSILON && y <= $common.RVOMath.RVO_EPSILON) || ++u;
                        ++p;
                    }
                    var _ = new r(Math.max(u, p), Math.min(u, p));
                    var g = new r(Math.max(a, c), Math.min(a, c));
                    if (_.bigEqualThan(g)) {
                        break;
                    }
                }
            }
            var v = new r(Math.max(u, p), Math.min(u, p));
            var b = new r(Math.max(a, c), Math.min(a, c));
            if (v.lessThan(b)) {
                a = u;
                c = p;
                n = l;
            }
        }
        for (var E = [], S = 0; S < a; ++S) {
            E.push(null);
        }
        var P = [];
        for (S = 0; S < c; ++S) {
            P.push(null);
        }
        var A;
        var w = 0;
        var C = 0;
        h = (A = t[(l = n)]).next;
        for (f = 0; f < t.length; ++f) {
            if (l != f) {
                var M;
                d = (M = t[f]).next;
                m = $common.RVOMath.leftOf(A.point, h.point, M.point);
                y = $common.RVOMath.leftOf(A.point, h.point, d.point);
                if (m >= -$common.RVOMath.RVO_EPSILON && y >= -$common.RVOMath.RVO_EPSILON) {
                    E[w++] = t[f];
                } else if (m <= $common.RVOMath.RVO_EPSILON && y <= $common.RVOMath.RVO_EPSILON) {
                    P[C++] = t[f];
                } else {
                    var I =
                        $common.RVOMath.det(h.point.minus(A.point), M.point.minus(A.point)) /
                        $common.RVOMath.det(h.point.minus(A.point), M.point.minus(d.point));
                    var R = M.point.plus(d.point.minus(M.point).scale(I));
                    var D = new $common.Obstacle();
                    D.point = R;
                    D.previous = M;
                    D.next = d;
                    D.convex = !0;
                    D.direction = M.direction;
                    D.id = $simulator.Simulator.instance.obstacles.length;
                    $simulator.Simulator.instance.obstacles.push(D);
                    M.next = D;
                    d.previous = D;
                    if (m > 0) {
                        E[w++] = M;
                        P[C++] = D;
                    } else {
                        P[C++] = M;
                        E[w++] = D;
                    }
                }
            }
        }
        e.obstacle = A;
        e.left = this.buildObstacleTreeRecursive(E);
        e.right = this.buildObstacleTreeRecursive(P);
        return e;
    };
    t.prototype.queryAgentTreeRecursive = function (t, e, n) {
        if (this.agentTree[n].end - this.agentTree[n].begin <= this.MAX_LEAF_SIZE) {
            for (var o = this.agentTree[n].begin; o < this.agentTree[n].end; ++o) {
                e = t.insertAgentNeighbor(this.agents[o], e);
            }
        } else {
            var r =
                $common.RVOMath.sqr(Math.max(0, this.agentTree[this.agentTree[n].left].minX - t.position_.x)) +
                $common.RVOMath.sqr(Math.max(0, t.position_.x - this.agentTree[this.agentTree[n].left].maxX)) +
                $common.RVOMath.sqr(Math.max(0, this.agentTree[this.agentTree[n].left].minY - t.position_.y)) +
                $common.RVOMath.sqr(Math.max(0, t.position_.y - this.agentTree[this.agentTree[n].left].maxY));
            var a =
                $common.RVOMath.sqr(Math.max(0, this.agentTree[this.agentTree[n].right].minX - t.position_.x)) +
                $common.RVOMath.sqr(Math.max(0, t.position_.x - this.agentTree[this.agentTree[n].right].maxX)) +
                $common.RVOMath.sqr(Math.max(0, this.agentTree[this.agentTree[n].right].minY - t.position_.y)) +
                $common.RVOMath.sqr(Math.max(0, t.position_.y - this.agentTree[this.agentTree[n].right].maxY));
            if (r < a) {
                if (r < e && a < (e = this.queryAgentTreeRecursive(t, e, this.agentTree[n].left))) {
                    e = this.queryAgentTreeRecursive(t, e, this.agentTree[n].right);
                }
            } else {
                if (a < e && r < (e = this.queryAgentTreeRecursive(t, e, this.agentTree[n].right))) {
                    e = this.queryAgentTreeRecursive(t, e, this.agentTree[n].left);
                }
            }
        }
        return e;
    };
    t.prototype.queryObstacleTreeRecursive = function (t, e, n) {
        if (null == n) {
            return e;
        }
        var o = n.obstacle;
        var r = o.next;
        var a = $common.RVOMath.leftOf(o.point, r.point, t.position_);
        e = this.queryObstacleTreeRecursive(t, e, a >= 0 ? n.left : n.right);
        if ($common.RVOMath.sqr(a) / $common.RVOMath.absSq(r.point.minus(o.point)) < e) {
            if (a < 0) {
                t.insertObstacleNeighbor(n.obstacle, e);
            }
            this.queryObstacleTreeRecursive(t, e, a >= 0 ? n.right : n.left);
        }
        return e;
    };
    t.prototype.queryVisibilityRecursive = function (t, e, n, o) {
        if (null == o) {
            return !0;
        }
        var r = o.obstacle;
        var a = r.next;
        var s = $common.RVOMath.leftOf(r.point, a.point, t);
        var c = $common.RVOMath.leftOf(r.point, a.point, e);
        var l = 1 / $common.RVOMath.absSq(a.point.minus(r.point));
        if (s >= 0 && c >= 0) {
            return (
                this.queryVisibilityRecursive(t, e, n, o.left) &&
                (($common.RVOMath.sqr(s) * l >= $common.RVOMath.sqr(n) &&
                    $common.RVOMath.sqr(c) * l >= $common.RVOMath.sqr(n)) ||
                    this.queryVisibilityRecursive(t, e, n, o.right))
            );
        }
        if (s <= 0 && c <= 0) {
            return (
                this.queryVisibilityRecursive(t, e, n, o.right) &&
                (($common.RVOMath.sqr(s) * l >= $common.RVOMath.sqr(n) &&
                    $common.RVOMath.sqr(c) * l >= $common.RVOMath.sqr(n)) ||
                    this.queryVisibilityRecursive(t, e, n, o.left))
            );
        }
        if (s >= 0 && c <= 0) {
            return this.queryVisibilityRecursive(t, e, n, o.left) && this.queryVisibilityRecursive(t, e, n, o.right);
        }
        var u = $common.RVOMath.leftOf(t, e, r.point);
        var p = $common.RVOMath.leftOf(t, e, a.point);
        var h = 1 / $common.RVOMath.absSq(e.minus(t));
        return (
            u * p >= 0 &&
            $common.RVOMath.sqr(u) * h > $common.RVOMath.sqr(n) &&
            $common.RVOMath.sqr(p) * h > $common.RVOMath.sqr(n) &&
            this.queryVisibilityRecursive(t, e, n, o.left) &&
            this.queryVisibilityRecursive(t, e, n, o.right)
        );
    };
    return t;
})();
exports.KdTree = c;
