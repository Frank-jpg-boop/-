exports.QuadTree = void 0;
(function (t) {
    var e = (function () {
        function t(t, e, n, i) {
            this.bounds = t;
            this.max_objects = e || 10;
            this.max_levels = n || 4;
            this.level = i || 0;
            this.objects = new Array();
            this.nodes = new Array();
        }
        t.prototype.split = function () {
            var e = this;
            var n = e.level + 1;
            var i = e.bounds.width / 2;
            var o = e.bounds.height / 2;
            var r = e.bounds.x;
            var a = e.bounds.y;
            e.nodes[0] = new t(
                {
                    x: r + i,
                    y: a,
                    width: i,
                    height: o
                },
                e.max_objects,
                e.max_levels,
                n
            );
            e.nodes[1] = new t(
                {
                    x: r,
                    y: a,
                    width: i,
                    height: o
                },
                e.max_objects,
                e.max_levels,
                n
            );
            e.nodes[2] = new t(
                {
                    x: r,
                    y: a + o,
                    width: i,
                    height: o
                },
                e.max_objects,
                e.max_levels,
                n
            );
            e.nodes[3] = new t(
                {
                    x: r + i,
                    y: a + o,
                    width: i,
                    height: o
                },
                e.max_objects,
                e.max_levels,
                n
            );
        };
        t.prototype.getIndex = function (t) {
            var e = [];
            var n = this.bounds.x + this.bounds.width / 2;
            var i = this.bounds.y + this.bounds.height / 2;
            var o = t.y + t.height > i;
            var r = t.y < i;
            var a = t.x < n;
            var s = t.x + t.width > n;
            if (r && s) {
                e.push(0);
            }
            if (r && a) {
                e.push(1);
            }
            if (o && a) {
                e.push(2);
            }
            if (o && s) {
                e.push(3);
            }
            return e;
        };
        t.prototype.insert = function (t) {
            var e = this;
            var n = 0;
            var i = 0;
            var o = null;
            if (e.nodes.length > 0) {
                n = 0;
                for (i = (o = e.getIndex(t)).length; n < i; ++n) {
                    e.nodes[o[n]].insert(t);
                }
            } else if ((e.objects.push(t), e.objects.length > e.max_objects && e.level < e.max_levels)) {
                if (0 == e.nodes.length) {
                    e.split();
                }
                n = 0;
                for (i = e.objects.length; n < i; ++n) {
                    var r = e.objects[n];
                    o = e.getIndex(r);
                    for (var a = 0; a < o.length; ++a) {
                        e.nodes[o[a]].insert(r);
                    }
                }
                e.objects = [];
            }
        };
        t.prototype.retrieve = function (t, e) {
            var n = this.getIndex(t);
            var i = this.objects;
            if (this.nodes.length > 0) {
                for (var o = 0, r = n.length; o < r; ++o) {
                    i = i.concat(this.nodes[n[o]].retrieve(t, e));
                }
            }
            return (i = i.filter(function (t, n) {
                return i.indexOf(t) >= n && -1 != e.indexOf(t.group);
            }));
        };
        t.prototype.clear = function () {
            var t = this;
            t.objects = [];
            for (var e = 0, n = t.nodes.length; e < n; ++e) {
                if (t.nodes.length > 0) {
                    t.nodes[e].clear();
                }
            }
            t.nodes = [];
        };
        return t;
    })();
    t.QuadTree = e;
})(exports.QuadTree || (exports.QuadTree = {}));
