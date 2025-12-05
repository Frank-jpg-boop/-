var i;
var $levelPathLine = require("./LevelPathLine");
var $levelPathPoint = require("./LevelPathPoint");
var $graph = require("./Graph");
var $battleMgr = require("./BattleMgr");
var $unitMgr = require("./UnitMgr");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var h = cc._decorator;
var f = h.ccclass;
var d = h.property;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nDrawLine = null;
        e.nDrawPoint = null;
        e.pDrawPoint = null;
        e.pDrawLine = null;
        e.isDrawPath = !1;
        e._pointMap = new Map();
        e._lineMap = new Map();
        e._dijstra = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        var e = this;
        var n = $battleMgr.default.instance.getCurScene().level;
        this._dijstra = new $graph();
        this._pointMap.clear();
        this._lineMap.clear();
        t.forEach(function (t) {
            var n = new $levelPathPoint.default();
            n.init(t);
            e._pointMap.set(n.pointId, n);
        });
        this._pointMap.forEach(function (t) {
            var i = e.isUnlockLadder(t.pointId, n.getRoomById(t.roomId).exData);
            t.linkIds.forEach(function (o) {
                var r = e._pointMap.get(o);
                var a = Math.min(t.roomId, r.roomId);
                if (
                    n.getRoomById(a).isUnlock &&
                    i &&
                    (t.roomId == r.roomId || e.isUnlockLadder(o, n.getRoomById(r.roomId).exData))
                ) {
                    var s = t.pointId + "|" + r.pointId;
                    var c = e.createLine(s, t, r);
                    e._lineMap.set(s, c);
                    t.addLine(s);
                    t.addDijstraObj(r.pointId, c.len);
                }
            });
            e._dijstra.addNode(t.pointId, t.dijstraObjMap);
        });
        if (this.isDrawPath) {
            this.drawPath();
        }
    };
    e.prototype.isUnlockLadder = function (t, e) {
        for (var n = 0; n < e.ladders.length; ++n) {
            var i = e.ladders[n];
            if (0 != i.unlockMethod && i.bindPointIds.includes(t)) {
                return !1;
            }
        }
        return !0;
    };
    e.prototype.unlockPoint = function (t) {
        var e = this;
        var n = $battleMgr.default.instance.getCurScene().level;
        var i = this._pointMap.get(t);
        var o = this.findLadderByPoint(t);
        i.linkIds.forEach(function (t) {
            var r = e._pointMap.get(t);
            var a = Math.min(i.roomId, r.roomId);
            var s = i.pointId + "|" + r.pointId;
            if (!e._lineMap.has(s) && n.getRoomById(a).isUnlock && (!o || !o.bindPointIds.includes(t) || o.isUnlock)) {
                var c = e.createLine(s, i, r);
                e._lineMap.set(s, c);
                i.addLine(s);
                i.addDijstraObj(r.pointId, c.len);
                var l = r.pointId + "|" + i.pointId;
                var u = e.createLine(l, r, i);
                e._lineMap.set(l, u);
                r.addLine(l);
                r.addDijstraObj(i.pointId, u.len);
                e._dijstra.addNode(r.pointId, r.dijstraObjMap);
            }
        });
        this._dijstra.addNode(t, i.dijstraObjMap);
        if (this.isDrawPath) {
            this.drawPath();
        }
    };
    e.prototype.findLadderByPoint = function (t) {
        for (
            var e = $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.LADDER), n = 0;
            n < e.length;
            ++n
        ) {
            var i = e[n];
            if (i.bindPointIds.includes(t)) {
                return i;
            }
        }
        return null;
    };
    e.prototype.createLine = function (t, e, n) {
        var i = new $levelPathLine.default();
        i.init(t, e, n);
        this._lineMap.set(t, i);
        return i;
    };
    e.prototype.drawPath = function () {
        var t = this;
        this.nDrawPoint.destroyAllChildren();
        this.nDrawLine.destroyAllChildren();
        this._pointMap.forEach(function (e) {
            var n = cc.instantiate(t.pDrawPoint);
            n.setPosition(e.pos);
            n.parent = t.nDrawPoint;
            n.getChildByName("EditNum").getComponent(cc.Label).string = e.pointId;
        });
        this._lineMap.forEach(function (e) {
            var n = cc.instantiate(t.pDrawLine);
            var i = e.startPos;
            var o = e.endPos;
            n.parent = t.nDrawLine;
            n.setPosition(i);
            var r = n.getComponent(cc.Graphics);
            r.clear();
            r.moveTo(0, 0);
            var a = o.sub(i);
            r.lineTo(a.x, a.y);
            r.stroke();
        });
    };
    e.prototype.getPoint = function (t) {
        return this._pointMap.get(t);
    };
    e.prototype.getLine = function (t) {
        return this._lineMap.get(t);
    };
    e.prototype.queryLine = function () {
        return Array.from(this._lineMap.values());
    };
    e.prototype.findPathPointByPos = function (t, e) {
        if (void 0 === e) {
            e = 2;
        }
        for (var n = Array.from(this._pointMap.keys()), i = 0; i < n.length; i++) {
            var o = n[i];
            var r = this._pointMap.get(o);
            if (r.isInPoint(t, e)) {
                return r.pointId;
            }
        }
        return "";
    };
    e.prototype.findPathLineByPos = function (t, e) {
        if (void 0 === e) {
            e = 8;
        }
        for (var n = Array.from(this._lineMap.keys()), i = [], o = 0; o < n.length; o++) {
            var r = n[o];
            var a = this._lineMap.get(r);
            if (!i.includes(a.reverseLineId)) {
                if (a.isPosInLineSegment(t, e)) {
                    return r;
                }
                i.push(r);
            }
        }
        return "";
    };
    e.prototype.findPointValidMinLine = function (t, e, n) {
        if (0 == t.x && 0 == t.y) {
            return null;
        }
        var i = [];
        var o = $battleMgr.default.instance.getCurScene();
        var r = o.level;
        var a = r.getRoomById(e.roomId).layer;
        var s = [];
        if (o.isTriggerBoss) {
            $unitMgr.UnitMgr.instance.queryUnit($gridAreaDivisionMgr.E_AreaObjectType.LADDER).forEach(function (t) {
                if (t.isExitLadder) {
                    s.push.apply(s, t.lineIds);
                }
            });
        }
        for (var c = 0; c < e.lineIds.length; c++) {
            var h = e.lineIds[c];
            var f = this._lineMap.get(h);
            var d = r.getRoomById(f.roomId).layer;
            if (!(s.includes(h) || (n && d !== a))) {
                var m = (180 * t.angle(f.dir)) / Math.PI;
                if (m >= 90) {
                    //
                } else {
                    if (1 == Math.abs(f.dir.y)) {
                        m -= 15;
                    }
                    i.push({
                        line: f,
                        angle: m
                    });
                }
            }
        }
        if (0 == i.length) {
            return null;
        } else {
            return (
                i.sort(function (t, e) {
                    return t.angle - e.angle;
                }),
                i[0].line
            );
        }
    };
    e.prototype.findPathPoss = function (t, e) {
        var n = this;
        var i = [];
        if (t.pos.fuzzyEquals(e.pos, 5)) {
            return i;
        }
        if (
            "" != t.lineId &&
            "" != e.lineId &&
            (t.lineId === e.lineId || t.lineId.split("|").reverse().join("|") === e.lineId)
        ) {
            i.push(e.pos);
            return i;
        }
        if ("" != t.pointId && "" != e.pointId) {
            if (this._lineMap.has(t.pointId + "|" + e.pointId)) {
                i.push(e.pos);
                return i;
            }
            var o = this._dijstra.path(t.pointId, e.pointId, {
                cost: !0
            });
            if (o && o.path) {
                o.path.forEach(function (t) {
                    var e = n._pointMap.get(t);
                    if (e) {
                        i.push(e.pos);
                    }
                });
            }
            i.shift();
            return i;
        }
        if ("" != t.pointId) {
            var r = this._lineMap.get(e.lineId);
            if (r && (r.startPoint.pointId === t.pointId || r.endPoint.pointId === t.pointId)) {
                i.push(e.pos);
                return i;
            }
        }
        if ("" != e.pointId) {
            var a = this._lineMap.get(t.lineId);
            if (a && (a.startPoint.pointId === e.pointId || a.endPoint.pointId === e.pointId)) {
                i.push(e.pos);
                return i;
            }
        }
        var s = this._lineMap.get(t.lineId);
        var c = this._lineMap.get(e.lineId);
        var l = this._pointMap.get(t.pointId);
        var u = this._pointMap.get(e.pointId);
        var p = null;
        if (s) {
            p = s.startPoint;
        } else {
            p = l;
        }
        var h = null;
        if (s) {
            h = s.endPoint;
        } else {
            h = l;
        }
        if (!p) {
            console.error("point1 is null");
            return i;
        }
        if (!h) {
            console.error("point2 is null");
            return i;
        }
        var f = null;
        if (p.pointId == h.pointId) {
            f = 0;
        } else {
            f = cc.Vec2.distance(p.pos, t.pos);
        }
        var d = null;
        if (p.pointId == h.pointId) {
            d = 0;
        } else {
            d = cc.Vec2.distance(h.pos, t.pos);
        }
        var m = null;
        if (c) {
            m = c.startPoint;
        } else {
            m = u;
        }
        var y = null;
        if (c) {
            y = c.endPoint;
        } else {
            y = u;
        }
        if (!m) {
            console.error("point3 is null");
            return i;
        }
        if (!y) {
            console.error("point4 is null");
            return i;
        }
        var _ = null;
        if (m.pointId == y.pointId) {
            _ = 0;
        } else {
            _ = cc.Vec2.distance(m.pos, e.pos);
        }
        var g = null;
        if (m.pointId == y.pointId) {
            g = 0;
        } else {
            g = cc.Vec2.distance(y.pos, e.pos);
        }
        var v = [];
        var b = function (t, e, i, o) {
            if (t.pointId == e.pointId) {
                v.push({
                    path: [t.pointId],
                    cost: i + o
                });
            } else {
                var r = n._dijstra.path(t.pointId, e.pointId, {
                    cost: !0
                });
                if (r) {
                    r.cost += i + o;
                    v.push(r);
                }
            }
        };
        if (p.pointId == h.pointId) {
            b(p, m, f, _);
            b(p, y, f, g);
        } else {
            if (m.pointId == y.pointId) {
                b(p, m, d, _), b(h, m, d, g);
            } else {
                b(p, m, f, _), b(p, y, f, g), b(h, m, d, _), b(h, y, d, g);
            }
        }
        v.sort(function (t, e) {
            return t.cost - e.cost;
        });
        var E = v[0].path;
        if (E) {
            E.forEach(function (t) {
                i.push(n._pointMap.get(t).pos);
            });
        }
        if (E && E.length > 0 && !this._pointMap.get(E[E.length - 1]).isInPoint(e.pos)) {
            i.push(e.pos);
        }
        return i.slice();
    };
    e.prototype.findCircleRangePoints = function (t, e) {
        var n = [];
        var i = $battleMgr.default.instance.getCurScene();
        this._pointMap.forEach(function (o) {
            var r = i.level.getRoomById(o.roomId);
            if (r && r.isUnlock && cc.Vec2.distance(o.pos, t) <= e) {
                n.push(o.pointId);
            }
        });
        return n;
    };
    __decorate([d(cc.Node)], e.prototype, "nDrawLine", void 0);
    __decorate([d(cc.Node)], e.prototype, "nDrawPoint", void 0);
    __decorate([d(cc.Prefab)], e.prototype, "pDrawPoint", void 0);
    __decorate([d(cc.Prefab)], e.prototype, "pDrawLine", void 0);
    __decorate(
        [
            d({
                tooltip: "是否绘制编辑路径"
            })
        ],
        e.prototype,
        "isDrawPath",
        void 0
    );
    return __decorate([f], e);
})(cc.Component);
exports.default = m;
