exports.Agent = void 0;
var $common = require("./Common");
var o = (function () {
    function t() {
        this.agentNeighbors_ = [];
        this.obstaclNeighbors_ = [];
        this.orcaLines_ = [];
        this.position_ = new $common.Vector2(0, 0);
        this.prefVelocity_ = new $common.Vector2(0, 0);
        this.velocity_ = new $common.Vector2(0, 0);
        this.id = 0;
        this.maxNeighbors_ = 0;
        this.maxSpeed_ = 0;
        this._neighborDist = 0;
        this.radius_ = 0;
        this.timeHorizon = 0;
        this.timeHorizonObst = 0;
        this.newVelocity_ = new $common.Vector2(0, 0);
        this.mass = 1;
    }
    Object.defineProperty(t.prototype, "neighborDist", {
        get: function () {
            return this._neighborDist;
        },
        set: function (t) {
            this._neighborDist = t;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.computeNeighbors = function (t) {
        this.obstaclNeighbors_.length = 0;
        var e = Math.pow(this.timeHorizonObst * this.maxSpeed_ + this.radius_, 2);
        t.kdTree.computeObstacleNeighbors(this, e);
        this.agentNeighbors_.length = 0;
        if (this.maxNeighbors_ > 0) {
            e = Math.pow(this.neighborDist, 2);
            e = t.kdTree.computeAgentNeighbors(this, e);
        }
    };
    t.prototype.computeNewVelocity = function (t) {
        this.orcaLines_.length = 0;
        for (var e = this.orcaLines_, n = 1 / this.timeHorizonObst, o = 0; o < this.obstaclNeighbors_.length; ++o) {
            for (
                var r = this.obstaclNeighbors_[o].value,
                    a = r.next,
                    s = r.point.minus(this.position_),
                    c = a.point.minus(this.position_),
                    l = !1,
                    u = 0;
                u < e.length;
                ++u
            ) {
                if (
                    $common.RVOMath.det(s.scale(n).minus(e[u].point), e[u].direction) - n * this.radius_ >=
                        -$common.RVOMath.RVO_EPSILON &&
                    $common.RVOMath.det(c.scale(n).minus(e[u].point), e[u].direction) - n * this.radius_ >=
                        -$common.RVOMath.RVO_EPSILON
                ) {
                    l = !0;
                    break;
                }
            }
            if (!l) {
                var p = $common.RVOMath.absSq(s);
                var h = $common.RVOMath.absSq(c);
                var f = $common.RVOMath.sqr(this.radius_);
                var d = a.point.minus(r.point);
                var m = s.scale(-1).multiply(d) / $common.RVOMath.absSq(d);
                var y = $common.RVOMath.absSq(s.scale(-1).minus(d.scale(m)));
                var _ = new $common.Line();
                if (m < 0 && p <= f) {
                    if (r.convex) {
                        _.point = new $common.Vector2(0, 0);
                        _.direction = $common.RVOMath.normalize(new $common.Vector2(-s.y, s.x));
                        e.push(_);
                    }
                } else if (m > 1 && h <= f) {
                    if (a.convex && $common.RVOMath.det(c, a.direction) >= 0) {
                        _.point = new $common.Vector2(0, 0);
                        _.direction = $common.RVOMath.normalize(new $common.Vector2(-c.y, c.x));
                        e.push(_);
                    }
                } else if (m >= 0 && m <= 1 && y <= f) {
                    _.point = new $common.Vector2(0, 0);
                    _.direction = r.direction.scale(-1);
                    e.push(_);
                } else {
                    var g = void 0;
                    var v = void 0;
                    if (m < 0 && y <= f) {
                        if (!r.convex) {
                            continue;
                        }
                        a = r;
                        var b = Math.sqrt(p - f);
                        g = new $common.Vector2(s.x * b - s.y * this.radius_, s.x * this.radius_ + s.y * b).scale(
                            1 / p
                        );
                        v = new $common.Vector2(s.x * b + s.y * this.radius_, -s.x * this.radius_ + s.y * b).scale(
                            1 / p
                        );
                    } else if (m > 1 && y <= f) {
                        if (!a.convex) {
                            continue;
                        }
                        r = a;
                        var E = Math.sqrt(h - f);
                        g = new $common.Vector2(c.x * E - c.y * this.radius_, c.x * this.radius_ + c.y * E).scale(
                            1 / h
                        );
                        v = new $common.Vector2(c.x * E + c.y * this.radius_, -c.x * this.radius_ + c.y * E).scale(
                            1 / h
                        );
                    } else {
                        if (r.convex) {
                            (b = Math.sqrt(p - f)),
                                (g = new $common.Vector2(
                                    s.x * b - s.y * this.radius_,
                                    s.x * this.radius_ + s.y * b
                                ).scale(1 / p));
                        } else {
                            g = r.direction.scale(-1);
                        }
                        if (a.convex) {
                            (E = Math.sqrt(h - f)),
                                (v = new $common.Vector2(
                                    c.x * E + c.y * this.radius_,
                                    -c.x * this.radius_ + c.y * E
                                ).scale(1 / h));
                        } else {
                            v = r.direction;
                        }
                    }
                    var S = r.previous;
                    var P = !1;
                    var A = !1;
                    if (r.convex && $common.RVOMath.det(g, S.direction.scale(-1)) >= 0) {
                        g = S.direction.scale(-1);
                        P = !0;
                    }
                    if (a.convex && $common.RVOMath.det(v, a.direction) <= 0) {
                        v = a.direction;
                        A = !0;
                    }
                    var w = r.point.minus(this.position_).scale(n);
                    var C = a.point.minus(this.position_).scale(n);
                    var M = C.minus(w);
                    var I = null;
                    if (r == a) {
                        I = 0.5;
                    } else {
                        I = this.velocity_.minus(w).multiply(M) / $common.RVOMath.absSq(M);
                    }
                    var R = this.velocity_.minus(w).multiply(g);
                    var D = this.velocity_.minus(C).multiply(v);
                    if ((I < 0 && R < 0) || (r == a && R < 0 && D < 0)) {
                        var T = $common.RVOMath.normalize(this.velocity_.minus(w));
                        _.direction = new $common.Vector2(T.y, -T.x);
                        _.point = w.plus(T.scale(this.radius_ * n));
                        e.push(_);
                    } else if (I > 1 && D < 0) {
                        T = $common.RVOMath.normalize(this.velocity_.minus(C));
                        _.direction = new $common.Vector2(T.y, -T.x);
                        _.point = C.plus(T.scale(this.radius_ * n));
                        e.push(_);
                    } else {
                        var B = null;
                        if (I < 0 || I > 1 || r == a) {
                            B = 1 / 0;
                        } else {
                            B = $common.RVOMath.absSq(this.velocity_.minus(M.scale(I).plus(w)));
                        }
                        var O = null;
                        if (R < 0) {
                            O = 1 / 0;
                        } else {
                            O = $common.RVOMath.absSq(this.velocity_.minus(g.scale(R).plus(w)));
                        }
                        var x = null;
                        if (D < 0) {
                            x = 1 / 0;
                        } else {
                            x = $common.RVOMath.absSq(this.velocity_.minus(v.scale(D).plus(C)));
                        }
                        if (B <= O && B <= x) {
                            _.direction = r.direction.scale(-1);
                            var k = new $common.Vector2(-_.direction.y, _.direction.x);
                            _.point = k.scale(this.radius_ * n).plus(w);
                            e.push(_);
                        } else if (O <= x) {
                            if (P) {
                                continue;
                            }
                            _.direction = g;
                            k = new $common.Vector2(-_.direction.y, _.direction.x);
                            _.point = k.scale(this.radius_ * n).plus(w);
                            e.push(_);
                        } else {
                            if (A) {
                                //
                            } else {
                                _.direction = v.scale(-1);
                                k = new $common.Vector2(-_.direction.y, _.direction.x);
                                _.point = k.scale(this.radius_ * n).plus(C);
                                e.push(_);
                            }
                        }
                    }
                }
            }
        }
        var N = e.length;
        var L = 1 / this.timeHorizon;
        for (o = 0; o < this.agentNeighbors_.length; ++o) {
            var j = this.agentNeighbors_[o].value;
            var U = j.position_.minus(this.position_);
            var F = j.mass / (this.mass + j.mass);
            var G = this.mass / (this.mass + j.mass);
            var V = null;
            if (F >= 0.5) {
                V = this.velocity_.minus(this.velocity_.scale(F)).scale(2);
            } else {
                V = this.prefVelocity_.plus(this.velocity_.minus(this.prefVelocity_).scale(2 * F));
            }
            var H = null;
            if (G >= 0.5) {
                H = j.velocity_.scale(2).scale(1 - G);
            } else {
                H = j.prefVelocity_.plus(j.velocity_.minus(j.prefVelocity_).scale(2 * G));
            }
            var W = V.minus(H);
            var q = $common.RVOMath.absSq(U);
            var z = this.radius_ + j.radius_;
            var K = $common.RVOMath.sqr(z);
            var Y = void (_ = new $common.Line());
            if (q > K) {
                var X = W.minus(U.scale(L));
                var Z = $common.RVOMath.absSq(X);
                var J = X.multiply(U);
                if (J < 0 && $common.RVOMath.sqr(J) > K * Z) {
                    var Q = Math.sqrt(Z);
                    T = X.scale(1 / Q);
                    _.direction = new $common.Vector2(T.y, -T.x);
                    Y = T.scale(z * L - Q);
                } else {
                    var $ = Math.sqrt(q - K);
                    if ($common.RVOMath.det(U, X) > 0) {
                        k = new $common.Vector2(U.x * $ - U.y * z, U.x * z + U.y * $);
                        _.direction = k.scale(1 / q);
                    } else {
                        k = new $common.Vector2(U.x * $ + U.y * z, -U.x * z + U.y * $);
                        _.direction = k.scale(-1 / q);
                    }
                    var tt = W.multiply(_.direction);
                    Y = _.direction.scale(tt).minus(W);
                }
            } else {
                var et = 1 / t;
                X = W.minus(U.scale(et));
                Q = $common.RVOMath.abs(X);
                T = X.scale(1 / Q);
                _.direction = new $common.Vector2(T.y, -T.x);
                Y = T.scale(z * et - Q);
            }
            _.point = V.plus(Y.scale(F));
            e.push(_);
        }
        var nt = this.linearProgram2(e, this.maxSpeed_, this.prefVelocity_, !1, this.newVelocity_);
        if (nt < e.length) {
            this.linearProgram3(e, N, nt, this.maxSpeed_, this.newVelocity_);
        }
    };
    t.prototype.insertAgentNeighbor = function (t, e) {
        if (this != t) {
            var n = $common.RVOMath.absSq(this.position_.minus(t.position_));
            if (n < e) {
                if (this.agentNeighbors_.length < this.maxNeighbors_) {
                    this.agentNeighbors_.push(new $common.KeyValuePair(n, t));
                }
                for (var o = this.agentNeighbors_.length - 1; 0 != o && n < this.agentNeighbors_[o - 1].key; ) {
                    this.agentNeighbors_[o] = this.agentNeighbors_[o - 1];
                    --o;
                }
                this.agentNeighbors_[o] = new $common.KeyValuePair(n, t);
                if (this.agentNeighbors_.length == this.maxNeighbors_) {
                    e = this.agentNeighbors_[this.agentNeighbors_.length - 1].key;
                }
            }
        }
        return e;
    };
    t.prototype.insertObstacleNeighbor = function (t, e) {
        var n = t.next;
        var o = $common.RVOMath.distSqPointLineSegment(t.point, n.point, this.position_);
        if (o < e) {
            this.obstaclNeighbors_.push(new $common.KeyValuePair(o, t));
            for (var r = this.obstaclNeighbors_.length - 1; 0 != r && o < this.obstaclNeighbors_[r - 1].key; ) {
                this.obstaclNeighbors_[r] = this.obstaclNeighbors_[r - 1];
                --r;
            }
            this.obstaclNeighbors_[r] = new $common.KeyValuePair(o, t);
        }
    };
    t.prototype.update = function (t) {
        this.velocity_.copy(this.newVelocity_);
        this.position_.copy(this.position_.plus(this.velocity_.scale(t)));
    };
    t.prototype.linearProgram1 = function (t, e, n, o, r, a) {
        var s = t[e].point.multiply(t[e].direction);
        var c = $common.RVOMath.sqr(s) + $common.RVOMath.sqr(n) - $common.RVOMath.absSq(t[e].point);
        if (c < 0) {
            return !1;
        }
        for (var l = Math.sqrt(c), u = -s - l, p = -s + l, h = 0; h < e; ++h) {
            var f = $common.RVOMath.det(t[e].direction, t[h].direction);
            var d = $common.RVOMath.det(t[h].direction, t[e].point.minus(t[h].point));
            if (Math.abs(f) <= $common.RVOMath.RVO_EPSILON) {
                if (d < 0) {
                    return !1;
                }
            } else {
                var m = d / f;
                if (f >= 0) {
                    p = Math.min(p, m);
                } else {
                    u = Math.max(u, m);
                }
                if (u > p) {
                    return !1;
                }
            }
        }
        if (r) {
            if (o.multiply(t[e].direction) > 0) {
                a.copy(t[e].point.plus(t[e].direction.scale(p)));
            } else {
                a.copy(t[e].point.plus(t[e].direction.scale(u)));
            }
        } else {
            if ((m = t[e].direction.multiply(o.minus(t[e].point))) < u) {
                a.copy(t[e].point.plus(t[e].direction.scale(u)));
            } else {
                if (m > p) {
                    a.copy(t[e].point.plus(t[e].direction.scale(p)));
                } else {
                    a.copy(t[e].point.plus(t[e].direction.scale(m)));
                }
            }
        }
        return !0;
    };
    t.prototype.linearProgram2 = function (t, e, n, o, r) {
        if (o) {
            r.copy(n.scale(e));
        } else {
            if ($common.RVOMath.absSq(n) > $common.RVOMath.sqr(e)) {
                r.copy($common.RVOMath.normalize(n).scale(e));
            } else {
                r.copy(n);
            }
        }
        for (var a = 0; a < t.length; ++a) {
            if ($common.RVOMath.det(t[a].direction, t[a].point.minus(r)) > 0) {
                var s = r.clone();
                if (!this.linearProgram1(t, a, e, n, o, r)) {
                    r.copy(s);
                    return a;
                }
            }
        }
        return t.length;
    };
    t.prototype.linearProgram3 = function (t, e, n, o, r) {
        for (var a = 0, s = n; s < t.length; ++s) {
            if ($common.RVOMath.det(t[s].direction, t[s].point.minus(r)) > a) {
                for (var c = [], l = 0; l < e; ++l) {
                    c.push(t[l]);
                }
                for (var u = e; u < s; ++u) {
                    var p = new $common.Line();
                    var h = $common.RVOMath.det(t[s].direction, t[u].direction);
                    if (Math.abs(h) <= $common.RVOMath.RVO_EPSILON) {
                        if (t[s].direction.multiply(t[u].direction) > 0) {
                            continue;
                        }
                        p.point = t[s].point.plus(t[u].point).scale(0.5);
                    } else {
                        p.point = t[s].point.plus(
                            t[s].direction.scale($common.RVOMath.det(t[u].direction, t[s].point.minus(t[u].point)) / h)
                        );
                    }
                    p.direction = $common.RVOMath.normalize(t[u].direction.minus(t[s].direction));
                    c.push(p);
                }
                var f = r.clone();
                if (
                    this.linearProgram2(c, o, new $common.Vector2(-t[s].direction.y, t[s].direction.x), !0, r) <
                    c.length
                ) {
                    r.copy(f);
                }
                a = $common.RVOMath.det(t[s].direction, t[s].point.minus(r));
            }
        }
    };
    return t;
})();
exports.Agent = o;
